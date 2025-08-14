import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      toast({
        title: "Welcome!",
        description: "Thank you for subscribing to our newsletter.",
        duration: 3000,
      });
      setEmail("");
    } else {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const currentYear = new Date().getFullYear();

  const socialIcons = [
    {
      name: "Instagram",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348s2.348 1.051 2.348 2.348S9.746 16.988 8.449 16.988zM12.017 7.746c-2.312 0-4.194 1.882-4.194 4.194s1.882 4.194 4.194 4.194s4.194-1.882 4.194-4.194S14.329 7.746 12.017 7.746z"/>
        </svg>
      )
    },
    {
      name: "Facebook",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: "Twitter",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    }
  ];

  const footerLinks = {
    "Shop": ["New Arrivals", "Bags", "Dresses", "Accessories", "Sale"],
    "Customer Service": ["Size Guide", "Shipping Info", "Returns", "Contact Us", "FAQ"],
    "About": ["Our Story", "Sustainability", "Careers", "Press", "Stores"]
  };

  return (
    <footer className="bg-gradient-hero border-t border-border">
      <div className="container mx-auto px-4 py-16">
        {/* Newsletter */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold font-heading mb-4">
            Stay in Style
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Subscribe to our newsletter for exclusive offers and the latest fashion updates.
          </p>
          
          <form onSubmit={handleNewsletterSubmit} className="flex max-w-md mx-auto gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-background"
              required
            />
            <Button type="submit" className="btn-primary">
              Subscribe
            </Button>
          </form>
        </div>

        <Separator className="mb-12" />

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-heading text-primary">
              Bella Boutique
            </h3>
            <p className="text-muted-foreground">
              Curating timeless elegance and contemporary style for the modern woman.
            </p>
            <div className="flex space-x-4">
              {socialIcons.map((social) => (
                <button
                  key={social.name}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold font-heading mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <div className="mb-4 md:mb-0">
            © {currentYear} Bella Boutique. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;