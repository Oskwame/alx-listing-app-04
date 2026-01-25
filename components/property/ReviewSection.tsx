import axios from "axios";
import { useEffect, useState } from "react";

type Review = {
  id: string | number;
  comment?: string;
  [key: string]: unknown;
};

type ReviewSectionProps = {
  propertyId: string | number;
};

export default function ReviewSection({ propertyId }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!propertyId) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/properties/${propertyId}/reviews`,
        );
        const data = Array.isArray(response.data) ? response.data : [];
        setReviews(data);
      } catch (err) {
        setError("Error fetching reviews");
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [propertyId]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (reviews.length === 0) {
    return <p>No reviews yet</p>;
  }

  return (
    <div className="space-y-3">
      {reviews.map((review) => (
        <div key={review.id} className="border rounded-md p-3">
          {review.comment && <p>{review.comment}</p>}
        </div>
      ))}
    </div>
  );
}

