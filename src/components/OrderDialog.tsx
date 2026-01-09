import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, ShoppingBag } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
}

interface OrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

const OrderDialog = ({ open, onOpenChange, product }: OrderDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: "1",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    setLoading(true);
    try {
      const quantity = parseInt(form.quantity) || 1;
      const totalAmount = product.price * quantity;

      // Create the order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_name: form.name,
          customer_email: form.email,
          customer_phone: form.phone || null,
          total_amount: totalAmount,
          status: "pending",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order item
      const { error: itemError } = await supabase.from("order_items").insert({
        order_id: order.id,
        product_id: product.id,
        product_name: product.name,
        quantity: quantity,
        unit_price: product.price,
      });

      if (itemError) throw itemError;

      // Send notification email
      const { error: emailError } = await supabase.functions.invoke("send-order-notification", {
        body: {
          customer_name: form.name,
          customer_email: form.email,
          order_id: order.id,
          total_amount: totalAmount,
          items: [
            {
              product_name: product.name,
              quantity: quantity,
              unit_price: product.price,
            },
          ],
        },
      });

      if (emailError) {
        console.error("Email notification error:", emailError);
      }

      toast.success("Order placed successfully! Check your email for confirmation.");
      setForm({ name: "", email: "", phone: "", quantity: "1" });
      onOpenChange(false);
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!product) return null;

  const quantity = parseInt(form.quantity) || 1;
  const total = product.price * quantity;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Order {product.name}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">{product.name}</span>
              <span className="text-primary font-bold">${product.price.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="orderName">Full Name *</Label>
            <Input
              id="orderName"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="orderEmail">Email *</Label>
            <Input
              id="orderEmail"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="orderPhone">Phone (optional)</Label>
            <Input
              id="orderPhone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="orderQuantity">Quantity</Label>
            <Input
              id="orderQuantity"
              type="number"
              min="1"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            />
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold text-primary">${total.toFixed(2)}</span>
            </div>
            <Button type="submit" variant="hero" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Placing Order...
                </>
              ) : (
                "Place Order"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialog;
