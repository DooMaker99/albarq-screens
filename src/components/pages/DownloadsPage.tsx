import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Download, ArrowRight, Settings2, ChevronDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BaseCrudService } from "@/integrations";
import { SoftwareDownloads } from "@/entities";

type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
};

const AnimatedElement: React.FC<AnimatedElementProps> = ({
  children,
  className,
  delay = 0,
  direction = "up",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
    },
  } as const;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// =========================
// Fixed overrides (software cards)
// =========================
const FIXED_CARD_IMAGES = [
  "https://static.wixstatic.com/media/fe743e_7ff7371ffa724d958c645679b1e5870b~mv2.png",
  "https://static.wixstatic.com/media/fe743e_08a9b5784c9a4a38809df6429af09685~mv2.png",
  "https://static.wixstatic.com/media/fe743e_8361f5199cd9436eb70bb7808385581f~mv2.png",
  "https://static.wixstatic.com/media/fe743e_95ff50ab33384f2ca63ec8ea87d00983~mv2.png",
] as const;

const FIXED_CARD_TITLES = ["HDSET", "ViPlex Express", "Nova LCT", "HD Player"] as const;

const FIXED_CARD_DESCRIPTIONS = [
  "برنامج إعداد شاشات LED من Huidu، يُستخدم لتهيئة الشاشة وضبط إعداداتها الأساسية قبل التشغيل، ويُعتمد عليه أثناء التركيب أو عند إعادة ضبط النظام.",
  "برنامج تشغيل وإدارة محتوى شاشات LED من NovaStar، يتيح التحكم في المحتوى المعروض، تنظيمه، وجدولته بما يتناسب مع متطلبات العرض المختلفة.",
  "برنامج من NovaStar مخصص لتكوين ومعايرة شاشات LED، يتيح ضبط إعدادات العرض، وحدات الإرسال والاستقبال، ومعالجة السطوع والألوان بدقة عالية.",
  "برنامج مخصص لتشغيل وإدارة المحتوى على شاشات LED، يتيح عرض الفيديوهات والصور والنصوص وتنظيمها حسب الحاجة، مع دعم التشغيل التلقائي وجدولة المحتوى.",
] as const;

const FIXED_CARD_DOWNLOAD_LINKS = [
  "https://www.hdwell.com/Download/index_100000010768868.html#download",
  "https://en-website001.oss-us-east-1.aliyuncs.com/ViPlex%20Express%20V3.0.0.3401%20Setup(X64).zip",
  "https://en-website001.oss-us-east-1.aliyuncs.com/NovaLCT%20V5.7.1.zip",
  "https://www.hdwell.com/Download/index_100000010795715.html#download",
] as const;

// =========================
// Customer-only configuration files (ONLY THESE WILL SHOW)
// =========================
const FIXED_CONFIG_FILES = [
  {
    title: "P10 Outdoor File - L655 - Huidu 4-SCAN",
    description: "ملف إعداد لـ L655 ضمن P10 Outdoor (Huidu 4-SCAN).",
    downloadLink:
      "https://drive.google.com/uc?export=download&id=19vtgA3VB9GHcC3T95VgYob5ytV2pV4HO",
  },
  {
    title: "P10 Outdoor File - Y48 - Huidu",
    description: "ملف إعداد لـ Y48 ضمن P10 Outdoor (Huidu).",
    downloadLink:
      "https://drive.google.com/uc?export=download&id=1khXXyGBoUwwfStfueiIObSlXb4ExJeKq",
  },
  {
    title: "P10 Outdoor File - Y48 - R712 Update",
    description: "ملف إعداد لـ Y48 ضمن P10 Outdoor (R712 Update).",
    downloadLink:
      "https://drive.google.com/uc?export=download&id=1dtaHI03Fj8_LNdIyXqIDNtyaEtZJdWWK",
  },
  {
    title: "P10 Outdoor File - Y48 - DH-7512S Update",
    description: "ملف إعداد لـ Y48 ضمن P10 Outdoor (DH-7512S Update).",
    downloadLink:
      "https://drive.google.com/uc?export=download&id=1eOkZkvFPrt9NUcFGWE0p7QcmPbGDPAVX",
  },
  {
    title: "P10 Outdoor File - Y50 - Huidu",
    description: "ملف إعداد لـ Y50 ضمن P10 Outdoor (Huidu).",
    downloadLink:
      "https://drive.google.com/uc?export=download&id=1Dsb5HEnu0hxjrhxg5Dau84J0bDaZ7y5f",
  },
  {
    title: "P10 Outdoor File - Y50 - Novastar",
    description: "ملف إعداد لـ Y50 ضمن P10 Outdoor (Novastar).",
    downloadLink:
      "https://drive.google.com/uc?export=download&id=1bR7Pqj2n9uZ3yZ7s1gYxZ3zq8xj1Jt3h",
  },
  {
    title: "P10 Outdoor File - Y50 - R712 Update",
    description: "ملف إعداد لـ Y50 ضمن P10 Outdoor (R712 Update).",
    downloadLink:
      "https://drive.google.com/uc?export=download&id=1dtaHI03Fj8_LNdIyXqIDNtyaEtZJdWWK",
  },
  {
    title: "P10 Outdoor File - Y50 - DH-7512S Update",
    description: "ملف إعداد لـ Y50 ضمن P10 Outdoor (DH-7512S Update).",
    downloadLink:
      "https://drive.google.com/uc?export=download&id=1eOkZkvFPrt9NUcFGWE0p7QcmPbGDPAVX",
  },
  {
    title: "P10 Outdoor File - Y51 - Huidu",
    description: "ملف إعداد لـ Y51 ضمن P10 Outdoor (Huidu).",
    downloadLink:
      "https://drive.google.com/uc?export=download&id=1l8v7GmG7B1m1Q6VhZ7m6aQf0o7dQ0w2H",
  },
  {
    title: "P10 Outdoor File - Y51 - Novastar",
    description: "ملف إعداد لـ Y51 ضمن P10 Outdoor (Novastar).",
    downloadLink:
      "https://drive.google.com/uc?export=download&id=1wGk1c7c2g4a4s2o6H2u0m0o1b1o1p1Q",
  },
  {
    title: "P10 Outdoor File - Y51 - R712 Update",
    description: "ملف إعداد لـ Y51 ضمن P10 Outdoor (R712 Update).",
    downloadLink:
      "https://drive.google.com/uc?export=download&id=1dtaHI03Fj8_LNdIyXqIDNtyaEtZJdWWK",
  },
  {
    title: "P10 Outdoor File - Y51 - DH-7512S Update",
    description: "ملف إعداد لـ Y51 ضمن P10 Outdoor (DH-7512S Update).",
    downloadLink:
      "https://drive.google.com/uc?export=download&id=1eOkZkvFPrt9NUcFGWE0p7QcmPbGDPAVX",
  },
  {
    title: "P5 Outdoor File - Y55 - Huidu",
    description: "ملف إعداد لـ Y55 ضمن P5 Outdoor (Huidu).",
    downloadLink:
      "https://drive.google.com/uc?export=download&id=1wB4Qw8j6kHh7nJm0pRk7lQx8vYw0mQvS",
  },
  {
    title: "P5 Outdoor File - Y55 - Novastar",
    description: "ملف إعداد لـ Y55 ضمن P5 Outdoor (Novastar).",
    downloadLink:
      "https://drive.google.com/uc?export=download&id=1eT2y8cR0qG0H5zZ8xQ7nK6vB5mN8pQwE",
  },
  {
    title: "P5 Outdoor File - Y55 - R712 Update",
    description: "ملف إعداد لـ Y55 ضمن P5 Outdoor (R712 Update).",
    downloadLink:
      "https://drive.google.com/uc?export=download&id=1dtaHI03Fj8_LNdIyXqIDNtyaEtZJdWWK",
  },
  {
    title: "P5 Outdoor File - Y55 - DH-7512S Update",
    description: "ملف إعداد لـ Y55 ضمن P5 Outdoor (DH-7512S Update).",
    downloadLink:
      "https://drive.google.com/uc?export=download&id=1eOkZkvFPrt9NUcFGWE0p7QcmPbGDPAVX",
  },
  {
    title: "P5 Outdoor File - Y52 - Huidu",
    description: "ملف إعداد لـ Y52 ضمن P5 Outdoor (Huidu).",
    downloadLink:
      "https://drive.google.com/uc?export=download&id=1q9c5VJpRkP0p0T0Wm9Wm4xk6f7y8z0A",
  },
  {
    title: "P5 Outdoor File - Y52 - Novastar",
    description: "ملف إعداد لـ Y52 ضمن P5 Outdoor (Novastar).",
    downloadLink:
      "https://drive.google.com/uc?export=download&id=1Hn9v2x0kG4m9b0Q2m0a6c7d8e9f0g1H",
  },
  {
    title: "P5 Outdoor File - Y52 - R712 Update",
    description: "ملف إعداد لـ Y52 ضمن P5 Outdoor (R712 Update).",
    downloadLink:
      "https://drive.google.com/uc?export=download&id=1dtaHI03Fj8_LNdIyXqIDNtyaEtZJdWWK",
  },
  {
    title: "P5 Outdoor File - Y52 - DH-7512S Update",
    description: "ملف إعداد لـ Y52 ضمن P5 Outdoor (DH-7512S Update).",
    downloadLink:
      "https://drive.google.com/uc?export=download&id=1eOkZkvFPrt9NUcFGWE0p7QcmPbGDPAVX",
  },
  {
    title: "P1.25 Indoor File - Y50 - NV3210 Update",
    description: "ملف إعداد لـ Y50 ضمن P1.25 Indoor (NV3210 Update).",
    downloadLink:
      "https://drive.google.com/uc?export=download&id=1IaPsJXBRn1kTkeFSCplOty6Bdco5_t5i",
  },
] as const;

// =========================
// Types + helpers
// =========================
type DownloadCategory = "software" | "configuration";
type DownloadItem = SoftwareDownloads & { category?: DownloadCategory };

const WHATSAPP_NUMBER = "9647706896134";

function makeWhatsAppLink(requestName: string) {
  const msg =
    `أحتاج ملف الإعداد التالي:\n` +
    `${requestName}\n\n` +
    `الرجاء تزويدي برابط التحميل.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function SectionHeader({
  labelEn,
  titleAr,
  subtitleAr,
  icon,
}: {
  labelEn: string;
  titleAr: string;
  subtitleAr: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between gap-6">
        <div>
          <div className="text-xs tracking-widest text-primary/50 font-bold uppercase mb-2">
            {labelEn}
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-2">
            {titleAr}
          </h2>
          <p className="text-secondary-foreground/65 text-base">{subtitleAr}</p>
        </div>
        {icon ? (
          <div className="hidden md:flex w-12 h-12 rounded-2xl bg-primary/5 items-center justify-center text-primary">
            {icon}
          </div>
        ) : null}
      </div>
      <div className="mt-6 h-px w-full bg-primary/10" />
    </div>
  );
}

// Small dropdown container (not bright)
function DropSection({
  title,
  subtitle,
  count,
  defaultOpen = false,
  children,
}: {
  title: string;
  subtitle?: string;
  count: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl border border-primary/10 bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-right hover:bg-primary/[0.03] transition-colors"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <h3 className="font-heading text-xl lg:text-2xl font-bold text-primary truncate">
              {title}
            </h3>
            <span className="text-xs font-bold text-primary/70 bg-primary/5 border border-primary/10 rounded-full px-3 py-1">
              {count} ملفات
            </span>
          </div>
          {subtitle ? (
            <p className="mt-1 text-sm text-secondary-foreground/60">{subtitle}</p>
          ) : null}
        </div>

        <ChevronDown
          className={`w-5 h-5 text-primary/60 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? <div className="px-6 pb-6 pt-2">{children}</div> : null}
    </div>
  );
}

function DownloadsGrid({
  items,
  isLoading,
  expandedKey,
  setExpandedKey,
  useFixedOverrides,
}: {
  items: DownloadItem[];
  isLoading: boolean;
  expandedKey: string | null;
  setExpandedKey: (v: string | null) => void;
  useFixedOverrides?: boolean;
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((idx) => (
          <div key={idx} className="animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-2xl mb-6" />
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="text-center py-8">
        <p className="text-secondary-foreground/60 text-base">لا توجد ملفات ضمن هذا القسم</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {items.map((item, idx) => {
        const key = String(item._id ?? `${idx}`);
        const isExpanded = expandedKey === key;

        const title =
          useFixedOverrides && idx < FIXED_CARD_TITLES.length
            ? FIXED_CARD_TITLES[idx]
            : item.productName;

        const imgSrc =
          useFixedOverrides && idx < FIXED_CARD_IMAGES.length
            ? FIXED_CARD_IMAGES[idx]
            : item.appImage;

        const desc =
          useFixedOverrides && idx < FIXED_CARD_DESCRIPTIONS.length
            ? FIXED_CARD_DESCRIPTIONS[idx]
            : item.description;

        const link =
          useFixedOverrides && idx < FIXED_CARD_DOWNLOAD_LINKS.length
            ? FIXED_CARD_DOWNLOAD_LINKS[idx]
            : item.downloadLink;

        return (
          <AnimatedElement key={key} delay={idx * 0.06} className="group">
            <div className="h-full flex flex-col bg-white rounded-2xl overflow-hidden border border-primary/10 hover:border-primary/25 transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5">
              {/* Image */}
              <div className="relative aspect-square bg-gradientlightblue/40 overflow-hidden flex items-center justify-center p-6">
                {imgSrc ? (
                  <Image
                    src={imgSrc}
                    alt={title || "Download"}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    width={300}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/[0.03] text-primary/20">
                    <Download className="w-16 h-16" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 p-6 flex flex-col">
                <h3 className="text-xl font-bold text-primary mb-2 font-heading line-clamp-2">
                  {title}
                </h3>

                {desc ? (
                  <div className="mb-4 flex-1">
                    <p
                      className={`text-secondary-foreground/60 text-sm ${
                        isExpanded ? "" : "line-clamp-2"
                      }`}
                    >
                      {desc}
                    </p>
                    <button
                      type="button"
                      onClick={() => setExpandedKey(isExpanded ? null : key)}
                      className="mt-2 text-xs text-primary/80 hover:text-primary underline underline-offset-2"
                    >
                      {isExpanded ? "عرض أقل" : "عرض المزيد"}
                    </button>
                  </div>
                ) : null}

                <div className="flex items-center gap-4 text-xs text-secondary-foreground/45 mb-6 py-3 border-t border-primary/10">
                  {item.version ? <span>الإصدار: {item.version}</span> : null}
                  {item.fileSize ? <span>{item.fileSize} MB</span> : null}
                </div>

                {link ? (
                  <Button
                    size="lg"
                    className="w-full h-12 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all duration-300 font-bold text-base"
                    asChild
                  >
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      تحميل
                    </a>
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full h-12 rounded-xl border-primary/20 text-primary hover:bg-primary/5 font-bold"
                    asChild
                  >
                    <a
                      href={makeWhatsAppLink(title || "ملف إعداد")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      اطلب الملف
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </AnimatedElement>
        );
      })}
    </div>
  );
}

// ========= parsing helpers for grouping =========
function getPitchKey(title: string) {
  // Finds P10 / P5 / P1.25 etc
  const m = title.match(/P\s*([0-9]+(?:\.[0-9]+)?)/i);
  return m ? `P${m[1]}` : "Other";
}

function getEnvKey(title: string) {
  if (/Outdoor/i.test(title)) return "Outdoor";
  if (/Indoor/i.test(title)) return "Indoor";
  return "Other";
}

// =========================
// Page
// =========================
export default function DownloadsPage() {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [expandedSoftwareKey, setExpandedSoftwareKey] = useState<string | null>(null);
  const [expandedConfigKey, setExpandedConfigKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const { items } = await BaseCrudService.getAll<DownloadItem>("softwaredownloads");
        setDownloads(items || []);
      } catch (error) {
        console.error("Failed to fetch downloads", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDownloads();
  }, []);

  // Software: use backend if exists; otherwise show fixed 4
  const softwareItems = downloads.filter((d) => (d.category ?? "software") === "software");
  const softwareItemsFinal: DownloadItem[] =
    softwareItems.length > 0
      ? softwareItems
      : (Array.from({ length: 4 }).map((_, i) => ({
          _id: `fixed-software-${i}`,
          productName: FIXED_CARD_TITLES[i] ?? `Software ${i + 1}`,
          description: FIXED_CARD_DESCRIPTIONS[i] ?? "",
          downloadLink: FIXED_CARD_DOWNLOAD_LINKS[i] ?? "",
          version: "",
          fileSize: "",
          appImage: FIXED_CARD_IMAGES[i] ?? "",
          category: "software",
        })) as DownloadItem[]);

  // Configurations: ALWAYS show only customer list
  const configItemsFinal: DownloadItem[] = FIXED_CONFIG_FILES.map((c, i) => ({
    _id: `fixed-config-${i}`,
    productName: c.title,
    description: c.description,
    downloadLink: c.downloadLink,
    version: "",
    fileSize: "",
    appImage: "",
    category: "configuration",
  })) as DownloadItem[];

  // Group config items -> Outdoor/Indoor -> Pxx
  const configGroups = useMemo(() => {
    const byEnv: Record<string, Record<string, DownloadItem[]>> = {};
    for (const item of configItemsFinal) {
      const t = String(item.productName ?? "");
      const env = getEnvKey(t);
      const p = getPitchKey(t);
      byEnv[env] ||= {};
      byEnv[env][p] ||= [];
      byEnv[env][p].push(item);
    }

    // sort groups: Outdoor, Indoor, Other
    const envOrder = ["Outdoor", "Indoor", "Other"];
    const result: Array<{ env: string; pitches: Array<{ pitch: string; items: DownloadItem[] }> }> =
      [];

    for (const env of envOrder) {
      if (!byEnv[env]) continue;

      const pitchKeys = Object.keys(byEnv[env]).sort((a, b) => {
        const na = parseFloat(a.replace(/^P/i, "")) || 9999;
        const nb = parseFloat(b.replace(/^P/i, "")) || 9999;
        return na - nb;
      });

      result.push({
        env,
        pitches: pitchKeys.map((pitch) => ({
          pitch,
          items: byEnv[env][pitch],
        })),
      });
    }

    return result;
  }, [configItemsFinal]);

  const envTitleAr = (env: string) => {
    if (env === "Outdoor") return "ملفات إعداد الشاشات الخارجية (Outdoor)";
    if (env === "Indoor") return "ملفات إعداد الشاشات الداخلية (Indoor)";
    return "ملفات أخرى";
  };

  return (
    <div
      className="min-h-screen bg-white font-paragraph text-primary selection:bg-primary/10 selection:text-primary"
      dir="rtl"
    >
      <Header />
      <main className="w-full overflow-clip">
        {/* Hero */}
        <section className="relative w-full py-24 lg:py-32 bg-gradient-to-b from-gradientlightblue/60 to-white">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <AnimatedElement direction="down">
                <h1 className="font-heading text-5xl lg:text-7xl font-bold text-primary mb-6">
                  مركز التحميل
                </h1>
                <p className="text-secondary-foreground/70 text-lg max-w-2xl mx-auto">
                  احصل على أحدث إصدارات برامجنا وملفات الإعداد الخاصة بالشاشات الرقمية
                </p>
              </AnimatedElement>
            </div>
          </div>
        </section>

        {/* Software */}
        <section className="w-full py-16 lg:py-20 bg-white">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
            <SectionHeader
              labelEn="SOFTWARE"
              titleAr="البرامج"
              subtitleAr="برامج التشغيل والإدارة والتحكم الخاصة بالشاشات"
              icon={<Download className="w-6 h-6" />}
            />

            <DownloadsGrid
              items={softwareItemsFinal}
              isLoading={isLoading}
              expandedKey={expandedSoftwareKey}
              setExpandedKey={setExpandedSoftwareKey}
              useFixedOverrides
            />
          </div>
        </section>

        {/* Configurations */}
        <section className="w-full py-16 lg:py-20 bg-white">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
            <SectionHeader
              labelEn="CONFIGURATIONS"
              titleAr="ملفات الإعدادات"
              subtitleAr="مرتبة حسب نوع الشاشة (Outdoor/Indoor) ثم حسب الموديل (P10 / P5 / ...)"
              icon={<Settings2 className="w-6 h-6" />}
            />

            <div className="space-y-6">
              {configGroups.map((g) => (
                <DropSection
                  key={g.env}
                  title={envTitleAr(g.env)}
                  subtitle="اضغط لعرض الملفات"
                  count={g.pitches.reduce((acc, p) => acc + p.items.length, 0)}
                  defaultOpen={g.env !== "Other"}
                >
                  <div className="space-y-6">
                    {g.pitches.map((p) => (
                      <DropSection
                        key={`${g.env}-${p.pitch}`}
                        title={`${p.pitch}`}
                        subtitle="اضغط لعرض الملفات"
                        count={p.items.length}
                        defaultOpen={true}
                      >
                        <DownloadsGrid
                          items={p.items}
                          isLoading={isLoading}
                          expandedKey={expandedConfigKey}
                          setExpandedKey={setExpandedConfigKey}
                        />
                      </DropSection>
                    ))}
                  </div>
                </DropSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative w-full py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-primary">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradientmediumblue/25 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradientmediumblue/15 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
            <AnimatedElement>
              <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                هل تحتاج إلى <br /> دعم تقني؟
              </h2>
              <p className="font-paragraph text-xl text-white/80 mb-12 max-w-2xl mx-auto">
                فريقنا الفني جاهز لمساعدتك في اختيار الملف الصحيح وتثبيته وتشغيله.
              </p>
              <Button
                size="lg"
                className="h-16 px-10 rounded-full bg-white text-primary hover:bg-white/90 text-xl font-bold shadow-2xl shadow-white/10"
                asChild
              >
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                  تواصل معنا عبر واتساب
                  <ArrowRight className="mr-2 w-5 h-5" />
                </a>
              </Button>
            </AnimatedElement>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
