"use client";

import { useEffect, useState } from "react";
import { fetchCaterers } from "@/lib/api/caterers";
import type { Caterer, CatererListResponse } from "@/lib/type/caterers";
import CatererCard from "@/components/CatererCard";

export default function CaterersPage() {
  const [caterers, setCaterers] = useState<Caterer[]>([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      async function loadCaterers() {
        try {
          setLoading(true);
          setError(null);

          const response = await fetchCaterers(
            search.trim(),
            minPrice,
            maxPrice,
          );
          const result = response as CatererListResponse;

          if (!result || !result.success) {
            throw new Error(
              (response as { message?: string }).message ||
                "Failed to load caterers.",
            );
          }

          setCaterers(result.data ?? []);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Unable to fetch caterers.",
          );
        } finally {
          setLoading(false);
        }
      }

      loadCaterers();
    }, 300);

    return () => window.clearTimeout(timer);
  }, [search, minPrice, maxPrice]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 bg-white p-8 shadow-sm">
          <div className="mt-2 grid gap-4 sm:grid-cols-[1.5fr_1fr]">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="search"
                className="text-sm font-medium text-slate-600"
              >
                Search caterers
              </label>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                type="text"
                name="search"
                id="search"
                placeholder="Search for caterers..."
                className="w-full border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="minPrice"
                  className="text-sm font-medium text-slate-600"
                >
                  Min price
                </label>
                <input
                  value={minPrice}
                  onChange={(event) => setMinPrice(event.target.value)}
                  type="number"
                  name="minPrice"
                  id="minPrice"
                  min="0"
                  placeholder="₹0"
                  className="w-full border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="maxPrice"
                  className="text-sm font-medium text-slate-600"
                >
                  Max price
                </label>
                <input
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(event.target.value)}
                  type="number"
                  name="maxPrice"
                  id="maxPrice"
                  min="0"
                  placeholder="₹999"
                  className="w-full border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className=" bg-white p-10 text-center text-slate-600 shadow-sm">
            Loading caterers...
          </div>
        ) : error ? (
          <div className=" bg-rose-50 p-8 text-center text-rose-700 shadow-sm">
            {error}
          </div>
        ) : caterers.length === 0 ? (
          <div className="bg-white p-10 text-center text-slate-600 shadow-sm">
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
