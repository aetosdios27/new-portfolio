import { notFound } from "next/navigation";
import { ListingView } from "@/components/listing-view";
import { getEntries, getEntry } from "@/lib/content";

type ProjectSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectSlugPage({ params }: ProjectSlugPageProps) {
  const { slug } = await params;
  if (!getEntry("projects", slug)) notFound();
  return <ListingView kind="projects" entries={getEntries("projects")} initialSlug={slug} />;
}
