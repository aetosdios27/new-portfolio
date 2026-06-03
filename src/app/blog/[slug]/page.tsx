import { notFound } from "next/navigation";
import { ListingView } from "@/components/listing-view";
import { getEntries, getEntry } from "@/lib/content";

type BlogSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogSlugPage({ params }: BlogSlugPageProps) {
  const { slug } = await params;
  if (!getEntry("blog", slug)) notFound();
  return <ListingView kind="blog" entries={getEntries("blog")} initialSlug={slug} />;
}
