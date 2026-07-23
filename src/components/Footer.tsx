import { Link } from "react-router-dom";
import { AtSign, Globe, Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "../config/site.config";

function Footer() {
  return (
    <footer className="bg-primary text-surface pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-heading text-2xl mb-3">{siteConfig.branding.hotelName}</h3>
          <p className="font-body text-sm text-surface/70">{siteConfig.branding.tagline}</p>
          <div className="flex gap-4 mt-5">
            <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><AtSign size={20} /></a>
            <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Globe size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="font-heading text-lg mb-4">Explore</h4>
          <ul className="space-y-2 font-body text-sm text-surface/70">
            <li><Link to="/rooms" className="hover:text-accent">Rooms & Suites</Link></li>
            <li><Link to="/dining" className="hover:text-accent">Dining</Link></li>
            <li><Link to="/spa" className="hover:text-accent">Spa</Link></li>
            <li><Link to="/gym" className="hover:text-accent">Gym</Link></li>
            <li><Link to="/pool" className="hover:text-accent">Swimming Pool</Link></li>
            <li><Link to="/events" className="hover:text-accent">Meetings & Events</Link></li>
            <li><Link to="/wedding" className="hover:text-accent">Wedding Venue</Link></li>
            <li><Link to="/gallery" className="hover:text-accent">Gallery</Link></li>
            <li><Link to="/offers" className="hover:text-accent">Offers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-lg mb-4">Company</h4>
          <ul className="space-y-2 font-body text-sm text-surface/70">
            <li><Link to="/about" className="hover:text-accent">About Us</Link></li>
            <li><Link to="/blog" className="hover:text-accent">Blog</Link></li>
            <li><Link to="/faq" className="hover:text-accent">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-lg mb-4">Contact</h4>
          <ul className="space-y-3 font-body text-sm text-surface/70">
            <li className="flex items-center gap-2"><Phone size={16} /> {siteConfig.contact.phone}</li>
            <li className="flex items-center gap-2"><Mail size={16} /> {siteConfig.contact.email}</li>
            <li className="flex items-center gap-2"><MapPin size={16} /> {siteConfig.contact.address}</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-surface/10 mt-12 pt-6 text-center font-body text-xs text-surface/50">
        © {new Date().getFullYear()} {siteConfig.branding.hotelName}. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
