export default defineEventHandler(async (event) => {
  const { laravel } = useApi();

  try {
    const body = await readBody(event);
    return laravel("api/events", {
      method: "POST",
      body: body,
    });
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || "Failed to fetch events",
    });
  }
});
