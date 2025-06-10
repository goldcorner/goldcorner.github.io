document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('darkModeToggle');
  const body = document.body;

  // Check for saved user preference
  const savedMode = localStorage.getItem('darkMode');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Apply dark mode if enabled in localStorage or if user prefers dark mode (and no setting is saved)
  if (savedMode === 'enabled' || (!savedMode && prefersDark)) {
    body.classList.add('dark-mode');
    if (toggleBtn) toggleBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
  }

  // Toggle dark mode
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      
      // Update button text and save preference
      if (body.classList.contains('dark-mode')) {
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        localStorage.setItem('darkMode', 'enabled');
      } else {
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
        localStorage.setItem('darkMode', 'disabled');
      }
    });
  }
});