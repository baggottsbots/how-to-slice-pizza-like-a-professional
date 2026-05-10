document.getElementById('menu-toggle').addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenu.classList.toggle('hidden');
        });

async function loadMenuFromSheet() {
            const loadingSkeleton = document.getElementById('loading-skeleton');
            const menuError = document.getElementById('menu-error');
            const sheetData = document.getElementById('sheet-data');

            try {
                // Replace with your actual Google Sheets CSV export URL
                const sheetUrl = 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv';
                const response = await fetch(sheetUrl);
                
                if (!response.ok) throw new Error('Failed to fetch sheet');
                
                const csv = await response.text();
                const rows = csv.split('\n').slice(1).filter(row => row.trim());
                
                loadingSkeleton.classList.add('hidden');
                sheetData.innerHTML = '';

                rows.forEach((row, index) => {
                    const [name, description, price, imageUrl] = row.split(',').map(cell => cell.trim().replace(/^"|"$/g, ''));
                    
                    if (name && price) {
                        const menuItem = document.createElement('div');
                        menuItem.className = 'menu-item menu-card';
                        menuItem.style.animationDelay = `${index * 0.1}s`;
                        
                        menuItem.innerHTML = `
                            <div class="menu-card-content">
                                ${imageUrl ? `<img src="${imageUrl}" alt="${name}" class="w-full h-48 object-cover rounded-lg mb-4">` : ''}
                                <h4 class="text-xl font-bold text-gray-900">${name}</h4>
                                <p class="text-gray-600 text-sm mt-2">${description || ''}</p>
                                <div class="menu-card-price">$${price}</div>
                            </div>
                        `;
                        
                        sheetData.appendChild(menuItem);
                    }
                });

                if (sheetData.children.length === 0) {
                    menuError.classList.remove('hidden');
                }
            } catch (error) {
                console.error('Error loading menu:', error);
                loadingSkeleton.classList.add('hidden');
                menuError.classList.remove('hidden');
            }
        }

        // Load menu when page loads
        document.addEventListener('DOMContentLoaded', loadMenuFromSheet);

(function() {
            // ===== SHEET DATA FETCH =====
            // Purpose: Load product data from Google Sheet and render menu cards
            // Data Source: Hot Slice Pizza Co. — Products sheet
            // Triggers: Page load

            var endpoint = document.querySelector('meta[name="sheet-data-url"]')?.content;
            if (!endpoint) return;

            var container = document.getElementById('sheet-data');
            var loadingSkeleton = document.getElementById('loading-skeleton');
            var errorDiv = document.getElementById('menu-error');

            fetch(endpoint)
                .then(function(r) {
                    if (!r.ok) throw new Error('HTTP ' + r.status);
                    return r.json();
                })
                .then(function(result) {
                    // Hide loading skeleton
                    if (loadingSkeleton) loadingSkeleton.style.display = 'none';

                    // Check if data exists
                    if (!container || !result.data || result.data.length === 0) {
                        if (errorDiv) errorDiv.classList.remove('hidden');
                        return;
                    }

                    // Image column detection (case-insensitive)
                    var imageKeys = [
                        'Image URL', 'image_url', 'imageUrl', 'Image', 'image',
                        'Photo', 'photo', 'Picture', 'picture', 'Thumbnail',
                        'thumbnail', 'Logo', 'logo', 'Img', 'img', 'Avatar', 'avatar'
                    ];

                    // ===== RENDER MENU CARDS =====
                    // Maps each row to a styled card with image, category, name, description, and price
                    container.innerHTML = result.data.map(function(row, idx) {
                        // Find image URL from row
                        var imgUrl = '';
                        for (var i = 0; i < imageKeys.length; i++) {
                            if (row[imageKeys[i]]) {
                                imgUrl = row[imageKeys[i]];
                                break;
                            }
                        }

                        // Image HTML: render <img> if URL exists, fallback to emoji
                        var imgHtml = imgUrl
                            ? '<img src="' + imgUrl + '" alt="' + (row.Name || row.name || 'Product') + '" loading="lazy" style="width:100%;height:240px;object-fit:cover;display:block;" onerror="this.style.display=\'none\'">'
                            : '<div style="height:240px;background:#f3f4f6;display:flex;align-items:center;justify-content:center;font-size:3rem;">📷</div>';

                        // Extract data fields
                        var name = row.Name || row.name || 'Item';
                        var desc = row.Description || row.description || '';
                        var price = row.Price || row.price || '';

                        // Format price with $ sign
                        if (price && !isNaN(price)) {
                            price = '$' + parseFloat(price).toFixed(2);
                        }

                        var cat = row.Category || row.category || '';

                        // Build card HTML with staggered animation
                        return '<div class="menu-item" style="animation-delay:' + (idx * 0.1) + 's">' +
                            '<div class="menu-card">' +
                            imgHtml +
                            '<div class="menu-card-content">' +
                            (cat ? '<span style="display:inline-block;background:#fee2e2;color:#dc2626;font-size:0.75rem;font-weight:700;padding:2px 10px;border-radius:9999px;margin-bottom:8px;">' + cat + '</span>' : '') +
                            '<h4 style="font-size:1.25rem;font-weight:700;color:#111827;margin-bottom:8px;">' + name + '</h4>' +
                            '<p style="color:#6b7280;margin-bottom:12px;font-size:0.95rem;line-height:1.5;">' + desc + '</p>' +
                            (price ? '<div class="menu-card-price">' + price + '</div>' : '') +
                            '</div></div></div>';
                    }).join('');
                })
                .catch(function(err) {
                    console.error('Sheet data error:', err);
                    if (loadingSkeleton) loadingSkeleton.style.display = 'none';
                    if (errorDiv) errorDiv.classList.remove('hidden');
                });
        })();

        // ===== MOBILE MENU TOGGLE =====
        // Function: toggleMobileMenu()
        // Purpose: Show/hide navigation menu on mobile devices
        // Triggers: Click on hamburger menu button
        document.getElementById('menu-toggle').addEventListener('click', function() {
            // Placeholder for mobile menu functionality
            alert('Mobile menu functionality can be expanded here');
        });