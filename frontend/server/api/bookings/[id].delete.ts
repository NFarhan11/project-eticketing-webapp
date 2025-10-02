export default defineEventHandler(async (event) => {
  const { laravel } = useApi();

  const id = getRouterParam(event, "id");

  try {
    return laravel(`api/bookings/${id}`, {
      method: "DELETE",
    });
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || "Failed to delete booking",
    });
  }
});
