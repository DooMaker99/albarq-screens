import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Download, Layers, Monitor, Sparkles, Filter } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Env = "Outdoor" | "Indoor";
type FormFactor = "Standard" | "Flexible";

type ConfigFile = {
  id: string;
  env: Env;
  formFactor: FormFactor;
  pitch: string; // e.g. "P5", "P3.076"
  y: string; // e.g. "Y55"
  title: string; // e.g. "Huidu", "R712 Update"
  subtitle?: string; // optional extra (e.g. module width)
  downloadUrl: string;
  note?: string;
};

// Links extracted from the provided page source
const CONFIG_FILES: ConfigFile[] = [
  // =========================
  // OUTDOOR (Standard)
  // =========================
  {
    id: "out-p5-y55-huidu",
    env: "Outdoor",
    formFactor: "Standard",
    pitch: "P5",
    y: "Y55",
    title: "Huidu",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1mRyZqLeFawqEZz574x9ytdp4xX_2YRjW",
  },
  {
    id: "out-p5-y55-r712",
    env: "Outdoor",
    formFactor: "Standard",
    pitch: "P5",
    y: "Y55",
    title: "R712 Update",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1dtaHI03Fj8_LNdIyXqIDNtyaEtZJdWWK",
  },

  {
    id: "out-p4-y55-huidu",
    env: "Outdoor",
    formFactor: "Standard",
    pitch: "P4",
    y: "Y55",
    title: "Huidu",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1jBP0eG3r6Zrzw2ZpkLmLH0d4KMEtQ8rt",
  },
  {
    id: "out-p4-y55-r712",
    env: "Outdoor",
    formFactor: "Standard",
    pitch: "P4",
    y: "Y55",
    title: "R712 Update",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1dtaHI03Fj8_LNdIyXqIDNtyaEtZJdWWK",
  },

  {
    id: "out-p3_91-y51-huidu",
    env: "Outdoor",
    formFactor: "Standard",
    pitch: "P3.91",
    y: "Y51",
    title: "Huidu",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1C0_1iti084wr-EYrAmW7ZvFC-0R9rtV_",
  },
  // NOTE: In the provided source, P3.91/Y51 does not include an R712 Update link.
  // If you still want to show it (as a universal receiver-card update), keep this entry.
  {
    id: "out-p3_91-y51-r712",
    env: "Outdoor",
    formFactor: "Standard",
    pitch: "P3.91",
    y: "Y51",
    title: "R712 Update",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1dtaHI03Fj8_LNdIyXqIDNtyaEtZJdWWK",
    note: "Universal R712 update file",
  },

  {
    id: "out-p2_976-y51-huidu",
    env: "Outdoor",
    formFactor: "Standard",
    pitch: "P2.976",
    y: "Y51",
    title: "Huidu",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1Z-5Zpw3kvZphICckI5OCCaqo7eLvlmVJ",
  },
  // NOTE: In the provided source, P2.976/Y51 does not include an R712 Update link.
  // If you still want to show it (as a universal receiver-card update), keep this entry.
  {
    id: "out-p2_976-y51-r712",
    env: "Outdoor",
    formFactor: "Standard",
    pitch: "P2.976",
    y: "Y51",
    title: "R712 Update",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1dtaHI03Fj8_LNdIyXqIDNtyaEtZJdWWK",
    note: "Universal R712 update file",
  },

  {
    id: "out-p3_076-y55-huidu",
    env: "Outdoor",
    formFactor: "Standard",
    pitch: "P3.076",
    y: "Y55",
    title: "Huidu",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1S6-m-ceSQB1bE3cxgNVIiYTk85ctDfRQ",
  },
  {
    id: "out-p3_076-y55-r712",
    env: "Outdoor",
    formFactor: "Standard",
    pitch: "P3.076",
    y: "Y55",
    title: "R712 Update",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1dtaHI03Fj8_LNdIyXqIDNtyaEtZJdWWK",
  },

  // =========================
  // INDOOR (Standard)
  // =========================
  // NOTE: In the provided source, P3.076 Indoor has downloadable links under Y50 (not Y51).
  {
    id: "in-p3_076-y50-huidu",
    env: "Indoor",
    formFactor: "Standard",
    pitch: "P3.076",
    y: "Y50",
    title: "Huidu",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1cObASgYJvLBmy9xZOvwxvQp7EI2O4db3",
    note: "Available under Y50 in source",
  },
  {
    id: "in-p3_076-y50-r712",
    env: "Indoor",
    formFactor: "Standard",
    pitch: "P3.076",
    y: "Y50",
    title: "R712 Update",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1dtaHI03Fj8_LNdIyXqIDNtyaEtZJdWWK",
    note: "Available under Y50 in source",
  },

  {
    id: "in-p2_5-y55-huidu",
    env: "Indoor",
    formFactor: "Standard",
    pitch: "P2.5",
    y: "Y55",
    title: "Huidu",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1GTvJaIPbTfkK1NWHyiCZnhv6LzAV2ufr",
  },
  {
    id: "in-p2_5-y55-r712",
    env: "Indoor",
    formFactor: "Standard",
    pitch: "P2.5",
    y: "Y55",
    title: "R712 Update",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1dtaHI03Fj8_LNdIyXqIDNtyaEtZJdWWK",
  },

  {
    id: "in-p1_86-y55-huidu",
    env: "Indoor",
    formFactor: "Standard",
    pitch: "P1.86",
    y: "Y55",
    title: "Huidu",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1STX6vZP_LP8STrkd1oy6BNBdryoILxc6",
  },
  {
    id: "in-p1_86-y55-r712",
    env: "Indoor",
    formFactor: "Standard",
    pitch: "P1.86",
    y: "Y55",
    title: "R712 Update",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1dtaHI03Fj8_LNdIyXqIDNtyaEtZJdWWK",
  },

  {
    id: "in-p1_53-y55-huidu",
    env: "Indoor",
    formFactor: "Standard",
    pitch: "P1.53",
    y: "Y55",
    title: "Huidu",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1fmx2LpOzMrao6P_ii-ljB5uDlIrwiW2c",
  },
  {
    id: "in-p1_53-y55-r712",
    env: "Indoor",
    formFactor: "Standard",
    pitch: "P1.53",
    y: "Y55",
    title: "R712 Update",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1dtaHI03Fj8_LNdIyXqIDNtyaEtZJdWWK",
  },

  // NOTE: In the provided source, P1.25 Indoor has downloadable links under Y50 (not Y51).
  {
    id: "in-p1_25-y50-huidu-1mod",
    env: "Indoor",
    formFactor: "Standard",
    pitch: "P1.25",
    y: "Y50",
    title: "Huidu",
    subtitle: "1 Modules Width",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1BBu_wgkCh_OkJ2ptwDu75OpYhHIzXQE4",
    note: "Available under Y50 in source",
  },
  {
    id: "in-p1_25-y50-r712",
    env: "Indoor",
    formFactor: "Standard",
    pitch: "P1.25",
    y: "Y50",
    title: "R712 Update",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1TB5_DMxPz19QCUyQ8AP-3T3-pyriiLvd",
    note: "Available under Y50 in source",
  },

  // =========================
  // INDOOR (Flexible)
  // =========================
  {
    id: "flex-p2_5-y52-huidu",
    env: "Indoor",
    formFactor: "Flexible",
    pitch: "P2.5",
    y: "Y52",
    title: "Huidu",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1B2yqbc3sqV2h5KQZ5D-9PyAeRPCsagmX",
  },
  {
    id: "flex-p2_5-y52-r712",
    env: "Indoor",
    formFactor: "Flexible",
    pitch: "P2.5",
    y: "Y52",
    title: "R712 Update",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1dtaHI03Fj8_LNdIyXqIDNtyaEtZJdWWK",
  },

  {
    id: "flex-p1_86-y55-huidu",
    env: "Indoor",
    formFactor: "Flexible",
    pitch: "P1.86",
    y: "Y55",
    title: "Huidu",
    downloadUrl: "https://drive.google.com/uc?export=download&id=14mUNRe-RUJHbh6tQ3p2lYr3UyF4eqrCC",
  },
  // NOTE: In the provided source, P1.86 Flexible does not include an R712 Update link.
  // If you still want to show it (as a universal receiver-card update), keep this entry.
  {
    id: "flex-p1_86-y55-r712",
    env: "Indoor",
    formFactor: "Flexible",
    pitch: "P1.86",
    y: "Y55",
    title: "R712 Update",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1dtaHI03Fj8_LNdIyXqIDNtyaEtZJdWWK",
    note: "Universal R712 update file",
  },
];

function pitchNumber(p: string): number {
  // "P3.076" -> 3.076
  const n = Number.parseFloat(p.replace(/^P/i, ""));
  return Number.isFinite(n) ? n : 0;
}

function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

export default function DownloadsPage() {
  const [env, setEnv] = useState<Env>("Outdoor");
  const [modelType, setModelType] = useState<"All" | FormFactor>("All");
  const [pitch, setPitch] = useState<string>("");

  const filteredByEnv = useMemo(() => {
    return CONFIG_FILES.filter((f) => f.env === env);
  }, [env]);

  const filteredByEnvAndType = useMemo(() => {
    if (env !== "Indoor") return filteredByEnv;
    if (modelType === "All") return filteredByEnv;
    return filteredByEnv.filter((f) => f.formFactor === modelType);
  }, [env, modelType, filteredByEnv]);

  const pitchOptions = useMemo(() => {
    const set = new Set(filteredByEnvAndType.map((f) => f.pitch));
    return Array.from(set).sort((a, b) => pitchNumber(b) - pitchNumber(a));
  }, [filteredByEnvAndType]);

  // Keep pitch valid when env/type changes
  React.useEffect(() => {
    if (!pitchOptions.length) {
      setPitch("");
      return;
    }
    if (!pitchOptions.includes(pitch)) {
      setPitch(pitchOptions[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [env, modelType, pitchOptions.join("|")]);

  const visibleFiles = useMemo(() => {
    return filteredByEnvAndType
      .filter((f) => f.pitch === pitch)
      .sort((a, b) => {
        // Put Huidu before updates
        if (a.title === b.title) return 0;
        if (a.title.toLowerCase().includes("huidu")) return -1;
        if (b.title.toLowerCase().includes("huidu")) return 1;
        return a.title.localeCompare(b.title);
      });
  }, [filteredByEnvAndType, pitch]);

  return (
    <div className="min-h-screen bg-[#0b0f17] text-white">
      <Header />

      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90">
            <Sparkles className="h-4 w-4" />
            Downloads
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            LED Configuration Files
          </h1>
          <p className="mt-2 max-w-2xl text-white/70">
            Select Indoor/Outdoor, pick the pixel pitch (P), then download the exact files.
          </p>
        </motion.div>

        {/* Controls */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Env tabs */}
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <div className="inline-flex w-full rounded-xl border border-white/10 bg-black/20 p-1 sm:w-auto">
                <button
                  type="button"
                  onClick={() => setEnv("Outdoor")}
                  className={classNames(
                    "flex-1 rounded-lg px-4 py-2 text-sm transition sm:flex-none",
                    env === "Outdoor" ? "bg-white/10 text-white" : "text-white/70 hover:text-white"
                  )}
                >
                  <span className="inline-flex items-center gap-2">
                    <Monitor className="h-4 w-4" />
                    Outdoor
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setEnv("Indoor")}
                  className={classNames(
                    "flex-1 rounded-lg px-4 py-2 text-sm transition sm:flex-none",
                    env === "Indoor" ? "bg-white/10 text-white" : "text-white/70 hover:text-white"
                  )}
                >
                  <span className="inline-flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    Indoor
                  </span>
                </button>
              </div>

              {/* Model type (Indoor only) */}
              {env === "Indoor" && (
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 text-sm text-white/70">
                    <Filter className="h-4 w-4" />
                    Type
                  </span>
                  <select
                    value={modelType}
                    onChange={(e) => setModelType(e.target.value as "All" | FormFactor)}
                    className="h-10 rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-white outline-none ring-0"
                  >
                    <option value="All">All</option>
                    <option value="Standard">Standard</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              )}
            </div>

            {/* Pitch dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/70">Pixel Pitch</span>
              <select
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
                className="h-10 min-w-[180px] rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-white outline-none ring-0"
              >
                {pitchOptions.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Files grid */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {visibleFiles.map((f) => (
              <div
                key={f.id}
                className="rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-base font-semibold">{f.title}</span>

                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/80">
                        {f.pitch}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/80">
                        {f.y}
                      </span>

                      {env === "Indoor" && (
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/80">
                          {f.formFactor}
                        </span>
                      )}
                    </div>

                    {f.subtitle && (
                      <div className="mt-1 text-sm text-white/70">{f.subtitle}</div>
                    )}

                    {f.note && (
                      <div className="mt-2 text-xs text-white/55">{f.note}</div>
                    )}
                  </div>

                  <a
                    href={f.downloadUrl}
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                </div>
              </div>
            ))}

            {!visibleFiles.length && (
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-white/70 sm:col-span-2">
                No files found for this selection.
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
