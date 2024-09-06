import { ShoppingBag, Zap, Truck, Headphones, Shield } from "lucide-react";

export const ABOUT_PAGE_CONTENT = {
  title: "About MyShop",
  description:
    "Welcome to MyShop, your one-stop destination for all your shopping needs. We're passionate about providing high-quality products and exceptional customer service.",
  infoCards: [
    {
      title: "Our Mission",
      description:
        "To provide our customers with a seamless shopping experience, offering a wide range of products at competitive prices while maintaining the highest standards of quality and service.",
    },
    {
      title: "Our Vision",
      description:
        "To become the leading e-commerce platform, recognized for our innovation, reliability, and customer-centric approach in the global marketplace.",
    },
  ],
  featuresTitle: "Why Choose Us?",
  features: [
    { icon: ShoppingBag, text: "Wide selection of high-quality products" },
    { icon: Zap, text: "Competitive prices and regular discounts" },
    { icon: Truck, text: "Fast and reliable shipping worldwide" },
    { icon: Headphones, text: "Excellent customer support" },
    { icon: Shield, text: "Secure and easy-to-use platform" },
  ],
  ctaButtons: [
    { text: "Explore Our Products", path: "/products", variant: "default" },
  ],
};
