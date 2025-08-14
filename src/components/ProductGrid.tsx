import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import { Product, formatPrice } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ProductGrid = ({ products, onProductClick, onAddToCart }: ProductGridProps) => {
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-semibold text-muted-foreground mb-2">
          No products found
        </h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or search terms
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <Card
          key={product.id}
          className="product-card cursor-pointer animate-in fade-in duration-500"
          style={{ animationDelay: `${index * 100}ms` }}
          onClick={() => onProductClick(product)}
        >
          <CardContent className="p-0">
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <Badge className="bg-primary text-primary-foreground">
                    New
                  </Badge>
                )}
                {product.onSale && (
                  <Badge className="bg-destructive text-destructive-foreground">
                    Sale
                  </Badge>
                )}
              </div>

              {/* Quick Add to Cart */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  size="sm"
                  className="rounded-full w-10 h-10 p-0 btn-primary"
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  <ShoppingCart className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="p-6">
              <div className="text-sm text-muted-foreground mb-2">
                {product.category}
              </div>
              
              <h3 className="font-semibold text-lg mb-2 font-heading">
                {product.name}
              </h3>

              <div className="flex items-center gap-1 mb-3">
                {renderStars(product.rating)}
                <span className="text-sm text-muted-foreground ml-2">
                  ({product.rating})
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-foreground">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Color Options Preview */}
              {product.colors && product.colors.length > 0 && (
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-sm text-muted-foreground">Colors:</span>
                  <div className="flex gap-1">
                    {product.colors.slice(0, 3).map((color, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 rounded-full border border-border"
                        style={{
                          backgroundColor: color.toLowerCase().includes('pink') ? '#f8bbd9' :
                                         color.toLowerCase().includes('black') ? '#000000' :
                                         color.toLowerCase().includes('brown') ? '#8b4513' :
                                         color.toLowerCase().includes('gold') ? '#ffd700' :
                                         color.toLowerCase().includes('rose') ? '#ff69b4' :
                                         color.toLowerCase().includes('white') ? '#ffffff' :
                                         color.toLowerCase().includes('cream') ? '#f5f5dc' :
                                         color.toLowerCase().includes('navy') ? '#000080' :
                                         '#e5e5e5'
                        }}
                      />
                    ))}
                    {product.colors.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{product.colors.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductGrid;