"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Disable Lenis on Sanity Studio to prevent interfering with Studio UI scroll containers
    if (pathname?.startsWith("/studio")) {
      return;
    }

    let lenis: Lenis | null = null;
    let animFrame: number | null = null;

    const checkAndInit = () => {
      const isMobileOrTouch =
        window.matchMedia("(pointer: coarse)").matches ||
        window.innerWidth < 768;

      if (isMobileOrTouch) {
        if (lenis) {
          if (animFrame) cancelAnimationFrame(animFrame);
          lenis.destroy();
          lenis = null;
          animFrame = null;
        }
        return;
      }

      if (!lenis) {
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1,
          infinite: false,
        });

        function raf(time: number) {
          lenis?.raf(time);
          animFrame = requestAnimationFrame(raf);
        }

        animFrame = requestAnimationFrame(raf);
      }
    };

    checkAndInit();
    window.addEventListener("resize", checkAndInit);

    return () => {
      window.removeEventListener("resize", checkAndInit);
      if (animFrame) cancelAnimationFrame(animFrame);
      if (lenis) lenis.destroy();
    };
  }, [pathname]);

  return <>{children}</>;
}
