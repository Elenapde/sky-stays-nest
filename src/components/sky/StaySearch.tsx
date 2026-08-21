import { useState } from "react";
import { Cta } from "./ui";

const quick = ["Fin de semana", "Day Stay", "Negocios", "Estadía prolongada"];

export function StaySearch() {
  const [preset, setPreset] = useState<string | null>(null);

  return (
    <div id="buscador" className="scroll-mt-24">
      <div className="bg-card p-6 shadow-lift md:p-9">
        <h2 className="text-2xl text-primary md:text-[1.75rem]">Encontrá tu estadía</h2>

        <form
          className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end"
          onSubmit={(e) => e.preventDefault()}
        >
          <Field label="Check-in">
            <input type="date" className={inputClass} aria-label="Check-in" />
          </Field>
          <Field label="Check-out">
            <input type="date" className={inputClass} aria-label="Check-out" />
          </Field>
          <Field label="Huéspedes">
            <select className={inputClass} aria-label="Huéspedes" defaultValue="2">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "huésped" : "huéspedes"}
                </option>
              ))}
            </select>
          </Field>
          <Cta type="submit" size="lg" className="w-full md:w-auto">
            Buscar
          </Cta>
        </form>

        <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-border pt-6">
          <span className="kicker mr-2 text-muted-foreground">Accesos rápidos</span>
          {quick.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setPreset(item)}
              aria-pressed={preset === item}
              className={
                "rounded-xs border px-4 py-2 text-xs transition-all duration-300 ease-brand " +
                (preset === item
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border-strong/40 text-primary hover:border-primary")
              }
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const inputClass =
  "h-12 w-full border border-input bg-background px-4 text-sm text-foreground transition-colors duration-300 focus:border-primary focus:outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="kicker mb-2 block text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
