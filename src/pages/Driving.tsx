import { motion } from "framer-motion";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Car, Clock, Shield, Star, MapPin, Users, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const vehicleTypes = [
  { name: "Sedan", capacity: "4 passengers", price: "$50/hr", image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=300&h=200&fit=crop" },
  { name: "SUV", capacity: "7 passengers", price: "$75/hr", image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=300&h=200&fit=crop" },
  { name: "Luxury", capacity: "4 passengers", price: "$120/hr", image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=300&h=200&fit=crop" },
  { name: "Limousine", capacity: "10 passengers", price: "$200/hr", image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=300&h=200&fit=crop" },
];

const features = [
  { icon: Shield, title: "Licensed & Insured", desc: "All drivers are fully vetted" },
  { icon: Clock, title: "On-Time Guarantee", desc: "Punctuality is our priority" },
  { icon: Star, title: "5-Star Service", desc: "Premium customer experience" },
  { icon: MapPin, title: "City-Wide Coverage", desc: "Serving all areas" },
];

const Driving = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    vehicle: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Booking request submitted! We'll contact you shortly.");
    setFormData({ name: "", phone: "", pickup: "", dropoff: "", date: "", time: "", vehicle: "", notes: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="bg-secondary text-secondary-foreground py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <Car className="w-5 h-5 text-primary" />
                <span className="text-primary font-medium">Premium Transport</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                Professional Driving Services
              </h1>
              <p className="text-secondary-foreground/80 text-lg mb-8">
                Experience luxury transportation for weddings, corporate events, airport transfers, and special occasions.
              </p>
              <div className="flex flex-wrap gap-6">
                {features.map((f) => (
                  <div key={f.title} className="flex items-center gap-2">
                    <f.icon className="w-5 h-5 text-primary" />
                    <span className="text-sm">{f.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Vehicle Types */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-12">
              Our Fleet
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {vehicleTypes.map((vehicle, index) => (
                <motion.div
                  key={vehicle.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-card border border-border hover:shadow-lg transition-shadow"
                >
                  <img src={vehicle.image} alt={vehicle.name} className="w-full h-40 object-cover" />
                  <div className="p-5">
                    <h3 className="font-serif text-xl font-semibold mb-2">{vehicle.name}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                      <Users className="w-4 h-4" />
                      {vehicle.capacity}
                    </div>
                    <div className="text-xl font-bold text-primary">{vehicle.price}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
                  Book Your Ride
                </h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onSubmit={handleSubmit}
                className="bg-card rounded-2xl p-8 shadow-card border border-border"
              >
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
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pickup">Pickup Location</Label>
                    <Input
                      id="pickup"
                      value={formData.pickup}
                      onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dropoff">Drop-off Location</Label>
                    <Input
                      id="dropoff"
                      value={formData.dropoff}
                      onChange={(e) => setFormData({ ...formData, dropoff: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="vehicle">Preferred Vehicle</Label>
                    <select
                      id="vehicle"
                      value={formData.vehicle}
                      onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                      className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm"
                      required
                    >
                      <option value="">Select a vehicle</option>
                      {vehicleTypes.map((v) => (
                        <option key={v.name} value={v.name}>{v.name} - {v.price}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Any special requirements..."
                      rows={3}
                    />
                  </div>
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full mt-6">
                  Submit Booking Request
                </Button>
              </motion.form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Driving;
