import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Monitor, Wrench, Zap, Settings, CheckCircle, Phone, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Service = {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  images: string[]; // gallery images (clickable)
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

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

  useEffect(() => {
    if (open) setIndex(initialIndex);
  }, [open, initialIndex]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, images.length, onClose]);

  if (!open) return null;

  const hasMany = images.length > 1;
  const current = images[index];

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onMouseDown={(e) => {
        // close only when clicking the backdrop
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
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-black">
          <img
            src={current}
            alt={title ? `${title} ${index + 1}` : `image ${index + 1}`}
            className="w-full max-h-[78vh] object-contain select-none"
            draggable={false}
            onError={(e) => {
              // if any remote image fails, show a gentle fallback
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />

          {hasMany ? (
            <>
              <button
                onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-2xl bg-white/10 hover:bg-white/15 text-white w-11 h-11"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => setIndex((i) => (i + 1) % images.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-2xl bg-white/10 hover:bg-white/15 text-white w-11 h-11"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/90 text-xs md:text-sm bg-black/35 px-3 py-1.5 rounded-full">
                {index + 1} / {images.length}
              </div>
            </>
          ) : null}
        </div>

        {hasMany ? (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {images.map((src, i) => (
              <button
                key={src + i}
                onClick={() => setIndex(i)}
                className={cn(
                  "relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-xl border",
                  i === index ? "border-white/70" : "border-white/15 hover:border-white/30"
                )}
                aria-label={`Open image ${i + 1}`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function ServicesPage() {
  /**
   * Images sourced from the YIYISTAR gallery file you provided.
   * - “Shoes” image removed: ChatGPT-Image-Jun-11-2025-08_31_28-PM.png
   * - Services now use image sets that actually match the service title.
   * - Images are clickable (lightbox).
   */

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
          // Outdoor LED Display (examples)
          "https://yiyistar.com/wp-content/uploads/2025/06/cgi-bin_mmwebwx-bin_webwxgetmsgimg__MsgID4738946102462867065skey@crypt_15e6f4b7_c76c90f12f68d94dacb06708af526f4dmmweb_appidwx_webfilehelper.jpg",
          "https://yiyistar.com/wp-content/uploads/2025/06/cgi-bin_mmwebwx-bin_webwxgetmsgimg__MsgID2477875716030917623skey@crypt_15e6f4b7_c76c90f12f68d94dacb06708af526f4dmmweb_appidwx_webfilehelper.jpg",
          "https://yiyistar.com/wp-content/uploads/2025/06/cgi-bin_mmwebwx-bin_webwxgetmsgimg__MsgID2137858873230181968skey@crypt_15e6f4b7_c76c90f12f68d94dacb06708af526f4dmmweb_appidwx_webfilehelper.jpg",
          "https://yiyistar.com/wp-content/uploads/2025/06/cgi-bin_mmwebwx-bin_webwxgetmsgimg__MsgID7996664974446174768skey@crypt_15e6f4b7_c76c90f12f68d94dacb06708af526f4dmmweb_appidwx_webfilehelper.jpg",
          // Outdoor Curved LED Screen (examples)
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
          // Indoor LED Screen (shoes image removed)
          "https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-08_47_04-PM.png",
          "https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-06_47_36-PM.png",
          // Indoor Cinema LED Screen (examples)
          "https://yiyistar.com/wp-content/uploads/2025/06/1.jpeg.jpg",
          "https://yiyistar.com/wp-content/uploads/2025/06/cgi-bin_mmwebwx-bin_webwxgetmsgimg__MsgID7676101468742074055skey@crypt_15e6f4b7_e6e1a3457cd925ef.jpg",
          "https://yiyistar.com/wp-content/uploads/2025/06/cgi-bin_mmwebwx-bin_webwxgetmsgimg__MsgID4084737201313892798skey@crypt_15e6f4b7_e6e1a3457cd925ef.jpg",
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
          // Bank and Airport LED Screen (examples)
          "https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-09_50_54-PM.png",
          "https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-09_34_54-PM.png",
          "https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-09_08_14-PM.png",
          "https://yiyistar.com/wp-content/uploads/2025/06/default-1.jpg",
          "https://yiyistar.com/wp-content/uploads/2025/06/default-2.jpg",
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
        // Use neutral, relevant “project / install” style images from the same gallery sets (no shoes, no mismatch)
        images: [
          "https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-06_21_03-PM.png",
          "https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-06_54_01-PM.png",
          "https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-09_08_14-PM.png",
        ],
      },
      {
        icon: Settings,
        title: "الصيانة الدورية",
        description:
          "خدمات صيانة دورية شاملة لضمان الأداء الأمثل للشاشاشات وإطالة عمرها الافتراضي، مع عقود صيانة مرنة.",
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
          "https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-09_50_54-PM.png",
          "https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-09_34_54-PM.png",
          "https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-09_08_14-PM.png",
        ],
      },
    ],
    []
  );

  // Lightbox state
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
      <section className="w-full bg-gradient-to-br from-gradientlightblue to-white py-20 lg:py-32">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
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
                      <service.icon className="w-8 h-8 text-primaryForeground" />
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

                    {/* Small CTA inside each service */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        variant="default"
                        className="bg-primary text-primaryForeground hover:opacity-90"
                        asChild
                      >
                        <Link to="/contact">اطلب عرض سعر</Link>
                      </Button>

                      <Button
                        variant="outline"
                        className="border-primary/30 text-primary hover:bg-primary/5"
                        onClick={() => openLightbox(service.title, service.images, 0)}
                      >
                        عرض الصور
                      </Button>
                    </div>
                  </div>

                  {/* Images */}
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="rounded-2xl overflow-hidden border border-primary/10 bg-gradient-to-br from-gradientlightblue to-gradientmediumblue/20">
                      {/* Big preview (clickable) */}
                      <button
                        type="button"
                        onClick={() => openLightbox(service.title, service.images, 0)}
                        className="relative w-full aspect-video overflow-hidden group"
                        aria-label={`Open ${service.title} images`}
                      >
                        <img
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

                      {/* Thumbnails (clickable) */}
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
                              <img src={src} alt="" className="h-full w-full object-cover" />
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
              {
                title: "منتجات عالمية",
                description: "نستورد من أفضل الشركات العالمية المتخصصة في تصنيع الشاشات",
              },
              {
                title: "ضمان شامل",
                description: "نوفر ضمان شامل على جميع المنتجات والخدمات التي نقدمها",
              },
              {
                title: "أسعار تنافسية",
                description: "أسعار مناسبة مع إمكانية التقسيط وخطط دفع مرنة",
              },
              {
                title: "خبرة محلية",
                description: "فهم عميق للسوق العراقي واحتياجات العملاء المحليين",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-8 text-center border border-primary/10"
              >
                <h3 className="font-heading text-xl font-semibold text-primary mb-3">
                  {item.title}
                </h3>
                <p className="font-paragraph text-base text-secondaryForeground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section (contrast fixed, same color scheme) */}
      <section className="w-full bg-primary py-20 lg:py-28">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl lg:text-5xl font-bold mb-6 text-primaryForeground">
              هل تحتاج إلى استشارة؟
            </h2>

            <p className="font-paragraph text-lg mb-10 max-w-2xl mx-auto text-primaryForeground/85">
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

              {/* Dark button => bright text */}
              <Button
                size="lg"
                className="bg-primaryForeground text-primary hover:bg-primaryForeground/90 text-lg px-10 py-6"
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
