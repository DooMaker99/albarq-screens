import { motion } from 'framer-motion';
import { Monitor, Wrench, Zap, Settings, CheckCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ServicesPage() {
  const services = [
    {
      icon: Monitor,
      title: 'شاشات LED العملاقة الخارجية',
      description: 'نوفر شاشات LED عملاقة عالية الدقة مصممة خصيصاً للاستخدام الخارجي، مقاومة للعوامل الجوية القاسية مع إضاءة ساطعة تضمن وضوح الصورة في جميع الأوقات.',
      features: [
        'دقة عالية تصل إلى 4K وأكثر',
        'مقاومة للماء والغبار (IP65)',
        'سطوع عالي يصل إلى 8000 nits',
        'استهلاك طاقة منخفض',
        'عمر افتراضي طويل يصل إلى 100,000 ساعة',
        'تحكم عن بعد بالمحتوى',
      ],
      image: 'https://static.wixstatic.com/media/fe743e_5c346c54c9d64fb9a85a23e413f8fd6d~mv2.png?originWidth=960&originHeight=512',
    },
    {
      icon: Monitor,
      title: 'شاشات LED الداخلية',
      description: 'شاشات LED داخلية بدقة فائقة مثالية للمراكز التجارية، المطارات، الفنادق، والمعارض. تتميز بجودة صورة استثنائية وتصاميم أنيقة.',
      features: [
        'دقة عالية جداً للمسافات القريبة',
        'ألوان زاهية ودقيقة',
        'تصاميم نحيفة وعصرية',
        'سهولة التركيب والصيانة',
        'توافق مع أنظمة إدارة المحتوى',
        'خيارات أحجام متعددة',
      ],
      image: 'https://static.wixstatic.com/media/fe743e_3fcdda4e700a467aa507bf80cc075c56~mv2.png?originWidth=960&originHeight=512',
    },
    {
      icon: Monitor,
      title: 'شاشات العرض الرقمية (Digital Signage)',
      description: 'حلول شاشات العرض الرقمية المتكاملة للمحلات التجارية والمطاعم والبنوك، مع أنظمة إدارة محتوى سهلة الاستخدام.',
      features: [
        'شاشات تفاعلية باللمس',
        'نظام إدارة محتوى متطور',
        'جدولة تلقائية للمحتوى',
        'دعم الفيديو والصور والنصوص',
        'تحديثات عن بعد',
        'تقارير وإحصائيات مفصلة',
      ],
      image: 'https://static.wixstatic.com/media/fe743e_16119414dfb54a8e8836886b9ea4f069~mv2.png?originWidth=960&originHeight=512',
    },
    {
      icon: Wrench,
      title: 'التركيب والتشغيل',
      description: 'فريق متخصص من المهندسين والفنيين لتركيب الشاشات بشكل احترافي وآمن، مع اختبار شامل وتدريب على الاستخدام.',
      features: [
        'دراسة الموقع والتخطيط المسبق',
        'تركيب آمن ومطابق للمعايير',
        'اختبار شامل للنظام',
        'تدريب الموظفين على الاستخدام',
        'ضمان على التركيب',
        'متابعة ما بعد التركيب',
      ],
      image: 'https://static.wixstatic.com/media/fe743e_03a7217f1bf848629f6aff32b462734f~mv2.png?originWidth=960&originHeight=512',
    },
    {
      icon: Settings,
      title: 'الصيانة الدورية',
      description: 'خدمات صيانة دورية شاملة لضمان الأداء الأمثل للشاشات وإطالة عمرها الافتراضي، مع عقود صيانة مرنة.',
      features: [
        'فحص دوري شامل',
        'تنظيف وصيانة وقائية',
        'استبدال القطع التالفة',
        'تحديث البرمجيات',
        'عقود صيانة سنوية',
        'أولوية في الاستجابة',
      ],
      image: 'https://static.wixstatic.com/media/fe743e_00d62b3950164abd93cee0f8a7b7f431~mv2.png?originWidth=960&originHeight=512',
    },
    {
      icon: Zap,
      title: 'الدعم الفني المتواصل',
      description: 'دعم فني على مدار الساعة لحل أي مشاكل تقنية بسرعة وكفاءة، مع فريق متخصص جاهز للاستجابة الفورية.',
      features: [
        'دعم فني 24/7',
        'استجابة سريعة للطوارئ',
        'دعم عن بعد وفي الموقع',
        'قطع غيار أصلية متوفرة',
        'فريق فني مدرب ومؤهل',
        'خط ساخن مخصص للعملاء',
      ],
      image: 'https://static.wixstatic.com/media/fe743e_04de71e0b01b4e9d90a833ac182d8b87~mv2.png?originWidth=960&originHeight=512',
    },
  ];

  return (
    <div className="min-h-screen bg-secondary" dir="rtl">
      <Header />

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
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-xl mb-6">
                    <service.icon className="w-8 h-8 text-primaryForeground" />
                  </div>
                  <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-4">
                    {service.title}
                  </h2>
                  <p className="font-paragraph text-base lg:text-lg text-secondaryForeground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 font-paragraph text-base text-secondaryForeground"
                      >
                        <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="aspect-video bg-gradient-to-br from-gradientlightblue to-gradientmediumblue/30 rounded-2xl overflow-hidden">
                    {/* Placeholder for service image */}
                  </div>
                </div>
              </motion.div>
            ))}
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
                title: 'منتجات عالمية',
                description: 'نستورد من أفضل الشركات العالمية المتخصصة في تصنيع الشاشات',
              },
              {
                title: 'ضمان شامل',
                description: 'نوفر ضمان شامل على جميع المنتجات والخدمات التي نقدمها',
              },
              {
                title: 'أسعار تنافسية',
                description: 'أسعار مناسبة مع إمكانية التقسيط وخطط دفع مرنة',
              },
              {
                title: 'خبرة محلية',
                description: 'فهم عميق للسوق العراقي واحتياجات العملاء المحليين',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 text-center"
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

      {/* CTA Section */}
      <section className="w-full bg-primary py-20 lg:py-28">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl lg:text-5xl font-bold text-primaryForeground mb-6">
              هل تحتاج إلى استشارة؟
            </h2>
            <p className="font-paragraph text-lg text-primaryForeground/90 mb-10 max-w-2xl mx-auto">
              تواصل معنا الآن للحصول على استشارة مجانية وعرض سعر مخصص لاحتياجاتك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-primary border-2 border-white hover:bg-white/90 text-lg px-10 py-6"
                asChild
              >
                <Link to="/contact">تواصل معنا</Link>
              </Button>
              <Button
                size="lg"
                className="bg-primaryForeground text-primary hover:bg-primaryForeground/90 text-lg px-10 py-6"
                asChild
              >
                <a href="https://wa.me/9647700000000" target="_blank" rel="noopener noreferrer">
                  <Phone className="w-5 h-5 ml-2" />
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
