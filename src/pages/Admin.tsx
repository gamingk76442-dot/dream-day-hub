import { motion } from "framer-motion";
import { useState } from "react";
import Header from "@/components/Header";
import { LayoutDashboard, Calendar, Package, Image, Settings, Check, Clock, X, Eye, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Tab = "bookings" | "products" | "images" | "settings";

const bookings = [
  { id: 1, customer: "Sarah Johnson", service: "Wedding Supplies", date: "2024-03-15", status: "confirmed", amount: "$450" },
  { id: 2, customer: "Michael Chen", service: "Driving - Luxury", date: "2024-03-16", status: "pending", amount: "$240" },
  { id: 3, customer: "Emily Davis", service: "Photography", date: "2024-03-18", status: "confirmed", amount: "$800" },
  { id: 4, customer: "James Wilson", service: "Driving - Limousine", date: "2024-03-20", status: "cancelled", amount: "$400" },
  { id: 5, customer: "Lisa Anderson", service: "Catering", date: "2024-03-22", status: "pending", amount: "$1,200" },
];

const products = [
  { id: 1, name: "Elegant Bridal Bouquet", category: "Flowers", price: "$149.99", status: "active" },
  { id: 2, name: "Crystal Champagne Glasses", category: "Glassware", price: "$89.99", status: "active" },
  { id: 3, name: "Gold Invitation Suite", category: "Stationery", price: "$199.99", status: "active" },
  { id: 4, name: "Vintage Centerpiece", category: "Decor", price: "$79.99", status: "inactive" },
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState<Tab>("bookings");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20"><Check className="w-3 h-3 mr-1" />Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500/10 text-red-600 border-red-500/20"><X className="w-3 h-3 mr-1" />Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const tabs = [
    { id: "bookings" as Tab, label: "Bookings", icon: Calendar },
    { id: "products" as Tab, label: "Products", icon: Package },
    { id: "images" as Tab, label: "Images", icon: Image },
    { id: "settings" as Tab, label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <LayoutDashboard className="w-6 h-6 text-primary" />
              <h1 className="font-serif text-3xl font-bold text-foreground">
                Admin Dashboard
              </h1>
            </div>
            <p className="text-muted-foreground">
              Manage your bookings, products, and content.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-card rounded-2xl p-4 shadow-card border border-border">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-4"
            >
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
                {/* Bookings Tab */}
                {activeTab === "bookings" && (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-serif text-xl font-bold">Recent Bookings</h2>
                      <div className="flex gap-2">
                        <Badge variant="outline">{bookings.filter(b => b.status === "pending").length} Pending</Badge>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Service</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookings.map((booking) => (
                            <tr key={booking.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                              <td className="py-4 px-4 font-medium">{booking.customer}</td>
                              <td className="py-4 px-4 text-muted-foreground">{booking.service}</td>
                              <td className="py-4 px-4 text-muted-foreground">{booking.date}</td>
                              <td className="py-4 px-4 font-semibold text-primary">{booking.amount}</td>
                              <td className="py-4 px-4">{getStatusBadge(booking.status)}</td>
                              <td className="py-4 px-4">
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                                  <Button variant="ghost" size="sm"><Edit2 className="w-4 h-4" /></Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}

                {/* Products Tab */}
                {activeTab === "products" && (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-serif text-xl font-bold">Products</h2>
                      <Button variant="hero" size="sm">Add Product</Button>
                    </div>
                    <div className="grid gap-4">
                      {products.map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted/50">
                          <div>
                            <h3 className="font-medium">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">{product.category}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-semibold text-primary">{product.price}</span>
                            <Badge variant={product.status === "active" ? "default" : "secondary"}>
                              {product.status}
                            </Badge>
                            <Button variant="ghost" size="sm"><Edit2 className="w-4 h-4" /></Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Images Tab */}
                {activeTab === "images" && (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-serif text-xl font-bold">Image Gallery</h2>
                      <Button variant="hero" size="sm">Upload Image</Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="relative group rounded-xl overflow-hidden aspect-square bg-muted">
                          <img
                            src={`https://images.unsplash.com/photo-151974149767${i}-611481863552?w=200&h=200&fit=crop`}
                            alt={`Gallery ${i}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button variant="secondary" size="sm"><Eye className="w-4 h-4" /></Button>
                            <Button variant="secondary" size="sm"><Edit2 className="w-4 h-4" /></Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Settings Tab */}
                {activeTab === "settings" && (
                  <>
                    <h2 className="font-serif text-xl font-bold mb-6">Settings</h2>
                    <div className="space-y-6">
                      <div className="p-4 rounded-xl border border-border">
                        <h3 className="font-medium mb-2">Business Information</h3>
                        <p className="text-sm text-muted-foreground mb-4">Update your business details and contact information.</p>
                        <Button variant="outline">Edit Information</Button>
                      </div>
                      <div className="p-4 rounded-xl border border-border">
                        <h3 className="font-medium mb-2">Notification Preferences</h3>
                        <p className="text-sm text-muted-foreground mb-4">Manage how you receive booking notifications.</p>
                        <Button variant="outline">Configure</Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
