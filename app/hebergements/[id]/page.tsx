import { hotels } from "@/lib/data";
import HotelDetailClient from "./HotelDetailClient";

export function generateStaticParams() {
  return hotels.map((h) => ({ id: String(h.id) }));
}

export default function HotelDetailPage({ params }: { params: { id: string } }) {
  return <HotelDetailClient params={params} />;
}
