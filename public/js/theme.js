(function(){
  const storageKey = 'theme';
  const root = document.documentElement;

  function setToggleState(isDark){
    const toggle = document.getElementById('theme-toggle');
    if(toggle) toggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  }

  function applyTheme(theme, save=true){
    if(theme === 'dark'){
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    setToggleState(theme === 'dark');
    if(save) localStorage.setItem(storageKey, theme);
  }

  function getPreferredTheme(){
    const stored = localStorage.getItem(storageKey);
    if(stored === 'light' || stored === 'dark') return stored;
    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
      return 'dark';
    }
    return 'light';
  }

  function bindToggle(){
    const toggle = document.getElementById('theme-toggle');
    if(!toggle) return;
    // attach handler once and keep a reference to avoid duplicates
    if(!toggle._themeHandler){
      toggle._themeHandler = () => {
        const isDark = root.classList.contains('dark');
        applyTheme(isDark ? 'light' : 'dark', true);
      };
      toggle.addEventListener('click', toggle._themeHandler);
    }
    // make sure aria reflects current state
    setToggleState(root.classList.contains('dark'));
  }

  // Initialize theme (do not overwrite saved preference with system value)
  applyTheme(getPreferredTheme(), false);

  // Bind toggle if header already present
  bindToggle();

  // Re-bind after HTMX swaps content (header loads via hx-get)
  document.body.addEventListener('htmx:afterSwap', () => bindToggle());

  // Fallback: observe for DOM changes and bind when toggle appears
  const obs = new MutationObserver(() => {
    if(document.getElementById('theme-toggle')) bindToggle();
  });
  obs.observe(document.body, { childList: true, subtree: true });

  // If no saved preference, respond to system preference changes
  if(!localStorage.getItem(storageKey) && window.matchMedia){
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      applyTheme(e.matches ? 'dark' : 'light', false);
    });
  }
})();
