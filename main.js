/* =============================================================
   HERO — PARALLAX STARS (box-shadows generated dynamically)
   ============================================================= */
(function () {
    function shadows(n) {
        const s = [];
        for (let i = 0; i < n; i++)
            s.push(`${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`);
        return s.join(',');
    }
    const ss = shadows(700), sm = shadows(200), sb = shadows(100);
    const el = document.createElement('style');
    el.textContent = `
        #stars        { box-shadow: ${ss}; }
        #stars::after  { box-shadow: ${ss}; }
        #stars2       { box-shadow: ${sm}; }
        #stars2::after { box-shadow: ${sm}; }
        #stars3       { box-shadow: ${sb}; }
        #stars3::after { box-shadow: ${sb}; }
    `;
    document.head.appendChild(el);
})();

/* =============================================================
   SCENARIOS — CAROUSEL DOTS
   ============================================================= */
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('scenariosTrack');
    const dots = document.querySelectorAll('.nav-dot');
    const cardHeight = 324;

    if (track && dots.length > 0) {
        // Click on dot → scroll to card
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                track.scrollTo({ top: index * cardHeight, behavior: 'smooth' });
            });
        });

        // Scroll → update active dot
        track.addEventListener('scroll', () => {
            const scrollTop = track.scrollTop;
            const maxIndex = dots.length - 1;
            let index = Math.round(scrollTop / cardHeight);
            if (index > maxIndex) index = maxIndex;

            dots.forEach((dot, idx) => {
                if (idx === index) {
                    dot.classList.remove('bg-white', 'border-gray-400');
                    dot.classList.add('bg-[#FF5722]', 'border-transparent');
                } else {
                    dot.classList.add('bg-white', 'border-gray-400');
                    dot.classList.remove('bg-[#FF5722]', 'border-transparent');
                }
            });
        });
    }

    // Contact form — prevent default submit (replaces onsubmit inline attr)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => e.preventDefault());
    }
});

/* =============================================================
   SMOOTH SCROLL
   Bypasses scroll-behavior:auto (needed to prevent carousel
   jump bug caused by the eco-marquee animation).
   ============================================================= */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === 'javascript:void(0)') return;
        e.preventDefault();

        // href="#" → scroll to top
        if (href === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const target = document.querySelector(href);
        if (!target) return;
        const navH = document.querySelector('.fixed.top-0')?.offsetHeight || 0;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});
