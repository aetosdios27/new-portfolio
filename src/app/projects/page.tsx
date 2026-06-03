import { ListingView } from "@/components/listing-view";
import { getEntries } from "@/lib/content";

export default function ProjectsPage() {
  return <ListingView kind="projects" entries={getEntries("projects")} />;
}
