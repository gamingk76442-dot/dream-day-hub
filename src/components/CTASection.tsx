import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to Plan Your{" "}
            <span className="text-gradient-rose">Perfect Event?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Get in touch with our team to discuss your requirements and receive a personalized quote for your special occasion.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/contact">
              <Button variant="hero" size="xl" className="gap-2">
                Book a Consultation
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="heroOutline" size="xl" className="gap-2">
              <Phone className="w-5 h-5" />
              Call Us Now
            </Button>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <a
              href="tel:+15551234567"
              className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-card shadow-soft flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-xs text-muted-foreground">Call us at</div>
                <div className="font-semibold text-foreground">+1 (555) 123-4567</div>
              </div>
            </a>
            <a
              href="mailto:hello@elegancehub.com"
              className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-card shadow-soft flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-xs text-muted-foreground">Email us at</div>
                <div className="font-semibold text-foreground">hello@elegancehub.com</div>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
