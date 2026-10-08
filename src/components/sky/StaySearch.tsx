import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Cta } from "./ui";
import { wa } from "@/data/sky";

const quick = ["Fin de semana", "Day Use", "Negocios", "Estadía prolongada"];
const TAG_PRESETS = ["Negocios", "Estadía prolongada"];

function ymd(d: Date) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function nextWeekend() {
  const fri = new Date();
  fri.setDate(fri.getDate() + (((5 - fri.getDay() + 7) % 7) || 7));
  const sun = new Date(fri);
  sun.setDate(fri.getDate() + 2);
  return { checkIn: ymd(fri), checkOut: ymd(sun) };
}

export function StaySearch() {
  const navigate = useNavigate();
  const [preset, setPreset] = useState<string | null>(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [error, setError] = useState<string | null>(null);

  function onPreset(item: string) {
    if (item === "Day Use") {
      window.open(wa("Hola, quiero consultar por un Day Stay en Sky Stays."), "_blank", "noreferrer");
      return;
    }
    const next = preset === item ? null : item;
    setPreset(next);
    if (next === "Fin de semana") {
      const w = nextWeekend();
      setCheckIn(w.checkIn);
      setCheckOut(w.checkOut);
      setError(null);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!checkIn || !checkOut) return setError("Elegí las fechas de check-in y check-out.");
    if (checkOut <= checkIn) return setError("El check-out tiene que ser posterior al check-in.");
    setError(null);
    const tag = preset && TAG_PRESETS.includes(preset) ? preset : undefined;
    navigate({ to: "/alojamientos", search: { checkIn, checkOut, guests: Number(guests), tag } });
  }

  return (
    <div id="buscador" className="scroll-mt-24">
      <div className="bg-card p-6 shadow-lift md:p-9">
        <h2 className="text-2xl text-primary md:text-[1.75rem]">Encontrá tu estadía</h2>

        <form
          className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end"
          onSubmit={onSubmit}
          noValidate
        >
          <Field label="Check-in">
            <input
              type="date"
              className={inputClass}
              aria-label="Check-in"
              value={checkIn}
              min={ymd(new Date())}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </Field>
          <Field label="Check-out">
            <input
              type="date"
              className={inputClass}
              aria-label="Check-out"
              value={checkOut}
              min={checkIn || ymd(new Date())}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </Field>
          <Field label="Huéspedes">
            <select
              className={inputClass}
              aria-label="Huéspedes"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            >
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
        {error && (
          <p role="alert" className="mt-3 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-border pt-6">
          <span className="kicker mr-2 text-muted-foreground">Accesos rápidos</span>
          {quick.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onPreset(item)}
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
