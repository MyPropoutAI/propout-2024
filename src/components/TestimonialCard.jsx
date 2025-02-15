import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Instagram, Twitter, User } from "lucide-react";
import { motion } from "framer-motion";

export function TestimonialCard({ testimonial }) {
  const SocialIcon = {
    instagram: Instagram,
    twitter: Twitter,
    anonymous: User,
  }[testimonial.platform];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="w-full px-2"
    >
      <Card className="h-full">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar>
              <AvatarImage src={testimonial.image} alt={testimonial.name} />
              <AvatarFallback>
                {testimonial.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{testimonial.name}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <SocialIcon className="h-4 w-4 inline mr-1" />
                <span>{testimonial.handle}</span>
              </div>
            </div>
          </div>
          <p className="text-gray-600">{testimonial.testimonial}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
