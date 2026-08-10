import { useState, type MouseEvent } from 'react';
import { navItems } from '@/data/nav';
import { BrandMark } from '@/components/ui/BrandMark';
import { cn } from '@/lib/cn';
import { scrollToHash } from '@/hooks/useLenis';
import { useActiveSection, useNavScrolled } from '@/hooks/useActiveSection';

const SECTION_IDS = navItems.map((n) => n.id);

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useNavScrolled();
  const active = useActiveSection(SECTION_IDS);

  const onNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToHash(href);
    setMenuOpen(false);
  };

  return (
    <header className={cn('nav-shell', scrolled && 'scrolled')} id="nav">
      <div className="nav-inner">
        <a
          href="#home"
          className="brand group"
          onClick={(e) => onNavClick(e, '#home')}
        >
          <BrandMark />
          <span className="brand-text">
            <span className="brand-name">SportSphere</span>
            <span className="brand-tag">Intelligence Hub</span>
          </span>
        </a>

        <nav className="nav-links hidden md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={cn('nav-link', active === item.id && 'active')}
              data-section={item.id}
              onClick={(e) => onNavClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <div className="live-pill" title="System status">
            <span className="live-dot" />
            <span className="live-label">LIVE FEED</span>
          </div>
          <button
            className="mobile-toggle md:hidden"
            id="mobileToggle"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        className={cn('mobile-drawer', menuOpen && 'open')}
        id="mobileDrawer"
        hidden={!menuOpen}
      >
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className="mobile-link"
            onClick={(e) => onNavClick(e, item.href)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </header>
  );
}
