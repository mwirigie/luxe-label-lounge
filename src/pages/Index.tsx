import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Collections from "@/components/Collections";
import ProductGrid from "@/components/ProductGrid";
import ProductFilters from "@/components/ProductFilters";
import ProductModal from "@/components/ProductModal";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { products, Product, filterProducts, sortProducts } from "@/data/products";

const Index = () => {
  // State management
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  // Modal and drawer states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("bella-boutique-cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("bella-boutique-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Filter and sort products whenever filters change
  useEffect(() => {
    let filtered = filterProducts(products, selectedCategory, priceRange, searchTerm);
    filtered = sortProducts(filtered, sortBy);
    setFilteredProducts(filtered);
  }, [selectedCategory, priceRange, searchTerm, sortBy]);

  // Event handlers
  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleClearFilters = () => {
    setSelectedCategory("All");
    setPriceRange([0, 2000]);
    setSortBy("featured");
    setSearchTerm("");
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        cartItemCount={cartItemCount}
        onCartOpen={() => setIsCartOpen(true)}
        onSearch={handleSearch}
      />

      {/* Hero Section */}
      <Hero />

      {/* Collections */}
      <Collections onCategoryFilter={handleCategoryFilter} />

      {/* Shop Section */}
      <section id="shop" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-4">
              Shop Our Collection
            </h2>
            <p className="text-xl text-muted-foreground">
              Discover {filteredProducts.length} beautiful items curated just for you
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <ProductFilters
                selectedCategory={selectedCategory}
                priceRange={priceRange}
                sortBy={sortBy}
                onCategoryChange={handleCategoryFilter}
                onPriceRangeChange={handlePriceRangeChange}
                onSortChange={handleSortChange}
                onClearFilters={handleClearFilters}
              />
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <ProductGrid
                products={filteredProducts}
                onProductClick={handleProductClick}
                onAddToCart={(product) => handleAddToCart(product, 1)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Footer */}
      <Footer />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
};

export default Index;
