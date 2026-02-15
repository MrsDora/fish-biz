import { Fish, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-ocean-dark text-primary-foreground">
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Fish className="h-6 w-6" />
            <span className="font-display text-lg font-bold">OceanCatch</span>
          </div>
          <p className="text-primary-foreground/70 text-sm leading-relaxed">
            Premium quality fish and seafood, delivered fresh to your door. Serving households,
            restaurants, and bulk buyers since 2010.
          </p>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            <Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">Home</Link>
            <Link to="/products" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">Products</Link>
            <Link to="/order" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">Place Order</Link>
            <Link to="/contact" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">Contact</Link>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Contact Us</h4>
          <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" />
              <span>orders@oceancatch.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>123 Harbor Drive, Fisherman's Wharf</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-primary-foreground/10 pt-6 text-center text-xs text-primary-foreground/50">
        © {new Date().getFullYear()} OceanCatch Fish Market. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
