// Product Data for Women's Fashion Boutique
import bag1 from "@/assets/bag-1.jpg";
import bag2 from "@/assets/bag-2.jpg";
import bag3 from "@/assets/bag-3.jpg";
import dress1 from "@/assets/dress-1.jpg";
import dress2 from "@/assets/dress-2.jpg";
import accessory1 from "@/assets/accessory-1.jpg";

export interface Product {
  id: string;
  name: string;
  category: 'Bags' | 'Dresses' | 'Accessories';
  price: number;
  originalPrice?: number;
  rating: number;
  tags: string[];
  image: string;
  description: string;
  isNew: boolean;
  onSale: boolean;
  colors?: string[];
  sizes?: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Blush Leather Handbag",
    category: "Bags",
    price: 1250,
    originalPrice: 1500,
    rating: 4.8,
    tags: ["leather", "pink", "handbag", "luxury", "everyday"],
    image: bag1,
    description: "Sophisticated blush pink leather handbag crafted from premium Italian leather. Perfect for everyday elegance with spacious interior and gold hardware details.",
    isNew: true,
    onSale: true,
    colors: ["Blush Pink", "Cream", "Taupe"],
    sizes: ["Medium", "Large"]
  },
  {
    id: "2",
    name: "Midnight Evening Clutch",
    category: "Bags",
    price: 850,
    rating: 4.9,
    tags: ["clutch", "evening", "black", "formal", "gold"],
    image: bag2,
    description: "Elegant black evening clutch with luxurious gold hardware. Perfect for special occasions and formal events.",
    isNew: false,
    onSale: false,
    colors: ["Black", "Navy", "Silver"],
    sizes: ["One Size"]
  },
  {
    id: "3",
    name: "Classic Tote Bag",
    category: "Bags",
    price: 1450,
    rating: 4.7,
    tags: ["tote", "brown", "leather", "work", "spacious"],
    image: bag3,
    description: "Timeless brown leather tote bag perfect for work and travel. Spacious interior with multiple compartments for organization.",
    isNew: false,
    onSale: false,
    colors: ["Brown", "Black", "Cognac"],
    sizes: ["Large"]
  },
  {
    id: "4",
    name: "Rose Midi Dress",
    category: "Dresses",
    price: 950,
    originalPrice: 1200,
    rating: 4.6,
    tags: ["midi", "rose", "dress", "flowing", "romantic"],
    image: dress1,
    description: "Beautiful flowing midi dress in soft rose. Perfect for brunch dates, garden parties, and romantic occasions.",
    isNew: true,
    onSale: true,
    colors: ["Rose", "Sage", "Ivory"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: "5",
    name: "Little Black Dress",
    category: "Dresses",
    price: 1150,
    rating: 4.9,
    tags: ["cocktail", "black", "dress", "classic", "evening"],
    image: dress2,
    description: "The perfect little black dress for any occasion. Sleek silhouette that flatters every figure with timeless elegance.",
    isNew: false,
    onSale: false,
    colors: ["Black", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: "6",
    name: "Delicate Gold Necklace",
    category: "Accessories",
    price: 450,
    originalPrice: 550,
    rating: 4.8,
    tags: ["necklace", "gold", "delicate", "jewelry", "pendant"],
    image: accessory1,
    description: "Elegant gold necklace with delicate chain and beautiful pendant. Perfect for layering or wearing alone.",
    isNew: true,
    onSale: true,
    colors: ["Gold", "Silver", "Rose Gold"],
    sizes: ["16 inch", "18 inch", "20 inch"]
  }
];

// Helper function to format price in KSH
export const formatPrice = (price: number): string => {
  return `KSH ${price.toLocaleString()}`;
};

// Filter and sort functions
export const filterProducts = (
  products: Product[],
  category?: string,
  priceRange?: [number, number],
  searchTerm?: string
): Product[] => {
  return products.filter(product => {
    const matchesCategory = !category || category === 'All' || product.category === category;
    const matchesPrice = !priceRange || (product.price >= priceRange[0] && product.price <= priceRange[1]);
    const matchesSearch = !searchTerm || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesPrice && matchesSearch;
  });
};

export const sortProducts = (products: Product[], sortBy: string): Product[] => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'newest':
      return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
};