// VS Code Marketplace API helper
async function fetchVSCodeExtensionStats(extensionId) {
  try {
    // VS Code Marketplace REST API endpoint
    const apiUrl = 'https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery';

    const requestBody = {
      filters: [{
        criteria: [{
          filterType: 7,
          value: extensionId
        }]
      }],
      flags: 914
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json;api-version=3.0-preview.1'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();

    if (data.results && data.results[0] && data.results[0].extensions && data.results[0].extensions[0]) {
      const extension = data.results[0].extensions[0];
      return {
        installs: extension.statistics?.find(s => s.statisticName === 'install')?.value || 0,
        rating: extension.statistics?.find(s => s.statisticName === 'averagerating')?.value || 0,
        ratingCount: extension.statistics?.find(s => s.statisticName === 'ratingcount')?.value || 0
      };
    }

    return null;
  } catch (error) {
    console.warn(`Failed to fetch stats for ${extensionId}:`, error);
    return null;
  }
}

// Format number with K/M suffix
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Format rating
function formatRating(rating) {
  if (!rating || rating === 0) return 'N/A';
  return rating.toFixed(1) + ' ⭐';
}

// Update extension metrics
async function updateExtensionMetrics() {
  const extensionCards = document.querySelectorAll('.project-card[data-extension]');

  for (const card of extensionCards) {
    const extensionId = card.getAttribute('data-extension');
    const installsElement = card.querySelector('[data-metric="installs"]');
    const ratingElement = card.querySelector('[data-metric="rating"]');

    // Show loading state
    if (installsElement) installsElement.textContent = '...';
    if (ratingElement) ratingElement.textContent = '...';

    try {
      const stats = await fetchVSCodeExtensionStats(extensionId);

      if (stats) {
        if (installsElement) {
          installsElement.textContent = formatNumber(stats.installs);
        }
        if (ratingElement) {
          ratingElement.textContent = formatRating(stats.rating);
        }
      } else {
        // Fallback: try to fetch from extension page (alternative method)
        // For now, show placeholder
        if (installsElement) installsElement.textContent = 'Loading...';
        if (ratingElement) ratingElement.textContent = 'Loading...';

        // Try alternative method: fetch extension page and parse
        try {
          const pageUrl = `https://marketplace.visualstudio.com/items?itemName=${extensionId}`;
          // Note: CORS will likely block this, but we can try
          // In a real implementation, you might need a backend proxy
        } catch (e) {
          // If all methods fail, show default values
          if (installsElement) installsElement.textContent = '-';
          if (ratingElement) ratingElement.textContent = '-';
        }
      }
    } catch (error) {
      console.error(`Error updating metrics for ${extensionId}:`, error);
      if (installsElement) installsElement.textContent = '-';
      if (ratingElement) ratingElement.textContent = '-';
    }
  }
}

// Initialize when DOM is ready or when component is loaded via HTMX
function initProjects() {
  // Small delay to ensure DOM is ready after HTMX swap
  setTimeout(() => {
    updateExtensionMetrics();
  }, 100);
}

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProjects);
} else {
  initProjects();
}

// Re-render when HTMX swaps in the projects section
document.body.addEventListener('htmx:afterSwap', (e) => {
  if (e.detail.target.id === 'content' && document.querySelector('#projects')) {
    initProjects();
  }
});

