import { $fetch } from "ofetch";

export default function useApi() {
  const config = useRuntimeConfig();

  return {
    laravel: $fetch.create({
      baseURL: config.public.services.laravel,
    }),
  };
}
