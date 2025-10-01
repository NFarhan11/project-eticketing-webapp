export default defineEventHandler(async (event) => {
  const { laravel } = useApi();

  // Get user_id from query params (default to 1 for now)
  const query = getQuery(event);
  const userId = query.user_id || 1;

  try {
    return laravel(`api/bookings?user_id=${userId}`, { method: "GET" });
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || "Failed to fetch bookings",
    });
  }
});
