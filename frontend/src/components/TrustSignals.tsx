import { Users, Wrench, TrendingUp } from 'lucide-react';

export default function TrustSignals() {
  return (
    <section className="border-y border-border/40 bg-muted/30 py-16">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center transition-transform hover:scale-105">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 shadow-lg">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-2xl font-bold">1,000+</h3>
            <p className="text-muted-foreground">Active Users</p>
          </div>
          <div className="flex flex-col items-center text-center transition-transform hover:scale-105">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-secondary/20 to-secondary/10 shadow-lg">
              <Wrench className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="mb-2 text-2xl font-bold">8</h3>
            <p className="text-muted-foreground">Essential Tools</p>
          </div>
          <div className="flex flex-col items-center text-center transition-transform hover:scale-105">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent/20 to-accent/10 shadow-lg">
              <TrendingUp className="h-8 w-8 text-accent" />
            </div>
            <h3 className="mb-2 text-2xl font-bold">Growing</h3>
            <p className="text-muted-foreground">More Tools Coming</p>
          </div>
        </div>
      </div>
    </section>
  );
}
