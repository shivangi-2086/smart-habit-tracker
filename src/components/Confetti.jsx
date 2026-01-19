import { useRef, useEffect } from "react";

function Confetti({ duration = 3000, particleCount = 120 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const colors = ["#f97316", "#fb7185", "#60a5fa", "#34d399", "#a78bfa", "#fef08a"];

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: rand(0, w),
        y: rand(-h, 0),
        vx: rand(-2, 2),
        vy: rand(1, 4),
        size: rand(6, 12),
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: rand(0, Math.PI * 2),
        vr: rand(-0.1, 0.1),
      });
    }

    let raf = null;

    function update() {
      ctx.clearRect(0, 0, w, h);
      for (let p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03; // gravity
        p.rotation += p.vr;

        if (p.y > h + 50) {
          p.y = rand(-50, -10);
          p.x = rand(0, w);
          p.vy = rand(1, 4);
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }

      raf = requestAnimationFrame(update);
    }

    update();

    const stopTimeout = setTimeout(() => {
      if (raf) cancelAnimationFrame(raf);
      // clear canvas after animation
      ctx.clearRect(0, 0, w, h);
    }, duration);

    function onResize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(stopTimeout);
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      // attempt to clear canvas
      ctx.clearRect(0, 0, w, h);
    };
  }, [duration, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}

export default Confetti;
