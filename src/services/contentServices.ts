import { createAdminService } from "./adminServiceFactory";
import type { GalleryItem, Offer, Testimonial, BlogPost } from "../types/content.types";

export const galleryService = createAdminService<GalleryItem>("/gallery");
export const offerService = createAdminService<Offer>("/offers");
export const testimonialService = createAdminService<Testimonial>("/testimonials");
export const blogService = createAdminService<BlogPost>("/blog");
