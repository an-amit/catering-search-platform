import type { Caterer } from "@/lib/type/caterers";

interface CatererCardProps {
  caterer: Caterer;
}

export default function CatererCard({ caterer }: CatererCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {caterer.name}
            </h2>
            <p className="mt-1 text-sm text-slate-500">{caterer.location}</p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
            ₹{caterer.pricePerPlate.toFixed(2)} / plate
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <h2 className="text-lg font-medium text-slate-900">Cuisines</h2>
          {caterer.cuisines.map((item) => (
            <span
              key={item}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
          <span className="font-medium text-slate-900">Rating</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
            {caterer.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </article>
  );
}
