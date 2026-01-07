import { NextResponse } from "next/server";
import xml2js from "xml2js";

export async function GET() {
  const channelId = "UCNvSGVF2AoehMD-k9ZdKPUw";
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

  const res = await fetch(feedUrl);
  const xml = await res.text();

  const parser = new xml2js.Parser();
  const parsed = await parser.parseStringPromise(xml);

  const videos = (parsed.feed.entry || []).map((entry: any) => ({
    id: entry["yt:videoId"][0],
    title: entry.title[0],
    link: entry.link[0].$.href,
    published: entry.published[0],
    thumbnail: entry["media:group"][0]["media:thumbnail"][0].$.url,
  }));

  return NextResponse.json(videos);
}
