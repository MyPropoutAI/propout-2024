import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TestimonialCard } from "./TestimonialCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const testimonials = [
  {
    id: 1,
    name: "Mr. Olusola Osinoiki Josh",
    handle: "@joshpub1",
    platform: "instagram",
    image: "/images/testimonials/2.jpg",
    testimonial:
      "I am enjoying this project for property research, but I think you guys should implement a geo location system so it could be easier to navigate, that would be the best features on Propout.",
  },
  {
    id: 2,
    name: "B.ancy",
    handle: "Wanjikusworld",
    platform: "instagram",
    image: "/images/testimonials/1.jpg",
    testimonial:
      "I have used other Real estate platforms before, but PropOut seems unique and transparent and easy to use.",
  },
  {
    id: 3,
    name: "Dr. Mrs. Omoya Comfort Adaji PhD.",
    handle: "@umaliadaji",
    platform: "instagram",
    image: "/images/testimonials/5.jpg",
    testimonial:
      "I had the opportunity to test PropOut very early, though the product is not complete yet, but the vision is valid.",
  },
  {
    id: 4,
    name: "Omidiji Miracle Solomon",
    handle: "OmidijiMiracle",
    platform: "twitter",
    image: "/images/testimonials/4.jpg",
    testimonial:
      "I still have that property we discussed, this house has been open for sale for 4 months now with no buyer, all I have to do is upload it to the website. I am sure PropOut would give it a wider outreach.",
  },
  {
    id: 5,
    name: "Okeke Chuba",
    handle: "@chu___ba",
    platform: "instagram",
    image: "/images/testimonials/3.jpg",
    testimonial:
      "Everything I took note from this physical network was that real estate practices is one of the most sustainable practices for financial return. Thank you propout team for teaching us how to build wealth through real estate.",
  },
  {
    id: 6,
    name: "Anonymous Okada rider",
    handle: "Anonymous",
    platform: "anonymous",
    image: "/placeholder.svg?height=100&width=100",
    testimonial:
      "Everyday, people search for properties to rent/buy. We, the bike men, get to interact with people on a daily basis, give me some of your properties, let me help sell/rent it out without stress.",
  },
  {
    id: 7,
    name: "Favor Charles",
    handle: "theglobalfave",
    platform: "instagram",
    image: "/images/testimonials/6.jpg",
    testimonial:
      "I love the site so much, but you guys should bring back the Web 3 features that allow wallet connectivity.",
  },
];

export function ResponsiveTestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 768) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4">
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          initial={false}
          animate={{ x: `${-currentIndex * (100 / visibleCount)}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`flex-shrink-0 w-full sm:w-full md:w-1/2 lg:w-1/3`}
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </motion.div>
      </div>
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevious}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
