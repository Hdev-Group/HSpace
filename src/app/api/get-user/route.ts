import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import { LRUCache } from "lru-cache";
import { getAuth } from '@clerk/nextjs/server';

interface CacheEntry {
  userId: string;
  data: any; 
}

// Optimized LRU Cache
const cache = new LRUCache<string, CacheEntry>({
  max: 200, // Adjusted cache size
  maxAge: 1000 * 60 * 15, // Extended max age to 15 minutes
} as any);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userIda = searchParams.get("userId");

  const { userId } = getAuth(request);
  if (!userId || !userIda) {
    return NextResponse.json({ error: !userId ? 'Unauthorized' : 'Invalid userId' }, { status: !userId ? 401 : 400 });
  }

  // Check cache first
  const cachedUser = cache.get(userIda);
  if (cachedUser) {
    const { firstName, lastName, id, imageUrl, username, createdAt } = cachedUser.data;
    return NextResponse.json({ 
      id: id, 
      userdetails: { firstName, lastName, imageUrl, username, createdAt } 
    });
  }

  try {
    // Fetch from Clerk API (optimize by fetching only needed fields if possible)
    const user = await clerkClient.users.getUser(userIda);
    
    // Store user data in cache
    cache.set(userIda, { userId: userIda, data: user });

    const { id, firstName, lastName, imageUrl, username, createdAt } = user;
    return NextResponse.json({ 
      id: id, 
      userdetails: { firstName, lastName, imageUrl, username, createdAt } 
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Error fetching user data" }, { status: 500 });
  }
}
