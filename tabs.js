document.addEventListener('DOMContentLoaded', function() {
  // Main Tab Functionality
  function setupTabs() {
    const tabLinks = document.querySelectorAll('.nav-menu a');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Set default tab (Home)
    const defaultTab = document.querySelector('.nav-menu a[href="#home"]');
    if (defaultTab) {
      defaultTab.classList.add('active');
      document.getElementById('home').classList.add('active');
    }
    
    // Add click event to each tab link
    tabLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetTabId = this.getAttribute('href');
        const targetTab = document.querySelector(targetTabId);
        
        if (!targetTab) return;
        
        // Update active states
        tabLinks.forEach(tabLink => tabLink.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        this.classList.add('active');
        targetTab.classList.add('active');
        
        // Smooth scroll to tab
        window.scrollTo({
          top: targetTab.offsetTop - 100,
          behavior: 'smooth'
        });
      });
    });
    
    // Handle page load with hash in URL
    if (window.location.hash) {
      const hash = window.location.hash;
      const targetTabLink = document.querySelector(`.nav-menu a[href="${hash}"]`);
      
      if (targetTabLink) {
        tabLinks.forEach(tabLink => tabLink.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        targetTabLink.classList.add('active');
        document.querySelector(hash).classList.add('active');
        
        setTimeout(() => {
          document.querySelector(hash).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    }
  }

  // Booking Form Tabs
  function setupBookingTabs() {
    const bookingTabs = document.querySelectorAll('.booking-tab-btn');
    const bookingForms = document.querySelectorAll('.booking-form');
    
    if (bookingTabs.length) {
      bookingTabs.forEach(tab => {
        tab.addEventListener('click', function() {
          const target = this.dataset.tab;
          
          bookingTabs.forEach(t => t.classList.remove('active'));
          this.classList.add('active');
          
          bookingForms.forEach(form => {
            form.classList.remove('active');
            if (form.id === target) form.classList.add('active');
          });
        });
      });
    }
  }

  // Travel Destination Field Toggle
  function setupDestinationToggle() {
    const destinationSelect = document.getElementById('t-destination');
    if (destinationSelect) {
      destinationSelect.addEventListener('change', function() {
        const countryField = document.getElementById('country-field');
        const isInternational = this.value === 'International';
        
        countryField.style.display = isInternational ? 'block' : 'none';
        document.getElementById('t-country').required = isInternational;
      });
    }
  }

  // Rental Search Functionality
  function setupRentalSearch() {
    const searchRentalsBtn = document.getElementById('search-rentals');
    const clearFiltersBtn = document.getElementById('clear-filters');
    
    if (searchRentalsBtn) {
      searchRentalsBtn.addEventListener('click', function() {
        const location = document.getElementById('location').value.toLowerCase();
        const propertyType = document.getElementById('property-type').value.toLowerCase();
        const bedrooms = document.getElementById('bedrooms').value;
        const rentalCards = document.querySelectorAll('.rental-card');
        let hasMatches = false;

        rentalCards.forEach(card => {
          const cardLocation = card.dataset.location.toLowerCase();
          const cardType = card.dataset.type.toLowerCase();
          const cardBedrooms = card.dataset.bedrooms;

          const locationMatch = !location || cardLocation.includes(location);
          const typeMatch = !propertyType || cardType.includes(propertyType);
          const bedroomMatch = !bedrooms || 
                             (bedrooms === '3' ? cardBedrooms >= 3 : cardBedrooms === bedrooms);

          if (locationMatch && typeMatch && bedroomMatch) {
            card.style.display = 'block';
            hasMatches = true;
          } else {
            card.style.display = 'none';
          }
        });

        // Handle no results message
        const noResultsMsg = document.querySelector('.no-results-message');
        if (!hasMatches && !noResultsMsg) {
          const msgElement = document.createElement('div');
          msgElement.className = 'no-results-message';
          msgElement.textContent = 'No properties match your search criteria.';
          document.querySelector('.rental-listings').appendChild(msgElement);
        } else if (hasMatches && noResultsMsg) {
          noResultsMsg.remove();
        }
      });
    }

    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', function() {
        document.getElementById('location').value = '';
        document.getElementById('property-type').value = '';
        document.getElementById('bedrooms').value = '';
        
        document.querySelectorAll('.rental-card').forEach(card => {
          card.style.display = 'block';
        });
        
        const noResultsMsg = document.querySelector('.no-results-message');
        if (noResultsMsg) noResultsMsg.remove();
      });
    }
  }

  // Inquiry Form Toggle
  function setupInquiryForms() {
    document.querySelectorAll('.toggle-inquiry').forEach(button => {
      button.addEventListener('click', function() {
        const formContainer = this.nextElementSibling;
        const isVisible = formContainer.style.maxHeight && formContainer.style.maxHeight !== '0px';
        
        formContainer.style.maxHeight = isVisible ? '0' : formContainer.scrollHeight + 'px';
        this.textContent = isVisible ? 'Inquire Now' : 'Hide Form';
      });
    });
  }

  // Date Range Pickers
  function setupDatePickers() {
    const dateRangeInputs = document.querySelectorAll('.date-range');
    dateRangeInputs.forEach(input => {
      flatpickr(input, {
        mode: "range",
        altInput: true,
        altFormat: "M j, Y",
        dateFormat: "Y-m-d",
      });
    });
  }

  // Feedback Form with Star Rating
  function setupFeedbackForm() {
    const feedbackForm = document.getElementById('feedbackForm');
    
    if (feedbackForm) {
      feedbackForm.addEventListener('submit', function(e) {
        const rating = document.querySelector('input[name="Rating"]:checked');
        
        if (!rating) {
          e.preventDefault();
          alert('Please provide a rating');
          return false;
        }
      });
      
      // Star rating hover effect
      const stars = document.querySelectorAll('.rating-stars label');
      stars.forEach(star => {
        star.addEventListener('mouseover', function() {
          const value = this.getAttribute('for').replace('star', '');
          highlightStars(value);
        });
        
        star.addEventListener('mouseout', function() {
          const checked = document.querySelector('.rating-stars input:checked');
          highlightStars(checked ? checked.value : 0);
        });
      });
    }
  }

  // Blog Functionality
  function setupBlog() {
    const newPostBtn = document.getElementById('new-post-btn');
    const blogPostForm = document.getElementById('blog-post-form');
    const cancelPostBtn = document.getElementById('cancel-post');
    const postForm = document.getElementById('postForm');
    const blogPostsContainer = document.getElementById('blog-posts-container');
    const fullPostView = document.getElementById('full-post-view');
    const backToBlogBtn = document.getElementById('back-to-blog');

    // Sample blog data
    let blogPosts = [
      {
        id: 1,
        title: "Discovering the Hidden Beaches of Batangas",
        author: "Lorie Adame",
        date: "2024-06-15",
        image: "https://via.placeholder.com/800x400",
        content: "Batangas is known for its popular beach destinations, but there are hidden gems waiting to be discovered...",
        fullContent: "Batangas is known for its popular beach destinations, but there are hidden gems waiting to be discovered. On our recent trip, we found several secluded beaches with crystal clear waters and powdery white sand that rival more famous destinations. These beaches are accessible only by boat, which keeps them pristine and uncrowded. We recommend visiting during weekdays for the most peaceful experience. The locals are friendly and can arrange boat transfers and fresh seafood meals. Don't forget to bring snorkeling gear - the coral reefs here are teeming with marine life!"
      },
      {
        id: 2,
        title: "Top 5 Tips for First-Time International Travelers",
        author: "Gold Corner Team",
        date: "2024-05-28",
        image: "https://via.placeholder.com/800x400",
        content: "Traveling abroad for the first time can be both exciting and overwhelming...",
        fullContent: "Traveling abroad for the first time can be both exciting and overwhelming. Based on our experience helping hundreds of clients, here are our top 5 tips to make your first international trip smooth and enjoyable:\n\n1. Check passport validity - Many countries require at least 6 months validity.\n2. Research visa requirements - Some countries need visas in advance.\n3. Notify your bank - Avoid having your cards blocked for suspicious activity.\n4. Get travel insurance - Medical emergencies abroad can be very expensive.\n5. Pack light - You'll appreciate it when moving between locations.\n\nFollowing these simple tips can save you from common first-time traveler mistakes!"
      }
    ];

    // Initialize blog
    renderBlogPosts();

    function renderBlogPosts() {
      blogPostsContainer.innerHTML = '';
      
      blogPosts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.className = 'blog-post';
        postElement.dataset.id = post.id;
        
        const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
        postElement.innerHTML = `
          <div class="post-header">
            <h3 class="post-title">${post.title}</h3>
            <div class="post-meta">
              <span class="post-author"><i class="fas fa-user"></i> ${post.author}</span>
              <span class="post-date"><i class="fas fa-calendar-alt"></i> ${formattedDate}</span>
            </div>
          </div>
          <div class="post-image">
            <img src="${post.image}" alt="${post.title}">
          </div>
          <div class="post-content">
            <p>${post.content}</p>
          </div>
          <div class="post-actions">
            <button class="read-more">Read More</button>
          </div>
        `;
        
        blogPostsContainer.appendChild(postElement);
      });
    }

    function showFullPost(postId) {
      const post = blogPosts.find(p => p.id === postId);
      if (!post) return;
      
      const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      document.getElementById('full-post-title').textContent = post.title;
      document.getElementById('full-post-author').textContent = post.author;
      document.getElementById('full-post-date').textContent = formattedDate;
      document.getElementById('full-post-image').src = post.image;
      document.getElementById('full-post-image').alt = post.title;
      document.getElementById('full-post-content').textContent = post.fullContent;
      
      blogPostsContainer.style.display = 'none';
      fullPostView.style.display = 'block';
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Event listeners
    if (newPostBtn) {
      newPostBtn.addEventListener('click', () => {
        blogPostForm.style.display = blogPostForm.style.display === 'block' ? 'none' : 'block';
      });
    }

    if (cancelPostBtn) {
      cancelPostBtn.addEventListener('click', () => {
        blogPostForm.style.display = 'none';
        postForm.reset();
      });
    }

    if (postForm) {
      postForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newPost = {
          id: Date.now(),
          title: document.getElementById('post-title').value,
          author: document.getElementById('post-author').value,
          date: document.getElementById('post-date').value,
          content: document.getElementById('post-content').value.substring(0, 200) + '...',
          fullContent: document.getElementById('post-content').value,
          image: document.getElementById('post-image').files[0] ? 
                URL.createObjectURL(document.getElementById('post-image').files[0]) : 
                'https://via.placeholder.com/800x400'
        };

        blogPosts.unshift(newPost);
        renderBlogPosts();
        postForm.reset();
        blogPostForm.style.display = 'none';
      });
    }

    if (backToBlogBtn) {
      backToBlogBtn.addEventListener('click', () => {
        fullPostView.style.display = 'none';
        blogPostsContainer.style.display = 'grid';
      });
    }

    // Event delegation for read-more buttons
    blogPostsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('read-more')) {
        const postId = parseInt(e.target.closest('.blog-post').dataset.id);
        showFullPost(postId);
      }
    });
  }

  // Helper function for star ratings
  function highlightStars(value) {
    const stars = document.querySelectorAll('.rating-stars label');
    stars.forEach(star => {
      const starValue = star.getAttribute('for').replace('star', '');
      star.style.color = starValue <= value ? 'var(--secondary-color)' : 'var(--gray-color)';
    });
  }

  // Initialize all functionality
  setupTabs();
  setupBookingTabs();
  setupDestinationToggle();
  setupRentalSearch();
  setupInquiryForms();
  setupDatePickers();
  setupFeedbackForm();
  setupBlog();
});