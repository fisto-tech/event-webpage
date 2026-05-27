/* ═══════════════════════════════════════════════════
   FIST-O Tech — Main Script
   ═══════════════════════════════════════════════════ */

(() => {
  'use strict';

  /* ── Preloader ───────────────────────────────── */
  const preloader = document.getElementById('preloader');
  const finishPreload = () => {
    if (!preloader) return;
    document.body.classList.add('is-loaded');
    document.body.classList.remove('is-loading');
    // Allow CSS transition to finish, then remove from DOM
    window.setTimeout(() => preloader.remove(), 550);
  };

  // Hide loader when everything is ready
  window.addEventListener('load', finishPreload, { once: true });
  // Failsafe (in case some external resource hangs)
  window.setTimeout(finishPreload, 5000);

  /* ── Navbar scroll-glass effect ───────────────── */
  const navbar = document.getElementById('navbar');
  const SCROLL_THRESHOLD = 30; // px before glass kicks in

  const handleScroll = () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  };

  // Passive listener for performance
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Run once on load in case page is already scrolled
  handleScroll();

  /* ── Scroll Animations (GSAP + ScrollTrigger) ──── */
  try {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (!prefersReducedMotion && window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);

      // Base defaults (slower + smoother)
      window.gsap.defaults({ ease: 'power3.out' });
      window.gsap.ticker.lagSmoothing(500, 16);
      window.ScrollTrigger.config({
        limitCallbacks: true,
        ignoreMobileResize: true
      });

      // Helper: batched reveal that reverses immediately on scroll-up
      const batchReveal = (targets, fromVars, toVars) => {
        const els = window.gsap.utils.toArray(targets).filter((el) => {
          // Don't hide/animate the hero content by default (hero has its own intro)
          if (el.closest && el.closest('#hero')) return false;
          // Skip if element is not in layout flow
          return el && el.offsetParent !== null;
        });

        if (!els.length) return;

        // Hint the browser for better performance during animations
        window.gsap.set(els, { willChange: 'transform, opacity', force3D: true });

        // Important: set initial hidden state ONLY for non-hero elements.
        // This prevents "collapsed" look at the top of the page.
        window.gsap.set(els, { ...fromVars });

        window.ScrollTrigger.batch(els, {
          start: 'top 85%',
          end: 'bottom 15%',
          onEnter: (batch) =>
            window.gsap.to(batch, {
              ...toVars,
              overwrite: 'auto',
              stagger: { each: 0.085, from: 'start' },
              onComplete: () => window.gsap.set(batch, { willChange: 'auto' })
            }),
          onLeaveBack: (batch) =>
            window.gsap.to(batch, {
              ...fromVars,
              overwrite: 'auto',
              duration: Math.max(0.35, (toVars?.duration ?? 0.8) * 0.6),
              stagger: { each: 0.07, from: 'end' },
              onComplete: () => window.gsap.set(batch, { willChange: 'auto' })
            }),
          // Performance: limit how often batch recalculates
          interval: 0.2,
          batchMax: 14
        });
      };

      // 1) Text + UI elements
      batchReveal(
        [
          '.section h2',
          '.section h3',
          '.section h4',
          '.section h5',
          '.section p',
          '.section .about__badge',
          '.section .first-time__badge',
          '.section .features-header',
          '.section .app-cta-btn',
          '.section hr',
          '.features-highlights__item',
          '.comp-list__item',
          '.event-app__features li',
          '.pattern-app__features li',
          '.footer-logo-section',
          '.footer-column',
          '.footer-bottom'
        ].join(', '),
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 1.2 }
      );

      // 2) Media elements (images/video) – subtle zoom
      batchReveal(
        '.section img, .section video, .section .features-diagram__img, .section .catalog-embed__object',
        { autoAlpha: 0, y: 14, scale: 0.985 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 1.35 }
      );

      // 3) Key blocks (left/right columns) – slide-in
      batchReveal(
        '.first-time__left, .comp-side--traditional, .event-app__content, .pattern-app__visual',
        { autoAlpha: 0, x: -32 },
        { autoAlpha: 1, x: 0, duration: 1.45 }
      );
      batchReveal(
        '.first-time__right, .comp-side--modern, .event-app__visual, .pattern-app__content',
        { autoAlpha: 0, x: 32 },
        { autoAlpha: 1, x: 0, duration: 1.45 }
      );

      // 4) Cards / special items – pop
      batchReveal(
        '.solution-card__image-wrapper, .features-diagram, .media-section__video-wrapper, .comp-vs__inner',
        { autoAlpha: 0, y: 14, scale: 0.955 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 1.35 }
      );

      // HERO: play on load, and re-play when scrolling back to hero
      const hero = document.querySelector('#hero');
      if (hero) {
        const heroText = hero.querySelector('.hero__text');
        const heroVisual = hero.querySelector('.hero__visual');

        const heroTl = window.gsap.timeline({
          paused: true,
          defaults: { duration: 0.9, ease: 'power3.out' }
        });

        if (heroText) heroTl.fromTo(heroText, { autoAlpha: 0, x: -40 }, { autoAlpha: 1, x: 0 }, 0);
        if (heroVisual) heroTl.fromTo(heroVisual, { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0 }, 0.05);

        // Show hero on initial load
        heroTl.progress(1);

        window.ScrollTrigger.create({
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          onEnterBack: () => heroTl.play(0),
          onLeave: () => heroTl.reverse(0),
          // If user refreshes mid-page and scrolls up into hero
          onEnter: () => heroTl.play(0),
          // Don't hide hero when user reaches very top again
          onLeaveBack: () => heroTl.progress(1)
        });
      }

      window.addEventListener('load', () => window.ScrollTrigger.refresh(), { once: true });
    }
  } catch (_) {
    // Fail silently if GSAP isn't available
  }

  /* ── 3D Card Hover Effect ───────────────────── */
  const cards = document.querySelectorAll('.solution-card');

  const isHoverEffect = window.innerWidth > 991;

  if (isHoverEffect) {

    cards.forEach($card => {
      let bounds;
    
      const rotateToMouse = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const leftX = mouseX - bounds.x;
        const topY = mouseY - bounds.y;
        const center = {
          x: leftX - bounds.width / 2,
          y: topY - bounds.height / 2
        };
        
        // Smooth calculation for tilt (adjust 20 for more/less tilt)
        const transitionX = center.y / (bounds.height / 20);
        const transitionY = -center.x / (bounds.width / 20);
    
        $card.style.transform = `
          scale3d(1.07, 1.07, 1.07)
          rotateX(${transitionX}deg)
          rotateY(${transitionY}deg)
        `;
    
        const glow = $card.querySelector('.glow');
        if (glow) {
          glow.style.background = `
            radial-gradient(
              circle at
              ${leftX}px
              ${topY}px,
              #ffffff55,
              #0000000f
            )
          `;
        }
      };
    
      $card.addEventListener('mouseenter', () => {
        bounds = $card.getBoundingClientRect();
        $card.classList.remove('returning'); // Remove snap-back transition
        document.addEventListener('mousemove', rotateToMouse);
      });
    
      $card.addEventListener('mouseleave', () => {
        document.removeEventListener('mousemove', rotateToMouse);
        $card.classList.add('returning'); // Add smooth transition back
        $card.style.transform = '';
        
        const glow = $card.querySelector('.glow');
        if (glow) {
          glow.style.background = '';
        }
      });
    });
    
  }

})();
