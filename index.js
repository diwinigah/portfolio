
(function () {
  const container = document.getElementById('bulle-container');

  const NB_BULLES = 25;
  const COLORS = ['#ff6b6b', '#ffd93d', '#6bc1ff', '#8eec8b', '#d36cff', '#5dd6e0'];


  for (let i = 0; i < NB_BULLES; i++) {
    const div = document.createElement('div');
    div.className = 'bulle';

    div.style.backgroundColor = COLORS[Math.floor(Math.random() * COLORS.length)];

    div.style.left = Math.random() * 100 + 'vw';
    div.style.top = Math.random() * 100 + 'vh';

    const size = 6 + Math.random() * 24;
    div.style.width = size + 'px';
    div.style.height = size + 'px';

    div.style.animationDuration = (4 + Math.random() * 4) + 's';
    div.style.opacity = (0.5 + Math.random() * 0.5).toFixed(2);

    container.appendChild(div);
  }

  const bulbs = Array.from(container.getElementsByClassName('bulle'));
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  function onMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }
  window.addEventListener('mousemove', onMove, { passive: true });

  function loop() {

    const cx = mouseX;
    const cy = mouseY;
    bulbs.forEach((b, idx) => {

      const amp = 0.04 * (idx + 1);
      const rx = cx * 0.01 * (idx % 2 === 0 ? 1 : -1);
      const ry = cy * 0.01 * (idx % 3 === 0 ? 1 : -1);

      const currentLeft = parseFloat(b.style.left);
      const currentTop = parseFloat(b.style.top);

      const dx = (cx - window.innerWidth / 2) * amp / 2;
      const dy = (cy - window.innerHeight / 2) * amp / 2;
      b.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
    });
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
