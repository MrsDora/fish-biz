import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactPage = () => (
  <main className="min-h-screen">
    {/* Header */}
    <section className="bg-primary py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground">
          Contact Us
        </h1>
        <p className="mt-2 text-primary-foreground/70">
          We'd love to hear from you
        </p>
      </div>
    </section>

    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Get in Touch
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Have questions about our products or want to place a bulk order?
                Reach out to us and we'll get back to you as soon as possible.
              </p>
            </div>

            <div className="space-y-5">
              {[
                { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                { icon: Mail, label: "Email", value: "orders@oceancatch.com" },
                { icon: MapPin, label: "Address", value: "123 Harbor Drive, Fisherman's Wharf, CA 94133" },
                { icon: Clock, label: "Hours", value: "Mon–Sat: 6:00 AM – 6:00 PM\nSunday: Closed" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ocean-light">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{item.label}</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-display text-xl font-bold text-card-foreground mb-6">
              Send a Message
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Message sent! We'll get back to you soon.");
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-sm font-semibold text-foreground block mb-1">Name</label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  placeholder="Your name"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground block mb-1">Email</label>
                <input
                  type="email"
                  required
                  maxLength={255}
                  placeholder="your@email.com"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground block mb-1">Message</label>
                <textarea
                  required
                  maxLength={1000}
                  rows={5}
                  placeholder="How can we help you?"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default ContactPage;
