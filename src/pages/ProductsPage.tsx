import { useState } from "react";
import { products, FishCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const categories: { value: FishCategory | "all"; label: string }[] = [
  { value: "all", label: "All Fish" },
  { value: "fresh", label: "Fresh" },
  { value: "frozen", label: "Frozen" },
  { value: "smoked", label: "Smoked" },
  { value: "dried", label: "Dried" },
];

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState<FishCategory | "all">("all");

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground">
            Our Products
          </h1>
          <p className="mt-2 text-primary-foreground/70">
            Fresh, frozen, and smoked — quality seafood for every need
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-border bg-card sticky top-[60px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-4">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  activeCategory === cat.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">No products in this category.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ProductsPage;
