import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download, ArrowRight, Settings2 } from "lucide-react";
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

// Your fixed overrides (software cards)
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
  "برنامج إعداد برنامج مخصص لتشغيل وإدارة المحتوى على شاشات LED، يتيح عرض الفيديوهات والصور والنصوص وتنظيمها حسب الحاجة، مع دعم التشغيل التلقائي وجدولة المحتوى.",
] as const;

const FIXED_CARD_DOWNLOAD_LINKS = [
  "https://www.hdwell.com/Download/index_100000010768868.html#download",
  "https://en-website001.oss-us-east-1.aliyuncs.com/ViPlex%20Express%20V3.0.0.3401%20Setup(X64).zip",
  "https://en-website001.oss-us-east-1.aliyuncs.com/NovaLCT%20V5.7.1.zip",
  "https://www.hdwell.com/Download/index_100000010795715.html#download",
] as const;

const FIXED_CONFIG_FILES = [
  {
    title: "P10 Outdoor - L655 - Huidu - 4 Scan",
    description: "ملف إعداد للموديول (تصحيح ألوان/Scan/توصيل).",
    downloadLink: "PUT_YOUR_LINK_HERE",
  },
  {
    title: "P5 Outdoor - Y55 - Novastar",
    description: "ملف إعداد للموديول (تصحيح ألوان/Scan/توصيل).",
    downloadLink: "PUT_YOUR_LINK_HERE",
  },
  // add the rest...
] as const;



type DownloadCategory = "software" | "configuration";

// If your entity typing doesn’t include category yet, this keeps TS happy.
type DownloadItem = SoftwareDownloads & { category?: DownloadCategory };

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
          <div className="text-xs tracking-widest text-primary/60 font-bold uppercase mb-2">
            {labelEn}
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-2">
            {titleAr}
          </h2>
          <p className="text-secondary-foreground/70 text-base">{subtitleAr}</p>
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
  useFixedOverrides?: boolean; // only for your 4 software cards
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
      <div className="text-center py-10">
        <p className="text-secondary-foreground/60 text-lg">لا توجد ملفات متاحة هنا حالياً</p>
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
          <AnimatedElement key={key} delay={idx * 0.08} className="group">
            <div className="h-full flex flex-col bg-white rounded-2xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
              {/* Image */}
              <div className="relative aspect-square bg-gradientlightblue overflow-hidden flex items-center justify-center p-6">
                {imgSrc ? (
                  <Image
                    src={imgSrc}
                    alt={title || "Download"}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    width={300}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-gradientmediumblue/10 text-primary/20">
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

                <div className="flex items-center gap-4 text-xs text-secondary-foreground/50 mb-6 py-3 border-t border-primary/10">
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
                    disabled
                    className="w-full h-12 rounded-xl bg-gray-200 text-gray-400 cursor-not-allowed text-base"
                  >
                    غير متاح
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

  const softwareItems = downloads.filter((d) => (d.category ?? "software") === "software");
  const configItems = downloads.filter((d) => d.category === "configuration");
  const configItemsFinal =
  configItems.length > 0
    ? configItems
    : FIXED_CONFIG_FILES.map((c, i) => ({
        _id: `fixed-config-${i}`,
        productName: c.title,
        description: c.description,
        downloadLink: c.downloadLink,
        version: "",
        fileSize: "",
        appImage: "",
        category: "configuration",
      }));

  return (
    <div
      className="min-h-screen bg-white font-paragraph text-primary selection:bg-primary/10 selection:text-primary"
      dir="rtl"
    >
      <Header />
      <main className="w-full overflow-clip">
        {/* Hero */}
        <section className="relative w-full py-24 lg:py-32 bg-gradient-to-b from-gradientlightblue to-white">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
            <div className="text-center mb-20">
              <AnimatedElement direction="down">
                <h1 className="font-heading text-5xl lg:text-7xl font-bold text-primary mb-6">
                  مركز التحميل
                </h1>
                <p className="text-secondary-foreground/70 text-lg max-w-2xl mx-auto">
                  برامج التشغيل + ملفات الإعدادات الخاصة بالشاشات (Configuration Files)
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
              items={softwareItems}
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
              subtitleAr="ملفات إعداد وتوصيف الموديولات (Module Config Files) لتصحيح الألوان/الـScan/التوصيل"
              icon={<Settings2 className="w-6 h-6" />}
            />

            <DownloadsGrid
  items={configItemsFinal}
  isLoading={isLoading}
  expandedKey={expandedConfigKey}
  setExpandedKey={setExpandedConfigKey}
/>

          </div>
        </section>

        {/* CTA */}
        <section className="relative w-full py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-primary">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradientmediumblue/30 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradientmediumblue/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
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
                <a href="https://wa.me/9647706896134" target="_blank" rel="noopener noreferrer">
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
