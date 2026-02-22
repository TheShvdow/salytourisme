import { packages } from "@/lib/data";
import ForfaitDetailClient from "./ForfaitDetailClient";

export function generateStaticParams() {
  return packages.map((p) => ({ id: String(p.id) }));
}

export default function ForfaitDetailPage({ params }: { params: { id: string } }) {
  return <ForfaitDetailClient params={params} />;
}
