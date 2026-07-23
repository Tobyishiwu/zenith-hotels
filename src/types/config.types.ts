export interface SiteConfig {
  checkInTime: string;
  checkOutTime: string;
  branding: {
    hotelName: string;
    tagline: string;
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
  };
  social: {
    instagram?: string;
    facebook?: string;
  };
}
