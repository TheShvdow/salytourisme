import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
  showNumber?: boolean;
  size?: "sm" | "md";
}

export default function StarRating({
  rating,
  max = 5,
  showNumber = true,
  size = "sm",
}: StarRatingProps) {
  const starSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }, (_, i) => (
          <Star
            key={i}
            className={`${starSize} ${
              i < Math.floor(rating)
                ? "fill-sand-400 text-sand-400"
                : i < rating
                ? "fill-sand-300 text-sand-300"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
      {showNumber && (
        <span className="text-xs font-semibold text-gray-600 ml-1">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
