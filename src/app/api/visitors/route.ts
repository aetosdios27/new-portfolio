import { Redis } from "@upstash/redis";
import { cookies } from "next/headers";

export async function GET() {
  try {
    // Graceful fallback if ENV vars aren't configured yet
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      return Response.json({ count: "ENV_MISSING" });
    }

    const redis = Redis.fromEnv();
    const cookieStore = await cookies();
    const hasVisited = cookieStore.get("has_visited");

    let count = await redis.get<number>("portfolio_visitors") || 0;

    if (!hasVisited) {
      count = await redis.incr("portfolio_visitors");
      cookieStore.set("has_visited", "true", { 
        maxAge: 60 * 60 * 24 * 30, // 30 days
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
      });
    }

    return Response.json({ count });
  } catch (error) {
    console.error("Visitor count error:", error);
    return Response.json({ count: "ERR" });
  }
}
