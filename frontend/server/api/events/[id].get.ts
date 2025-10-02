export default defineEventHandler(async (event) => {
  const { laravel } = useApi();
  const id = getRouterParam(event, "id");

  try {
    return laravel(`api/events/${id}`, {
      method: "GET",
    });
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || "Failed to fetch event",
    });
  }
});
