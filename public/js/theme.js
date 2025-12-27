(function(){
  const storageKey = 'theme';
  const toggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  function applyTheme(theme, save=true){
    if(theme === 'dark'){
      root.classList.add('dark');
      if(toggle) toggle.setAttribute('aria-pressed','true');
    } else {
      root.classList.remove('dark');
      if(toggle) toggle.setAttribute('aria-pressed','false');
    }
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

  // Initialize theme (do not overwrite saved preference with system value)
  applyTheme(getPreferredTheme(), false);

  // Toggle handler
  if(toggle){
    toggle.addEventListener('click', () => {
      const isDark = root.classList.contains('dark');
      applyTheme(isDark ? 'light' : 'dark', true);
    });
  }

  // If no saved preference, respond to system preference changes
  if(!localStorage.getItem(storageKey) && window.matchMedia){
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      applyTheme(e.matches ? 'dark' : 'light', false);
    });
  }
})();
