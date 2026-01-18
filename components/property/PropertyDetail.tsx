type Property = {
  id: string | number;
  title?: string;
  location?: string;
  price?: number;
  imageUrl?: string;
  description?: string;
  [key: string]: unknown;
};

type PropertyDetailProps = {
  property: Property;
};

export default function PropertyDetail({ property }: PropertyDetailProps) {
  return (
    <div className="max-w-3xl mx-auto p-4">
      {property.imageUrl && (
        <img
          src={property.imageUrl}
          alt={property.title || "Property image"}
          className="w-full h-80 object-cover mb-4 rounded-md"
        />
      )}
      {property.title && (
        <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
      )}
      {property.location && (
        <p className="text-sm text-gray-600 mb-2">{property.location}</p>
      )}
      {typeof property.price !== "undefined" && (
        <p className="text-lg font-semibold mb-4">${property.price}</p>
      )}
      {property.description && (
        <p className="text-base leading-relaxed">{property.description}</p>
      )}
    </div>
  );
}
