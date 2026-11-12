/**
 * Inline script that applies the saved theme class before first paint, so a
 * returning visitor never sees the dark default flash. Mirrors the logic in
 * `components/ThemeProvider.tsx` (key "theme": light | dark | system).
 */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('theme')||'system';var r=t==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):t;var d=document.documentElement;d.classList.remove('light','dark');d.classList.add(r);}catch(e){}})();`;
