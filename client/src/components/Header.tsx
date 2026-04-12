import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-primary/15 bg-background/85 backdrop-blur-lg">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-accent/60 bg-primary text-primary-foreground">
            <span className="font-mono text-lg font-bold">ᚠ</span>
          </div>
          <div className="leading-none">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">Infinity</p>
            <p className="font-mono text-lg font-bold text-foreground">Forge</p>
          </div>
        </div>

        <nav className="hidden items-center gap-7 md:flex">
          <a href="#process" className="text-sm font-mono text-foreground/80 transition-colors hover:text-primary">Processo</a>
          <a href="#services" className="text-sm font-mono text-foreground/80 transition-colors hover:text-primary">Serviços</a>
          <a href="#differentials" className="text-sm font-mono text-foreground/80 transition-colors hover:text-primary">Diferenciais</a>
          <a href="#contact" className="text-sm font-mono text-foreground/80 transition-colors hover:text-primary">Contato</a>
        </nav>

        <Button className="hidden rounded-xl border border-accent/60 bg-accent px-4 text-accent-foreground hover:bg-accent/90 sm:inline-flex" size="sm">
          Iniciar Projeto
        </Button>
      </div>
    </header>
  );
}