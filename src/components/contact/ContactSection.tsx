import { useState, type FormEvent } from 'react';
import { SectionHead } from '@/components/layout/SectionHead';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';
import { usePanelTilt } from '@/hooks/usePanelTilt';

export function ContactSection() {
  const tilt = usePanelTilt();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  );
  const [statusText, setStatusText] = useState('');

  const showMessage = (text: string, type: 'success' | 'error') => {
    setStatus(type);
    setStatusText(text);
    window.setTimeout(() => {
      setStatus('idle');
      setStatusText('');
    }, 5000);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    const em = email.trim();
    const msg = message.trim();

    if (!n || !em || !msg) {
      showMessage('Please fill in all fields.', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      showMessage('Please enter a valid email address.', 'error');
      return;
    }

    setStatus('loading');
    window.setTimeout(() => {
      showMessage("Signal received. We'll be in touch shortly.", 'success');
      setName('');
      setEmail('');
      setMessage('');
    }, 1400);
  };

  return (
    <section id="contact" className="section-pad">
      <div className="max-w-2xl mx-auto">
        <SectionHead
          center
          eyebrow="Signal Channel"
          title={
            <>
              Get in <span className="text-gradient">Touch</span>
            </>
          }
          description="Partnerships, scout access, or pipeline collaboration — drop a line."
        />

        <Reveal>
          <form
            id="contactForm"
            className="contact-form glass-panel panel-3d"
            noValidate
            onSubmit={onSubmit}
            {...tilt}
          >
            <div className="field">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Alex Rivera"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="you@club.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Tell us about your use case..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn-neon w-full"
              disabled={status === 'loading'}
            >
              <span className="btn-neon-glow" />
              <span className="btn-neon-label">
                {status === 'loading' ? 'Transmitting...' : 'Transmit Message'}
              </span>
            </button>
            <div
              id="formMessage"
              className={cn(
                'form-message',
                status === 'success' && 'success',
                status === 'error' && 'error',
                (status === 'idle' || status === 'loading') && 'hidden',
              )}
              role="status"
            >
              {statusText}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
