import { $fetch } from "ofetch";

export default function useApi() {
  const config = useRuntimeConfig();

  // Get token from localStorage (only on client-side)
  const getToken = () => {
    if (import.meta.client) {
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
          } as any;
        }
      },
      onResponseError({ response }) {
        // Handle 401 - unauthorized
        if (response.status === 401 && import.meta.client) {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_user");
          console.log("Unauthorized - redirecting to login");
        }
      },
    }),
  };
}
