import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { SoftwareDownloads } from '@/entities';

type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
};

const AnimatedElement: React.FC<AnimatedElementProps> = ({ 
  children, 
  className, 
  delay = 0,
  direction = 'up' 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: delay }
    }
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

const FIXED_CARD_IMAGES = [
  "https://static.wixstatic.com/media/fe743e_7ff7371ffa724d958c645679b1e5870b~mv2.png",
  "https://static.wixstatic.com/media/fe743e_08a9b5784c9a4a38809df6429af09685~mv2.png",
  "https://static.wixstatic.com/media/fe743e_8361f5199cd9436eb70bb7808385581f~mv2.png",
  "https://static.wixstatic.com/media/fe743e_95ff50ab33384f2ca63ec8ea87d00983~mv2.png",
] as const;

const FIXED_CARD_DESCRIPTIONS = [
  "برنامج إعداد شاشات LED من Huidu، يُستخدم لتهيئة الشاشة وضبط إعداداتها الأساسية قبل التشغيل، ويُعتمد عليه أثناء التركيب أو عند إعادة ضبط النظام.",
  "برنامج تشغيل وإدارة محتوى شاشات LED من NovaStar، يتيح التحكم في المحتوى المعروض، تنظيمه، وجدولته بما يتناسب مع متطلبات العرض المختلفة.",
  "برنامج من NovaStar مخصص لتكوين ومعايرة شاشات LED، يتيح ضبط إعدادات العرض، وحدات الإرسال والاستقبال، ومعالجة السطوع والألوان بدقة عالية.",
  "برنامج إعداد برنامج مخصص لتشغيل وإدارة المحتوى على شاشات LED، يتيح عرض الفيديوهات والصور والنصوص وتنظيمها حسب الحاجة، مع دعم التشغيل التلقائي وجدولة المحتوى.",
] as const;


export default function DownloadsPage() {
  const [downloads, setDownloads] = useState<SoftwareDownloads[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const { items } = await BaseCrudService.getAll<SoftwareDownloads>('softwaredownloads');
        setDownloads(items);
      } catch (error) {
        console.error("Failed to fetch downloads", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDownloads();
  }, []);

  return (
    <div className="min-h-screen bg-white font-paragraph text-primary selection:bg-primary/10 selection:text-primary" dir="rtl">
      <Header />
      <main className="w-full overflow-clip">
        
        {/* Hero Section */}
        <section className="relative w-full py-24 lg:py-32 bg-gradient-to-b from-gradientlightblue to-white">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
            <div className="text-center mb-20">
              <AnimatedElement direction="down">
                <h1 className="font-heading text-5xl lg:text-7xl font-bold text-primary mb-6">
                  تحميل البرامج
                </h1>
                <p className="text-secondary-foreground/70 text-lg max-w-2xl mx-auto">
                  احصل على أحدث إصدارات برامجنا المتخصصة في إدارة وتحكم الشاشات الرقمية
                </p>
              </AnimatedElement>
            </div>
          </div>
        </section>

        {/* Downloads Grid Section */}
        <section className="w-full py-24 lg:py-32 bg-white">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((idx) => (
                  <div key={idx} className="animate-pulse">
                    <div className="aspect-square bg-gray-200 rounded-2xl mb-6" />
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : downloads.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {downloads.map((software, idx) => (
                  <AnimatedElement 
                    key={software._id} 
                    delay={idx * 0.1}
                    className="group"
                  >
                    <div className="h-full flex flex-col bg-white rounded-2xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
                      {/* App Image Container */}
                      <div className="relative aspect-square bg-gradientlightblue overflow-hidden flex items-center justify-center p-6">
                        {(() => {
  const overrideSrc = idx < FIXED_CARD_IMAGES.length ? FIXED_CARD_IMAGES[idx] : null;
  const imgSrc = overrideSrc || software.appImage;
 
  return imgSrc ? (
    <Image
      src={imgSrc}
      alt={software.productName || "Software"}
      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
      width={300}
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-gradientmediumblue/10 text-primary/20">
      <Download className="w-16 h-16" />
    </div>
  );
})()}
                      </div>

                      {/* Content Container */}
                      <div className="flex-1 p-6 flex flex-col">
                        <h3 className="text-xl font-bold text-primary mb-2 font-heading line-clamp-2">
                          {software.productName}
                        </h3>
                        
                        {(() => {
  const overrideDesc =
    idx < FIXED_CARD_DESCRIPTIONS.length ? FIXED_CARD_DESCRIPTIONS[idx] : null;

  const desc = overrideDesc ?? software.description;

  return desc ? (
    <p className="text-secondary-foreground/60 text-sm mb-4 line-clamp-2 flex-1">
      {desc}
    </p>
  ) : null;
})()}

                        {/* Version and Size Info */}
                        <div className="flex items-center gap-4 text-xs text-secondary-foreground/50 mb-6 py-3 border-t border-primary/10">
                          {software.version && (
                            <span>الإصدار: {software.version}</span>
                          )}
                          {software.fileSize && (
                            <span>{software.fileSize} MB</span>
                          )}
                        </div>

                        {/* Download Button */}
                        {software.downloadLink ? (
                          <Button
                            size="lg"
                            className="w-full h-12 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all duration-300 font-bold text-base"
                            asChild
                          >
                            <a 
                              href={software.downloadLink} 
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
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-secondary-foreground/60 text-lg">
                  لا توجد برامج متاحة للتحميل حالياً
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
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
                فريقنا الفني جاهز لمساعدتك في تثبيت وتشغيل أي من برامجنا. تواصل معنا الآن.
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
