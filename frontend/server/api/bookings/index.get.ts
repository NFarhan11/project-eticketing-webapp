export default defineEventHandler(async (event) => {
  const { laravel } = useApi();

  const query = getQuery(event);

  try {
    return laravel("api/bookings", {
      method: "GET",
      query,
    });
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || "Failed to fetch bookings",
    });
  }
});
