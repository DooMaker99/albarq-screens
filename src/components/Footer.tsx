import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primaryForeground">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-6 text-primary-foreground">ALBARQ FOR LED SCREENs</h3>
            <p className="font-paragraph text-sm leading-relaxed text-primary-foreground">
              شركة رائدة في تجهيز وتركيب الشاشات الإعلانية العملاقة في العراق، نقدم حلولاً متكاملة بأعلى معايير الجودة.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold mb-6 text-primary-foreground">روابط سريعة</h3>
            <nav className="flex flex-col gap-3 text-primary-foreground">
              <Link to="/" className="font-paragraph text-sm text-primaryForeground/90 hover:text-primaryForeground transition-colors">
                الرئيسية
              </Link>
              <Link to="/about" className="font-paragraph text-sm text-primaryForeground/90 hover:text-primaryForeground transition-colors">
                من نحن
              </Link>
              <Link to="/services" className="font-paragraph text-sm text-primaryForeground/90 hover:text-primaryForeground transition-colors">
                خدماتنا
              </Link>
              <Link to="/projects" className="font-paragraph text-sm text-primaryForeground/90 hover:text-primaryForeground transition-colors">
                أعمالنا
              </Link>
              <Link to="/contact" className="font-paragraph text-sm text-primaryForeground/90 hover:text-primaryForeground transition-colors">
                تواصل معنا
              </Link>
            </nav>
          </div>

          {/* Quick Links */}
          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6 text-primary-foreground">معلومات التواصل</h3>
            <div className="flex flex-col gap-4">
            <a href="tel:+9647706896134" className="flex items-center gap-3 font-paragraph text-sm text-primaryForeground/90 hover:text-primaryForeground transition-colors">
              <Phone className="w-5 h-5 fill-primary-foreground" />
              <span dir="ltr" className="text-primary-foreground">+964 770 689 6134</span>
            </a>
            <a href="tel:+9647901326390" className="flex items-center gap-3 font-paragraph text-sm text-primaryForeground/90 hover:text-primaryForeground transition-colors">
              <Phone className="w-5 h-5 fill-primary-foreground" />
              <span dir="ltr" className="text-primary-foreground">+964 790 132 6390</span>
            </a>
            <a href="mailto:info@albarqscreens.com" className="flex items-center gap-3 font-paragraph text-sm hover:text-primaryForeground transition-colors text-primary-foreground">
              <Mail className="w-5 h-5" />
              info@albarqscreens.com
            </a>
            <div className="flex items-start gap-3 font-paragraph text-sm text-primaryForeground/90">
              <MapPin className="w-5 h-5 mt-1 flex-shrink-0 fill-primary-foreground" />
              <span className="text-primary-foreground">بغداد، العراق</span>
            </div>
          </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6 text-primary-foreground">تابعنا</h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.facebook.com/albarqforledscreens/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-paragraph text-sm hover:text-primaryForeground transition-colors text-primary-foreground"
              >
                Facebook
              </a>
              <a
                href="https://www.tiktok.com/@albarqforledscreens"
                target="_blank"
                rel="noopener noreferrer"
                className="font-paragraph text-sm hover:text-primaryForeground transition-colors text-primary-foreground"
              >
                TikTok
              </a>
              <a
                href="https://wa.me/9647901326390"
                target="_blank"
                rel="noopener noreferrer"
                className="font-paragraph text-sm hover:text-primaryForeground transition-colors text-primary-foreground"
              >
                WhatsApp
              </a>
               <a
                href="https://www.instagram.com/albarq_for_screens"
                target="_blank"
                rel="noopener noreferrer"
                className="font-paragraph text-sm hover:text-primaryForeground transition-colors text-primary-foreground"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primaryForeground/20 mt-12 pt-8 text-center">
          <p className="font-paragraph text-sm text-primary-foreground">
            © {new Date().getFullYear()} ALBARQ FOR SCREENS. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
