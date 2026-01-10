import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface CartCheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CartCheckoutDialog = ({ open, onOpenChange }: CartCheckoutDialogProps) => {
  const { items, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setLoading(true);
    try {
      // Create the order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_name: form.name,
          customer_email: form.email,
          customer_phone: form.phone || null,
          total_amount: totalPrice,
          status: "pending",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        unit_price: item.price,
      }));

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems);

      if (itemsError) throw itemsError;

      // Send notification email
      const { error: emailError } = await supabase.functions.invoke("send-order-notification", {
        body: {
          customer_name: form.name,
          customer_email: form.email,
          order_id: order.id,
          total_amount: totalPrice,
          items: items.map((item) => ({
            product_name: item.name,
            quantity: item.quantity,
            unit_price: item.price,
          })),
        },
      });

      if (emailError) {
        console.error("Email notification error:", emailError);
      }

      toast.success("Order placed successfully! Check your email for confirmation.");
      setForm({ name: "", email: "", phone: "" });
      clearCart();
      onOpenChange(false);
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Checkout ({items.length} items)
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Order Summary */}
          <div className="max-h-40 overflow-y-auto space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-2 bg-muted/50 rounded-lg text-sm">
                <span className="flex-1 truncate">{item.name} × {item.quantity}</span>
                <span className="font-medium text-primary">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-primary/10 rounded-lg flex justify-between items-center">
            <span className="font-semibold">Total</span>
            <span className="text-xl font-bold text-primary">${totalPrice.toFixed(2)}</span>
          </div>

          <div className="space-y-2">
            <Label htmlFor="checkoutName">Full Name *</Label>
            <Input
              id="checkoutName"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="checkoutEmail">Email *</Label>
            <Input
              id="checkoutEmail"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="checkoutPhone">Phone (optional)</Label>
            <Input
              id="checkoutPhone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <Button type="submit" variant="hero" className="w-full" size="lg" disabled={loading || items.length === 0}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Placing Order...
              </>
            ) : (
              "Place Order"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CartCheckoutDialog;
