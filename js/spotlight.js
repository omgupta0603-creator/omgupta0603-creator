/*
 * Spotlight: a soft light that follows the pointer across a card, and along its edge.
 * Vanilla port of the 21st.dev "Spotlight" component by kevingirelli
 * (https://21st.dev/@kevingirelli/components/spotlight). The light and ring are
 * the .spot::before/::after rules in styles.css; this only updates two CSS
 * variables per frame. Touch pointers are skipped.
 */
(function () {
  document.querySelectorAll('.spot').forEach((el) => {
    let frame = 0;
    el.addEventListener('pointermove', (event) => {
      if (event.pointerType === 'touch') return;
      const { clientX, clientY } = event;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = el.getBoundingClientRect();
        el.style.setProperty('--spotlight-x', `${clientX - bounds.left}px`);
        el.style.setProperty('--spotlight-y', `${clientY - bounds.top}px`);
      });
    });
  });
})();
