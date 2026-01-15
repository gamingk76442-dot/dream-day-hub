import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Search, 
  Package, 
  Clock, 
  Check, 
  RefreshCw, 
  Truck, 
  PackageCheck, 
  X,
  Mail,
  Loader2
} from "lucide-react";

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
}

interface Order {
  id: string;
  status: string;
  total_amount: number;
  created_at: string;
  customer_name: string;
  notes: string | null;
}

const TrackOrder = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderItems, setOrderItems] = useState<Record<string, OrderItem[]>>({});
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      // Fetch orders by email
      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .eq("customer_email", email.trim().toLowerCase())
        .order("created_at", { ascending: false });

      if (ordersError) throw ordersError;

      setOrders(ordersData || []);

      // Fetch order items for each order
      if (ordersData && ordersData.length > 0) {
        const orderIds = ordersData.map(o => o.id);
        const { data: itemsData, error: itemsError } = await supabase
          .from("order_items")
          .select("*")
          .in("order_id", orderIds);

        if (itemsError) throw itemsError;

        // Group items by order_id
        const itemsByOrder: Record<string, OrderItem[]> = {};
        (itemsData || []).forEach(item => {
          if (!itemsByOrder[item.order_id]) {
            itemsByOrder[item.order_id] = [];
          }
          itemsByOrder[item.order_id].push(item);
        });
        setOrderItems(itemsByOrder);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return { 
          icon: Clock, 
          label: "Pending", 
          color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
          step: 1
        };
      case "confirmed":
        return { 
          icon: Check, 
          label: "Confirmed", 
          color: "bg-green-500/10 text-green-600 border-green-500/20",
          step: 2
        };
      case "processing":
        return { 
          icon: RefreshCw, 
          label: "Processing", 
          color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
          step: 3
        };
      case "shipped":
        return { 
          icon: Truck, 
          label: "Shipped", 
          color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
          step: 4
        };
      case "completed":
        return { 
          icon: PackageCheck, 
          label: "Completed", 
          color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
          step: 5
        };
      case "cancelled":
        return { 
          icon: X, 
          label: "Cancelled", 
          color: "bg-red-500/10 text-red-600 border-red-500/20",
          step: 0
        };
      default:
        return { 
          icon: Package, 
          label: status, 
          color: "bg-muted text-muted-foreground",
          step: 0
        };
    }
  };

  const statusSteps = [
    { status: "pending", label: "Pending" },
    { status: "confirmed", label: "Confirmed" },
    { status: "processing", label: "Processing" },
    { status: "shipped", label: "Shipped" },
    { status: "completed", label: "Completed" },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Package className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
                Track Your Order
              </h1>
              <p className="text-muted-foreground text-lg">
                Enter your email address to view your order status
              </p>
            </div>

            {/* Search Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border mb-8"
            >
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="email" className="sr-only">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>
                <Button type="submit" disabled={loading} className="h-12 px-8">
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Track Orders
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Results */}
            {searched && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {orders.length === 0 ? (
                  <div className="bg-card rounded-2xl p-8 shadow-card border border-border text-center">
                    <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                      No Orders Found
                    </h3>
                    <p className="text-muted-foreground">
                      We couldn't find any orders associated with this email address.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <h2 className="font-serif text-xl font-semibold text-foreground">
                      Found {orders.length} order{orders.length !== 1 ? "s" : ""}
                    </h2>

                    {orders.map((order, index) => {
                      const statusInfo = getStatusInfo(order.status);
                      const StatusIcon = statusInfo.icon;
                      const items = orderItems[order.id] || [];

                      return (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="bg-card rounded-2xl shadow-card border border-border overflow-hidden"
                        >
                          {/* Order Header */}
                          <div className="p-6 border-b border-border">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                                <p className="font-mono font-semibold text-foreground">
                                  #{order.id.slice(0, 8).toUpperCase()}
                                </p>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Placed on {new Date(order.created_at).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </div>
                              <Badge className={statusInfo.color}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {statusInfo.label}
                              </Badge>
                            </div>
                          </div>

                          {/* Progress Tracker */}
                          {order.status !== "cancelled" && (
                            <div className="p-6 border-b border-border bg-muted/30">
                              <div className="flex items-center justify-between relative">
                                {/* Progress Line */}
                                <div className="absolute top-4 left-0 right-0 h-0.5 bg-border" />
                                <div 
                                  className="absolute top-4 left-0 h-0.5 bg-primary transition-all duration-500"
                                  style={{ 
                                    width: `${((statusInfo.step - 1) / (statusSteps.length - 1)) * 100}%` 
                                  }}
                                />

                                {statusSteps.map((step, stepIndex) => {
                                  const isActive = statusInfo.step >= stepIndex + 1;
                                  const isCurrent = statusInfo.step === stepIndex + 1;

                                  return (
                                    <div key={step.status} className="relative flex flex-col items-center z-10">
                                      <div 
                                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                          isActive 
                                            ? "bg-primary text-primary-foreground" 
                                            : "bg-muted border-2 border-border text-muted-foreground"
                                        } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
                                      >
                                        {isActive ? (
                                          <Check className="w-4 h-4" />
                                        ) : (
                                          <span className="text-xs">{stepIndex + 1}</span>
                                        )}
                                      </div>
                                      <span className={`mt-2 text-xs font-medium hidden sm:block ${
                                        isActive ? "text-primary" : "text-muted-foreground"
                                      }`}>
                                        {step.label}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Order Items */}
                          <div className="p-6">
                            <h4 className="font-medium text-foreground mb-4">Order Items</h4>
                            <div className="space-y-3">
                              {items.map((item) => (
                                <div 
                                  key={item.id}
                                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                                >
                                  <div>
                                    <p className="font-medium text-foreground">{item.product_name}</p>
                                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                  </div>
                                  <p className="font-semibold text-foreground">
                                    ${(item.unit_price * item.quantity).toFixed(2)}
                                  </p>
                                </div>
                              ))}
                            </div>

                            <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                              <span className="font-medium text-foreground">Total</span>
                              <span className="text-xl font-bold text-primary">
                                ${order.total_amount.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrackOrder;
