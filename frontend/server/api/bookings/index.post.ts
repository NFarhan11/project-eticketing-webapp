export default defineEventHandler(async (event) => {
  const { laravel } = useApi();

  const body = await readBody(event);

  try {
    return laravel("api/bookings", {
      method: "POST",
      body,
    });
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || "Failed to submit bookings",
    });
  }
});
