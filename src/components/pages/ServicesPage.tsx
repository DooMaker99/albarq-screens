import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  Wrench,
  Zap,
  Settings,
  CheckCircle,
  Phone,
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  ZoomIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Service = {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  images: string[];
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function safeUrl(url: string) {
  try {
    return encodeURI(url);
  } catch {
    return url;
  }
}

function ImgWithFallback({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "w-full h-full flex items-center justify-center bg-gradient-to-br from-gradientlightblue to-gradientmediumblue/20",
          className
        )}
      >
        <div className="flex items-center gap-2 text-primary/70">
          <ImageIcon className="w-5 h-5" />
          <span className="text-sm">الصورة غير متاحة</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={safeUrl(src)}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

/**
 * Lightbox behavior:
 * - Thumbnails: DO NOT open anything. They only switch the main preview AND scroll to it.
 * - Main preview: opens full-screen "zoom" overlay when clicked.
 */
function Lightbox({
  open,
  onClose,
  images,
  initialIndex = 0,
  title,
}: {
  open: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
  title?: string;
}) {
  const [index, setIndex] = useState(initialIndex);
  const [zoomOpen, setZoomOpen] = useState(false);
  const previewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) setIndex(initialIndex);
  }, [open, initialIndex]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoomOpen) setZoomOpen(false);
        else onClose();
      }
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, images.length, onClose, zoomOpen]);

  useEffect(() => {
    if (open) setZoomOpen(false);
  }, [open]);

  const scrollPreviewIntoView = () => {
    previewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!open) return null;

  const hasMany = images.length > 1;
  const current = images[index];

  return (
    <>
      {/* Main modal */}
      <div
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        role="dialog"
        aria-modal="true"
        aria-label={title || "image viewer"}
      >
        <div className="relative w-full max-w-5xl">
          <div className="absolute -top-10 right-0 flex items-center gap-3">
            {title ? <div className="text-white/90 text-sm md:text-base">{title}</div> : null}
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/15 text-white w-10 h-10"
              aria-label="Close"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Preview */}
          <div ref={previewRef} className="relative overflow-hidden rounded-2xl bg-black">
            {/* CLICKING THE BIG IMAGE OPENS ZOOM */}
            <button
              type="button"
              className="relative w-full"
              onClick={() => setZoomOpen(true)}
              aria-label="Open full screen"
            >
              <div className="w-full max-h-[78vh]">
                <ImgWithFallback
                  src={current}
                  alt={title ? `${title} ${index + 1}` : `image ${index + 1}`}
                  className="w-full max-h-[78vh] object-contain select-none"
                />
              </div>

              <div className="absolute bottom-3 right-3 bg-black/35 text-white/90 text-xs md:text-sm px-3 py-1.5 rounded-full inline-flex items-center gap-2">
                <ZoomIn className="w-4 h-4" />
                اضغط للتكبير
              </div>
            </button>

            {hasMany ? (
              <>
                <button
                  onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-2xl bg-white/10 hover:bg-white/15 text-white w-11 h-11"
                  aria-label="Previous"
                  type="button"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={() => setIndex((i) => (i + 1) % images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-2xl bg-white/10 hover:bg-white/15 text-white w-11 h-11"
                  aria-label="Next"
                  type="button"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/90 text-xs md:text-sm bg-black/35 px-3 py-1.5 rounded-full">
                  {index + 1} / {images.length}
                </div>
              </>
            ) : null}
          </div>

          {/* Thumbnails: ONLY change preview + scroll to it (NO opening) */}
          {hasMany ? (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {images.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => {
                    setIndex(i);
                    scrollPreviewIntoView();
                  }}
                  className={cn(
                    "relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-xl border",
                    i === index ? "border-white/70" : "border-white/15 hover:border-white/30"
                  )}
                  aria-label={`Show image ${i + 1}`}
                >
                  <ImgWithFallback src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          ) : null}

          {hasMany ? (
            <div className="mt-2 text-xs text-white/70">
              اضغط على أي صورة مصغّرة للتبديل — والتكبير يكون فقط عند الضغط على الصورة الكبيرة
            </div>
          ) : null}
        </div>
      </div>

      {/* Zoom overlay (full screen) */}
      {zoomOpen ? (
        <div
          className="fixed inset-0 z-[110] bg-black/90 flex items-center justify-center p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setZoomOpen(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Zoom viewer"
        >
          <div className="relative w-full max-w-6xl">
            <div className="absolute -top-12 right-0 flex items-center gap-3">
              <button
                onClick={() => setZoomOpen(false)}
                className="inline-flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/15 text-white w-10 h-10"
                aria-label="Close zoom"
                type="button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden bg-black">
              <div className="w-full max-h-[86vh]">
                <ImgWithFallback
                  src={current}
                  alt={title ? `${title} zoom ${index + 1}` : `zoom ${index + 1}`}
                  className="w-full max-h-[86vh] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default function ServicesPage() {
  const services: Service[] = useMemo(
    () => [
      {
        icon: Monitor,
        title: "شاشات LED العملاقة الخارجية",
        description:
          "نوفر شاشات LED عملاقة عالية الدقة مصممة خصيصاً للاستخدام الخارجي، مقاومة للعوامل الجوية القاسية مع إضاءة ساطعة تضمن وضوح الصورة في جميع الأوقات.",
        features: [
          "دقة عالية تصل إلى 4K وأكثر",
          "مقاومة للماء والغبار (IP65)",
          "سطوع عالي يصل إلى 8000 nits",
          "استهلاك طاقة منخفض",
          "عمر افتراضي طويل يصل إلى 100,000 ساعة",
          "تحكم عن بعد بالمحتوى",
        ],
        images: [
          "https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-06_54_01-PM.png",
          "https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-06_37_51-PM.png",
          "https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-06_29_15-PM.png",
          "https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-06_26_38-PM.png",
        ],
      },
      {
        icon: Monitor,
        title: "شاشات LED الداخلية",
        description:
          "شاشات LED داخلية بدقة فائقة مثالية للمراكز التجارية، المطارات، الفنادق، والمعارض. تتميز بجودة صورة استثنائية وتصاميم أنيقة.",
        features: [
          "دقة عالية جداً للمسافات القريبة",
          "ألوان زاهية ودقيقة",
          "تصاميم نحيفة وعصرية",
          "سهولة التركيب والصيانة",
          "توافق مع أنظمة إدارة المحتوى",
          "خيارات أحجام متعددة",
        ],
        images: [
          // shoes image removed
          "https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-08_47_04-PM.png",
          "https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-06_47_36-PM.png",
          "https://yiyistar.com/wp-content/uploads/2025/06/default-1.jpg",
          "https://yiyistar.com/wp-content/uploads/2025/06/default-2.jpg",
        ],
      },
      {
        icon: Monitor,
        title: "شاشات العرض الرقمية (Digital Signage)",
        description:
          "حلول شاشات العرض الرقمية المتكاملة للمحلات التجارية والمطاعم والبنوك، مع أنظمة إدارة محتوى سهلة الاستخدام.",
        features: [
          "شاشات تفاعلية باللمس",
          "نظام إدارة محتوى متطور",
          "جدولة تلقائية للمحتوى",
          "دعم الفيديو والصور والنصوص",
          "تحديثات عن بعد",
          "تقارير وإحصائيات مفصلة",
        ],
        images: [
          "https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-09_50_54-PM.png",
          "https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-09_34_54-PM.png",
          "https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-09_08_14-PM.png",
        ],
      },
      {
        icon: Wrench,
        title: "التركيب والتشغيل",
        description:
          "فريق متخصص من المهندسين والفنيين لتركيب الشاشات بشكل احترافي وآمن، مع اختبار شامل وتدريب على الاستخدام.",
        features: [
          "دراسة الموقع والتخطيط المسبق",
          "تركيب آمن ومطابق للمعايير",
          "اختبار شامل للنظام",
          "تدريب الموظفين على الاستخدام",
          "ضمان على التركيب",
          "متابعة ما بعد التركيب",
        ],
        images: [
          "https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-06_21_03-PM.png",
          "https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-06_47_36-PM.png",
          "https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-06_26_38-PM.png",
        ],
      },
      {
        icon: Settings,
        title: "الصيانة الدورية",
        description:
          "خدمات صيانة دورية شاملة لضمان الأداء الأمثل للشاشات وإطالة عمرها الافتراضي، مع عقود صيانة مرنة.",
        features: [
          "فحص دوري شامل",
          "تنظيف وصيانة وقائية",
          "استبدال القطع التالفة",
          "تحديث البرمجيات",
          "عقود صيانة سنوية",
          "أولوية في الاستجابة",
        ],
        images: [
          "https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-06_26_38-PM.png",
          "https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-06_29_15-PM.png",
          "https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-06_37_51-PM.png",
        ],
      },
      {
        icon: Zap,
        title: "الدعم الفني المتواصل",
        description:
          "دعم فني على مدار الساعة لحل أي مشاكل تقنية بسرعة وكفاءة، مع فريق متخصص جاهز للاستجابة الفورية.",
        features: [
          "دعم فني 24/7",
          "استجابة سريعة للطوارئ",
          "دعم عن بعد وفي الموقع",
          "قطع غيار أصلية متوفرة",
          "فريق فني مدرب ومؤهل",
          "خط ساخن مخصص للعملاء",
        ],
        images: [
          "https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-09_34_54-PM.png",
          "https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-09_08_14-PM.png",
          "https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-09_50_54-PM.png",
        ],
      },
    ],
    []
  );

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxTitle, setLightboxTitle] = useState<string | undefined>(undefined);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (title: string, images: string[], index: number) => {
    setLightboxTitle(title);
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  return (
    <div className="min-h-screen bg-secondary" dir="rtl">
      <Header />
      <Lightbox
        open={lightboxOpen}
        onClose={closeLightbox}
        images={lightboxImages}
        initialIndex={lightboxIndex}
        title={lightboxTitle}
      />
      {/* Hero Section */}
      <section className="w-full from-gradientlightblue to-white py-20 lg:py-32 bg-[#c0c5f2ff]">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto bg-primary-foreground opacity-[0.35] border border-none"
          >
            <h1 className="font-heading text-4xl lg:text-6xl font-bold text-primary mb-6">
              خدماتنا
            </h1>
            <p className="font-paragraph text-lg lg:text-xl text-secondaryForeground leading-relaxed">
              نقدم مجموعة شاملة من الخدمات والحلول التقنية المتطورة في مجال الشاشات الإعلانية الرقمية
            </p>
          </motion.div>
        </div>
      </section>
      {/* Services List */}
      <section className="w-full bg-white py-20 lg:py-28">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="space-y-20">
            {services.map((service, index) => {
              const heroImage = service.images[0];

              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="grid lg:grid-cols-2 gap-12 items-center"
                >
                  {/* Text */}
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-xl mb-6">
                      <service.icon className="w-8 h-8 text-primary-foreground" />
                    </div>

                    <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-4">
                      {service.title}
                    </h2>

                    <p className="font-paragraph text-base lg:text-lg text-secondaryForeground mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 font-paragraph text-base text-secondaryForeground"
                        >
                          <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Buttons (contrast OK) */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      {/* Dark button => bright text */}
                      <Button
                        variant="default"
                        className="bg-primary text-primary-foreground hover:opacity-90"
                        asChild
                      >
                        <Link to="/contact">اطلب عرض سعر</Link>
                      </Button>

                      {/* Light/outline => dark text */}
                      <Button
                        variant="outline"
                        className="bg-white text-primary border-primary/30 hover:bg-primary/5"
                        onClick={() => openLightbox(service.title, service.images, 0)}
                      >
                        عرض الصور
                      </Button>
                    </div>
                  </div>

                  {/* Images */}
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="rounded-2xl overflow-hidden border border-primary/10 bg-gradient-to-br from-gradientlightblue to-gradientmediumblue/20">
                      <button
                        type="button"
                        onClick={() => openLightbox(service.title, service.images, 0)}
                        className="relative w-full aspect-video overflow-hidden group"
                        aria-label={`Open ${service.title} images`}
                      >
                        <ImgWithFallback
                          src={heroImage}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                          <div className="text-white/90 text-sm bg-black/35 px-3 py-1.5 rounded-full">
                            اضغط للتكبير
                          </div>
                          <div className="text-white/90 text-sm bg-black/35 px-3 py-1.5 rounded-full">
                            {service.images.length} صور
                          </div>
                        </div>
                      </button>

                      <div className="p-4">
                        <div className="flex gap-3 overflow-x-auto pb-1">
                          {service.images.slice(0, 8).map((src, i) => (
                            <button
                              key={src + i}
                              type="button"
                              onClick={() => openLightbox(service.title, service.images, i)}
                              className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl border border-primary/10 hover:border-primary/25"
                              aria-label={`Open ${service.title} image ${i + 1}`}
                            >
                              <ImgWithFallback src={src} alt="" className="h-full w-full object-cover" />
                            </button>
                          ))}
                        </div>
                        <div className="mt-2 text-xs text-secondaryForeground/70">
                          يمكنك الضغط على أي صورة لعرضها بحجم كامل
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Why Choose Us */}
      <section className="w-full bg-gradientlightblue py-20 lg:py-28">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl lg:text-5xl font-bold text-primary mb-4">
              لماذا تختار خدماتنا؟
            </h2>
            <p className="font-paragraph text-lg text-secondaryForeground max-w-3xl mx-auto">
              نتميز بمجموعة من المزايا التي تجعلنا الخيار الأمثل لمشاريعكم
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "منتجات عالمية", description: "نستورد من أفضل الشركات العالمية المتخصصة في تصنيع الشاشات" },
              { title: "ضمان شامل", description: "نوفر ضمان شامل على جميع المنتجات والخدمات التي نقدمها" },
              { title: "أسعار تنافسية", description: "أسعار مناسبة مع إمكانية التقسيط وخطط دفع مرنة" },
              { title: "خبرة محلية", description: "فهم عميق للسوق العراقي واحتياجات العملاء المحليين" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-8 text-center border border-primary/10"
              >
                <h3 className="font-heading text-xl font-semibold text-primary mb-3">{item.title}</h3>
                <p className="font-paragraph text-base text-secondaryForeground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section (contrast OK) */}
      <section className="w-full bg-primary py-20 lg:py-28">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl lg:text-5xl font-bold mb-6 text-primary-foreground">
              هل تحتاج إلى استشارة؟
            </h2>

            <p className="font-paragraph text-lg mb-10 max-w-2xl mx-auto text-primary-foreground/85">
              تواصل معنا الآن للحصول على استشارة مجانية وعرض سعر مخصص لاحتياجاتك
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Light button => dark text */}
              <Button
                size="lg"
                variant="outline"
                className="bg-white border-2 border-white hover:bg-white/90 text-lg px-10 py-6 text-primary"
                asChild
              >
                <Link to="/contact">تواصل معنا</Link>
              </Button>

              {/* Dark-ish button => bright text */}
              <Button
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-10 py-6"
                asChild
              >
                <a
                  href="https://wa.me/+9647706896134"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary"
                >
                  <Phone className="w-5 h-5" />
                  واتساب
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
