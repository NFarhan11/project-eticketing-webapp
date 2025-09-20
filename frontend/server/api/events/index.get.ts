import { $fetch } from "ofetch";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBase;

  try {
    const response = await $fetch("/api/events", {
      baseURL,
      method: "GET",
    });

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || "Failed to fetch events",
    });
  }
});
