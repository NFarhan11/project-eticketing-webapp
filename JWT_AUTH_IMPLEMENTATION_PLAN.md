# JWT Authentication Implementation Plan

## Overview

This document outlines the implementation plan for custom JWT authentication in the e-ticketing application using **pure Laravel and Nuxt** without external JWT packages.

## Architecture

### Technology Stack

- **Backend**: Laravel (pure PHP JWT implementation)
- **Frontend**: Nuxt 3 with TypeScript
- **Token Storage**: localStorage (frontend)
- **Token Type**: JWT (JSON Web Token)

### Authentication Flow

1. User submits credentials (email/password) to `/api/auth/login`
2. Laravel validates credentials and generates JWT token
3. Token returned to frontend with user data
4. Frontend stores token in localStorage
5. All subsequent requests include `Authorization: Bearer {token}` header
6. Laravel middleware validates token on protected routes

---

## Backend Implementation (Laravel)

### 1. JWT Service (`app/Services/JwtService.php`)

Pure PHP implementation for JWT creation and validation:

```php
<?php

namespace App\Services;

class JwtService
{
    private string $secret;
    private string $algorithm = 'sha256';
    private int $expiresIn = 3600; // 1 hour

    public function __construct()
    {
        $this->secret = config('app.jwt_secret');
    }

    /**
     * Generate JWT token for user
     */
    public function generateToken(array $payload): string
    {
        $header = [
            'typ' => 'JWT',
            'alg' => 'HS256'
        ];

        $payload['iat'] = time();
        $payload['exp'] = time() + $this->expiresIn;

        $base64Header = $this->base64UrlEncode(json_encode($header));
        $base64Payload = $this->base64UrlEncode(json_encode($payload));

        $signature = hash_hmac(
            $this->algorithm,
            $base64Header . '.' . $base64Payload,
            $this->secret,
            true
        );

        $base64Signature = $this->base64UrlEncode($signature);

        return $base64Header . '.' . $base64Payload . '.' . $base64Signature;
    }

    /**
     * Validate and decode JWT token
     */
    public function validateToken(string $token): ?array
    {
        $parts = explode('.', $token);

        if (count($parts) !== 3) {
            return null;
        }

        [$base64Header, $base64Payload, $base64Signature] = $parts;

        // Verify signature
        $signature = hash_hmac(
            $this->algorithm,
            $base64Header . '.' . $base64Payload,
            $this->secret,
            true
        );

        $expectedSignature = $this->base64UrlEncode($signature);

        if ($base64Signature !== $expectedSignature) {
            return null;
        }

        // Decode payload
        $payload = json_decode($this->base64UrlDecode($base64Payload), true);

        // Check expiration
        if (isset($payload['exp']) && $payload['exp'] < time()) {
            return null;
        }

        return $payload;
    }

    /**
     * Base64 URL encode
     */
    private function base64UrlEncode(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    /**
     * Base64 URL decode
     */
    private function base64UrlDecode(string $data): string
    {
        return base64_decode(strtr($data, '-_', '+/'));
    }
}
```

### 2. Auth Controller (`app/Http/Controllers/AuthController.php`)

```php
<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\JwtService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    private JwtService $jwtService;

    public function __construct(JwtService $jwtService)
    {
        $this->jwtService = $jwtService;
    }

    /**
     * Register new user
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $token = $this->jwtService->generateToken([
            'user_id' => $user->id,
            'email' => $user->email,
        ]);

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    /**
     * Login user
     */
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $this->jwtService->generateToken([
            'user_id' => $user->id,
            'email' => $user->email,
        ]);

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    /**
     * Get authenticated user
     */
    public function me(Request $request)
    {
        return response()->json([
            'user' => $request->user,
        ]);
    }

    /**
     * Logout (client-side token removal)
     */
    public function logout()
    {
        return response()->json([
            'message' => 'Successfully logged out',
        ]);
    }

    /**
     * Refresh token
     */
    public function refresh(Request $request)
    {
        $user = $request->user;

        $token = $this->jwtService->generateToken([
            'user_id' => $user->id,
            'email' => $user->email,
        ]);

        return response()->json([
            'token' => $token,
        ]);
    }
}
```

### 3. JWT Middleware (`app/Http/Middleware/JwtMiddleware.php`)

```php
<?php

namespace App\Http\Middleware;

use App\Services\JwtService;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class JwtMiddleware
{
    private JwtService $jwtService;

    public function __construct(JwtService $jwtService)
    {
        $this->jwtService = $jwtService;
    }

    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $payload = $this->jwtService->validateToken($token);

        if (!$payload) {
            return response()->json(['message' => 'Invalid or expired token'], 401);
        }

        // Attach user to request
        $user = User::find($payload['user_id']);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 401);
        }

        $request->merge(['user' => $user]);

        return $next($request);
    }
}
```

### 4. Register Middleware (`bootstrap/app.php`)

Add to middleware aliases:

```php
return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'jwt.auth' => \App\Http\Middleware\JwtMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
```

### 5. API Routes (`routes/api.php`)

```php
<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\EventController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

// Public event browsing
Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{id}', [EventController::class, 'show']);

// Protected routes
Route::middleware('jwt.auth')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::post('/auth/refresh', [AuthController::class, 'refresh']);

    // Protected event management (admin only - add role check later)
    Route::post('/events', [EventController::class, 'store']);
    Route::put('/events/{id}', [EventController::class, 'update']);
    Route::delete('/events/{id}', [EventController::class, 'destroy']);

    // Booking management
    Route::apiResource('bookings', BookingController::class);
});
```

### 6. Configuration (`config/app.php` or `.env`)

Add JWT secret to `.env`:

```env
JWT_SECRET=your-super-secret-key-change-this-in-production
```

Add to `config/app.php`:

```php
'jwt_secret' => env('JWT_SECRET', 'default-secret-key'),
```

---

## Frontend Implementation (Nuxt)

### 1. Auth Composable (`composables/useAuth.ts`)

```typescript
export const useAuth = () => {
  const user = useState<any>("user", () => null);
  const token = useState<string | null>("token", () => null);

  // Initialize from localStorage on mount
  if (process.client) {
    const storedToken = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("auth_user");

    if (storedToken && storedUser) {
      token.value = storedToken;
      user.value = JSON.parse(storedUser);
    }
  }

  const setAuth = (newUser: any, newToken: string) => {
    user.value = newUser;
    token.value = newToken;

    if (process.client) {
      localStorage.setItem("auth_token", newToken);
      localStorage.setItem("auth_user", JSON.stringify(newUser));
    }
  };

  const clearAuth = () => {
    user.value = null;
    token.value = null;

    if (process.client) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    }
  };

  const login = async (email: string, password: string) => {
    const { laravel } = useApi();

    try {
      const response = await laravel("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });

      setAuth(response.user, response.token);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ) => {
    const { laravel } = useApi();

    try {
      const response = await laravel("/api/auth/register", {
        method: "POST",
        body: { name, email, password, password_confirmation },
      });

      setAuth(response.user, response.token);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    const { laravel } = useApi();

    try {
      await laravel("/api/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearAuth();
      navigateTo("/login");
    }
  };

  const fetchUser = async () => {
    const { laravel } = useApi();

    try {
      const response = await laravel("/api/auth/me");
      user.value = response.user;

      if (process.client) {
        localStorage.setItem("auth_user", JSON.stringify(response.user));
      }

      return response.user;
    } catch (error) {
      clearAuth();
      throw error;
    }
  };

  const isAuthenticated = computed(() => !!token.value);

  return {
    user: readonly(user),
    token: readonly(token),
    isAuthenticated,
    login,
    register,
    logout,
    fetchUser,
    setAuth,
    clearAuth,
  };
};
```

### 2. Update API Utility (`server/utils/useApi.ts`)

```typescript
import { $fetch } from "ofetch";

export default function useApi() {
  const config = useRuntimeConfig();

  // Get token from localStorage (only on client-side)
  const getToken = () => {
    if (process.client) {
      return localStorage.getItem("auth_token");
    }
    return null;
  };

  return {
    laravel: $fetch.create({
      baseURL: config.public.services.laravel,
      onRequest({ options }) {
        const token = getToken();
        if (token) {
          options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
          };
        }
      },
      onResponseError({ response }) {
        // Handle 401 - unauthorized
        if (response.status === 401 && process.client) {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_user");
          navigateTo("/login");
        }
      },
    }),
  };
}
```

### 3. Auth Middleware (`middleware/auth.ts`)

```typescript
export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated.value) {
    return navigateTo("/login");
  }
});
```

### 4. Guest Middleware (`middleware/guest.ts`)

```typescript
export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated.value) {
    return navigateTo("/events");
  }
});
```

### 5. Login Page (`pages/auth/login.vue`)

```vue
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
      <div>
        <h2 class="text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div v-if="error" class="rounded-md bg-red-50 p-4">
          <p class="text-sm text-red-800">{{ error }}</p>
        </div>

        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {{ loading ? "Signing in..." : "Sign in" }}
          </button>
        </div>

        <div class="text-center">
          <NuxtLink
            to="/auth/register"
            class="text-sm text-blue-600 hover:text-blue-500"
          >
            Don't have an account? Register
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "guest",
  layout: false,
});

const { login } = useAuth();
const router = useRouter();

const form = reactive({
  email: "",
  password: "",
});

const loading = ref(false);
const error = ref("");

const handleLogin = async () => {
  loading.value = true;
  error.value = "";

  try {
    await login(form.email, form.password);
    router.push("/events");
  } catch (err: any) {
    error.value =
      err.data?.message || "Login failed. Please check your credentials.";
  } finally {
    loading.value = false;
  }
};
</script>
```

### 6. Register Page (`pages/auth/register.vue`)

```vue
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
      <div>
        <h2 class="text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div v-if="error" class="rounded-md bg-red-50 p-4">
          <p class="text-sm text-red-800">{{ error }}</p>
        </div>

        <div class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              minlength="8"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              for="password_confirmation"
              class="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="password_confirmation"
              v-model="form.password_confirmation"
              type="password"
              required
              minlength="8"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {{ loading ? "Creating account..." : "Register" }}
          </button>
        </div>

        <div class="text-center">
          <NuxtLink
            to="/auth/login"
            class="text-sm text-blue-600 hover:text-blue-500"
          >
            Already have an account? Sign in
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "guest",
  layout: false,
});

const { register } = useAuth();
const router = useRouter();

const form = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const loading = ref(false);
const error = ref("");

const handleRegister = async () => {
  if (form.password !== form.password_confirmation) {
    error.value = "Passwords do not match";
    return;
  }

  loading.value = true;
  error.value = "";

  try {
    await register(
      form.name,
      form.email,
      form.password,
      form.password_confirmation
    );
    router.push("/events");
  } catch (err: any) {
    error.value = err.data?.message || "Registration failed. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>
```

### 7. Update Existing Pages with Auth

Add middleware to protected pages:

```typescript
// pages/bookings/index.vue
definePageMeta({
  middleware: "auth",
});

// pages/events/[id]/index.vue (if booking requires auth)
// Add auth check before showing booking form
```

### 8. Add User Menu to Layout (`layouts/default.vue`)

```vue
<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-xl font-bold text-gray-900">
              E-Ticketing
            </NuxtLink>
            <div class="ml-10 flex space-x-4">
              <NuxtLink
                to="/events"
                class="text-gray-700 hover:text-gray-900 px-3 py-2"
              >
                Events
              </NuxtLink>
              <NuxtLink
                v-if="isAuthenticated"
                to="/bookings"
                class="text-gray-700 hover:text-gray-900 px-3 py-2"
              >
                My Bookings
              </NuxtLink>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <template v-if="isAuthenticated">
              <span class="text-gray-700">{{ user?.name }}</span>
              <button
                @click="handleLogout"
                class="text-red-600 hover:text-red-700"
              >
                Logout
              </button>
            </template>
            <template v-else>
              <NuxtLink
                to="/auth/login"
                class="text-blue-600 hover:text-blue-700"
              >
                Login
              </NuxtLink>
              <NuxtLink
                to="/auth/register"
                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Register
              </NuxtLink>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const { user, isAuthenticated, logout } = useAuth();

const handleLogout = async () => {
  await logout();
};
</script>
```

---

## Security Considerations

### Backend

1. **Secret Key**: Use strong, random JWT secret (min 32 characters)
2. **HTTPS**: Always use HTTPS in production
3. **Token Expiration**: Set appropriate expiration time (1-24 hours)
4. **CORS**: Configure proper CORS headers in Laravel
5. **Rate Limiting**: Add rate limiting to login/register endpoints
6. **Password Hashing**: Already handled by Laravel's `Hash::make()`

### Frontend

1. **Token Storage**: localStorage is used (consider httpOnly cookies for extra security)
2. **XSS Protection**: Sanitize user inputs
3. **CSRF**: Not needed for JWT-based API authentication
4. **Token Refresh**: Implement refresh token mechanism for long sessions

---

## Testing Strategy

### Backend Tests

```php
// tests/Feature/AuthTest.php
public function test_user_can_register()
public function test_user_can_login()
public function test_invalid_credentials_fail()
public function test_protected_routes_require_token()
public function test_expired_token_is_rejected()
```

### Frontend Tests

- Test login/register forms
- Test auth state persistence
- Test protected route redirects
- Test token auto-attachment to requests

---

## Migration Path

1. **Phase 1**: Implement backend JWT service and middleware
2. **Phase 2**: Create auth controller and routes
3. **Phase 3**: Add JWT secret to environment config
4. **Phase 4**: Implement frontend composables and utilities
5. **Phase 5**: Create login/register pages
6. **Phase 6**: Add middleware to protected routes
7. **Phase 7**: Update layouts with user menu
8. **Phase 8**: Test and refine

---

## Future Enhancements

1. **Refresh Tokens**: Implement long-lived refresh tokens
2. **Role-Based Access**: Add roles (admin, user) to JWT payload
3. **Email Verification**: Add email verification flow
4. **Password Reset**: Implement forgot password functionality
5. **Two-Factor Auth**: Add 2FA support
6. **Token Blacklist**: Implement token revocation system
7. **Remember Me**: Add persistent login option

---

## Notes

- **No external packages**: Pure PHP for JWT, native Nuxt composables
- **Stateless**: JWT tokens are self-contained, no server-side sessions
- **Scalable**: Works across multiple Laravel instances (no session dependency)
- **Simple**: Easy to understand and maintain

---

## Reference Links

- JWT Specification: https://datatracker.ietf.org/doc/html/rfc7519
- Laravel Authentication: https://laravel.com/docs/authentication
- Nuxt 3 Middleware: https://nuxt.com/docs/guide/directory-structure/middleware
- Nuxt 3 Composables: https://nuxt.com/docs/guide/directory-structure/composables
