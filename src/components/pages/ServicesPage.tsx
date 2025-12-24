import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Images,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Service = {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  images: string[];
};

export default function ServicesPage() {
  // Gallery images extracted from the file you uploaded (yiyistar.com wp uploads)
  // (You can add/remove any URLs here freely.)
  const galleryPool = useMemo(
    () => [
      'https://yiyistar.com/wp-content/uploads/2025/06/default-1.jpg',
      'https://yiyistar.com/wp-content/uploads/2025/06/default-2.jpg',
      'https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-09_50_54-PM.png',
      'https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-09_34_54-PM.png',
      'https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-06_54_01-PM.png',
      'https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-06_47_36-PM.png',
      'https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-06_37_51-PM.png',
      'https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-06_29_15-PM.png',
      'https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-06_26_38-PM.png',
      'https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-06_21_03-PM.png',
      'https://yiyistar.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-11-2025-08_31_28-PM.png',
      // This one is from the same uploaded file; filename is long but valid:
      'https://yiyistar.com/wp-content/uploads/2025/06/cgi-bin_mmwebwx-bin_webwxgetmsgimg__MsgID7800494634690358579skey@crypt_15e6f4b7_e6e1a3457cd925ef77f528d6dec1c4e0mmweb_appidwx_webfilehelper.jpg',
    ],
    []
  );

  const services: Service[] = [
    {
      icon: Monitor,
      title: 'شاشات LED العملاقة الخارجية',
      description:
        'نوفر شاشات LED عملاقة عالية الدقة مصممة خصيصاً للاستخدام الخارجي، مقاومة للعوامل الجوية القاسية مع إضاءة ساطعة تضمن وضوح الصورة في جميع الأوقات.',
      features: [
        'دقة عالية تصل إلى 4K وأكثر',
        'مقاومة للماء والغبار (IP65)',
        'سطوع عالي يصل إلى 8000 nits',
        'استهلاك طاقة منخفض',
        'عمر افتراضي طويل يصل إلى 100,000 ساعة',
        'تحكم عن بعد بالمحتوى',
      ],
      images: [galleryPool[2], galleryPool[3], galleryPool[0], galleryPool[7]],
    },
    {
      icon: Monitor,
      title: 'شاشات LED الداخلية',
      description:
        'شاشات LED داخلية بدقة فائقة مثالية للمراكز التجارية، المطارات، الفنادق، والمعارض. تتميز بجودة صورة استثنائية وتصاميم أنيقة.',
      features: [
        'دقة عالية جداً للمسافات القريبة',
        'ألوان زاهية ودقيقة',
        'تصاميم نحيفة وعصرية',
        'سهولة التركيب والصيانة',
        'توافق مع أنظمة إدارة المحتوى',
        'خيارات أحجام متعددة',
      ],
      images: [galleryPool[1], galleryPool[6], galleryPool[4], galleryPool[10]],
    },
    {
      icon: Monitor,
      title: 'شاشات العرض الرقمية (Digital Signage)',
      description:
        'حلول شاشات العرض الرقمية المتكاملة للمحلات التجارية والمطاعم والبنوك، مع أنظمة إدارة محتوى سهلة الاستخدام.',
      features: [
        'شاشات تفاعلية باللمس',
        'نظام إدارة محتوى متطور',
        'جدولة تلقائية للمحتوى',
        'دعم الفيديو والصور والنصوص',
        'تحديثات عن بعد',
        'تقارير وإحصائيات مفصلة',
      ],
      images: [galleryPool[7], galleryPool[8], galleryPool[9], galleryPool[2]],
    },
    {
      icon: Wrench,
      title: 'التركيب والتشغيل',
      description:
        'فريق متخصص من المهندسين والفنيين لتركيب الشاشات بشكل احترافي وآمن، مع اختبار شامل وتدريب على الاستخدام.',
      features: [
        'دراسة الموقع والتخطيط المسبق',
        'تركيب آمن ومطابق للمعايير',
        'اختبار شامل للنظام',
        'تدريب الموظفين على الاستخدام',
        'ضمان على التركيب',
        'متابعة ما بعد التركيب',
      ],
      images: [galleryPool[11], galleryPool[5], galleryPool[6], galleryPool[4]],
    },
    {
      icon: Settings,
      title: 'الصيانة الدورية',
      description:
        'خدمات صيانة دورية شاملة لضمان الأداء الأمثل للشاشات وإطالة عمرها الافتراضي، مع عقود صيانة مرنة.',
      features: [
        'فحص دوري شامل',
        'تنظيف وصيانة وقائية',
        'استبدال القطع التالفة',
        'تحديث البرمجيات',
        'عقود صيانة سنوية',
        'أولوية في الاستجابة',
      ],
      images: [galleryPool[10], galleryPool[4], galleryPool[0], galleryPool[6]],
    },
    {
      icon: Zap,
      title: 'الدعم الفني المتواصل',
      description:
        'دعم فني على مدار الساعة لحل أي مشاكل تقنية بسرعة وكفاءة، مع فريق متخصص جاهز للاستجابة الفورية.',
      features: [
        'دعم فني 24/7',
        'استجابة سريعة للطوارئ',
        'دعم عن بعد وفي الموقع',
        'قطع غيار أصلية متوفرة',
        'فريق فني مدرب ومؤهل',
        'خط ساخن مخصص للعملاء',
      ],
      images: [galleryPool[5], galleryPool[3], galleryPool[9], galleryPool[11]],
    },
  ];

  const [openGalleryFor, setOpenGalleryFor] = useState<number | null>(null);
  const [activeImg, setActiveImg] = useState(0);

  const currentImages = openGalleryFor === null ? [] : services[openGalleryFor].images;

  const closeModal = () => {
    setOpenGalleryFor(null);
    setActiveImg(0);
  };

  const prevImg = () => {
    if (!currentImages.length) return;
    setActiveImg((i) => (i - 1 + currentImages.length) % currentImages.length);
  };

  const nextImg = () => {
    if (!currentImages.length) return;
    setActiveImg((i) => (i + 1) % currentImages.length);
  };

  return (
    <div className="min-h-screen bg-secondary" dir="rtl">
      <Header />

      {/* Hero */}
      <section className="w-full bg-gradient-to-br from-gradientlightblue to-white py-16 lg:py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-heading text-4xl lg:text-6xl font-bold text-primary mb-5">
              خدماتنا
            </h1>
            <p className="font-paragraph text-lg lg:text-xl text-secondaryForeground leading-relaxed">
              نقدم حلول شاشات LED وشاشات العرض الرقمية مع التركيب والصيانة والدعم الفني — بجودة عالية وتنفيذ احترافي.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="w-full bg-white py-14 lg:py-20">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              const cover = service.images[0];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm"
                >
                  {/* Image */}
                  <div className="relative">
                    <div className="aspect-video bg-gradient-to-br from-gradientlightblue to-gradientmediumblue/30">
                      <img
                        src={cover}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    <div className="absolute top-4 right-4 inline-flex items-center justify-center w-12 h-12 bg-primary rounded-xl shadow-sm">
                      <Icon className="w-6 h-6 text-primaryForeground" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="font-heading text-2xl font-bold text-primary mb-2">
                      {service.title}
                    </h2>
                    <p className="font-paragraph text-base text-secondaryForeground leading-relaxed mb-4">
                      {service.description}
                    </p>

                    <ul className="space-y-2 mb-5">
                      {service.features.slice(0, 4).map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 font-paragraph text-base text-secondaryForeground"
                        >
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        className="bg-primary text-primaryForeground hover:bg-primary/90"
                        onClick={() => {
                          setOpenGalleryFor(index);
                          setActiveImg(0);
                        }}
                      >
                        <Images className="w-5 h-5 ml-2" />
                        عرض الصور
                      </Button>

                      <Button variant="outline" className="border-black/10">
                        <Link to="/contact" className="text-primary">
                          اطلب عرض سعر
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us (same section, slightly tighter + cleaner cards) */}
      <section className="w-full bg-gradientlightblue py-16 lg:py-22">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl lg:text-5xl font-bold text-primary mb-3">
              لماذا تختار خدماتنا؟
            </h2>
            <p className="font-paragraph text-lg text-secondaryForeground max-w-3xl mx-auto">
              جودة منتجات + تنفيذ احترافي + دعم مستمر… بدون صداع.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'منتجات عالمية', description: 'نستورد من أفضل الشركات العالمية المتخصصة في تصنيع الشاشات' },
              { title: 'ضمان شامل', description: 'ضمان على المنتجات والخدمات مع متابعة ما بعد التسليم' },
              { title: 'أسعار تنافسية', description: 'خطط مرنة تناسب المشاريع الصغيرة والكبيرة' },
              { title: 'خبرة محلية', description: 'فهم عميق للسوق العراقي ومتطلبات التنفيذ' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="bg-white rounded-2xl p-7 text-center border border-black/5 shadow-sm"
              >
                <h3 className="font-heading text-xl font-semibold text-primary mb-2">
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

      {/* CTA (same idea, nicer spacing) */}
      <section className="w-full bg-primary py-16 lg:py-22">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl lg:text-5xl font-bold mb-5 text-primary-foreground">
              هل تحتاج إلى استشارة؟
            </h2>
            <p className="font-paragraph text-lg mb-8 max-w-2xl mx-auto text-secondary">
              تواصل معنا للحصول على استشارة مجانية وعرض سعر مخصص.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="outline"
                className="bg-white border-2 border-white hover:bg-white/90 text-lg px-10 py-6 text-secondary"
                asChild
              >
                <Link to="/contact" className="text-primary">
                  تواصل معنا
                </Link>
              </Button>

              <Button
                size="lg"
                className="bg-primaryForeground text-primary hover:bg-primaryForeground/90 text-lg px-10 py-6"
                asChild
              >
                <a
                  href="https://wa.me/9647700000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[transparent] text-secondary"
                >
                  <Phone className="w-5 h-5 ml-2" />
                  واتساب
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Gallery Modal */}
      <AnimatePresence>
        {openGalleryFor !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-5xl bg-white rounded-2xl overflow-hidden border border-black/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-black/5">
                <div className="font-heading text-lg font-semibold text-primary">
                  {services[openGalleryFor].title}
                </div>

                <button
                  onClick={closeModal}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl hover:bg-black/5"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4">
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gradientlightblue to-gradientmediumblue/30">
                  <div className="aspect-video">
                    <img
                      src={currentImages[activeImg]}
                      alt="gallery"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <button
                    onClick={prevImg}
                    className="absolute top-1/2 -translate-y-1/2 left-3 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/90 hover:bg-white shadow-sm"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={nextImg}
                    className="absolute top-1/2 -translate-y-1/2 right-3 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/90 hover:bg-white shadow-sm"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Thumbnails */}
                <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                  {currentImages.map((src, idx) => (
                    <button
                      key={src + idx}
                      onClick={() => setActiveImg(idx)}
                      className={`shrink-0 rounded-xl overflow-hidden border ${
                        idx === activeImg ? 'border-primary' : 'border-black/10'
                      }`}
                      aria-label={`Image ${idx + 1}`}
                    >
                      <div className="w-28 h-20 bg-black/5">
                        <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-4 text-sm text-secondaryForeground">
                  {activeImg + 1} / {currentImages.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
