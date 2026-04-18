import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "#process", label: "Processo" },
    { href: "#services", label: "Serviços" },
    { href: "#differentials", label: "Diferenciais" },
    { href: "#contact", label: "Contato" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-primary/15 bg-background/85 backdrop-blur-lg">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center">
          <img src="/logo.png" alt="Infinity Forge" className="h-11 w-auto rounded-lg" />
        </div>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-mono text-foreground/80 transition-colors hover:text-primary">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden rounded-xl border border-accent/60 bg-accent px-4 text-accent-foreground hover:bg-accent/90 sm:inline-flex" size="sm">
            <a href="#contact">Iniciar Projeto</a>
          </Button>

          <button
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-primary/20 md:hidden"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className={`block h-0.5 w-5 bg-foreground transition-all duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-foreground transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-foreground transition-all duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-primary/15 bg-background/95 backdrop-blur-lg md:hidden" aria-label="Menu mobile">
          <div className="container flex flex-col py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="py-3 font-mono text-sm text-foreground/80 transition-colors hover:text-primary"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-3 inline-flex items-center justify-center rounded-xl border border-accent/60 bg-accent px-4 py-2 font-mono text-sm text-accent-foreground transition-colors hover:bg-accent/90"
              onClick={() => setMenuOpen(false)}
            >
              Iniciar Projeto
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
