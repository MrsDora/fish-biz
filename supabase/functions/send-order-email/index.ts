import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const RECIPIENT_EMAIL = "mrnetwork0001@gmail.com";

interface OrderItem {
  name: string;
  size?: string;
  price: number;
  quantity: number;
}

interface OrderPayload {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  instructions?: string;
  items: OrderItem[];
  total: number;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const order: OrderPayload = await req.json();

    const itemLines = order.items
      .map(
        (item) =>
          `• ${item.name}${item.size ? ` (${item.size})` : ""} × ${item.quantity} — $${(item.price * item.quantity).toFixed(2)}`
      )
      .join("\n");

    const emailBody = `
New Fish Order Received!

Customer Details:
  Name: ${order.fullName}
  Phone: ${order.phone}
  Email: ${order.email}
  Delivery Address: ${order.address}
  ${order.instructions ? `Special Instructions: ${order.instructions}` : ""}

Ordered Items:
${itemLines}

Total: $${order.total.toFixed(2)}

Date: ${new Date().toISOString()}
    `.trim();

    // Use Supabase's built-in SMTP via the Auth admin API to send the email
    // We'll use the Resend integration via fetch
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (!RESEND_API_KEY) {
      // Fallback: log the order and return success (for testing without email service)
      console.log("=== ORDER RECEIVED (no email service configured) ===");
      console.log(emailBody);
      console.log("=== END ORDER ===");
      return new Response(
        JSON.stringify({ success: true, message: "Order received (logged)" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "OceanCatch Orders <onboarding@resend.dev>",
        to: [RECIPIENT_EMAIL],
        subject: `New Fish Order from ${order.fullName}`,
        text: emailBody,
      }),
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      console.error("Resend error:", errText);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to send email" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    await emailRes.text();

    return new Response(
      JSON.stringify({ success: true, message: "Order email sent" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
