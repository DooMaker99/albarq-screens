// HPI 1.6-V
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { 
  Phone, 
  CheckCircle, 
  Zap, 
  Award, 
  Users, 
  Wrench, 
  Monitor, 
  Headphones, 
  ArrowRight, 
  ArrowUpRight,
  Play,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Projects } from '@/entities';

// --- Utility Components for Motion & Layout ---

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

const ParallaxImage = ({ src, alt, className, speed = 0.5 }: { src: string, alt: string, className?: string, speed?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-[120%] -mt-[10%]">
        <Image src={src} alt={alt} className="w-full h-full object-cover" width={1200} />
      </motion.div>
    </div>
  );
};

// --- Main Component ---

export default function HomePage() {
  const [projects, setProjects] = useState<Projects[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Data Fidelity: Fetching from Canonical Source
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { items } = await BaseCrudService.getAll<Projects>('projects');
        setProjects(items);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Scroll Progress for global effects
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-white font-paragraph text-primary selection:bg-primary/10 selection:text-primary" dir="rtl">
      {/* Global Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-right"
        style={{ scaleX }}
      />
      <Header />
      <main className="w-full overflow-clip">
        
        {/* --- HERO SECTION --- 
            Replicating the structural layout of the inspiration image:
            - Full bleed container
            - Rounded/Organic shape on the right
            - Clean typography on the left
            - Vertical text element
        */}
        <section className="relative w-full min-h-[95vh] flex items-center justify-center pt-20 lg:pt-0 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-white z-0" />
          
          {/* The "Card" Container - Mimicking the inspiration image's main shape */}
          <div className="relative w-full max-w-[115rem] mx-auto px-4 sm:px-6 lg:px-8 z-10 h-full flex flex-col lg:flex-row items-stretch">
            
            {/* Left Content Column */}
            {/* Right Visual Column - The "Abstract Shape" */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 lg:py-24 relative z-20">
              <AnimatedElement direction="right" className="mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradientlightblue border border-primary/10 text-primary text-sm font-medium">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  الخيار الأول في العراق
                </div>
              </AnimatedElement>

              <AnimatedElement delay={0.1}>
                <h1 className="font-heading text-5xl lg:text-7xl xl:text-8xl font-bold text-primary leading-[1.1] tracking-tight mb-8">
                  مستقبل <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-gradientmediumblue">
                    الشاشات الرقمية
                  </span>
                </h1>
              </AnimatedElement>

              <AnimatedElement delay={0.2}>
                <p className="font-paragraph text-lg lg:text-xl text-secondary-foreground/80 max-w-xl leading-relaxed mb-10">
                  نحول المساحات الصامتة إلى تجارب بصرية مذهلة. شركة البرق تقدم أحدث حلول الشاشات العملاقة مع ضمان الجودة والدعم الفني المتكامل.
                </p>
              </AnimatedElement>

              <AnimatedElement delay={0.3} className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="h-14 px-8 rounded-full bg-primary text-white hover:bg-primary/90 text-lg transition-all duration-300 shadow-lg hover:shadow-primary/25 hover:-translate-y-1"
                  asChild
                >
                  <Link to="/contact">
                    اطلب عرض سعر
                    <ArrowRight className="mr-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 rounded-full border-2 border-primary/10 text-primary hover:bg-gradientlightblue hover:border-primary/20 text-lg transition-all duration-300 opacity-60 hover:opacity-100"
                  asChild
                >
                  <a
                    href="https://wa.me/9647706896134"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary-foreground shadow-sm">
                    <Phone className="ml-2 w-5 h-5" />
                    تواصل واتساب
                  </a>
                </Button>
              </AnimatedElement>

              {/* Scroll Indicator */}
              <div className="absolute bottom-0 right-0 hidden lg:flex items-center gap-4 translate-y-12 opacity-[0.03]">
                <span className="text-sm font-medium text-primary/60 whitespace-nowrap">تصفح المزيد</span>
                <div className="w-[1px] h-24 bg-gradient-to-b from-primary/60 to-transparent" />
              </div>
            </div>

            <div className="w-full lg:w-1/2 relative min-h-[50vh] lg:min-h-auto">
              {/* The organic shape container */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, borderRadius: "100%" }}
                animate={{ opacity: 1, scale: 1, borderRadius: "2rem" }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-4 lg:inset-y-8 lg:left-0 lg:right-[-50vw] bg-gradient-to-br from-[#F5F7FF] to-[#E0E7FF] overflow-hidden shadow-2xl"
              >
                {/* Abstract 3D Wave Image Placeholder */}
                <div className="absolute inset-0 w-full h-full">
                   <Image 
                    src="https://static.wixstatic.com/media/fe743e_b99d2f91ffff464ca8faab305036a458~mv2.png?originWidth=1600&originHeight=896"
                    alt="Abstract digital wave representing screen technology"
                    className="w-full h-full object-cover opacity-80 mix-blend-multiply"
                    width={1600}
                   />
                </div>

                {/* Overlay Gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
                
                {/* Floating Elements Parallax */}
                <motion.div 
                  className="absolute top-1/4 right-1/4 w-32 h-32 bg-white/30 backdrop-blur-md rounded-2xl border border-white/50 shadow-xl z-10 hidden lg:block"
                  animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-primary/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg z-10 hidden lg:block"
                  animate={{ y: [0, 30, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
              </motion.div>

              {/* Vertical Brand Text - Key Motif from Inspiration */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 hidden xl:block pointer-events-none mix-blend-difference">
                <h2 className="text-[120px] font-heading font-bold text-white/20 rotate-90 whitespace-nowrap tracking-widest">
                  ALBARQ
                </h2>
              </div>
            </div>
          </div>
        </section>

        {/* --- STATS TICKER SECTION --- */}
        <section className="w-full bg-primary py-12 overflow-hidden">
          <div className="max-w-[120rem] mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-x-reverse divide-white/10">
              {[
                { number: "+10", label: "سنوات خبرة" },
                { number: "+500", label: "مشروع منجز" },
                { number: "100%", label: "رضا العملاء" },
                { number: "24/7", label: "دعم فني" }
              ].map((stat, idx) => (
                <AnimatedElement key={idx} delay={idx * 0.1} className="text-center">
                  <h3 className="text-4xl lg:text-5xl font-bold text-white mb-2 font-heading">{stat.number}</h3>
                  <p className="text-white/70 text-sm lg:text-base font-paragraph">{stat.label}</p>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </section>

        {/* --- WHY US: STICKY SCROLL SECTION --- */}
        <section className="relative w-full py-24 lg:py-32 bg-white">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row gap-16">
              
              {/* Sticky Header (Right Side in RTL) */}
              <div className="lg:w-1/3">
                <div className="sticky top-32">
                  <AnimatedElement>
                    <span className="text-primary/60 font-medium tracking-wider text-sm uppercase mb-4 block">لماذا تختارنا</span>
                    <h2 className="font-heading text-4xl lg:text-6xl font-bold text-primary mb-8 leading-tight">
                      التميز في كل <br />
                      <span className="text-gradientmediumblue">بكسل</span>
                    </h2>
                    <p className="font-paragraph text-lg text-secondary-foreground/70 mb-8 leading-relaxed">
                      نحن لا نبيع شاشات فقط، نحن نقدم حلولاً بصرية متكاملة تضمن نجاح مشروعك وتميز علامتك التجارية.
                    </p>
                    <Button variant="ghost" className="group text-primary p-0 hover:bg-transparent text-lg" asChild>
                      <Link to="/about">
                        اقرأ المزيد عنا
                        <ArrowRight className="mr-2 w-5 h-5 transition-transform group-hover:-translate-x-2" />
                      </Link>
                    </Button>
                  </AnimatedElement>
                </div>
              </div>

              {/* Scrolling Cards (Left Side in RTL) */}
              <div className="lg:w-2/3 grid gap-8">
                {[
                  {
                    icon: Award,
                    title: 'خبرة لا تضاهى',
                    desc: 'فريقنا يمتلك سنوات من الخبرة الميدانية في أصعب الظروف وأعقد المشاريع.',
                    color: 'bg-[#F0F4FF]'
                  },
                  {
                    icon: Zap,
                    title: 'تكنولوجيا متطورة',
                    desc: 'نستخدم أحدث شرائح LED وأنظمة التحكم لضمان صورة نقية واستهلاك طاقة مثالي.',
                    color: 'bg-[#F5F7FF]'
                  },
                  {
                    icon: Wrench,
                    title: 'تركيب احترافي',
                    desc: 'هياكل حديدية مصممة هندسياً لتحمل الظروف الجوية القاسية في العراق.',
                    color: 'bg-[#F0F4FF]'
                  },
                  {
                    icon: Headphones,
                    title: 'دعم فني حقيقي',
                    desc: 'لسنا مجرد موردين. نحن شركاؤك في النجاح مع خدمة صيانة واستجابة سريعة.',
                    color: 'bg-[#F5F7FF]'
                  }
                ].map((item, idx) => (
                  <AnimatedElement key={idx} delay={idx * 0.1} direction="left">
                    <div className={`group p-10 rounded-[2rem] ${item.color} hover:bg-primary transition-colors duration-500 cursor-default`}>
                      <div className="flex items-start gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:bg-white/10 transition-colors duration-500">
                          <item.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-500" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-white transition-colors duration-500 font-heading">
                            {item.title}
                          </h3>
                          <p className="text-secondary-foreground/70 text-lg leading-relaxed group-hover:text-white/80 transition-colors duration-500">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </AnimatedElement>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* --- SERVICES: HORIZONTAL SCROLL / CARDS --- */}
        <section className="w-full py-24 bg-gradientlightblue overflow-hidden">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12 mb-16 flex flex-col md:flex-row justify-between items-end">
            <AnimatedElement>
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-primary mb-4">خدماتنا المتكاملة</h2>
              <p className="text-secondary-foreground/70 text-lg max-w-xl">حلول تقنية مصممة خصيصاً لتلبية احتياجات السوق العراقي</p>
            </AnimatedElement>
            <AnimatedElement delay={0.2}>
              <Button variant="outline" className="hidden md:flex border-primary text-primary hover:bg-primary hover:text-white" asChild>
                <Link to="/services">جميع الخدمات</Link>
              </Button>
            </AnimatedElement>
          </div>

          <div className="w-full overflow-x-auto pb-12 hide-scrollbar px-6 lg:px-12">
            <div className="flex gap-6 w-max">
              {[
                {
                  title: "شاشات LED خارجية",
                  desc: "مقاومة للحرارة والغبار، مثالية للإعلانات الطرقية والواجهات.",
                  img: "https://static.wixstatic.com/media/fe743e_edd97956ab1647d0ab930b0f66c92dfe~mv2.png?originWidth=384&originHeight=448"
                },
                {
                  title: "شاشات داخلية (Indoor)",
                  desc: "دقة عالية (Pixel Pitch صغير) للمؤتمرات والمولات والقاعات.",
                  img: "https://static.wixstatic.com/media/fe743e_f47c44c81c6d493aad8019df357b0516~mv2.png?originWidth=384&originHeight=448"
                },
                {
                  title: "شاشات الملاعب",
                  desc: "أنظمة عرض النتائج والشاشات المحيطية للملاعب الرياضية.",
                  img: "https://static.wixstatic.com/media/fe743e_8bcca92c500c4cb8a326ae6005995246~mv2.png?originWidth=384&originHeight=448"
                },
                {
                  title: "أنظمة التحكم والمحتوى",
                  desc: "برمجيات إدارة المحتوى عن بعد وتصميم الإعلانات.",
                  img: "https://static.wixstatic.com/media/fe743e_726bdca7683e45ada1553c4277a445a6~mv2.png?originWidth=384&originHeight=448"
                }
              ].map((service, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="relative w-[300px] md:w-[400px] h-[500px] rounded-3xl overflow-hidden group cursor-pointer"
                >
                  <Image 
                    src={service.img} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    width={400}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 text-white">
                      <ArrowUpRight className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 font-heading">{service.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {service.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FEATURED PROJECTS: PARALLAX GRID --- */}
        <section className="w-full py-24 lg:py-32 bg-white">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
            <div className="text-center mb-20">
              <AnimatedElement direction="down">
                <h2 className="font-heading text-4xl lg:text-6xl font-bold text-primary mb-6">أحدث مشاريعنا</h2>
                <p className="text-secondary-foreground/70 text-lg max-w-2xl mx-auto">
                  نفخر بتنفيذ مشاريع استراتيجية في مختلف محافظات العراق. شاهد جودة أعمالنا على أرض الواقع.
                </p>
              </AnimatedElement>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {projects.length > 0 ? (
                projects.slice(0, 3).map((project, idx) => (
                  <AnimatedElement key={project._id} delay={idx * 0.2} className={idx === 1 ? "md:translate-y-16" : ""}>
                    <Link to={`/projects`} className="block group">
                      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6 bg-gray-100">
                        {project.mainImage ? (
                          <Image 
                            src={project.mainImage} 
                            alt={project.projectName || 'Project'} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            width={600}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradientlightblue text-primary/20">
                            <Monitor className="w-20 h-20" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                        
                        {/* Floating Badge */}
                        <div className="absolute top-6 right-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold text-primary uppercase tracking-wider">
                          {project.location || 'العراق'}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-gradientmediumblue transition-colors font-heading">
                        {project.projectName}
                      </h3>
                      <p className="text-secondary-foreground/60 line-clamp-2 text-sm">
                        {project.description}
                      </p>
                    </Link>
                  </AnimatedElement>
                ))
              ) : (
                // Fallback if no projects loaded yet
                ([1, 2, 3].map((_, idx) => (
                  <div key={idx} className={`animate-pulse ${idx === 1 ? "md:translate-y-16" : ""}`}>
                    <div className="aspect-[4/5] bg-gray-200 rounded-2xl mb-6" />
                    <div className="h-8 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                )))
              )}
            </div>

            <div className="mt-32 text-center">
              <Button size="lg" className="rounded-full px-10 py-6 text-lg bg-primary text-white hover:bg-primary/90" asChild>
                <Link to="/projects">شاهد كل المشاريع</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="relative w-full py-32 overflow-hidden">
          <div className="absolute inset-0 bg-primary">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
            {/* Abstract Glows */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradientmediumblue/30 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradientmediumblue/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
            <AnimatedElement>
              <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                جاهز لنقل علامتك التجارية <br /> إلى المستوى التالي؟
              </h2>
              <p className="font-paragraph text-xl text-white/80 mb-12 max-w-2xl mx-auto">
                فريقنا الهندسي مستعد لدراسة موقعك وتقديم الحل الأمثل بأفضل تكلفة. استشارة مجانية ومعاينة موقعية.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button 
                  size="lg" 
                  className="h-16 px-10 rounded-full bg-white text-primary hover:bg-white/90 text-xl font-bold shadow-2xl shadow-white/10"
                  asChild
                >
                  <Link to="/contact">تواصل معنا الآن</Link>
                </Button>
                <a 
                  href="https://wa.me/9647700000000" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white hover:text-gradientmediumblue transition-colors text-lg font-medium group"
                >
                  <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span>محادثة واتساب مباشرة</span>
                </a>
              </div>
            </AnimatedElement>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}