import type { LoaderFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";

export const loader: LoaderFunction = function ({ params }) {
  if (params["*"] === "exp") {
    return redirect("/expenses");
  }

  throw new Response("Not Found", { status: 404 });
};
