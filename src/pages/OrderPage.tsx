import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Trash2, Minus, Plus, CheckCircle, ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const orderSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(100),
  phone: z.string().trim().min(1, "Phone number is required").max(20),
  email: z.string().trim().email("Invalid email address").max(255),
  address: z.string().trim().min(1, "Delivery address is required").max(500),
  instructions: z.string().max(1000).optional(),
});

type OrderForm = z.infer<typeof orderSchema>;

const OrderPage = () => {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();
  const [form, setForm] = useState<OrderForm>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    instructions: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof OrderForm, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const result = orderSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.errors.forEach((err) => {
        const key = err.path[0] as keyof OrderForm;
        fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-order-email", {
        body: {
          ...result.data,
          items: items.map((item) => ({
            name: item.product.name,
            size: item.size,
            price: item.product.price,
            quantity: item.quantity,
          })),
          total: totalPrice,
        },
      });

      if (error) throw error;

      setSubmitted(true);
      clearCart();
    } catch (err: any) {
      console.error("Order submission error:", err);
      setSubmitError("Failed to submit order. Please try again or contact us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center py-20">
        <div className="text-center max-w-md mx-auto px-4 animate-fade-in">
          <CheckCircle className="h-16 w-16 text-seafoam mx-auto mb-6" />
          <h1 className="text-3xl font-display font-bold text-foreground">Order Submitted!</h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Thank you for your order. We've received your details and will contact you shortly
            to confirm payment and delivery arrangements.
          </p>
          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:scale-105 transition-transform"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Link
          to="/products"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Continue Shopping
        </Link>

        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
          Your Order
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">Your order is empty.</p>
            <Link
              to="/products"
              className="mt-4 inline-block text-primary font-semibold hover:underline"
            >
              Browse Products →
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Cart Items */}
            <div className="lg:col-span-3 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-4 rounded-lg border border-border bg-card p-4"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-20 w-20 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-card-foreground truncate">{item.product.name}</h3>
                    {item.size && (
                      <p className="text-xs text-muted-foreground">{item.size}</p>
                    )}
                    <p className="text-sm font-bold text-primary mt-1">
                      ${item.product.price.toFixed(2)} {item.product.unit}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="flex h-8 w-8 items-center justify-center rounded border border-border bg-card text-foreground hover:bg-secondary"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold text-foreground">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded border border-border bg-card text-foreground hover:bg-secondary"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <span className="font-bold text-foreground w-20 text-right">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <span className="text-lg font-semibold text-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Order Form */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-border bg-card p-6 sticky top-[120px]">
                <h2 className="font-display text-xl font-bold text-card-foreground mb-6">
                  Delivery Details
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {([
                    { name: "fullName", label: "Full Name", type: "text", placeholder: "John Doe" },
                    { name: "phone", label: "Phone Number", type: "tel", placeholder: "+1 (555) 123-4567" },
                    { name: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
                    { name: "address", label: "Delivery Address", type: "text", placeholder: "123 Main Street, City" },
                  ] as const).map((field) => (
                    <div key={field.name}>
                      <label className="text-sm font-semibold text-foreground block mb-1">
                        {field.label} *
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      {errors[field.name] && (
                        <p className="mt-1 text-xs text-destructive">{errors[field.name]}</p>
                      )}
                    </div>
                  ))}
                  <div>
                    <label className="text-sm font-semibold text-foreground block mb-1">
                      Special Instructions
                    </label>
                    <textarea
                      name="instructions"
                      value={form.instructions}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Any special requests..."
                      className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    />
                  </div>
                  {submitError && (
                    <p className="text-sm text-destructive text-center">{submitError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    {submitting ? "Submitting..." : "Submit Order"}
                  </button>
                  <p className="text-xs text-center text-muted-foreground">
                    We'll contact you to confirm payment and delivery.
                  </p>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default OrderPage;
