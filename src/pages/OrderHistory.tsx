import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Package, Calendar, Clock, ShoppingBag } from "lucide-react";
import { format } from "date-fns";

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
}

interface Order {
  id: string;
  created_at: string;
  status: string;
  total_amount: number;
  notes: string | null;
  order_items: OrderItem[];
}

const OrderHistory = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("orders")
        .select(`
          id,
          created_at,
          status,
          total_amount,
          notes,
          order_items (
            id,
            product_name,
            quantity,
            unit_price
          )
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        setOrders(data || []);
      }
      setLoading(false);
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      case "processing":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Header />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 w-full rounded-xl" />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

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
            <div className="text-center mb-10">
              <h1 className="font-serif text-4xl font-bold text-foreground mb-3">
                Order History
              </h1>
              <p className="text-muted-foreground">
                View and track all your past purchases
              </p>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-xl" />
                ))}
              </div>
            ) : orders.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 bg-card rounded-2xl border border-border"
              >
                <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  No orders yet
                </h2>
                <p className="text-muted-foreground mb-6">
                  Start shopping to see your order history here
                </p>
                <Button onClick={() => navigate("/wedding")}>
                  Browse Products
                </Button>
              </motion.div>
            ) : (
              <Accordion type="single" collapsible className="space-y-4">
                {orders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <AccordionItem
                      value={order.id}
                      className="bg-card rounded-xl border border-border px-6 overflow-hidden"
                    >
                      <AccordionTrigger className="hover:no-underline py-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-left w-full pr-4">
                          <div className="flex items-center gap-2">
                            <Package className="w-5 h-5 text-primary" />
                            <span className="font-medium text-foreground">
                              Order #{order.id.slice(0, 8)}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {format(new Date(order.created_at), "MMM d, yyyy")}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {format(new Date(order.created_at), "h:mm a")}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 sm:ml-auto">
                            <Badge
                              variant="outline"
                              className={getStatusColor(order.status)}
                            >
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </Badge>
                            <span className="font-semibold text-foreground">
                              ${order.total_amount.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4">
                        <div className="border-t border-border pt-4 mt-2">
                          <h4 className="font-medium text-foreground mb-3">
                            Order Items
                          </h4>
                          <div className="space-y-2">
                            {order.order_items.map((item) => (
                              <div
                                key={item.id}
                                className="flex justify-between items-center py-2 px-3 bg-muted/50 rounded-lg"
                              >
                                <div>
                                  <span className="font-medium text-foreground">
                                    {item.product_name}
                                  </span>
                                  <span className="text-muted-foreground ml-2">
                                    × {item.quantity}
                                  </span>
                                </div>
                                <span className="text-foreground">
                                  ${(item.unit_price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>
                          {order.notes && (
                            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                              <span className="text-sm font-medium text-foreground">
                                Notes:{" "}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {order.notes}
                              </span>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderHistory;
