import { Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'الرئيسية', href: '/' },
    { name: 'من نحن', href: '/about' },
    { name: 'خدماتنا', href: '/services' },
    { name: 'أعمالنا', href: '/projects' },
    { name: 'التحميلات', href: '/downloads' },
    { name: 'تواصل معنا', href: '/contact' },
  ];

  return (
    <header className="bg-secondary border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 bg-gradientlightblue">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="font-heading text-2xl lg:text-3xl font-bold text-primary">
              ALBARQ FOR LED SCREENs
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="font-paragraph text-base text-secondaryForeground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="border-buttonoutline text-buttonoutline hover:bg-primary hover:text-primaryForeground"
              asChild
            >
              <a href="https://www.tiktok.com/@albarqforledscreens" target="_blank" rel="noopener noreferrer">
                TikTok
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-buttonoutline text-buttonoutline hover:bg-primary hover:text-primaryForeground"
              asChild
            >
              <a href="https://www.facebook.com/albarqforledscreens/" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </Button>
            <Button
              className="bg-primary text-primaryForeground hover:bg-primary/90"
              asChild
            >
              <a
                href="https://wa.me/9647706896134"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground">
                <Phone className="w-4 h-4 ml-2" />
                واتساب
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-gray-100">
            <nav className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="font-paragraph text-base text-secondaryForeground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3 mt-6">
              <Button
                variant="outline"
                className="border-buttonoutline text-buttonoutline w-full"
                asChild
              >
                <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                  TikTok
                </a>
              </Button>
              <Button
                variant="outline"
                className="border-buttonoutline text-buttonoutline w-full"
                asChild
              >
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </Button>
              <Button
                className="bg-primary text-primaryForeground w-full"
                asChild
              >
                <a href="https://wa.me/9647700000000" target="_blank" rel="noopener noreferrer">
                  <Phone className="w-4 h-4 ml-2" />
                  واتساب
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
