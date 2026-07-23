import { Helmet } from "react-helmet-async";
import { siteConfig } from "../config/site.config";

function HotelSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: siteConfig.branding.hotelName,
    description: siteConfig.branding.tagline,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
    },
    priceRange: "$$$",
    starRating: {
      "@type": "Rating",
      ratingValue: "5",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

export default HotelSchema;
