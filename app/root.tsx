import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import {
  useCatch,
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { ErrorInput } from "./components/util/Error";
import Error from "./components/util/Error";

import sharedStylesheet from "./styles/shared.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

function Document({ title, children }: ErrorInput) {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document title={"hello"}>
      <Outlet />
    </Document>
  );
}

export function CatchBoundary() {
  const errorResponse = useCatch();
  return (
    <Document title={errorResponse.statusText}>
      <main>
        <Error title={errorResponse.statusText}>
          <p>
            {errorResponse.data?.message ||
              "Something went wrong. Please try again later."}
          </p>
          <p>
            Back to <Link to="/">safety</Link>.
          </p>
        </Error>
      </main>
    </Document>
  );
}

export function ErrorBoundary() {}

export const links: LinksFunction = function () {
  return [{ rel: "stylesheet", href: sharedStylesheet }];
};
