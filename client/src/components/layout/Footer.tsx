const Footer = () => {
  return (
    <footer className="border-t border-surface-border">
      <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-text-muted text-sm">&copy; 2026 Yen Sauliak</p>
        <div className="flex gap-6">
          <a
            href="https://github.com/halva2251"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted text-sm hover:text-text-primary transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/yevhenii-sauliak/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted text-sm hover:text-text-primary transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
