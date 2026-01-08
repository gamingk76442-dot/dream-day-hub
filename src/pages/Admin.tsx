import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { LayoutDashboard, Calendar, Package, Image, Settings, Check, Clock, X, Eye, Edit2, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Tab = "bookings" | "products" | "images" | "settings";

interface Booking {
  id: string;
  customer_name: string;
  customer_email: string;
  service_type: string;
  booking_date: string;
  status: string;
  total_amount: number | null;
}

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_active: boolean;
  category_id: string | null;
}

interface ImageItem {
  id: string;
  name: string;
  url: string;
  category: string | null;
}

const Admin = () => {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("bookings");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Product dialog state
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchData();
    }
  }, [user, isAdmin, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "bookings") {
        const { data, error } = await supabase
          .from("bookings")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setBookings(data || []);
      } else if (activeTab === "products") {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setProducts(data || []);
      } else if (activeTab === "images") {
        const { data, error } = await supabase
          .from("images")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setImages(data || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
      toast.success("Booking status updated");
      fetchData();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productData = {
        name: productForm.name,
        description: productForm.description || null,
        price: parseFloat(productForm.price),
        image_url: productForm.image_url || null,
        is_active: true,
      };

      if (editingProduct) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingProduct.id);
        if (error) throw error;
        toast.success("Product updated");
      } else {
        const { error } = await supabase.from("products").insert(productData);
        if (error) throw error;
        toast.success("Product created");
      }

      setProductDialogOpen(false);
      setEditingProduct(null);
      setProductForm({ name: "", description: "", price: "", image_url: "" });
      fetchData();
    } catch (error) {
      toast.error("Failed to save product");
    }
  };

  const openEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      image_url: product.image_url || "",
    });
    setProductDialogOpen(true);
  };

  const toggleProductStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("products")
        .update({ is_active: !currentStatus })
        .eq("id", id);
      if (error) throw error;
      toast.success("Product status updated");
      fetchData();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20"><Check className="w-3 h-3 mr-1" />Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500/10 text-red-600 border-red-500/20"><X className="w-3 h-3 mr-1" />Cancelled</Badge>;
      case "completed":
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20"><Check className="w-3 h-3 mr-1" />Completed</Badge>;
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

  if (authLoading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Header />
        <main className="pt-24 pb-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-2xl font-bold text-foreground mb-2">Access Denied</h1>
            <p className="text-muted-foreground">You don't have permission to access this page.</p>
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-4"
            >
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <>
                    {activeTab === "bookings" && (
                      <>
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="font-serif text-xl font-bold">Recent Bookings</h2>
                          <Badge variant="outline">{bookings.filter(b => b.status === "pending").length} Pending</Badge>
                        </div>
                        {bookings.length === 0 ? (
                          <p className="text-muted-foreground text-center py-8">No bookings yet</p>
                        ) : (
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
                                    <td className="py-4 px-4">
                                      <div>
                                        <div className="font-medium">{booking.customer_name}</div>
                                        <div className="text-sm text-muted-foreground">{booking.customer_email}</div>
                                      </div>
                                    </td>
                                    <td className="py-4 px-4 text-muted-foreground">{booking.service_type}</td>
                                    <td className="py-4 px-4 text-muted-foreground">{booking.booking_date}</td>
                                    <td className="py-4 px-4 font-semibold text-primary">
                                      {booking.total_amount ? `$${booking.total_amount}` : "-"}
                                    </td>
                                    <td className="py-4 px-4">{getStatusBadge(booking.status)}</td>
                                    <td className="py-4 px-4">
                                      <div className="flex gap-1">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => updateBookingStatus(booking.id, "confirmed")}
                                          disabled={booking.status === "confirmed"}
                                        >
                                          <Check className="w-4 h-4" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => updateBookingStatus(booking.id, "cancelled")}
                                          disabled={booking.status === "cancelled"}
                                        >
                                          <X className="w-4 h-4" />
                                        </Button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </>
                    )}

                    {activeTab === "products" && (
                      <>
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="font-serif text-xl font-bold">Products</h2>
                          <Button
                            variant="hero"
                            size="sm"
                            onClick={() => {
                              setEditingProduct(null);
                              setProductForm({ name: "", description: "", price: "", image_url: "" });
                              setProductDialogOpen(true);
                            }}
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Product
                          </Button>
                        </div>
                        {products.length === 0 ? (
                          <p className="text-muted-foreground text-center py-8">No products yet</p>
                        ) : (
                          <div className="grid gap-4">
                            {products.map((product) => (
                              <div key={product.id} className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted/50">
                                <div className="flex items-center gap-4">
                                  {product.image_url && (
                                    <img src={product.image_url} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                                  )}
                                  <div>
                                    <h3 className="font-medium">{product.name}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-4">
                                  <span className="font-semibold text-primary">${product.price}</span>
                                  <Badge
                                    variant={product.is_active ? "default" : "secondary"}
                                    className="cursor-pointer"
                                    onClick={() => toggleProductStatus(product.id, product.is_active)}
                                  >
                                    {product.is_active ? "Active" : "Inactive"}
                                  </Badge>
                                  <Button variant="ghost" size="sm" onClick={() => openEditProduct(product)}>
                                    <Edit2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}

                    {activeTab === "images" && (
                      <>
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="font-serif text-xl font-bold">Image Gallery</h2>
                          <Button variant="hero" size="sm">
                            <Plus className="w-4 h-4 mr-1" />
                            Upload Image
                          </Button>
                        </div>
                        {images.length === 0 ? (
                          <p className="text-muted-foreground text-center py-8">No images yet</p>
                        ) : (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {images.map((image) => (
                              <div key={image.id} className="relative group rounded-xl overflow-hidden aspect-square bg-muted">
                                <img src={image.url} alt={image.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                  <Button variant="secondary" size="sm"><Eye className="w-4 h-4" /></Button>
                                  <Button variant="secondary" size="sm"><Edit2 className="w-4 h-4" /></Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}

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
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Dialog open={productDialogOpen} onOpenChange={setProductDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add Product"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleProductSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="productName">Name</Label>
              <Input
                id="productName"
                value={productForm.name}
                onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productDesc">Description</Label>
              <Textarea
                id="productDesc"
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productPrice">Price</Label>
              <Input
                id="productPrice"
                type="number"
                step="0.01"
                value={productForm.price}
                onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productImage">Image URL</Label>
              <Input
                id="productImage"
                value={productForm.image_url}
                onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <Button type="submit" variant="hero" className="w-full">
              {editingProduct ? "Update Product" : "Create Product"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;