document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Portfolio filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    // Sample portfolio data (in a real scenario, this would come from an API)
    const portfolioItems = [
        {
            id: 1,
            title: "YouTube Reel Edit",
            category: "you-tube",
            thumbnail: "short.webp",
           videoUrl: "https://www.youtube.com/embed/izv3SiAWhlo" 

        },
        {
            id: 2,
            title: "Wedding Shoot",
            category: "wedding",
            thumbnail: "wed.webp",
            videoUrl: "https://www.youtube.com/embed/ghQ-LNfAJbI"
        },
        {
            id: 3,
            title: "Gaming Montage",
            category: "gaming",
            thumbnail: "game.webp",
            videoUrl: "https://www.youtube.com/embed/bfmyPkrZqnw"
        },
        {
            id: 4,
            title: "Football Highlights",
            category: "football",
            thumbnail: "football.webp",
            videoUrl: "https://www.youtube.com/embed/iecJZNBwX2Q"
        },
        {
            id: 5,
            title: "Product Ad",
            category: "ecommerce",
            thumbnail: "corporate.webp",
            videoUrl: "https://www.youtube.com/embed/FHnfg223H60"
        },
        {
            id: 6,
            title: "Travel Film",
            category: "documentary",
            thumbnail: "travel.webp",
            videoUrl: "https://www.youtube.com/embed/X_q_4i7rUYU"
        },
        {
            id: 7,
            title: "Cinematic Color Work",
            category: "color-grading",
            thumbnail: "cinematic.webp",
            videoUrl: "https://www.youtube.com/embed/Z-gFPiUuq8o"
        },
        {
            id: 8,
            title: "Anime AMV",
            category: "anime",
            thumbnail: "anime.webp",
            videoUrl: "https://www.youtube.com/embed/hhtvQZyHj6Q"
        },
        {
            id: 9,
            title: "Brand Commercial",
            category: "ads",
            thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            videoUrl: "https://www.youtube.com/embed/l-UpsG80MZs"
        }
    ];
    
    // Display all portfolio items initially
    displayPortfolioItems(portfolioItems);
    
    // Filter portfolio items
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            if (filterValue === 'all') {
                displayPortfolioItems(portfolioItems);
            } else {
                const filteredItems = portfolioItems.filter(item => item.category === filterValue);
                displayPortfolioItems(filteredItems);
            }
        });
    });
    
    // Function to display portfolio items
    function displayPortfolioItems(items) {
        portfolioGrid.innerHTML = '';
        
        if (items.length === 0) {
            portfolioGrid.innerHTML = '<p class="no-items">No items found in this category.</p>';
            return;
        }
        
        items.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item';
            portfolioItem.setAttribute('data-category', item.category);
            
            portfolioItem.innerHTML = `
                <img src="${item.thumbnail}" alt="${item.title}">
                <div class="portfolio-overlay">
                    <h3>${item.title}</h3>
                    <div class="play-btn" data-video="${item.videoUrl}">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
            `;
            
            portfolioGrid.appendChild(portfolioItem);
        });
        
        // Initialize video lightbox for the new items
        initVideoLightbox();
    }
    
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
     // Video Lightbox functionality
    function initVideoLightbox() {
        const playButtons = document.querySelectorAll('.play-btn');
        const lightbox = document.querySelector('.video-lightbox');
        const closeBtn = document.querySelector('.close-btn');
        const videoContainer = document.querySelector('.video-container iframe');
        
        playButtons.forEach(button => {
            button.addEventListener('click', function() {
                const videoUrl = this.getAttribute('data-video');
                videoContainer.setAttribute('src', videoUrl);
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        closeBtn.addEventListener('click', function() {
            lightbox.classList.remove('active');
            videoContainer.setAttribute('src', '');
            document.body.style.overflow = 'auto';
        });
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                videoContainer.setAttribute('src', '');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    
    // Initialize video lightbox on page load
    initVideoLightbox();
});