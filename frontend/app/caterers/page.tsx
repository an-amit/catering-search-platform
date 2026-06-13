"use client";

import { useEffect, useState } from "react";
import { fetchCaterers } from "@/lib/api/caterers";
import type { Caterer, CatererListResponse } from "@/lib/type/caterers";
import CatererCard from "@/components/CatererCard";

export default function CaterersPage() {
  const [caterers, setCaterers] = useState<Caterer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCaterers() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetchCaterers();
        const result = response as CatererListResponse;

        if (!result || !result.success) {
          throw new Error(
            (response as { message?: string }).message || "Failed to load caterers."
          );
        }

        setCaterers(result.data ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to fetch caterers.");
      } finally {
        setLoading(false);
      }
    }

    loadCaterers();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Catering Marketplace
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">
            Discover local caterers near you
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Browse trusted catering services with flexible pricing, cuisine styles,
            and customer ratings to help you plan your next event.
          </p>
        </div>

        {loading ? (
          <div className="rounded-3xl bg-white p-10 text-center text-slate-600 shadow-sm">
            Loading caterers...
          </div>
        ) : error ? (
          <div className="rounded-3xl bg-rose-50 p-8 text-center text-rose-700 shadow-sm">
            {error}
          </div>
        ) : caterers.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center text-slate-600 shadow-sm">
            No caterers found.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {caterers.map((caterer) => (
              <CatererCard key={caterer.id} caterer={caterer} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
