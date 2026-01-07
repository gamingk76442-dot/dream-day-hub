import { Link } from "react-router-dom";
import { Heart, Car, Sparkles, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-gold flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-serif text-xl font-semibold">
                Elegance<span className="text-primary">Hub</span>
              </span>
            </div>
            <p className="text-secondary-foreground/80 text-sm leading-relaxed">
              Your one-stop destination for wedding supplies, professional driving services, and more. Making your special moments truly memorable.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/wedding" className="flex items-center gap-2 text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                  <Heart className="w-4 h-4" />
                  Wedding Supplies
                </Link>
              </li>
              <li>
                <Link to="/driving" className="flex items-center gap-2 text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                  <Car className="w-4 h-4" />
                  Driving Services
                </Link>
              </li>
              <li>
                <Link to="/services" className="flex items-center gap-2 text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                  <Sparkles className="w-4 h-4" />
                  Event Planning
                </Link>
              </li>
              <li>
                <Link to="/services" className="flex items-center gap-2 text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                  <Sparkles className="w-4 h-4" />
                  Decoration Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                  Admin Panel
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-secondary-foreground/80">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>123 Elegance Street, City Center, State 12345</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-secondary-foreground/80">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-secondary-foreground/80">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>hello@elegancehub.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 mt-12 pt-8 text-center">
          <p className="text-sm text-secondary-foreground/60">
            © {new Date().getFullYear()} EleganceHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
