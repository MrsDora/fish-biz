import { FishProduct } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: FishProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.available) return;
    addItem(product, 1, product.sizes?.[0]);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {!product.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/60">
            <span className="rounded-full bg-card px-4 py-1 font-semibold text-sm text-foreground">
              Out of Stock
            </span>
          </div>
        )}
        <span className="absolute top-3 left-3 rounded-full bg-secondary px-3 py-1 text-xs font-semibold capitalize text-secondary-foreground">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-semibold text-card-foreground">{product.name}</h3>
        <p className="mt-1 flex-1 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
            <span className="ml-1 text-xs text-muted-foreground">{product.unit}</span>
          </div>
          <button
            onClick={handleAdd}
            disabled={!product.available}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
              added
                ? "bg-seafoam text-accent-foreground"
                : product.available
                ? "bg-accent text-accent-foreground hover:scale-105"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {added ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
            {added ? "Added!" : "Add"}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
