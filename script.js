// =============================================
// VIGIWOODS INTERIOR DESIGN - JAVASCRIPT (Version 2.0)
// =============================================

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // 1. Initial Page Load Activation
    const animateEntrance = () => {
        const hero = document.querySelector('.hero');
        if (hero) hero.classList.add('visible');
    };
    setTimeout(animateEntrance, 200);

    // 2. Navbar Scroll Logic
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Show/Hide Back to Top
        const backToTop = document.getElementById('backToTop');
        if (window.scrollY > 800) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    };
    window.addEventListener('scroll', handleScroll);

    // 3. Stats Counter Animation
    const counterItems = document.querySelectorAll('.stat-number');
    const animateCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                let count = 0;
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // ~60fps

                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        entry.target.innerText = Math.floor(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(entry.target);
            }
        });
    };

    const counterObserver = new IntersectionObserver(animateCounters, { threshold: 0.5 });
    counterItems.forEach(item => counterObserver.observe(item));

    // 4. Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', navLinks.classList.contains('active'));

            // Animation for Hamburger
            const spans = hamburger.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(8px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(8px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // 5. Gallery Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const captionText = document.getElementById('caption');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const closeLightbox = document.querySelector('.close-lightbox');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            lightbox.style.display = 'flex';
            lightboxImg.src = img.src;
            captionText.innerHTML = img.alt;
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    if (closeLightbox) {
        closeLightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // 6. Contact Form Logic (WhatsApp & Gmail)
    let currentMode = 'whatsapp';
    window.switchForm = (mode) => {
        currentMode = mode;
        const tabs = document.querySelectorAll('.form-tab');
        const submitBtn = document.getElementById('submitBtn');

        tabs.forEach(tab => tab.classList.remove('active'));
        if (mode === 'whatsapp') {
            tabs[0].classList.add('active');
            submitBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Send via WhatsApp';
        } else {
            tabs[1].classList.add('active');
            submitBtn.innerHTML = '<i class="fas fa-envelope"></i> Send via Gmail';
        }
    };

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn.innerHTML;

            // Loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Processing...';

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;

            if (currentMode === 'whatsapp') {
                const whatsappText = `*New Inquiry from VigiWoods Website*%0A%0A` +
                    `*Name:* ${name}%0A` +
                    `*Phone:* ${phone}%0A` +
                    `*Service:* ${service}%0A` +
                    `*Project:* ${message}`;
                const whatsappUrl = `https://wa.me/971527886905?text=${whatsappText}`;

                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Opening WhatsApp...';
                    setTimeout(() => {
                        window.open(whatsappUrl, '_blank');
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                        contactForm.reset();
                    }, 1000);
                }, 1000);
            } else {
                const emailSubject = `Project Inquiry: ${service}`;
                const emailBody = `Name: ${name}%0APhone: ${phone}%0AService: ${service}%0A%0AProject Information:%0A${message}`;
                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=vigiwoodsofficial@gmail.com&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
                const mailtoUrl = `mailto:vigiwoodsofficial@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Opening Gmail...';
                    setTimeout(() => {
                        const newWindow = window.open(gmailUrl, '_blank');
                        if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
                            window.location.href = mailtoUrl;
                        }
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                        contactForm.reset();
                    }, 1000);
                }, 1000);
            }
        });
    }

    // 7. Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - navbarHeight,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const spans = hamburger.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
    });

    // 8. Back to Top Smooth Scroll
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 9. Floating Label Interaction (Select fixes)
    const selectElement = document.getElementById('service');
    if (selectElement) {
        selectElement.addEventListener('change', () => {
            if (selectElement.value !== "") {
                selectElement.classList.add('has-value');
            }
        });
    }

    // 10. Blog Functionality
    const blogModal = document.getElementById('blogModal');
    const blogDetailModal = document.getElementById('blogDetailModal');
    const writePostBtn = document.getElementById('writePostBtn');
    const closeModal = document.getElementById('closeModal');
    const closeBlogDetail = document.getElementById('closeBlogDetail');
    const cancelBtn = document.getElementById('cancelBtn');
    const blogForm = document.getElementById('blogForm');
    const blogGrid = document.getElementById('blogGrid');
    const blogContent = document.getElementById('blogContent');
    const charCount = document.getElementById('charCount');

    // Default blog posts from original website
    const defaultBlogPosts = [
        {
            id: 1,
            title: "Carpentry Services in Dubai: How to Select the Best Experts",
            author: "VigiWoods Team",
            email: "vigiwoodsofficial@gmail.com",
            content: "Carpentry is a more important part of enhancing Dubai homes and offices than many people think. Carpentry can transform any space with warmth, functionality and timeless style. The demand for professional carpentry services has increased in Dubai due to the rapid growth of its real estate market. Residents and businesses are looking for custom solutions beyond standard furniture.\n\nBenefits of Professional Carpenters in Dubai\n\nIt's not only about the aesthetics, but also about durability and precision. Here's why:\n\n• Custom Designs to Fit Every Space - You can design wardrobes, office partitions or kitchens according to your exact dimensions and preferences.\n\n• Long-Lasting Material - Professional carpentry uses high-quality wood to ensure durability, even in Dubai's humid and hot climate.\n\n• Increased property value - A well-crafted wooden interior can make your home more appealing to tenants and buyers.\n\n• Beauty and Function - The carpentry industry combines elegance with practicality. From modern designs to Arabic traditional styles, the work is both elegant and functional.\n\nWhat are the types of Carpentry Services we offer?\n\nDubai offers a range of carpentry services catering to both residential and commercial areas. Some of the most common include:\n\n• Wardrobes & Cabinets – Built-in wardrobes that maximize the space.\n\n• Kitchen Remodelling – Customized cabinets and shelves to meet modern kitchen requirements.\n\n• Decking & Wooden Flooring – Elegant hardwood flooring that brings warmth to interiors, and durable decking materials for outdoor areas\n\n• Windows & Doors – High-quality wooden frames and doors crafted with strength and style.\n\n• Wall Cladding & Partitions Decorative wall designs and wooden partitions that add to interiors without taking up space.\n\n• Customized Furniture – Bespoke office furniture, sofas, tables and chairs that are designed according to individual tastes.\n\nHow to Choose the Best Carpenter in Dubai?\n\nFinding the right carpentry expert is difficult with so many options. What to look for:\n\n1. Portfolio and Experience - View past projects to determine the quality of their work\n\n2. Material quality – Use durable wood to withstand Dubai's climate.\n\n3. Client Review - Feedback from past clients gives insight into professionalism and reliability.\n\n4. Customization - A good cabinetmaker should customize designs to meet your needs.\n\n5. Transparent Pricing - Avoid vague estimates; opt for detailed cost breakdowns.\n\nVigiWoods Interior: What Makes It Stand Out?\n\nWe are Vigiwoods Interior Design, and we specialize in the transformation of spaces using premium carpentry services in Dubai. Our team uses craftsmanship, creativity and attention to detail to produce results that reflect both your brand and lifestyle. What makes us unique?\n\n• Tailored Solution – From modern apartments to luxury villas, and corporate offices. We design carpentry for your space.\n\n• Comprehensive Service - Along with carpentry and renovation solutions, we also offer interior design services, fit-outs, and renovations.\n\n• Commitment to Quality - Each project is made with top-grade finishes and materials for durability and elegance.\n\n• Client Centric Approach: We listen to you, design and deliver what you want.\n\nVigiWoods in Dubai is the trusted source for carpentry services.\n\nConclusion\n\nIt's not only about woodwork. Carpentry can add warmth and functionality to any home or office. You can ensure that your space will reflect your personal style and remain durable for many years by choosing the right professionals. Vigiwoods Interior Design can assist you if you are seeking high-quality carpentry services in Dubai. Let's make your ideas a reality. Contact us today",
            category: "Carpentry Services",
            date: "December 15, 2024"
        },
        {
            id: 2,
            title: "Carpenter Abu Dhabi: Quality Woodwork for Homes and Offices",
            author: "VigiWoods Team",
            email: "vigiwoodsofficial@gmail.com",
            content: "A skilled carpenter's role is essential in Abu Dhabi, where offices and homes are designed for comfort, durability, and elegance. Professional carpentry can add beauty and functionality to interiors. From fitting elegant wooden partitions and doors in offices to creating custom wardrobes in luxury villas, it is a skill that's highly valued. By choosing the right carpenter in Abu Dhabi, you can get a customized design, durable materials, and an elegant finish that suits your lifestyle.\n\nWhy Hire Professional Carpenters in Abu Dhabi\n\nIt's not just about building or fixing things, but also about adding value. Abu Dhabi carpenters are familiar with the local climate and trends. They also understand the importance of precision craftsmanship. They use high-quality wood that is resistant to heat and humidity, while still maintaining a timeless elegance. Carpenters can create modern designs or classic Arabic woodwork. They balance functionality and luxury.\n\nCarpentry Needs in Abu Dhabi\n\n• Villa Interiors - Built-in wardrobes and elegant wooden doors. Custom kitchen cabinets to match Abu Dhabi's high-end standards.\n\n• Office Fitouts - Wooden partitions and shelving, as well as reception counters that maximize office space.\n\n• Custom furniture – Bespoke sofas and coffee tables. Dining sets and workstations are designed to your specifications\n\n• Decking: Durable wooden decks, pergolas and outdoor spaces that are ideal for villas or garden areas.\n\nThe Value of Skilled Carpenters\n\n1. Durability under Harsh Conditions - Due to Abu Dhabi's high temperatures, it is important to choose the right materials for furniture and interiors that will last.\n\n2. Space Optimizer – Custom-made carpentry will ensure that wardrobes, cabinets and shelving are perfectly fitted to your home. This allows you to maximize storage without wasting any space.\n\n3. Improved Aesthetics and Value - Wooden interiors can make offices and homes more attractive, increasing the value of the property\n\nHire the right Carpenter in Abu Dhabi\n\n• Check Portfolio - Look at a wide range of projects completed to verify experience.\n\n• Understand Materials: Ask about the types of wood used and the finishes to ensure durability.\n\n• Transparent pricing – Request clear estimates without hidden charges.\n\n• Time Commitment - Confirm timelines for projects before beginning.\n\nVigiWoods Interior: Your trusted carpentry partner\n\nWe provide high-quality carpentry in Abu Dhabi to meet residential and commercial requirements. Our expert team will focus on precision and style, whether you are upgrading a kitchen in a villa, designing custom office partitions or adding wooden floors.\n\nWhy Choose Us?\n\n• Custom designs to fit your space and lifestyle.\n\n• Materials of high quality and durability suitable for the Abu Dhabi climate.\n\n• Client-centric approach to ensure your vision becomes a reality.\n\n• We offer a full range of services, including repairs and luxury woodwork.\n\nThe conclusion of the article is:\n\nIt's more than woodwork. Carpentry involves creating beautiful, comfortable spaces. You can invest in interiors and designs that will last by choosing a skilled Abu Dhabi carpenter. Want to improve your home or workplace? Call Vigiwoods interior to learn how our carpentry service can help you realize your dreams.",
            category: "Carpentry Services",
            date: "December 10, 2024"
        },
        {
            id: 3,
            title: "Why VIGIWOODS Interior Design is the best for custom-made furniture in Dubai",
            author: "VigiWoods Team",
            email: "vigiwoodsofficial@gmail.com",
            content: "Are you looking for custom-made furnishings in Dubai that combine style, functionality and craftsmanship? VIGIWOODS Interior Design can bring your vision to life by creating bespoke carpentry tailored for the UAE lifestyle. VIGIWOODS is a company that serves both Dubai and Abu Dhabi. They specialise in stylish and durable interior woodwork, as well as renovations.\n\nWhat does \"Custom Made Furniture\" in Dubai mean?\n\nCustom-made furniture in Dubai refers to bespoke pieces crafted precisely for your particular requirements--whether that's tailored dimensions, premium materials, or a design that aligns with your aesthetic. VIGIWOODS starts with your vision and the space available. Each item, from luxurious wardrobes to elegantly crafted partitions to doors and partitions, is custom-made with attention to every detail.\n\nWhy choose custom furniture over ready-made?\n\nWhy custom-made furniture is a better investment than standard options from stores:\n\n• The Perfect Fit for Your Space - VIGIWOODS makes sure that each piece is custom-sized to maximise your space, whether it's an apartment or a villa.\n\n• Durability & High-Quality - Each item is made by skilled carpenters and boasts a superior quality build for long-lasting usage.\n\n• Unique, Personalised Design – You can express your style through furniture, whether it's minimalistic, classical, or contemporary. There are no two identical pieces.\n\n• Enjoy a seamless full-service experience - VIGIWOODS is a one-stop shop for all your woodworking needs.\n\nWhat services does VIGIWOODS offer in Dubai and Abu Dhabi?\n\nVIGIWOODS provides a range of services that cover every aspect of renovation and interior carpentry:\n\nCustom Furniture & Interior Woodwork: Wardrobes, cabinets, partitions, wooden doors, and more -- all crafted to your specifications\n\nHome Construction & Renovations: Includes flooring, full-scale renovations, and interior improvements across Abu Dhabi and Dubai\n\nKitchen & Bathroom Remodelling: Complete makeover services--cabinetry, countertops, tiling, lighting, plumbing, and more\n\nPainting & Wallpapering: Enhance aesthetics with expert painting and wallpaper installation\n\nMechanical & Utility Work: Includes plumbing, AC repair and installation, electrical fittings, and complete interior decoration\n\nVIGIWOODS has a range that covers every need, whether you are upgrading a retail store, remodelling your house, or renovating an entire villa.\n\nWhat is the process at VIGIWOODS like?\n\nThis is how the typical VIGIWOODS custom furniture project in Dubai unfolds.\n\n1. Consultation: Tell us your ideas and space requirements.\n\n2. Design & Quote: Receive customised proposals with pricing and timelines.\n\n3. Craftsmanship- Skilled carpenters turn the concept into a reality by using premium materials.\n\n4. Installation: Each piece is installed with precision and care.\n\nVIGIWOODS offers after-sales support for all your furniture needs, from repairs to maintenance. The motto \"We maintain what we built\" reflects their commitment to maintaining and caring for each project.\n\nWhy choose VIGIWOODS to make custom-made furniture in Dubai?\n\nVIGIWOODS is the best partner for you if you are looking to buy custom-made furniture made in Dubai. Here are some reasons why VIGIWOODS should be your first choice for interior design and custom furniture:\n\n• Local Expertise and Presence: Understanding of UAE design sensibilities, regulations and serving both Dubai & Abu Dhabi.\n\n• Comprehensive, End-to-End Solutions: Every need--from carpentry and furniture to AC, plumbing, and painting--is handled in-house\n\n• Long-term Commitment: Maintenance after installation underscores their reliability and dedication.\n\n• Impressive Portfolio: The wide range of furniture, renovations, and interior transformations demonstrates their versatility and quality.\n\nCustom furniture is an investment that brings comfort, beauty and individuality. VIGIWOODS makes that investment come to life.\n\nWant to improve your home or workplace? Call Vigiwoods interior to learn how our carpentry service can help you realize your dreams",
            category: "Custom Furniture",
            date: "December 5, 2024"
        },
        {
            id: 4,
            title: "Wardrobe Cabinet: Where to Find Perfect Storage in Dubai",
            author: "VigiWoods Team",
            email: "vigiwoodsofficial@gmail.com",
            content: "You'll understand the importance of a home being both stylish and practical if you live in Dubai, like I do. Apartments, villas and townhouses are designed in so many different layouts that one of the questions we often ask is \"Where can I get a wardrobe cabinet to fit my space and lifestyle?\"\n\nVIGIWOODS interior design was my answer to that question. I wanted to go beyond the mass-produced closets that are sold in shops. I wanted a piece that combines craftsmanship, design, and clever storage solutions. It had to feel like it was mine and my home in Dubai.\n\nWardrobe Cabinet Design: More than Just Storage\n\nThe designers at VIGIWOODS helped me realise that designing a wardrobe cabinet is more than just choosing shelves and drawers. It's all about finding a solution that suits your taste and architecture\n\nThe first thing they asked me was:\n\n• Do you prefer hinged or sliding doors?\n\n• How many compartments are needed for clothing, shoes and accessories?\n\n• Are you interested in incorporating lighting, mirrors or hidden storage into your home?\n\nThe consultation helped me to realise that designing a closet cabinet is similar to designing a lifestyle. VIGIWOODS offered a variety of materials, from oak and walnut classics to laminates in sleek finishes. It was the perfect combination of functionality and luxury for me.\n\nTwo Door Wardrobe Cabinets - Classics for Everyday Spaces\n\nI chose a two-door wardrobe cabinet as my first choice for the guest room. This is a great option for medium-sized rooms where you do not need a large structure, but still want to have something elegant and functional.\n\nVIGIWOODS's ability to customise the product was impressive. Instead of giving me the standard two-door boxes, they designed\n\n• The tall space is ideal for hanging dresses and coats.\n\n• Shelves for folded clothing\n\n• Slim pull-out drawers for accessories\n\nThe matte white finish was finished with metallic handles to give the room a brighter and more open feeling. The wardrobe was not only functional, but it also added to the design of the room.\n\nSmall Wardrobe Cabinets - Make a Big Impact on Compact Spaces\n\nAs many others in Dubai, my home is one where space optimisation is essential. A small wardrobe cabinet was the best choice for my spare bedroom, which also doubles as a study room.\n\nVIGIWOODS has suggested some clever tricks I would never have thought to do:\n\n• Mirrored doors will reflect light, making the room appear larger.\n\n• Create a vertical design, with compartments strategically stacked to maximise space.\n\n• Include hidden storage for seasonal clothing and extra bedding.\n\nThe result? A small wardrobe which looked modern and sleek, but was also able to hold more than I had imagined. I realised that thoughtful design is important even when space is limited.\n\nThe 3-Door Wardrobe Cabinet - A statement for the Master Bedroom\n\nI wanted a piece for my master bedroom that was both luxurious and practical. The 3-door cabinet was the answer.\n\nVIGIWOODS designed a product that included all the features I had been dreaming about:\n\n• Soft-closed doors that open smoothly and quietly.\n\n• The compartments are illuminated, so it is easy to locate things at night.\n\n• I need custom shelving for my shoe collection.\n\nThree-door design gives me a perfect balance of size and elegance. It was spacious without being overwhelming, and became the focal point of the bedroom decor.\n\nMy Experience with VIGIWOODS\n\nVIGIWOODS is distinguished by their personal approach, not only its technical expertise. From my first consultation, I felt heard. They didn't just want to sell me furniture; they wanted to know my home and my needs\n\nThe process was clearly defined.\n\n1. Consultation – A detailed discussion on space, function and style.\n\n2. Design & Quote - I was provided with custom sketches as well as pricing that matched my budget.\n\n3. Craftsmanship: Skilled carpenters created the design with precision.\n\n4. Installation - Each detail was carefully considered when installing the wardrobe.\n\n5. The motto \"We maintain what you build\" reassured me.\n\nThis level of professionalism in a city such as Dubai, where service and quality are important, made me feel that I made the right decision.\n\nWhy is a Custom Wardrobe Worth it in Dubai?\n\nAfter this experience, I can now see why custom wardrobes make such a great investment.\n\nThe perfect fit is guaranteed, even in apartment or villa layouts that vary.\n\nDurability - Made with materials of the highest quality that will last for many years.\n\nThere are no limits to the design options.\n\nValue for money: While custom-made designs are more expensive upfront, their long-term benefits cannot be denied when compared with buying ready-made furnishings.",
            category: "Interior Design",
            date: "November 28, 2024"
        }
    ];

    // Initialize blog on page load
    initializeBlog();

    function initializeBlog() {
        // Check if blog posts already exist in localStorage
        let existingPosts = JSON.parse(localStorage.getItem('blogPosts'));
        if (!existingPosts || existingPosts.length === 0) {
            // If no posts exist, add default posts
            localStorage.setItem('blogPosts', JSON.stringify(defaultBlogPosts));
        }
        loadBlogPosts();
    }

    // Open blog creation modal
    if (writePostBtn) {
        writePostBtn.addEventListener('click', () => {
            blogForm.reset();
            blogModal.classList.add('show');
        });
    }

    // Close blog creation modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            blogModal.classList.remove('show');
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            blogModal.classList.remove('show');
        });
    }

    // Close blog detail modal
    if (closeBlogDetail) {
        closeBlogDetail.addEventListener('click', () => {
            blogDetailModal.classList.remove('show');
        });
    }

    // Character counter
    if (blogContent) {
        blogContent.addEventListener('input', () => {
            const count = blogContent.value.length;
            charCount.textContent = `${count} / 5000 characters`;
        });
    }

    // Submit blog form
    if (blogForm) {
        blogForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const title = document.getElementById('blogTitle').value;
            const author = document.getElementById('blogAuthor').value;
            const email = document.getElementById('blogEmail').value;
            const content = document.getElementById('blogContent').value;
            const category = document.getElementById('blogCategory').value || 'General';

            const newPost = {
                id: Date.now(),
                title,
                author,
                email,
                content,
                category,
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            };

            // Get existing posts
            let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
            posts.unshift(newPost); // Add new post to beginning
            localStorage.setItem('blogPosts', JSON.stringify(posts));

            // Reset form and close modal
            blogForm.reset();
            charCount.textContent = '0 / 5000 characters';
            blogModal.classList.remove('show');

            // Reload blog posts
            loadBlogPosts();
        });
    }

    // Load and display blog posts
    function loadBlogPosts() {
        const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];

        if (posts.length === 0) {
            blogGrid.innerHTML = `
                <div class="no-posts-message">
                    <i class="fas fa-feather-alt"></i>
                    <p>No blog posts yet. Be the first to share your design insights!</p>
                </div>
            `;
            return;
        }

        blogGrid.innerHTML = posts.map(post => `
            <article class="blog-card" data-aos="fade-up">
                <div class="blog-card-header">
                    <span class="blog-category">${escapeHtml(post.category)}</span>
                    <h3 class="blog-card-title">${escapeHtml(post.title)}</h3>
                </div>
                <div class="blog-card-body">
                    <p class="blog-excerpt">${escapeHtml(post.content.substring(0, 120))}...</p>
                    <div class="blog-metadata">
                        <div class="blog-author">
                            <i class="fas fa-user-circle"></i>
                            <span>${escapeHtml(post.author)}</span>
                        </div>
                        <div class="blog-date">
                            <i class="fas fa-calendar"></i>
                            <span>${post.date}</span>
                        </div>
                    </div>
                </div>
                <div class="blog-card-footer">
                    <button class="btn-read-more" onclick="viewBlogPost(${post.id})">
                        <i class="fas fa-book-open"></i> Read More
                    </button>
                    <button class="btn-delete-post" onclick="deleteBlogPost(${post.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </article>
        `).join('');
    }

    // View blog post detail
    window.viewBlogPost = function(postId) {
        const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        const post = posts.find(p => p.id === postId);

        if (post) {
            const detailContent = document.getElementById('blogDetailContent');
            // Create elements to avoid XSS while preserving formatting
            detailContent.innerHTML = '';
            
            const header = document.createElement('div');
            header.className = 'blog-detail-header';
            
            const title = document.createElement('h2');
            title.className = 'blog-detail-title';
            title.textContent = post.title;
            header.appendChild(title);
            
            const meta = document.createElement('div');
            meta.className = 'blog-detail-meta';
            
            const authorDiv = document.createElement('div');
            authorDiv.className = 'blog-detail-meta-item';
            authorDiv.innerHTML = `<i class="fas fa-user-circle"></i><span>${escapeHtml(post.author)}</span>`;
            meta.appendChild(authorDiv);
            
            const dateDiv = document.createElement('div');
            dateDiv.className = 'blog-detail-meta-item';
            dateDiv.innerHTML = `<i class="fas fa-calendar"></i><span>${post.date}</span>`;
            meta.appendChild(dateDiv);
            
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'blog-detail-meta-item';
            categoryDiv.innerHTML = `<i class="fas fa-tag"></i><span>${escapeHtml(post.category)}</span>`;
            meta.appendChild(categoryDiv);
            
            header.appendChild(meta);
            detailContent.appendChild(header);
            
            const body = document.createElement('div');
            body.className = 'blog-detail-body';
            body.textContent = post.content;
            detailContent.appendChild(body);
            
            const footer = document.createElement('div');
            footer.className = 'blog-detail-footer';
            footer.innerHTML = `
                <button class="btn-back-blog" onclick="closeBlogDetail()">
                    <i class="fas fa-arrow-left"></i> Back to Blog
                </button>
                <button class="btn-delete-detail" onclick="deleteBlogPost(${post.id}); closeBlogDetail();">
                    <i class="fas fa-trash"></i> Delete Post
                </button>
            `;
            detailContent.appendChild(footer);
            
            blogDetailModal.classList.add('show');
        }
    };

    // Close blog detail
    window.closeBlogDetail = function() {
        blogDetailModal.classList.remove('show');
    };

    // Delete blog post
    window.deleteBlogPost = function(postId) {
        if (confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
            let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
            posts = posts.filter(p => p.id !== postId);
            localStorage.setItem('blogPosts', JSON.stringify(posts));
            loadBlogPosts();
            
            // Close modals if open
            blogDetailModal.classList.remove('show');
        }
    };

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === blogModal) {
            blogModal.classList.remove('show');
        }
        if (e.target === blogDetailModal) {
            blogDetailModal.classList.remove('show');
        }
    });

    // Close modals with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            blogModal.classList.remove('show');
            blogDetailModal.classList.remove('show');
        }
    });
});

// Branding Console Log - Interior Design Focus
console.log('%c VigiWoods Interior Design - Timeless Luxury %c', 'color: #C9A961; font-weight: bold; font-size: 14px;', '');
console.log('Crafting excellence in Abu Dhabi since 2010.');
