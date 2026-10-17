import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

export function ScrollToTop() {
  const { hash } = useLocation();
  const isInitial = useRef(true);

  // On page mount / reload: ALWAYS scroll up to the hero section (top)
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Scroll to top immediately
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // Remove any lingering anchor hash from previous navigation on reload
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }

    const hero = document.getElementById("home");
    if (hero) {
      hero.scrollIntoView({ behavior: "instant" });
    }

    const timer = setTimeout(() => {
      isInitial.current = false;
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  // During active user navigation: scroll to hash when a link is clicked
  useEffect(() => {
    if (isInitial.current) return;

    if (hash) {
      const id = hash.replace("#", "");
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [hash]);

  return null;
}
