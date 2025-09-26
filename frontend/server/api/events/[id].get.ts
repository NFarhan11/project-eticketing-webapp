export default defineEventHandler(async (event) => {
  const { laravel } = useApi();
  const eventId = getRouterParam(event, "id");

  if (!eventId) {
    throw createError({
      statusCode: 400,
      statusMessage: "No event ID",
    });
  }

  try {
    return laravel(`api/events/${eventId}`, { method: "GET" });
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || "Failed to fetch event",
    });
  }
});
