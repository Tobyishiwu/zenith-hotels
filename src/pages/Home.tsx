import Hero from "../components/Hero";
import BookingWidget from "../components/BookingWidget";
import FeaturedRooms from "../components/FeaturedRooms";
import Amenities from "../components/Amenities";
import LuxuryExperience from "../components/LuxuryExperience";
import Testimonials from "../components/Testimonials";
import Awards from "../components/Awards";
import Previews from "../components/Previews";
import GalleryPreview from "../components/GalleryPreview";
import NearbyAttractions from "../components/NearbyAttractions";
import BlogPreview from "../components/BlogPreview";
import Newsletter from "../components/Newsletter";
import ContactCTA from "../components/ContactCTA";
import HotelSchema from "../seo/HotelSchema";

function Home() {
  return (
    <div>
      <HotelSchema />
      <Hero />
      <BookingWidget />
      <FeaturedRooms />
      <Amenities />
      <LuxuryExperience />
      <Testimonials />
      <Awards />
      <Previews />
      <GalleryPreview />
      <NearbyAttractions />
      <BlogPreview />
      <Newsletter />
      <ContactCTA />
    </div>
  );
}

export default Home;
