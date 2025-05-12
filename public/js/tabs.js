// Simple tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  // Add click event listener to each tab button
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Get the tab ID from the data-tab attribute
      const tabId = button.getAttribute('data-tab');
      
      // Remove active class from all buttons and hide all content
      tabButtons.forEach(btn => {
        btn.classList.remove('active', 'text-blue-600', 'border-blue-600');
        btn.classList.add('hover:text-gray-600', 'hover:border-gray-300');
        btn.setAttribute('aria-selected', 'false');
      });
      
      tabContents.forEach(content => {
        content.classList.add('hidden');
      });
      
      // Add active class to the clicked button and show the corresponding content
      button.classList.add('active', 'text-blue-600', 'border-blue-600');
      button.classList.remove('hover:text-gray-600', 'hover:border-gray-300');
      button.setAttribute('aria-selected', 'true');
      
      // Show the target tab content
      const tabContent = document.getElementById(tabId);
      if (tabContent) {
        tabContent.classList.remove('hidden');
      }
    });
  });
});
