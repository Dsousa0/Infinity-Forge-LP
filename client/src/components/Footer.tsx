export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-14">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md border border-accent/60 bg-accent/15 text-accent">ᚠ</div>
              <span className="font-mono font-bold">InfinityForge</span>
            </div>
            <p className="text-sm text-primary-foreground/75">Engenharia de software com estética nórdica e visão de produto.</p>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-sm font-bold uppercase tracking-wider text-accent">Navegação</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/75">
              <li><a href="#process" className="hover:text-accent">Processo</a></li>
              <li><a href="#services" className="hover:text-accent">Serviços</a></li>
              <li><a href="#differentials" className="hover:text-accent">Diferenciais</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-sm font-bold uppercase tracking-wider text-accent">Contato</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/75">
              <li><a href="mailto:contato@infinityforge.com" className="hover:text-accent">Email</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent">LinkedIn</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent">GitHub</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-sm font-bold uppercase tracking-wider text-accent">Legal</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/75">
              <li><a href="#" className="hover:text-accent">Termos de Serviço</a></li>
              <li><a href="#" className="hover:text-accent">Política de Privacidade</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/70">
          © {currentYear} InfinityForge. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}