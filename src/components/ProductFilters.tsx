import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface ProductFiltersProps {
  selectedCategory: string;
  priceRange: [number, number];
  sortBy: string;
  onCategoryChange: (category: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
}

const ProductFilters = ({
  selectedCategory,
  priceRange,
  sortBy,
  onCategoryChange,
  onPriceRangeChange,
  onSortChange,
  onClearFilters
}: ProductFiltersProps) => {
  const categories = ['All', 'Bags', 'Dresses', 'Accessories'];
  const maxPrice = 2000;

  const formatPrice = (price: number) => `KSH ${price.toLocaleString()}`;

  const hasActiveFilters = selectedCategory !== 'All' || priceRange[0] > 0 || priceRange[1] < maxPrice;

  return (
    <Card className="gradient-card border-0 shadow-[--shadow-soft]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-heading">Filters</CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div className="space-y-3">
          <h4 className="font-medium font-heading">Category</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedCategory === category 
                    ? 'bg-primary text-primary-foreground shadow-[--shadow-soft]' 
                    : 'hover:bg-secondary/80'
                }`}
                onClick={() => onCategoryChange(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-4">
          <h4 className="font-medium font-heading">Price Range</h4>
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={(value) => onPriceRangeChange(value as [number, number])}
              max={maxPrice}
              min={0}
              step={50}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
          </div>
        </div>

        {/* Sort Options */}
        <div className="space-y-3">
          <h4 className="font-medium font-heading">Sort By</h4>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="name">Name: A to Z</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="space-y-3 pt-4 border-t border-border">
            <h4 className="font-medium font-heading text-sm">Active Filters</h4>
            <div className="flex flex-wrap gap-2">
              {selectedCategory !== 'All' && (
                <Badge variant="outline" className="text-xs">
                  Category: {selectedCategory}
                </Badge>
              )}
              {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                <Badge variant="outline" className="text-xs">
                  Price: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductFilters;