import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-[70vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold font-heading text-foreground mb-6 animate-in fade-in duration-1000">
          Discover Your
          <span className="block text-primary">Perfect Style</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-in fade-in duration-1000 delay-300">
          Curated collection of elegant women's fashion, luxury handbags, and timeless accessories for the modern woman.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in duration-1000 delay-500">
          <Button 
            size="lg" 
            className="btn-primary text-lg px-8 py-4"
            onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Shop New Arrivals
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() => document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Collections
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto animate-in fade-in duration-1000 delay-700">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary">100+</div>
            <div className="text-sm text-muted-foreground">Curated Items</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary">5★</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;