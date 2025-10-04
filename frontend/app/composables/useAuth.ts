import useApi from "../../server/utils/useApi";

export const useAuth = () => {
  const user = useState<any>("user", () => null);
  const token = useState<string | null>("token", () => null);

  // Initialize from localStorage on mount
  if (import.meta.client) {
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

    if (import.meta.client) {
      localStorage.setItem("auth_token", newToken);
      localStorage.setItem("auth_user", JSON.stringify(newUser));
    }
  };

  const clearAuth = () => {
    user.value = null;
    token.value = null;

    if (import.meta.client) {
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

      if (import.meta.client) {
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
