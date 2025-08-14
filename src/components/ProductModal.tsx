import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart, Minus, Plus } from "lucide-react";
import { Product, formatPrice } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductModal = ({ product, isOpen, onClose, onAddToCart }: ProductModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { toast } = useToast();

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    toast({
      title: "Added to cart!",
      description: `${quantity}x ${product.name} added to your cart.`,
      duration: 3000,
    });
    onClose();
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
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

  const getColorStyle = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'blush pink': '#f8bbd9',
      'black': '#000000',
      'brown': '#8b4513',
      'gold': '#ffd700',
      'rose': '#ff69b4',
      'white': '#ffffff',
      'cream': '#f5f5dc',
      'navy': '#000080',
      'silver': '#c0c0c0',
      'taupe': '#483c32',
      'cognac': '#9f4a09',
      'sage': '#9caf88',
      'ivory': '#fffff0',
      'rose gold': '#e8b4a0'
    };
    
    return colorMap[color.toLowerCase()] || '#e5e5e5';
  };

  // Initialize selections
  if (selectedColor === "" && product.colors && product.colors.length > 0) {
    setSelectedColor(product.colors[0]);
  }
  if (selectedSize === "" && product.sizes && product.sizes.length > 0) {
    setSelectedSize(product.sizes[0]);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <DialogTitle className="sr-only">Product Details</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-[4/5] object-cover rounded-lg"
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

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="sm"
              className={`absolute top-4 right-4 rounded-full w-10 h-10 p-0 ${
                isWishlisted ? 'text-red-500' : 'text-muted-foreground'
              }`}
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </Button>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="text-sm text-muted-foreground mb-2">
                {product.category}
              </div>
              <h1 className="text-3xl font-bold font-heading mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-2 mb-4">
                {renderStars(product.rating)}
                <span className="text-sm text-muted-foreground">
                  ({product.rating}) • 124 reviews
                </span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-bold text-foreground">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.onSale && product.originalPrice && (
                  <Badge variant="destructive" className="text-xs">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                )}
              </div>
            </div>

            <div>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-medium mb-3">Color: {selectedColor}</h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                        selectedColor === color
                          ? 'border-primary shadow-[--shadow-medium]'
                          : 'border-border hover:border-primary/50'
                      }`}
                      style={{ backgroundColor: getColorStyle(color) }}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-medium mb-3">Size: {selectedSize}</h3>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                      className={selectedSize === size ? "bg-primary text-primary-foreground" : ""}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-medium mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-10 h-10 p-0"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="font-medium text-lg w-12 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-10 h-10 p-0"
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-3 pt-4">
              <Button
                className="w-full btn-primary text-lg py-3"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - {formatPrice(product.price * quantity)}
              </Button>
              
              <div className="text-sm text-muted-foreground text-center">
                ✓ Free shipping on orders over KSH 1,000
                <br />
                ✓ 30-day return policy
              </div>
            </div>

            {/* Product Tags */}
            <div>
              <h3 className="font-medium mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;