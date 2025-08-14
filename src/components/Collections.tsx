import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CollectionsProps {
  onCategoryFilter: (category: string) => void;
}

const Collections = ({ onCategoryFilter }: CollectionsProps) => {
  const collections = [
    {
      name: "Luxury Bags",
      description: "Handcrafted leather bags for every occasion",
      category: "Bags",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop",
      gradient: "from-rose-100 to-pink-50"
    },
    {
      name: "Elegant Dresses",
      description: "Timeless dresses that make a statement",
      category: "Dresses", 
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop",
      gradient: "from-purple-100 to-pink-50"
    },
    {
      name: "Fine Accessories",
      description: "Delicate jewelry and accessories to complete your look",
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop",
      gradient: "from-amber-100 to-orange-50"
    }
  ];

  const handleShopCollection = (category: string) => {
    onCategoryFilter(category);
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="collections" className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-4">
            Our Collections
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated collections designed to elevate your wardrobe with timeless elegance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {collections.map((collection, index) => (
            <Card 
              key={collection.name} 
              className={`product-card group overflow-hidden bg-gradient-to-br ${collection.gradient} border-0 animate-in fade-in duration-700`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>
                </div>
                
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold font-heading text-foreground mb-3">
                    {collection.name}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {collection.description}
                  </p>
                  <Button 
                    className="btn-secondary w-full"
                    onClick={() => handleShopCollection(collection.category)}
                  >
                    Shop {collection.name}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;