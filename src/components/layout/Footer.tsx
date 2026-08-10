import { BrandMark } from '@/components/ui/BrandMark';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner max-w-7xl mx-auto">
        <div className="footer-brand">
          <BrandMark size="sm" />
          <div>
            <strong>SportSphere</strong>
            <p>Transforming raw web data into professional sports intelligence.</p>
          </div>
        </div>
        <p className="footer-copy">© 2026 SportSphere. All rights reserved.</p>
      </div>
    </footer>
  );
}
