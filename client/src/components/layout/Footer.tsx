const Footer = () => {
  return (
    <footer className="mt-auto border-t border-surface-border py-8 px-6 text-center">
      <p className="text-text-muted text-sm italic mb-3">
        Built with love and dedication
      </p>
      <div className="flex justify-center gap-6 mb-3">
        <a
          href="https://github.com/halva2251"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-secondary text-sm hover:text-accent transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/yevhenii-sauliak/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-secondary text-sm hover:text-accent transition-colors"
        >
          LinkedIn
        </a>
      </div>
      <p className="text-text-muted/60 text-xs">© 2026 Yen Sauliak</p>
    </footer>
  );
};

export default Footer;
