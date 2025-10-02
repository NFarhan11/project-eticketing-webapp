<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <!-- Hero Header -->
    <div class="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="flex items-center space-x-4">
          <div
            class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
            <UIcon name="i-heroicons-lock-closed" class="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 class="text-4xl font-bold text-white">Sign In</h1>
            <p class="text-blue-100 mt-2">Welcome back! Please sign in to your account</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="max-w-lg mx-auto">
        <!-- Login Card -->
        <UCard class="shadow-2xl border-0 bg-white/90 backdrop-blur-md">
          <template #header>
            <div class="flex items-center space-x-3">
              <div
                class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <UIcon name="i-heroicons-user" class="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 class="text-xl font-semibold text-gray-900">Login to Your Account</h2>
                <p class="text-sm text-gray-600">Enter your credentials to continue</p>
              </div>
            </div>
          </template>

          <!-- Error Alert -->
          <div v-if="error" class="mb-6">
            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
              <div class="flex items-start space-x-3">
                <UIcon name="i-heroicons-exclamation-circle" class="w-5 h-5 text-red-600 mt-0.5" />
                <div class="flex-1">
                  <h3 class="text-sm font-medium text-red-800">Authentication Failed</h3>
                  <p class="text-sm text-red-700 mt-1">{{ error }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Login Form -->
          <form @submit.prevent="handleLogin" class="space-y-6">
            <!-- Email Field -->
            <div class="space-y-2">
              <label for="email" class="block text-sm font-medium text-gray-900">
                <div class="flex items-center space-x-2">
                  <UIcon name="i-heroicons-envelope" class="w-4 h-4 text-gray-600" />
                  <span>Email Address</span>
                </div>
              </label>
              <input id="email" v-model="form.email" type="email" required placeholder="you@example.com"
                class="block w-full px-4 py-3.5 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
                :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-500': error }" />
            </div>

            <!-- Password Field -->
            <div class="space-y-2">
              <label for="password" class="block text-sm font-medium text-gray-900">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <UIcon name="i-heroicons-lock-closed" class="w-4 h-4 text-gray-600" />
                    <span>Password</span>
                  </div>
                  <NuxtLink to="/auth/forgot-password" class="text-xs text-blue-600 hover:text-blue-700 font-medium">
                    Forgot password?
                  </NuxtLink>
                </div>
              </label>
              <input id="password" v-model="form.password" type="password" required placeholder="Enter your password"
                class="block w-full px-4 py-3.5 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
                :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-500': error }" />
            </div>

            <!-- Submit Button -->
            <UButton type="submit" size="lg" block :disabled="loading"
              :class="loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]'">
              <UIcon :name="loading ? 'i-heroicons-arrow-path' : 'i-heroicons-arrow-right-on-rectangle'"
                class="w-5 h-5 mr-2" :class="{ 'animate-spin': loading }" />
              <span>{{ loading ? 'Signing in...' : 'Sign In' }}</span>
            </UButton>
          </form>

          <!-- Register Link -->
          <div class="mt-8 text-center">
            <p class="text-sm text-gray-600">
              Don't have an account?
              <NuxtLink to="/auth/register" class="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                Create an account
              </NuxtLink>
            </p>
          </div>

          <!-- Additional Info -->
          <div class="mt-8 pt-6 border-t border-gray-100">
            <div class="flex items-center justify-center space-x-8 text-xs text-gray-500">
              <div class="flex items-center space-x-1.5">
                <UIcon name="i-heroicons-shield-check" class="w-4 h-4 text-green-500" />
                <span>Secure</span>
              </div>
              <div class="flex items-center space-x-1.5">
                <UIcon name="i-heroicons-lock-closed" class="w-4 h-4 text-blue-500" />
                <span>Encrypted</span>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Back to Home -->
        <div class="mt-6 text-center">
          <UButton to="/events" variant="ghost" size="sm" class="text-gray-600 hover:text-gray-900">
            <UIcon name="i-heroicons-arrow-left" class="w-4 h-4 mr-2" />
            Back to Events
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod';

definePageMeta({
  layout: false, // Use no layout for auth pages
  // middleware: 'guest', // Uncomment when implementing auth
});

// Setup schema
const loginSchema = z.object({
  email: z
    .email(),
  password: z
    .string()
});

type LoginSchema = z.infer<typeof loginSchema>;

const form = reactive<LoginSchema>({
  email: '',
  password: '',
});

const loading = ref(false);
const error = ref('');

const handleLogin = async () => {
  loading.value = true;
  error.value = '';

  try {
    // TODO: Implement actual login logic with useAuth composable
    // const { login } = useAuth();
    // await login(form.email, form.password);

    // Mock login - replace with actual implementation
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate validation
    if (!form.email || !form.password) {
      throw new Error('Please fill in all fields');
    }

    // Mock success - redirect to events
    // navigateTo('/events');

    console.log('Login attempt:', { email: form.email });

  } catch (err: any) {
    error.value = err.message || err.data?.message || 'Login failed. Please check your credentials.';
  } finally {
    loading.value = false;
  }
};
</script>
