import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: 'تم إرسال رسالتك بنجاح',
        description: 'سنتواصل معك في أقرب وقت ممكن',
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
              تواصل معنا
            </h1>
            <p className="font-paragraph text-lg lg:text-xl text-secondaryForeground leading-relaxed">
              نحن هنا لمساعدتك. تواصل معنا للحصول على استشارة مجانية أو عرض سعر مخصص
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full bg-white py-20 lg:py-28">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">
                أرسل لنا رسالة
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block font-paragraph text-base text-secondaryForeground mb-2"
                  >
                    الاسم الكامل *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block font-paragraph text-base text-secondaryForeground mb-2"
                  >
                    البريد الإلكتروني *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block font-paragraph text-base text-secondaryForeground mb-2"
                  >
                    رقم الهاتف *
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="+964 770 000 0000"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block font-paragraph text-base text-secondaryForeground mb-2"
                  >
                    الموضوع *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="موضوع الرسالة"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block font-paragraph text-base text-secondaryForeground mb-2"
                  >
                    الرسالة *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full min-h-[150px]"
                    placeholder="اكتب رسالتك هنا..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-primaryForeground hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'جاري الإرسال...'
                  ) : (
                    <>
                      <Send className="w-5 h-5 ml-2" />
                      إرسال الرسالة
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-6">
                  معلومات التواصل
                </h2>
                <p className="font-paragraph text-base text-secondaryForeground leading-relaxed mb-8">
                  يمكنك التواصل معنا عبر أي من الوسائل التالية، ونحن سعداء بخدمتك
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-gradientlightblue rounded-2xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primaryForeground" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                      الهاتف
                    </h3>
                    <div className="space-y-1">
                      <a
                        href="tel:+9647700000000"
                        className="block font-paragraph text-base text-secondaryForeground hover:text-primary transition-colors"
                        dir="ltr"
                      >
                        +964 770 000 0000
                      </a>
                      <a
                        href="tel:+9647800000000"
                        className="block font-paragraph text-base text-secondaryForeground hover:text-primary transition-colors"
                        dir="ltr"
                      >
                        +964 780 000 0000
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-gradientlightblue rounded-2xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primaryForeground" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                      البريد الإلكتروني
                    </h3>
                    <a
                      href="mailto:info@albarqscreens.com"
                      className="font-paragraph text-base text-secondaryForeground hover:text-primary transition-colors"
                    >
                      info@albarqscreens.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-gradientlightblue rounded-2xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primaryForeground" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                      العنوان
                    </h3>
                    <p className="font-paragraph text-base text-secondaryForeground">
                      بغداد، العراق
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-8 border-t border-gray-200">
                <h3 className="font-heading text-xl font-semibold text-primary mb-4">
                  تابعنا على
                </h3>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="border-buttonoutline text-buttonoutline hover:bg-primary hover:text-primaryForeground"
                    asChild
                  >
                    <a
                      href="https://www.facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Facebook
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-buttonoutline text-buttonoutline hover:bg-primary hover:text-primaryForeground"
                    asChild
                  >
                    <a
                      href="https://www.tiktok.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      TikTok
                    </a>
                  </Button>
                  <Button
                    className="bg-primary text-primaryForeground hover:bg-primary/90"
                    asChild
                  >
                    <a
                      href="https://wa.me/9647700000000"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Phone className="w-4 h-4 ml-2" />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="w-full bg-gradientlightblue py-20 lg:py-28">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-4">
              موقعنا
            </h2>
            <p className="font-paragraph text-lg text-secondaryForeground">
              نحن في خدمتكم في بغداد، العراق
            </p>
          </motion.div>

          <div className="aspect-video bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gradientlightblue to-gradientmediumblue/30">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="font-paragraph text-lg text-secondaryForeground">
                  خريطة الموقع
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
