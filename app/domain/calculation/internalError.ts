type InternalError = (body?: BodyInit) => Response;
export const internalError: InternalError = (body) =>
  new Response(body ?? "Internal server error", {
    status: 500,
  });
