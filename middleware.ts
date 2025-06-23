import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
]);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) return;
  // You can add custom logic here if needed
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};