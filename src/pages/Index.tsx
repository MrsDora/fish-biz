import heroImage from "@/assets/hero-fish.jpg";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, ShieldCheck, Clock } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const features = [
  { icon: ShieldCheck, title: "Quality Guaranteed", desc: "Every fish inspected for freshness and quality" },
  { icon: Truck, title: "Fast Delivery", desc: "Same-day delivery for orders placed before noon" },
  { icon: Clock, title: "Open Daily", desc: "Mon–Sat, 6 AM – 6 PM at our fish market" },
];

const Index = () => {
  const featured = products.filter((p) => p.available).slice(0, 4);

  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
        <img
          src={heroImage}
          alt="Fresh fish on ice at FishHub fish market"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-dark/90 via-ocean-dark/70 to-transparent" />
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground leading-tight">
              Fresh Fish,<br />
              <span className="text-accent">Delivered Daily</span>
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-lg">
              Premium quality seafood from ocean to your table. Browse our selection of fresh,
              frozen, and smoked fish products.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground transition-transform hover:scale-105"
              >
                Shop Now <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-foreground/30 px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-4 rounded-lg bg-card p-6 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ocean-light">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-card-foreground">{f.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Featured Products
            </h2>
            <p className="mt-2 text-muted-foreground">Hand-picked from today's freshest catch</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              View All Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
            Ready to Order?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-primary-foreground/70">
            Browse our selection, add to your order, and we'll handle the rest. No account needed.
          </p>
          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3 font-semibold text-accent-foreground transition-transform hover:scale-105"
          >
            Browse Products <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Index;
