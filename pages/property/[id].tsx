import axios from "axios";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import PropertyDetail from "@/components/property/PropertyDetail";

type Property = {
  id: string | number;
  title?: string;
  location?: string;
  price?: number;
  imageUrl?: string;
  description?: string;
  [key: string]: unknown;
};

export default function PropertyDetailPage() {
  const params = useLocalSearchParams<{ id?: string }>();
  const id = params.id;
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/properties/${id}`);
        setProperty(response.data);
      } catch (err) {
        setError("Error fetching property details");
        console.error("Error fetching property details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!property) {
    return <p>Property not found</p>;
  }

  return <PropertyDetail property={property} />;
}
