import SectionPreviewCard from "./SectionPreviewCard";

function Previews() {
  return (
    <section className="max-w-7xl mx-auto px-6">
      <SectionPreviewCard
        image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200"
        label="Dining"
        title="Culinary Excellence"
        description="Savor exquisite dishes crafted by award-winning chefs, paired with an extensive wine selection in an ambience of refined elegance."
        linkTo="/dining"
      />
      <SectionPreviewCard
        image="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200"
        label="Wellness"
        title="Spa & Relaxation"
        description="Escape into tranquility with signature treatments, therapeutic massages, and serene spaces designed for total rejuvenation."
        linkTo="/spa"
        reverse
      />
      <SectionPreviewCard
        image="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200"
        label="Events"
        title="Meetings & Celebrations"
        description="From corporate conferences to unforgettable weddings, our event spaces and dedicated planners bring every occasion to life."
        linkTo="/events"
      />
    </section>
  );
}

export default Previews;
