import { motion } from 'framer-motion';
import { Target, Eye, Award, Users, Zap, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
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
              من نحن
            </h1>
            <p className="font-paragraph text-lg lg:text-xl text-secondaryForeground leading-relaxed">
              شركة البرق للشاشات الإعلانية، رائدة في مجال تجهيز ونصب الشاشات الرقمية العملاقة في العراق
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Company */}
      <section className="w-full bg-white py-20 lg:py-28">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-6">
                نبذة عن الشركة
              </h2>
              <div className="space-y-4 font-paragraph text-base lg:text-lg text-secondaryForeground leading-relaxed">
                <p>
                  تأسست شركة البرق للشاشات الإعلانية بهدف تقديم حلول متكاملة ومبتكرة في مجال الشاشات الرقمية والإعلانات الإلكترونية. نحن نفخر بكوننا من الشركات الرائدة في العراق التي تقدم أحدث التقنيات والمعدات بأعلى معايير الجودة.
                </p>
                <p>
                  نعمل مع فريق من المهندسين والفنيين المتخصصين الذين يمتلكون خبرة واسعة في تصميم وتركيب وصيانة الشاشات الإعلانية بمختلف أنواعها وأحجامها. نحرص على تقديم خدمة متميزة لعملائنا من خلال الالتزام بالمواعيد وتوفير دعم فني مستمر.
                </p>
                <p>
                  نسعى دائماً لمواكبة التطورات التقنية في هذا المجال، ونحرص على استيراد أفضل المنتجات من الشركات العالمية المعروفة لضمان رضا عملائنا وتحقيق أهدافهم الإعلانية بكفاءة عالية.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { number: '500+', label: 'مشروع منفذ' },
                { number: '10+', label: 'سنوات خبرة' },
                { number: '300+', label: 'عميل راضٍ' },
                { number: '24/7', label: 'دعم فني' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradientlightblue rounded-2xl p-8 text-center"
                >
                  <div className="font-heading text-4xl lg:text-5xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="font-paragraph text-base text-secondaryForeground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="w-full bg-gradientlightblue py-20 lg:py-28">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-10 lg:p-12"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
                <Eye className="w-8 h-8 text-primaryForeground" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">
                رؤيتنا
              </h2>
              <p className="font-paragraph text-base lg:text-lg text-secondaryForeground leading-relaxed">
                أن نكون الشركة الرائدة والأكثر موثوقية في مجال الشاشات الإعلانية الرقمية في العراق والمنطقة، من خلال تقديم حلول مبتكرة ومتطورة تلبي احتياجات عملائنا وتساهم في تطوير قطاع الإعلان الرقمي. نسعى لبناء شراكات طويلة الأمد مع عملائنا وأن نكون خيارهم الأول عند التفكير في الحلول الإعلانية الحديثة.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-10 lg:p-12"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
                <Target className="w-8 h-8 text-primaryForeground" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">
                رسالتنا
              </h2>
              <p className="font-paragraph text-base lg:text-lg text-secondaryForeground leading-relaxed">
                تقديم حلول شاشات إعلانية متكاملة بأعلى معايير الجودة والاحترافية، من خلال استخدام أحدث التقنيات والمعدات العالمية. نلتزم بتوفير خدمة عملاء متميزة ودعم فني مستمر، مع الحرص على تحقيق أهداف عملائنا الإعلانية بكفاءة وفعالية. نؤمن بأهمية الابتكار والتطوير المستمر لمواكبة التغيرات في السوق واحتياجات العملاء.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full bg-white py-20 lg:py-28">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl lg:text-5xl font-bold text-primary mb-4">
              قيمنا
            </h2>
            <p className="font-paragraph text-lg text-secondaryForeground max-w-3xl mx-auto">
              المبادئ التي نؤمن بها ونعمل على تحقيقها في كل مشروع
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: 'الجودة',
                description: 'نلتزم بتقديم أعلى مستويات الجودة في جميع منتجاتنا وخدماتنا، ونستخدم فقط المعدات والمواد الأصلية من الشركات العالمية الموثوقة.',
              },
              {
                icon: Shield,
                title: 'الموثوقية',
                description: 'نبني علاقات طويلة الأمد مع عملائنا من خلال الالتزام بوعودنا والشفافية في التعامل، ونحرص على كسب ثقتهم في كل مشروع.',
              },
              {
                icon: Zap,
                title: 'الابتكار',
                description: 'نسعى دائماً لتقديم حلول مبتكرة ومتطورة تواكب أحدث التقنيات في مجال الشاشات الرقمية والإعلانات الإلكترونية.',
              },
              {
                icon: Users,
                title: 'التركيز على العميل',
                description: 'نضع احتياجات عملائنا في صدارة أولوياتنا، ونعمل على تقديم حلول مخصصة تلبي متطلباتهم وتحقق أهدافهم بكفاءة.',
              },
              {
                icon: Target,
                title: 'الاحترافية',
                description: 'نعمل بمهنية عالية في جميع مراحل المشروع من التخطيط والتنفيذ إلى الصيانة، مع الالتزام بالمواعيد والمعايير المتفق عليها.',
              },
              {
                icon: Award,
                title: 'التطوير المستمر',
                description: 'نستثمر في تطوير مهارات فريقنا وتحديث معداتنا باستمرار لضمان تقديم أفضل الخدمات لعملائنا.',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradientlightblue rounded-2xl p-8"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-xl mb-6">
                  <value.icon className="w-7 h-7 text-primaryForeground" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-primary mb-3">
                  {value.title}
                </h3>
                <p className="font-paragraph text-base text-secondaryForeground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
