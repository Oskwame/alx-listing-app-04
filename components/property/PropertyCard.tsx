type Property = {
  id: string | number;
  title?: string;
  location?: string;
  price?: number;
  imageUrl?: string;
};

type PropertyCardProps = {
  property: Property;
};

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      {property.imageUrl && (
        <img
          src={property.imageUrl}
          alt={property.title || "Property image"}
          className="w-full h-48 object-cover mb-3 rounded-md"
        />
      )}
      {property.title && (
        <h2 className="text-lg font-semibold mb-1">{property.title}</h2>
      )}
      {property.location && (
        <p className="text-sm text-gray-600 mb-1">{property.location}</p>
      )}
      {typeof property.price !== "undefined" && (
        <p className="text-base font-bold">${property.price}</p>
      )}
    </div>
  );
}

