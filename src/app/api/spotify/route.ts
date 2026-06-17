import { NextResponse } from "next/server";
import { getNowPlaying, getRecentlyPlayed } from "@/lib/spotify";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let response = await getNowPlaying();
    let song = response.status === 204 || response.status > 400 ? null : await response.json();

    if (song && song.item) {
      return NextResponse.json({
        isPlaying: song.is_playing,
        isRecent: !song.is_playing,
        title: song.item.name,
        artist: song.item.artists.map((_artist: any) => _artist.name).join(", "),
        albumImageUrl: song.item.album.images[0]?.url,
        songUrl: song.item.external_urls.spotify,
      });
    }

    // Fallback to recently played
    const recentResponse = await getRecentlyPlayed();
    if (recentResponse.status === 204 || recentResponse.status > 400) {
      return NextResponse.json({ isPlaying: false });
    }

    const recentData = await recentResponse.json();
    
    if (!recentData.items || recentData.items.length === 0) {
      return NextResponse.json({ isPlaying: false });
    }

    const track = recentData.items[0].track;
    
    // Optional: Check if played in the last 3 hours
    const playedAt = new Date(recentData.items[0].played_at);
    const now = new Date();
    const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000);
    
    if (playedAt < threeHoursAgo) {
      return NextResponse.json({ isPlaying: false });
    }

    return NextResponse.json({
      isPlaying: false,
      isRecent: true,
      title: track.name,
      artist: track.artists.map((_artist: any) => _artist.name).join(", "),
      albumImageUrl: track.album.images[0]?.url,
      songUrl: track.external_urls.spotify,
    });
  } catch (error) {
    console.error("Spotify API error:", error);
    return NextResponse.json({ isPlaying: false }, { status: 500 });
  }
}
