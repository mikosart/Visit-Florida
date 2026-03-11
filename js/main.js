(() => {
  const header = document.getElementById('header');
  const main = document.querySelector('.site-main');
  const pills = Array.from(document.querySelectorAll('.quick-nav a[href^="#"]'));

  function setHeaderHeightVar(){
    if(!header) return;
    const h = header.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--fixed-header-h', `${Math.ceil(h)}px`);
    if(main) main.style.paddingTop = `var(--fixed-header-h)`;
  }

  // Active pill + header theme
  const sectionIds = pills
    .map(a => a.getAttribute('href'))
    .filter(Boolean)
    .map(h => h.replace('#',''));

  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  function setActive(id){
    pills.forEach(a => {
      const isActive = a.getAttribute('href') === `#${id}`;
      a.classList.toggle('is-active', isActive);
    });
  }

	// Ensure the header height variable is accurate before observer math
	setHeaderHeightVar();

	if('IntersectionObserver' in window && sections.length){
	  const headerH = header ? Math.ceil(header.getBoundingClientRect().height) : 0;
    const obs = new IntersectionObserver((entries) => {
      // Pick the entry closest to top (largest intersection ratio + topmost)
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a,b) => (b.intersectionRatio - a.intersectionRatio) || (a.boundingClientRect.top - b.boundingClientRect.top));
      if(!visible.length) return;
      const el = visible[0].target;
      setActive(el.id);
    }, {
      root: null,
      threshold: [0.15, 0.3, 0.5, 0.75],
	    rootMargin: `-${headerH}px 0px -70% 0px`
    });

    sections.forEach(s => obs.observe(s));
  }

  // Fix anchor clicks to account for header height precisely
  function scrollToHash(hash){
    const id = hash.replace('#','');
    const el = document.getElementById(id);
    if(!el) return;
    const headerH = header ? header.getBoundingClientRect().height : 0;
    const y = window.scrollY + el.getBoundingClientRect().top - headerH - 16;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  pills.forEach(a => {
    a.addEventListener('click', (ev) => {
      const href = a.getAttribute('href');
      if(!href || !href.startsWith('#')) return;
      ev.preventDefault();
      history.pushState(null, '', href);
      scrollToHash(href);
    });
  });

  window.addEventListener('resize', setHeaderHeightVar);
  window.addEventListener('load', () => {
    setHeaderHeightVar();
    if(location.hash) scrollToHash(location.hash);
  });
  setHeaderHeightVar();

  // Scroll to Top Button
  const scrollToTopBtn = document.getElementById('scrollToTop');
  if(scrollToTopBtn){
    window.addEventListener('scroll', () => {
      if(window.scrollY > 300){
        scrollToTopBtn.classList.add('show');
      } else {
        scrollToTopBtn.classList.remove('show');
      }
    });

    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
})();
