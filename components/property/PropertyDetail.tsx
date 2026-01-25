import ReviewSection from "./ReviewSection";

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
        <div className="p-4 max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
                <div className="flex justify-between items-center text-gray-600 mb-4">
                    <p>{property.location}</p>
                    <p className="text-xl font-bold text-black">${property.price}</p>
                </div>
                {property.imageUrl && (
                    <img
                        src={property.imageUrl}
                        alt={property.title || "Property Image"}
                        className="w-full h-80 object-cover rounded-lg mb-4"
                    />
                )}
                <p className="text-lg leading-relaxed">{property.description}</p>
            </div>

            <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">Reviews</h2>
                <ReviewSection propertyId={property.id} />
            </div>
        </div>
    );
}
