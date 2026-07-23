import { useState } from "react";
import { Mail } from "lucide-react";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="bg-primary py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <Mail className="text-accent mx-auto mb-5" size={32} />
        <h2 className="font-heading text-3xl text-white mb-4">
          Stay In The Know
        </h2>
        <p className="font-body text-white/60 mb-8">
          Subscribe for exclusive offers, seasonal packages, and stories from Zenith Hotels.
        </p>

        {submitted ? (
          <p className="font-body text-accent">
            Thank you for subscribing — welcome to Zenith Hotels.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-full font-body text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="bg-accent text-white px-7 py-3 rounded-full font-body text-sm tracking-wide hover:bg-white hover:text-primary transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default Newsletter;
