import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { Product, formatPrice } from "@/data/products";

export interface CartItem extends Product {
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

const CartDrawer = ({
  isOpen,
  onOpenChange,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 1000 ? 0 : 200; // Free shipping over KSH 1000
  const total = subtotal + shipping;

  const handleQuantityChange = (productId: string, change: number) => {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
      const newQuantity = Math.max(0, item.quantity + change);
      if (newQuantity === 0) {
        onRemoveItem(productId);
      } else {
        onUpdateQuantity(productId, newQuantity);
      }
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg custom-scrollbar">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 font-heading">
            <ShoppingBag className="w-5 h-5" />
            Shopping Cart ({cartItems.length})
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full mt-6">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                Your cart is empty
              </h3>
              <p className="text-muted-foreground mb-6">
                Add some beautiful items to get started
              </p>
              <Button onClick={() => onOpenChange(false)} className="btn-primary">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-muted/20 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 object-cover rounded-md"
                    />
                    
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{item.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.category}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0"
                            onClick={() => handleQuantityChange(item.id, -1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          
                          <span className="font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0"
                            onClick={() => handleQuantityChange(item.id, 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                      {item.originalPrice && (
                        <div className="text-sm text-muted-foreground line-through">
                          {formatPrice(item.originalPrice * item.quantity)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="border-t border-border pt-4 mt-4">
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <Badge variant="secondary" className="text-xs">Free</Badge>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {subtotal < 1000 && (
                  <div className="text-sm text-muted-foreground mb-4 text-center">
                    Add {formatPrice(1000 - subtotal)} more for free shipping!
                  </div>
                )}

                <div className="space-y-3">
                  <Button className="w-full btn-primary text-lg py-3">
                    Proceed to Checkout
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={onClearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;