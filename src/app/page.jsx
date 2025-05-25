
/**
 * @file HomePage.jsx
 * @description The main landing page for the FairBid application.
 * Displays a hero section, feature highlights, featured auctions, user testimonials, and a call-to-action.
 */
import HeroSection from '@/components/home/hero-section';
import FeatureCard from '@/components/home/feature-card';
import AuctionHighlights from '@/components/home/auction-highlights';
import TestimonialCard from '@/components/home/testimonial-card';
import CTASection from '@/components/home/cta-section';
import { mockAuctions, mockTestimonials } from '@/lib/data';
import { ShieldCheck, Zap, TrendingUp } from 'lucide-react';

/**
 * Array of features to be displayed on the home page.
 * Each feature object contains an icon, title, and description.
 * @type {Array<object>}
 */
const features = [
  {
    icon: ShieldCheck,
    title: 'Secure Bidding',
    description: 'End-to-end encryption and robust verification for every bid.',
  },
  {
    icon: Zap,
    title: 'Real-time Updates',
    description: 'Instant notifications and live bidding updates.',
  },
  {
    icon: TrendingUp,
    title: 'Fraud Prevention',
    description: 'AI-powered monitoring and verification systems to ensure fair auctions.',
  },
];

/**
 * HomePage component.
 * Renders the main landing page structure and its sections.
 * @returns {JSX.Element} The rendered home page.
 */
export default function HomePage() {
  return (
    <div className="space-y-12 md:space-y-20">
      {/* Hero section to grab user attention */}
      <HeroSection />

      {/* Section displaying key features of the platform */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>

      {/* Section highlighting featured auctions, using mock data for now */}
      <AuctionHighlights auctions={mockAuctions} />
      
      {/* Section for user testimonials */}
      <section className="py-12 md:py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to action section encouraging user registration */}
      <CTASection />
    </div>
  );
}
