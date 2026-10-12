import { useEffect, useRef } from "react";

interface AmbientDepthProps {
  theme: "dark" | "light";
  className?: string;
}

/**
 * AmbientDepthSpace — restrained cinematic studio atmosphere.
 * Perspective depth lines, soft studio lighting that follows the cursor,
 * and slow ambient dust. 2D canvas only: no WebGL weight, DPR-capped,
 * paused offscreen, static under reduced motion.
 */
export default function AmbientDepthSpace({ theme, className }: AmbientDepthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    const mouse = { x: 0.5, y: 0.35, tx: 0.5, ty: 0.35 };

    interface Particle {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }

    const particles: Particle[] = Array.from({ length: 20 }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: 0.2 + Math.random() * 0.8,
      vx: (Math.random() - 0.5) * 0.0001,
      vy: -0.00007 - Math.random() * 0.00014,
      size: 0.8 + Math.random() * 1.6,
      alpha: 0.1 + Math.random() * 0.22,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / Math.max(rect.width, 1);
      const ny = (e.clientY - rect.top) / Math.max(rect.height, 1);
      mouse.tx = Math.min(1, Math.max(0, nx));
      mouse.ty = Math.min(1, Math.max(0, ny));
    };

    const onDocLeave = () => {
      mouse.tx = 0.5;
      mouse.ty = 0.35;
    };

    const draw = () => {
      const dark = themeRef.current === "dark";

      mouse.x += (mouse.tx - mouse.x) * 0.035;
      mouse.y += (mouse.ty - mouse.y) * 0.035;

      ctx.clearRect(0, 0, w, h);

      const mx = mouse.x * w;
      const my = mouse.y * h;

      // 1. Primary studio light following the pointer
      const lightRadius = Math.max(w, h) * 0.58;
      const grad = ctx.createRadialGradient(mx, my, 0, mx, my, lightRadius);
      if (dark) {
        grad.addColorStop(0, "rgba(124, 127, 245, 0.095)");
        grad.addColorStop(0.45, "rgba(124, 127, 245, 0.026)");
        grad.addColorStop(1, "rgba(8, 9, 14, 0)");
      } else {
        grad.addColorStop(0, "rgba(67, 56, 202, 0.05)");
        grad.addColorStop(0.45, "rgba(67, 56, 202, 0.012)");
        grad.addColorStop(1, "rgba(246, 247, 250, 0)");
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // 2. Secondary atmospheric rim
      const rimGrad = ctx.createRadialGradient(w * 0.82, h * 0.18, 0, w * 0.82, h * 0.18, w * 0.45);
      rimGrad.addColorStop(0, dark ? "rgba(154, 157, 250, 0.045)" : "rgba(67, 56, 202, 0.03)");
      rimGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = rimGrad;
      ctx.fillRect(0, 0, w, h);

      // 3. Architectural perspective floor
      const vpX = w * 0.5 + (mouse.x - 0.5) * 55;
      const vpY = h * 0.6 + (mouse.y - 0.35) * 38;
      const groundY = h * 0.62;

      ctx.save();
      ctx.beginPath();
      ctx.rect(0, groundY - 40, w, h - groundY + 40);
      ctx.clip();

      const lineStroke = dark ? "rgba(242, 244, 250, 0.021)" : "rgba(12, 15, 26, 0.021)";
      ctx.strokeStyle = lineStroke;
      ctx.lineWidth = 1;

      const rays = 14;
      for (let i = -rays; i <= rays; i++) {
        const spreadX = vpX + i * (w / rays) * 0.9;
        ctx.beginPath();
        ctx.moveTo(vpX, vpY);
        ctx.lineTo(spreadX, h + 80);
        ctx.stroke();
      }

      const depthSteps = 10;
      for (let j = 1; j <= depthSteps; j++) {
        const t = Math.pow(j / depthSteps, 2.2);
        const y = groundY + t * (h - groundY);
        const alpha = Math.min(0.05, 0.013 + t * 0.04);
        ctx.strokeStyle = dark
          ? `rgba(242, 244, 250, ${alpha.toFixed(3)})`
          : `rgba(12, 15, 26, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      ctx.restore();

      // 4. Ambient dust — barely perceptible depth parallax
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) p.y = 1;
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;

        const px = p.x * w + (mouse.x - 0.5) * 18 * p.z;
        const py = p.y * h + (mouse.y - 0.5) * 18 * p.z;

        const pAlpha = dark ? p.alpha * 0.55 : p.alpha * 0.35;
        ctx.fillStyle = dark
          ? `rgba(242, 244, 250, ${pAlpha.toFixed(3)})`
          : `rgba(67, 56, 202, ${pAlpha.toFixed(3)})`;

        ctx.beginPath();
        ctx.arc(px, py, p.size * p.z, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      if (!running) return;
      draw();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onDocLeave);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVis = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onDocLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
