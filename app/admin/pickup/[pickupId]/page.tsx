"use client";

import { useEffect, useState, use } from "react";
import EditPickup from "./EditPickup";

export default function PickupPage({
  params,
}: {
  params: Promise<{ pickupId: string }>;
}) {
  // ✅ unwrap params safely
  const { pickupId } = use(params);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pickup, setPickup] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPickup() {
      try {
        const res = await fetch(`/api/admin/pickups/${pickupId}`);
        if (!res.ok) throw new Error("Failed to fetch pickup");
        setPickup(await res.json());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchPickup();
  }, [pickupId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!pickup) return <p>No pickup found</p>;

  return <EditPickup pickup={pickup} />;
}
