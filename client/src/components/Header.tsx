import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-accent rounded-sm flex items-center justify-center">
            <span className="font-mono font-bold text-background text-lg">∞</span>
          </div>
          <span className="font-mono font-bold text-lg hidden sm:inline">InfinityForge</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#process" className="text-sm font-mono hover:text-accent transition-colors">
            Processo
          </a>
          <a href="#services" className="text-sm font-mono hover:text-accent transition-colors">
            Serviços
          </a>
          <a href="#differentials" className="text-sm font-mono hover:text-accent transition-colors">
            Diferenciais
          </a>
          <a href="#contact" className="text-sm font-mono hover:text-accent transition-colors">
            Contato
          </a>
        </nav>

        {/* CTA Button */}
        <Button
          className="font-mono font-semibold bg-accent hover:bg-accent/90 text-background"
          size="sm"
        >
          Iniciar Projeto
        </Button>
      </div>
    </header>
  );
}
