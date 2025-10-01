export default defineEventHandler(async () => {
  const { laravel } = useApi();

  try {
    return laravel("api/events", {
      method: "GET",
    });
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || "Failed to fetch events",
    });
  }
});
