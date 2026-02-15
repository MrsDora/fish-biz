import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { ShoppingCart, ArrowLeft, Check } from "lucide-react";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground">Product Not Found</h1>
          <Link to="/products" className="mt-4 inline-block text-primary hover:underline">
            ← Back to Products
          </Link>
        </div>
      </main>
    );
  }

  const handleAdd = () => {
    if (!product.available) return;
    addItem(product, quantity, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Link
          to="/products"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Image */}
          <div className="overflow-hidden rounded-xl">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover aspect-square md:aspect-[4/3]"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <span className="inline-block w-fit rounded-full bg-secondary px-3 py-1 text-xs font-semibold capitalize text-secondary-foreground mb-3">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              {product.name}
            </h1>
            <div className="mt-3">
              <span className="text-3xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
              <span className="ml-2 text-muted-foreground">{product.unit}</span>
            </div>

            <p className="mt-6 text-muted-foreground leading-relaxed">{product.longDescription}</p>

            {!product.available && (
              <div className="mt-6 rounded-lg bg-coral-light border border-coral/20 p-4 text-sm text-foreground">
                This product is currently out of stock. Check back soon or contact us for availability.
              </div>
            )}

            {product.available && (
              <div className="mt-8 space-y-4">
                {/* Size selector */}
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <label className="text-sm font-semibold text-foreground block mb-2">Size</label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                            selectedSize === size
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-card text-foreground hover:border-primary"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div>
                  <label className="text-sm font-semibold text-foreground block mb-2">Quantity</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground hover:bg-secondary"
                    >
                      −
                    </button>
                    <span className="w-10 text-center font-semibold text-foreground">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground hover:bg-secondary"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAdd}
                  className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-lg font-semibold transition-all ${
                    added
                      ? "bg-seafoam text-accent-foreground"
                      : "bg-accent text-accent-foreground hover:scale-[1.02]"
                  }`}
                >
                  {added ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
                  {added ? "Added to Order!" : "Add to Order"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
