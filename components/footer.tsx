import Image from "next/image"
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-footer-bg text-footer-foreground">
      <div className="px-4 py-10">
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <a href="/" className="flex items-center mb-4">
              <Image
                src="/logos/manchi-primary-dark-mode.png"
                alt="Manchi"
                width={120}
                height={40}
                className="h-9 w-auto"
              />
            </a>
            <p className="text-sm text-footer-foreground/70 leading-relaxed max-w-xs">
              Delicious Nigerian food delivered fast to your door from our multiple locations.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a href="#" aria-label="Instagram" className="text-footer-foreground/60 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-footer-foreground/60 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Facebook" className="text-footer-foreground/60 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Download App */}
          <div>
            <h3 className="font-semibold text-footer-foreground mb-4">Download the App</h3>
            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-3 bg-footer-foreground/10 hover:bg-footer-foreground/15 transition-colors rounded-lg px-4 py-2.5 w-fit"
              >
                <svg className="h-7 w-7 text-footer-foreground" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.97 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.89C10.1 6.87 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-[10px] text-footer-foreground/60 leading-none">Download on the</span>
                  <span className="text-sm font-semibold text-footer-foreground leading-tight">App Store</span>
                </div>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-3 bg-footer-foreground/10 hover:bg-footer-foreground/15 transition-colors rounded-lg px-4 py-2.5 w-fit"
              >
                <svg className="h-7 w-7 text-footer-foreground" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-[10px] text-footer-foreground/60 leading-none">GET IT ON</span>
                  <span className="text-sm font-semibold text-footer-foreground leading-tight">Google Play</span>
                </div>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-footer-foreground mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2.5">
              <a href="#menu" className="text-sm text-footer-foreground/70 hover:text-primary transition-colors">Our Menu</a>
              <a href="#popular" className="text-sm text-footer-foreground/70 hover:text-primary transition-colors">Popular Dishes</a>
              <a href="#" className="text-sm text-footer-foreground/70 hover:text-primary transition-colors">Catering Services</a>
              <a href="#" className="text-sm text-footer-foreground/70 hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-footer-foreground/70 hover:text-primary transition-colors">Privacy Policy</a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-footer-foreground mb-4">Contact Info</h3>
            <div className="flex flex-col gap-3">
              <a href="mailto:hello@manchi.ng" className="flex items-center gap-2 text-sm text-footer-foreground/70 hover:text-primary transition-colors">
                <Mail className="h-4 w-4 shrink-0" />
                hello@manchi.ng
              </a>
              <a href="tel:+2348001234567" className="flex items-center gap-2 text-sm text-footer-foreground/70 hover:text-primary transition-colors">
                <Phone className="h-4 w-4 shrink-0" />
                +234 800 123 4567
              </a>
              <div className="flex items-start gap-2 text-sm text-footer-foreground/70">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span>12 Adeola Odeku Street, Victoria Island, Lagos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-footer-foreground/10">
        <div className="mx-auto max-w-6xl px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-footer-foreground/50">
            {'\u00A9'} 2026 Manchi. All rights reserved.
          </p>
          <a href="#" className="text-xs text-footer-foreground/50 hover:text-footer-foreground/80 transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  )
}
