import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (
        req.nextUrl.pathname.startsWith("/admin") ||
        req.nextUrl.pathname.startsWith("/api/admin")
      ) {
        return token?.role === "admin";
      }
      return true;
    },
  },
});

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
