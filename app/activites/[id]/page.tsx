import { activities } from "@/lib/data";
import ActivityDetailClient from "./ActivityDetailClient";

export function generateStaticParams() {
  return activities.map((a) => ({ id: String(a.id) }));
}

export default function ActivityDetailPage({ params }: { params: { id: string } }) {
  return <ActivityDetailClient params={params} />;
}
