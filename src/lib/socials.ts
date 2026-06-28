export interface SocialData {
  platform: string;
  handle: string;
  bio: string;
  location?: string;
  metrics: { label: string; value: string | number }[];
}

export async function getGithubData(username: string): Promise<SocialData | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!res.ok) return null;
    const data = await res.json();
    
    return {
      platform: "GitHub",
      handle: username,
      bio: data.bio || "Systems Engineer.",
      location: data.location || "Earth",
      metrics: [
        { label: "Repositories", value: data.public_repos },
        { label: "Followers", value: data.followers }
      ]
    };
  } catch {
    return null;
  }
}

export async function getGithubActivity(username: string) {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.contributions;
  } catch {
    return null;
  }
}

export async function getHashnodeData(username: string): Promise<SocialData> {
  // Hashnode GraphQL API retired free access in May 2026.
  // Hardcoding fallback to preserve the architectural pattern.
  return {
    platform: "Hashnode",
    handle: username,
    bio: "build. break. write. rinse. repeat",
    location: "Earth",
    metrics: [
      { label: "Joined", value: "Sep 2025" }
    ]
  };
}

export async function getTwitterFallbackData(username: string): Promise<SocialData> {
  // Twitter API is locked down and the provided token has depleted credits.
  // Hardcoding fallback with user-provided screenshot data.
  return {
    platform: "X / Twitter",
    handle: username,
    bio: "swe • building @webnotes_ • open to freelance",
    location: "Earth",
    metrics: [
      { label: "Following", value: "312" },
      { label: "Followers", value: "1,184" }
    ]
  };
}
