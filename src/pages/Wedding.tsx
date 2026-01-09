import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import OrderDialog from "@/components/OrderDialog";
import { supabase } from "@/integrations/supabase/client";
import { Heart, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  description: string | null;
  category_id: string | null;
}

interface Category {
  id: string;
  name: string;
}

const Wedding = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleBookProduct = (product: Product) => {
    setSelectedProduct(product);
    setOrderDialogOpen(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        supabase.from("products").select("*").eq("is_active", true),
        supabase.from("product_categories").select("*"),
      ]);

      if (productsRes.data) setProducts(productsRes.data);
      if (categoriesRes.data) setCategories(categoriesRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (categoryId: string | null) => {
    if (!categoryId) return "Uncategorized";
    const cat = categories.find(c => c.id === categoryId);
    return cat?.name || "Uncategorized";
  };

  const filteredProducts = activeCategory === "All"
    ? products
    : products.filter(p => getCategoryName(p.category_id) === activeCategory);

  const categoryNames = ["All", ...categories.map(c => c.name)];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <section className="bg-gradient-hero py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-primary" />
                <span className="text-primary font-medium">Wedding Collection</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                Wedding Supplies
              </h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Discover our curated collection of exquisite wedding essentials to make your special day truly magical.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Filter className="w-5 h-5 text-muted-foreground" />
            {categoryNames.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "hero" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image_url || "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop"}
                    category={getCategoryName(product.category_id)}
                    onBook={() => handleBookProduct(product)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
      <OrderDialog
        open={orderDialogOpen}
        onOpenChange={setOrderDialogOpen}
        product={selectedProduct}
      />
    </div>
  );
};

export default Wedding;