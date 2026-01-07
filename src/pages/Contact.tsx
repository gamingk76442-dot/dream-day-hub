import { motion } from "framer-motion";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
  { icon: Mail, label: "Email", value: "hello@elegancehub.com" },
  { icon: MapPin, label: "Address", value: "123 Elegance Street, City Center" },
  { icon: Clock, label: "Hours", value: "Mon-Sat: 9AM-6PM" },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="bg-gradient-hero py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                Get in Touch
              </h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Have questions or ready to book? We'd love to hear from you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                Contact Information
              </h2>
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                    <div className="font-medium text-foreground">{item.value}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <form
                onSubmit={handleSubmit}
                className="bg-card rounded-2xl p-8 shadow-card border border-border"
              >
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                  Send us a Message
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service">Service Interested In</Label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm"
                    >
                      <option value="">Select a service</option>
                      <option value="wedding">Wedding Supplies</option>
                      <option value="driving">Driving Services</option>
                      <option value="photography">Photography</option>
                      <option value="catering">Catering</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your event or inquiry..."
                      rows={5}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full mt-6 gap-2">
                  <Send className="w-4 h-4" />
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
