// lib/trpc/router.ts
import type { Context } from "$lib/trpc/context";
import { initTRPC } from "@trpc/server";

function delay(ms = 100) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const t = initTRPC.context<Context>().create();

export const router = t.router({
  test: t.procedure.query(async () => {
    await delay(100); // 👈 simulate an expensive operation
    console.log("made it here");
    return Math.random();
  }),
});

export type Router = typeof router;
