// lib/trpc/client.ts
import type { Router } from "$lib/trpc/router";
import { unstable_httpBatchStreamLink } from "@trpc/client";
import { createTRPCClient, type TRPCClientInit } from "trpc-sveltekit";

let browserClient: ReturnType<typeof createTRPCClient<Router>>;

export function trpc(init?: TRPCClientInit) {
  const isBrowser = typeof window !== "undefined";
  if (isBrowser && browserClient) return browserClient;
  const client = createTRPCClient<Router>({
    init,
    links: [unstable_httpBatchStreamLink({ url: "/trpc", maxURLLength: 2000 })],
  });
  if (isBrowser) browserClient = client;
  return client;
}
