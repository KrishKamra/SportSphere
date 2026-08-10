/**
 * SportSphere — Elite 3D Sports Intelligence Dashboard
 * Lenis smooth scroll · Three.js sphere · GSAP · Chart.js · interactions
 */

(() => {
  'use strict';

  // ========== LENIS SMOOTH SCROLL ==========
  let lenis = null;

  function initLenis() {
    if (typeof Lenis === 'undefined') {
      console.warn('Lenis not loaded — falling back to native scroll');
      return;
    }

    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // Sync GSAP ScrollTrigger with Lenis
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    // Anchor links via Lenis
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -80, duration: 1.4 });
        closeMobileMenu();
      });
    });
  }

  // ========== THREE.JS 3D BACKGROUND ==========
  function initThreeScene() {
    const canvas = document.getElementById('sphere-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Core wireframe sphere
    const sphereGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphere.position.set(2.2, 0.4, 0);
    scene.add(sphere);

    // Inner solid glow sphere
    const coreGeo = new THREE.IcosahedronGeometry(0.9, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x0088aa,
      transparent: true,
      opacity: 0.08,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.copy(sphere.position);
    scene.add(core);

    // Outer ring (torus)
    const ringGeo = new THREE.TorusGeometry(2.15, 0.012, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffc93c,
      transparent: true,
      opacity: 0.35,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.copy(sphere.position);
    ring.rotation.x = Math.PI / 2.4;
    scene.add(ring);

    const ring2 = ring.clone();
    ring2.rotation.x = Math.PI / 1.6;
    ring2.material = ringMat.clone();
    ring2.material.color.set(0xff2d95);
    ring2.material.opacity = 0.2;
    scene.add(ring2);

    // Particle field
    const particleCount = 900;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const colorA = new THREE.Color(0x00d4ff);
    const colorB = new THREE.Color(0xffc93c);
    const colorC = new THREE.Color(0xff2d95);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 3 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i3 + 2] = radius * Math.cos(phi) - 2;

      const mix = Math.random();
      const c = mix < 0.6 ? colorA.clone().lerp(colorB, mix / 0.6) : colorB.clone().lerp(colorC, (mix - 0.6) / 0.4);
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    });

    // Scroll influence
    let scrollY = 0;
    if (lenis) {
      lenis.on('scroll', ({ scroll }) => {
        scrollY = scroll;
      });
    } else {
      window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
      });
    }

    let frame = 0;
    function animate() {
      frame += 0.005;
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      sphere.rotation.y = frame * 0.6 + targetX * 0.4;
      sphere.rotation.x = frame * 0.25 + targetY * 0.3;
      core.rotation.y = -frame * 0.4;
      core.rotation.z = frame * 0.2;

      ring.rotation.z = frame * 0.3;
      ring2.rotation.z = -frame * 0.2;

      particles.rotation.y = frame * 0.08 + targetX * 0.15;
      particles.rotation.x = targetY * 0.1;

      // Subtle vertical drift with scroll
      const scrollOffset = scrollY * 0.0008;
      sphere.position.y = 0.4 - scrollOffset;
      core.position.y = sphere.position.y;
      ring.position.y = sphere.position.y;
      ring2.position.y = sphere.position.y;

      camera.position.x = targetX * 0.35;
      camera.position.y = -targetY * 0.2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }

  // ========== CURSOR GLOW ==========
  function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow || window.matchMedia('(pointer: coarse)').matches) {
      if (glow) glow.style.display = 'none';
      return;
    }

    let x = 0;
    let y = 0;
    let gx = 0;
    let gy = 0;

    window.addEventListener('mousemove', (e) => {
      x = e.clientX;
      y = e.clientY;
    });

    function loop() {
      gx += (x - gx) * 0.12;
      gy += (y - gy) * 0.12;
      glow.style.left = `${gx}px`;
      glow.style.top = `${gy}px`;
      requestAnimationFrame(loop);
    }
    loop();
  }

  // ========== 3D TILT ON PANELS ==========
  function initPanelTilt() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.querySelectorAll('.panel-3d').forEach((panel) => {
      panel.addEventListener('mousemove', (e) => {
        const rect = panel.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rx = (py - 0.5) * -10;
        const ry = (px - 0.5) * 12;
        panel.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      panel.addEventListener('mouseleave', () => {
        panel.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      });
    });
  }

  // ========== NAV SCROLL STATE + ACTIVE SECTION ==========
  function initNav() {
    const nav = document.getElementById('nav');
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function onScroll(scroll) {
      if (nav) {
        nav.classList.toggle('scrolled', scroll > 40);
      }

      let current = '';
      sections.forEach((section) => {
        const top = section.offsetTop - 160;
        if (scroll >= top) current = section.getAttribute('id') || '';
      });

      links.forEach((link) => {
        const id = link.getAttribute('data-section') || link.getAttribute('href')?.slice(1);
        link.classList.toggle('active', id === current);
      });
    }

    if (lenis) {
      lenis.on('scroll', ({ scroll }) => onScroll(scroll));
    } else {
      window.addEventListener('scroll', () => onScroll(window.scrollY));
    }
    onScroll(0);
  }

  // ========== MOBILE MENU ==========
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  function closeMobileMenu() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('open');
    mobileDrawer.hidden = true;
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
  }

  function initMobileMenu() {
    if (!mobileToggle || !mobileDrawer) return;

    mobileToggle.addEventListener('click', () => {
      const open = mobileDrawer.classList.toggle('open');
      mobileDrawer.hidden = !open;
      mobileToggle.setAttribute('aria-expanded', String(open));
    });

    mobileDrawer.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', closeMobileMenu);
    });
  }

  // ========== SCROLL REVEALS ==========
  function initReveals() {
    const els = document.querySelectorAll('.reveal, .team-card, .signal-list li');

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible', 'in-view');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach((el) => io.observe(el));
  }

  // ========== KPI COUNTERS ==========
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count') || '0', 10);
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 1600;
          const start = performance.now();

          function tick(now) {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          io.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((c) => io.observe(c));
  }

  // ========== HERO INSIGHT TOGGLE ==========
  function initInsightToggle() {
    const btn = document.getElementById('highlightBtn');
    const content = document.getElementById('highlightContent');
    if (!btn || !content) return;

    // Start expanded for wow factor, allow toggle
    content.classList.remove('collapsed');

    const label = btn.querySelector('.btn-neon-label');
    const setLabel = (open) => {
      if (!label) return;
      label.innerHTML = open
        ? `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg> Hide Insight`
        : `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg> Today's Insight`;
    };
    setLabel(true);

    btn.addEventListener('click', () => {
      const open = content.classList.toggle('collapsed');
      setLabel(!open);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !content.classList.contains('collapsed')) {
        content.classList.add('collapsed');
        setLabel(false);
      }
    });
  }

  // ========== RADIAL METER ==========
  function initRadial() {
    const circle = document.getElementById('radialProgress');
    const valueEl = document.getElementById('radialValue');
    if (!circle) return;

    const circumference = 2 * Math.PI * 52;
    circle.style.strokeDasharray = String(circumference);
    circle.style.strokeDashoffset = String(circumference);

    const target = 84;
    const offset = circumference - (target / 100) * circumference;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        circle.style.strokeDashoffset = String(offset);

        if (valueEl) {
          const start = performance.now();
          const dur = 1400;
          function tick(now) {
            const p = Math.min((now - start) / dur, 1);
            valueEl.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }
        io.disconnect();
      },
      { threshold: 0.4 }
    );
    io.observe(circle.closest('.bento-card') || circle);
  }

  // ========== POWER RANK CHART ==========
  function initPowerChart() {
    const canvas = document.getElementById('powerChart');
    if (!canvas || typeof Chart === 'undefined') return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const labels = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'];
    const gridColor = 'rgba(255, 255, 255, 0.05)';
    const tickColor = 'rgba(139, 149, 168, 0.8)';

    Chart.defaults.font.family = "'Outfit', system-ui, sans-serif";

    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'City Tigers',
            data: [78, 82, 85, 88, 91, 94],
            borderColor: '#00d4ff',
            backgroundColor: 'rgba(0, 212, 255, 0.1)',
            tension: 0.4,
            fill: true,
            pointRadius: 3,
            pointHoverRadius: 6,
            borderWidth: 2,
          },
          {
            label: 'River Hawks',
            data: [80, 84, 81, 86, 87, 88],
            borderColor: '#ffc93c',
            backgroundColor: 'transparent',
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 6,
            borderWidth: 2,
          },
          {
            label: 'Mountain Bears',
            data: [70, 72, 76, 78, 80, 82],
            borderColor: '#ff2d95',
            backgroundColor: 'transparent',
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 6,
            borderWidth: 2,
          },
          {
            label: 'Coastal Sharks',
            data: [74, 71, 73, 75, 74, 76],
            borderColor: '#39ff14',
            backgroundColor: 'transparent',
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 6,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(10, 14, 26, 0.95)',
            borderColor: 'rgba(0, 212, 255, 0.3)',
            borderWidth: 1,
            titleColor: '#e8edf7',
            bodyColor: '#8b95a8',
            padding: 12,
            cornerRadius: 10,
          },
        },
        scales: {
          x: {
            grid: { color: gridColor, drawBorder: false },
            ticks: { color: tickColor, font: { size: 11 } },
          },
          y: {
            min: 60,
            max: 100,
            grid: { color: gridColor, drawBorder: false },
            ticks: { color: tickColor, font: { size: 11 } },
          },
        },
      },
    });
  }

  // ========== FAVORITES (localStorage) ==========
  const FAVORITES_KEY = 'sportSphere_favorites';

  function getFavorites() {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  function saveFavorites(favorites) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }

  function initFavorites() {
    const buttons = document.querySelectorAll('.btn-favorite');
    const display = document.getElementById('favoritesDisplay');
    const list = document.getElementById('favoritesList');

    function updateButtons() {
      const favorites = getFavorites();
      buttons.forEach((btn) => {
        const team = btn.getAttribute('data-team');
        const active = favorites.includes(team);
        btn.classList.toggle('active', active);
        const icon = btn.querySelector('.favorite-icon');
        const text = btn.querySelector('.favorite-text');
        if (icon) icon.textContent = active ? '★' : '☆';
        if (text) text.textContent = active ? 'Favorited' : 'Set Favorite';
      });
    }

    function updateDisplay() {
      const favorites = getFavorites();
      if (!display || !list) return;

      if (favorites.length === 0) {
        display.classList.add('hidden');
        return;
      }

      display.classList.remove('hidden');
      list.innerHTML = favorites
        .map(
          (team) => `
          <span class="fav-chip">
            ⭐ ${team}
            <button type="button" class="remove-favorite" data-team="${team}" aria-label="Remove ${team}">×</button>
          </span>`
        )
        .join('');

      list.querySelectorAll('.remove-favorite').forEach((btn) => {
        btn.addEventListener('click', () => {
          const team = btn.getAttribute('data-team');
          saveFavorites(getFavorites().filter((t) => t !== team));
          updateButtons();
          updateDisplay();
        });
      });
    }

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const team = btn.getAttribute('data-team');
        if (!team) return;
        let favorites = getFavorites();
        if (favorites.includes(team)) {
          favorites = favorites.filter((t) => t !== team);
        } else {
          favorites.push(team);
        }
        saveFavorites(favorites);
        updateButtons();
        updateDisplay();
      });
    });

    updateButtons();
    updateDisplay();
  }

  // ========== SCHEDULE FILTER ==========
  function initScheduleFilter() {
    const filters = document.querySelectorAll('.schedule-filter');
    const cards = document.querySelectorAll('.fixture-card');

    filters.forEach((btn) => {
      btn.addEventListener('click', () => {
        filters.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const value = btn.getAttribute('data-filter');

        cards.forEach((card) => {
          const status = card.getAttribute('data-status');
          const show = value === 'all' || status === value;
          card.classList.toggle('is-hidden', !show);
          if (show) {
            card.style.animation = 'none';
            // force reflow
            void card.offsetWidth;
            card.style.animation = '';
          }
        });
      });
    });
  }

  // ========== CONTACT FORM ==========
  function initContactForm() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    if (!form || !formMessage) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const message = document.getElementById('message')?.value.trim() || '';

      if (!name || !email || !message) {
        showFormMessage('Please fill in all fields.', 'error');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const label = submitBtn?.querySelector('.btn-neon-label');
      const original = label?.textContent || '';
      if (submitBtn) submitBtn.disabled = true;
      if (label) label.textContent = 'Transmitting...';

      setTimeout(() => {
        showFormMessage("Signal received. We'll be in touch shortly.", 'success');
        form.reset();
        if (submitBtn) submitBtn.disabled = false;
        if (label) label.textContent = original || 'Transmit Message';
      }, 1400);
    });

    function showFormMessage(text, type) {
      formMessage.textContent = text;
      formMessage.className = `form-message ${type}`;
      formMessage.classList.remove('hidden');
      setTimeout(() => formMessage.classList.add('hidden'), 5000);
    }
  }

  // ========== GSAP ENTRANCE (optional polish) ==========
  function initGsapHero() {
    if (typeof gsap === 'undefined') return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.hero-copy .eyebrow', { y: 20, opacity: 0, duration: 0.6 })
      .from('.hero-title', { y: 40, opacity: 0, duration: 0.8 }, '-=0.3')
      .from('.hero-sub', { y: 24, opacity: 0, duration: 0.6 }, '-=0.4')
      .from('.hero-cta', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
      .from('.kpi-strip', { y: 16, opacity: 0, duration: 0.5 }, '-=0.2')
      .from('.hero-panel', { y: 50, opacity: 0, duration: 0.9 }, '-=0.6');

    // Dual bars animate via CSS when insight panel is open
  }

  // ========== BOOT ==========
  function boot() {
    initLenis();
    initThreeScene();
    initCursorGlow();
    initPanelTilt();
    initNav();
    initMobileMenu();
    initReveals();
    initCounters();
    initInsightToggle();
    initRadial();
    initPowerChart();
    initFavorites();
    initScheduleFilter();
    initContactForm();
    initGsapHero();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
