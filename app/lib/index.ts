import type { TypedResponse } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import type { Result } from "domain-functions";

export const internalError = (body?: BodyInit) =>
  new Response(body ?? "Internal server error", {
    status: 500,
  });

export const loaderResponseOrThrow = <T extends Result<unknown>>(
  result: T,
  opts?: RequestInit
): T extends { data: infer X } ? TypedResponse<X> : never => {
  if (!result.success) {
    throw internalError(result.errors[0]?.message);
  }

  return json(result.data, { status: 200, ...opts }) as any;
};
