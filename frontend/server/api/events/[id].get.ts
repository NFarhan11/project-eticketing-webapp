export default defineEventHandler(async (event) => {
  const { laravel } = useApi();
  const params = { id: getRouterParam(event, "id") };

  if (!params.id) {
    throw createError({
      statusCode: 400,
      statusMessage: "No event ID",
    });
  }

  try {
    return laravel("api/events", {
      method: "GET",
      params,
    });
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || "Failed to fetch event",
    });
  }
});
