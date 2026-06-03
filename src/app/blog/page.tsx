import { ListingView } from "@/components/listing-view";
import { getEntries } from "@/lib/content";

export default function BlogPage() {
  return <ListingView kind="blog" entries={getEntries("blog")} />;
}
