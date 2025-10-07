import { Link } from "react-router-dom";
import { Mountain, Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import AdminButton from './AdminButton';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-2 mb-4">
              <Mountain className="h-8 w-8 animate-float" />
              <span className="text-xl font-bold" data-no-translate>Sudbury Mining Co.</span>
            </div>
            <p className="text-primary-foreground/80 mb-4">
              Building Sudbury's future from the ground up. Leading the way in sustainable mining operations since 1995.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors hover-lift"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors hover-lift"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors hover-lift"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in-up animate-stagger-1">
            <h3 className="text-lg font-semibold mb-4 text-accent">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors hover-lift">Home</Link></li>
              <li><Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors hover-lift">About Us</Link></li>
              <li><Link to="/services" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors hover-lift">Services</Link></li>
              <li><Link to="/projects" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors hover-lift">Projects</Link></li>
              <li><Link to="/news" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors hover-lift">News</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="animate-fade-in-up animate-stagger-2">
            <h3 className="text-lg font-semibold mb-4 text-accent">Our Services</h3>
            <ul className="space-y-3">
              <li className="text-primary-foreground/80">Underground Mining</li>
              <li className="text-primary-foreground/80">Ore Processing</li>
              <li className="text-primary-foreground/80">Environmental Compliance</li>
              <li className="text-primary-foreground/80">Equipment Maintenance</li>
              <li className="text-primary-foreground/80">Safety Training</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in-up animate-stagger-3">
            <h3 className="text-lg font-semibold mb-4 text-accent">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-accent shrink-0" />
                <span className="text-primary-foreground/80" data-no-translate>
                  123 Mining Road, Sudbury, ON P3L 1K4
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <a href="tel:+17055551234" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors hover-lift" data-no-translate>
                  (705) 555-1234
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <a href="mailto:info@sudburymining.ca" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors hover-lift" data-no-translate>
                  info@sudburymining.ca
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Admin Button */}
        <div className="flex justify-center mt-8">
          <AdminButton />
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center animate-fade-in-up animate-stagger-4">
          <p className="text-primary-foreground/70 text-sm">
            &copy; {currentYear} <span data-no-translate>Sudbury Mining Co.</span> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
