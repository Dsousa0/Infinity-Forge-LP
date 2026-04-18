import RuneField from "@/components/RuneField";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-primary/15 bg-background text-foreground">
      <RuneField seed="footer" count={18} />
      <div className="container relative z-10 py-14">
        <div className="mb-12 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
          <div>
            <div className="mb-4 flex items-center">
              <img src="/logo.png" alt="Infinity Forge" className="h-9 w-auto rounded-md" />
            </div>
            <p className="text-sm text-muted-foreground">Engenharia de software com estética nórdica e visão de produto.</p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <h4 className="mb-4 font-mono text-sm font-bold uppercase tracking-wider text-primary">Navegação</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#process" className="transition-colors hover:text-primary">Processo</a></li>
              <li><a href="#services" className="transition-colors hover:text-primary">Serviços</a></li>
              <li><a href="#differentials" className="transition-colors hover:text-primary">Diferenciais</a></li>
            </ul>
          </nav>

          <div>
            <h4 className="mb-4 font-mono text-sm font-bold uppercase tracking-wider text-primary">Contato</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="mailto:contato@infinityforge.com" className="transition-colors hover:text-primary">Email</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">LinkedIn</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">GitHub</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-sm font-bold uppercase tracking-wider text-primary">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="transition-colors hover:text-primary">Termos de Serviço</a></li>
              <li><a href="#" className="transition-colors hover:text-primary">Política de Privacidade</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary/15 pt-8 text-center text-sm text-muted-foreground">
          © {currentYear} InfinityForge. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}