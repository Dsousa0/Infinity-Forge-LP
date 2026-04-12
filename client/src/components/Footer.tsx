export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border/20">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center">
                <span className="font-mono font-bold text-background text-sm">∞</span>
              </div>
              <span className="font-mono font-bold">InfinityForge</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Engenharia de software para sistemas escaláveis.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-mono font-bold text-sm mb-4 text-foreground">Navegação</h4>
            <ul className="space-y-2">
              <li>
                <a href="#process" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Processo
                </a>
              </li>
              <li>
                <a href="#services" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#differentials" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Diferenciais
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono font-bold text-sm mb-4 text-foreground">Contato</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:contato@infinityforge.com"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-mono font-bold text-sm mb-4 text-foreground">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Termos de Serviço
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/20 pt-8">
          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground">
            <p>
              © {currentYear} InfinityForge. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
