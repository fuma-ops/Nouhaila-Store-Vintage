import { Mail } from "lucide-react";
export function Subscribe() {
  return (
    <section className="bg-groovy py-16 md:py-20">
      <div className="mx-auto max-w-3xl text-center px-4">
        <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-hot text-primary-foreground flex items-center justify-center shadow-pop">
          <Mail className="h-6 w-6" />
        </div>
        <h2 className="font-display text-5xl md:text-7xl italic text-hot">Subscribe</h2>
        <p className="mt-3 text-foreground/70 font-medium max-w-lg mx-auto">
          Rejoins la girly gang — promos exclusives, drops et 10% sur ta première commande ♡
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-6 mx-auto flex max-w-md flex-col sm:flex-row gap-3"
        >
          <input
            type="email"
            required
            placeholder="ton@email.com"
            className="flex-1 rounded-full border-2 border-foreground bg-background px-5 py-3 font-medium outline-none focus:ring-2 focus:ring-hot"
          />
          <button className="rounded-full bg-foreground text-background px-6 py-3 font-bold uppercase tracking-wider text-sm hover:bg-hot">
            Join ♡
          </button>
        </form>
      </div>
    </section>
  );
}
