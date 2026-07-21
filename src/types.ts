export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  segment: string;
  monthlyRevenue: string;
}

export interface TestimonialVideo {
  id: string;
  title: string;
  clientName: string;
  restaurantType: string;
  location: string;
  metric: string;
  videoUrl?: string;
  thumbnail: string;
  quote: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
