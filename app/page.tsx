'use client';

import Link from "next/link";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { BaggageClaim, LucideIcon, PlaneIcon, ShipIcon, Warehouse } from "lucide-react";
import { ScrollableServices } from './store/components/ScrollableServices';
import Calculator from "../components/ui/calculator";

function ShippingServiceCard({
  icon: Icon,
  title,
  features,
  color = "primary"
}: {
  icon: LucideIcon,
  title: string,
  features: string[],
  color?: "primary" | "secondary"
}) {
  return (
    <Card className="p-6">
      <div className="flex flex-col items-center">
        <Icon className={`mb-4 h-12 w-12 text-${color}`} />
        <h3 className="mb-4 text-xl font-semibold">{title}</h3>
        <ul className="space-y-2 text-gray-600">
          {features.map((feature, index) => (
            <li key={index}>• {feature}</li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-primary to-secondary py-20 text-white">
        <div className="container mx-auto text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-6xl">
            Global Shipping Solutions
          </h1>
          <p className="mb-8 text-xl md:text-2xl">
            Fast Air Freight & Cost-Effective Sea Shipping
          </p>
          <Button asChild className="bg-accent text-black hover:bg-accent/90">
            <Link href="/newParcel">Book a Pickup Now</Link>
          </Button>
        </div>
      </section>

      {/* Replace Services Section with */}
      <ScrollableServices />

      {/* Shipping Section */}
      <section className="container mx-auto py-4">
        <h2 className="mb-12 text-center text-3xl font-bold">Our Solutions</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <ShippingServiceCard
            icon={PlaneIcon}
            title="Express Air Shipping"
            features={["Worldwide delivery in 3-5 days", "Real-time tracking", "Premium security handling"]}
          />
          <ShippingServiceCard
            icon={BaggageClaim}
            title="Air Freight"
            features={["Worldwide delivery in 3-5 days", "Real-time tracking", "Premium security handling"]}
          />
          <ShippingServiceCard
            icon={ShipIcon}
            title="Economy Sea Shipping"
            features={["Cost-effective bulk shipping", "Customs clearance included", "Environmental friendly"]}
            color="secondary"
          />
          <ShippingServiceCard
            icon={Warehouse}
            title="Logistic"
            features={["Cost-effective bulk shipping", "Customs clearance included", "Environmental friendly"]}
            color="secondary"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-accent py-16">
        <div className="container mx-auto text-center">
          <h2 className="mb-8 text-3xl font-bold">Ready to Ship?</h2>
          <div className="flex justify-center gap-4">
            <Button asChild className="bg-primary text-white hover:bg-primary/90">
              <Link href="/booking">Schedule Pickup</Link>
            </Button>
            {/* <Button asChild variant="outline" className="border-primary text-primary">
              <Link href="/calculator">Estimate Cost</Link>
            </Button> */}
            <Calculator
              trigger={
                <Button variant="outline" className="border-primary text-primary">
                  Estimate Cost
                </Button>
              }
            />

          </div>
        </div>
      </section>
    </main>
  );
}