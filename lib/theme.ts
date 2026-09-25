/**
 * Theme constants shared by the server layout and the client toggle.
 * Kept out of the "use client" module so the layout receives real values,
 * not client references.
 */

export const THEME_STORAGE_KEY = "kerinti-theme";
export type Theme = "light" | "dark";

/**
 * Runs in <head> before first paint: applies the visitor's saved choice.
 * Without one the server-rendered data-theme="light" stays (light default).
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="dark"||t==="light"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})();`;
