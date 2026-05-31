/* -------------------------------------------------------------
   Adhiraiyan Agro Solution - Core Interactive Logic & Mock Database Engine
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ---------------------------------------------------------
    // Mock Database Initialization (Local Storage Persistence)
    // ---------------------------------------------------------

    // Initial users
    const defaultUsers = [
        { id: 'u1', name: 'Muthu Kumar', email: 'muthu@farm.com', password: 'password', role: 'farmer', phone: '9876543210', location: 'Pollachi, TN', acres: '10', crops: 'Coconut, Turmeric' },
        { id: 'u2', name: 'Saravana Traders', email: 'saravana@trade.com', password: 'password', role: 'buyer', phone: '9876543202', type: 'Wholesaler' },
        { id: 'u3', name: 'Admin Root', email: 'admin@adhiraiyanagro.com', password: 'admin', role: 'admin', phone: '919342449732' }
    ];

    // Initial products
    const defaultProducts = [
        { id: 'p1', farmerId: 'u1', farmerName: 'Muthu Kumar', cropName: 'Organic Turmeric Finger', category: 'Spices', price: 145, unit: 'kg', qty: 2500, location: 'Pollachi, TN', img: 'default-spices', desc: 'Premium grade turmeric fingers. Fully organic cultivation. Cleaned and sun-dried.', phone: '9876543210' },
        { id: 'p2', farmerId: 'u1', farmerName: 'Muthu Kumar', cropName: 'Fresh Organic Coconuts', category: 'Others', price: 28, unit: 'piece', qty: 8000, location: 'Pollachi, TN', img: 'default-veg', desc: 'Well-matured coconuts. Sourced directly from our groves. Average weight 600g.', phone: '9876543210' },
        { id: 'p3', farmerId: 'u4', farmerName: 'Velusamy G.', category: 'Vegetables', cropName: 'Premium Country Tomatoes', price: 32, unit: 'kg', qty: 1500, location: 'Dharmapuri, TN', img: 'default-veg', desc: 'Harvesting starts tomorrow. Firm, medium-sized, native seeds. Handpicked.', phone: '9876543210' },
        { id: 'p4', farmerId: 'u5', farmerName: 'Anitha Raj', category: 'Fruits', cropName: 'Salem Gundu Mangoes', price: 85, unit: 'kg', qty: 600, location: 'Salem, TN', img: 'default-fruit', desc: 'Naturally ripened Salem special mangoes. Extremely sweet and pulpy.', phone: '9876543210' },
        { id: 'p5', farmerId: 'u1', farmerName: 'Muthu Kumar', category: 'Fruits', cropName: 'Organic Red Bananas', price: 45, unit: 'kg', qty: 300, location: 'Coimbatore, TN', img: 'default-fruit', desc: 'Naturally grown red bananas from our own farm. Rich in potassium.', phone: '9876543210' },
        { id: 'p6', farmerId: 'u6', farmerName: 'Suresh P.', category: 'Vegetables', cropName: 'Fresh Ooty Carrots', price: 60, unit: 'kg', qty: 800, location: 'Ooty, TN', img: 'default-veg', desc: 'Freshly harvested, premium quality carrots from the Nilgiris.', phone: '9876543210' },
        { id: 'p7', farmerId: 'u1', farmerName: 'Muthu Kumar', category: 'Grains', cropName: 'Ponni Raw Rice (Old)', price: 62, unit: 'kg', qty: 5000, location: 'Thanjavur, TN', img: 'default-grain', desc: '1-year old aged Ponni raw rice. Direct from mill. Excellent cooking quality.', phone: '9876543210' },
        { id: 'p8', farmerId: 'u7', farmerName: 'Kumar', category: 'Fruits', cropName: 'Apple', price: 150, unit: 'kg', qty: 500, location: 'ooty', img: 'default-fruit', desc: 'Fresh ooty apple.', phone: '9876543210' }
    ];

    // Initial clients
    const defaultClients = [
        { id: 'c1', company: 'Chennai Agri Cold Chain', poc: 'Mr. Rajesh', phone: '9876500111', email: 'rajesh@coldchain.com', location: 'Madhavaram, Chennai', type: 'Cold Storage' },
        { id: 'c2', company: 'Kongu Logistics Hub', poc: 'Mr. Prakash', phone: '9876500222', email: 'prakash@kongulogistics.com', location: 'Coimbatore, TN', type: 'Logistics Partner' }
    ];

    // Get database from localStorage or set defaults
    let users = JSON.parse(localStorage.getItem('agri_users'));
    if (!users || users.length < defaultUsers.length) users = defaultUsers;

    let products = defaultProducts; // Force reset to default products to ensure 8 items
    let clients = defaultClients;

    function saveDB() {
        localStorage.setItem('agri_users', JSON.stringify(users));
        localStorage.setItem('agri_products', JSON.stringify(products));
        localStorage.setItem('agri_clients', JSON.stringify(clients));
    }

    saveDB(); // Ensure initial arrays are committed

    // Session State
    let currentUser = JSON.parse(sessionStorage.getItem('agri_session')) || null;

    // ---------------------------------------------------------
    // UI Selectors
    // ---------------------------------------------------------

    // Nav elements
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerClose = document.getElementById('drawer-close');
    const btnOpenLogin = document.getElementById('btn-open-login');
    const btnOpenRegister = document.getElementById('btn-open-register');
    const btnDrawerLogin = document.getElementById('btn-drawer-login');
    const btnDrawerRegister = document.getElementById('btn-drawer-register');
    const navAdminLink = document.getElementById('nav-admin-link');
    const drawerAdminLink = document.getElementById('drawer-admin-link');

    // Modals
    const modalAuth = document.getElementById('modal-auth');
    const btnCloseAuth = document.getElementById('btn-close-auth');
    const modalFarmerDB = document.getElementById('modal-farmer-dashboard');
    const btnCloseFarmerDB = document.getElementById('btn-close-farmer-db');
    const modalAdminDB = document.getElementById('modal-admin-dashboard');
    const btnCloseAdminDB = document.getElementById('btn-close-admin-db');
    const modalGatekeeper = document.getElementById('modal-admin-gatekeeper');
    const btnCloseGatekeeper = document.getElementById('btn-close-gatekeeper');
    const modalCheckout = document.getElementById('modal-checkout');
    const btnCloseCheckout = document.getElementById('btn-close-checkout');

    // Forms
    const formLogin = document.getElementById('form-login');
    const formRegisterFarmer = document.getElementById('form-register-farmer');
    const formRegisterBuyer = document.getElementById('form-register-buyer');
    const formUploadProduct = document.getElementById('form-upload-product');
    const formUpdateProfile = document.getElementById('form-update-profile');
    const formAdminAddClient = document.getElementById('form-admin-add-client');
    const formGatekeeper = document.getElementById('form-gatekeeper');
    const formPayment = document.getElementById('form-payment');
    const contactForm = document.getElementById('contact-form');

    // Marketplace
    const productsGrid = document.getElementById('products-grid');
    const marketSearch = document.getElementById('market-search');
    const categoryTabs = document.getElementById('category-tabs');
    const btnMarketplaceUpload = document.getElementById('btn-marketplace-upload');

    // Admin & Teasers
    const btnTriggerAdminPanel = document.getElementById('btn-trigger-admin-panel');

    // ---------------------------------------------------------
    // Helper Functions
    // ---------------------------------------------------------

    // Show Toast
    function showToast(message, iconName = 'info') {
        const toast = document.getElementById('toast');
        const toastMsg = toast.querySelector('.toast-message');
        const toastIcon = toast.querySelector('.toast-icon');

        toastMsg.textContent = message;
        toastIcon.setAttribute('data-lucide', iconName);
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        toast.classList.add('active');
        setTimeout(() => {
            toast.classList.remove('active');
        }, 4000);
    }

    // Toggle Modal
    function openModal(modalEl) {
        modalEl.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modalEl) {
        modalEl.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Check session UI update
    function updateAuthUI() {
        if (currentUser) {
            btnOpenLogin.textContent = 'Dashboard';
            btnOpenRegister.textContent = 'Log Out';
            btnDrawerLogin.textContent = 'Dashboard';
            btnDrawerRegister.textContent = 'Log Out';
        } else {
            btnOpenLogin.textContent = 'Login';
            btnOpenRegister.textContent = 'Register';
            btnDrawerLogin.textContent = 'Login';
            btnDrawerRegister.textContent = 'Register';
        }
    }

    updateAuthUI();

    // ---------------------------------------------------------
    // Navigation & Scroll Event
    // ---------------------------------------------------------
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu drawer toggles
    menuToggle.addEventListener('click', () => {
        mobileDrawer.classList.add('open');
    });

    drawerClose.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
    });

    document.querySelectorAll('.drawer-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileDrawer.classList.remove('open');
        });
    });

    // ---------------------------------------------------------
    // Modal Switchers (Login / Register Tabs)
    // ---------------------------------------------------------
    const authTabs = document.querySelectorAll('.auth-tab');
    const authPanels = document.querySelectorAll('.auth-panel');

    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            authTabs.forEach(t => t.classList.remove('active'));
            authPanels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            const targetId = tab.dataset.target;
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Register Role Switcher
    const roleBtns = document.querySelectorAll('.role-btn');
    const registerForms = document.querySelectorAll('.register-form');

    roleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            roleBtns.forEach(b => b.classList.remove('active'));
            registerForms.forEach(f => f.classList.remove('active'));

            btn.classList.add('active');
            const role = btn.dataset.role;
            if (role === 'farmer') {
                document.getElementById('form-register-farmer').classList.add('active');
            } else {
                document.getElementById('form-register-buyer').classList.add('active');
            }
        });
    });

    // Open/Close Authentication Modal
    function handleAuthCTA() {
        if (currentUser) {
            // Logged in: open relevant dashboard
            if (currentUser.role === 'farmer') {
                openFarmerDashboard();
            } else if (currentUser.role === 'buyer') {
                showToast(`Welcome back, ${currentUser.name}. You are logged in as a Buyer.`, 'user');
                location.href = '#marketplace';
            } else if (currentUser.role === 'admin') {
                openModal(modalAdminDB);
                renderAdminDashboard();
            }
        } else {
            // Not logged in: open login modal
            openModal(modalAuth);
        }
    }

    function handleLogout() {
        if (currentUser) {
            sessionStorage.removeItem('agri_session');
            currentUser = null;
            updateAuthUI();
            showToast('You have successfully logged out.', 'log-out');
        } else {
            // Open register tab directly
            openModal(modalAuth);
            document.getElementById('tab-register').click();
        }
    }

    btnOpenLogin.addEventListener('click', handleAuthCTA);
    btnOpenRegister.addEventListener('click', handleLogout);
    btnDrawerLogin.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        handleAuthCTA();
    });
    btnDrawerRegister.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        handleLogout();
    });

    btnCloseAuth.addEventListener('click', () => closeModal(modalAuth));

    // ---------------------------------------------------------
    // Admin Security Access (Gatekeeper)
    // ---------------------------------------------------------
    const adminTriggers = [navAdminLink, drawerAdminLink, btnTriggerAdminPanel];

    adminTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            mobileDrawer.classList.remove('open');
            if (currentUser && currentUser.role === 'admin') {
                openModal(modalAdminDB);
                renderAdminDashboard();
            } else {
                openModal(modalGatekeeper);
            }
        });
    });

    btnCloseGatekeeper.addEventListener('click', () => closeModal(modalGatekeeper));

    formGatekeeper.addEventListener('submit', (e) => {
        e.preventDefault();
        const pin = document.getElementById('gatekeeper-pin').value;
        if (pin === 'admin123') {
            closeModal(modalGatekeeper);
            document.getElementById('gatekeeper-pin').value = '';

            // Set session to admin
            const adminUser = users.find(u => u.role === 'admin') || { name: 'Admin Root', role: 'admin', phone: '919876543210' };
            currentUser = adminUser;
            sessionStorage.setItem('agri_session', JSON.stringify(currentUser));
            updateAuthUI();

            openModal(modalAdminDB);
            renderAdminDashboard();
            showToast('Console unlocked! Welcome Admin.', 'shield-check');
        } else {
            showToast('Access Denied. Invalid security code.', 'shield-alert');
        }
    });

    btnCloseAdminDB.addEventListener('click', () => closeModal(modalAdminDB));

    // Admin Sidebar tabs
    const adminNavBtns = document.querySelectorAll('.admin-nav-btn');
    const adminPanels = document.querySelectorAll('.admin-panel');

    adminNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            adminNavBtns.forEach(b => b.classList.remove('active'));
            adminPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const panelId = btn.dataset.panel;
            document.getElementById(panelId).classList.add('active');
        });
    });

    document.getElementById('admin-logout').addEventListener('click', () => {
        closeModal(modalAdminDB);
        sessionStorage.removeItem('agri_session');
        currentUser = null;
        updateAuthUI();
        showToast('Admin logged out successfully.', 'log-out');
    });

    // ---------------------------------------------------------
    // Farmer Dashboard Operations
    // ---------------------------------------------------------
    function openFarmerDashboard() {
        if (!currentUser || currentUser.role !== 'farmer') return;

        document.getElementById('db-farmer-name').textContent = currentUser.name;

        // Populate profile settings form
        document.getElementById('profile-name').value = currentUser.name;
        document.getElementById('profile-phone').value = currentUser.phone || '';
        document.getElementById('profile-location').value = currentUser.location || '';
        document.getElementById('profile-acres').value = currentUser.acres || '';

        renderFarmerListings();
        openModal(modalFarmerDB);
    }

    btnCloseFarmerDB.addEventListener('click', () => closeModal(modalFarmerDB));

    // Dashboard tabs
    const dbNavBtns = document.querySelectorAll('.db-nav-btn:not(.logout-btn)');
    const dbPanels = document.querySelectorAll('.db-panel');

    dbNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            dbNavBtns.forEach(b => b.classList.remove('active'));
            dbPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const panelId = btn.dataset.panel;
            document.getElementById(panelId).classList.add('active');
        });
    });

    document.getElementById('farmer-logout').addEventListener('click', () => {
        closeModal(modalFarmerDB);
        sessionStorage.removeItem('agri_session');
        currentUser = null;
        updateAuthUI();
        showToast('Successfully logged out from Farmer Dashboard.', 'log-out');
    });

    // Profile updates
    formUpdateProfile.addEventListener('submit', (e) => {
        e.preventDefault();

        const idx = users.findIndex(u => u.id === currentUser.id);
        if (idx !== -1) {
            users[idx].name = document.getElementById('profile-name').value;
            users[idx].phone = document.getElementById('profile-phone').value;
            users[idx].location = document.getElementById('profile-location').value;
            users[idx].acres = document.getElementById('profile-acres').value;

            currentUser = users[idx];
            sessionStorage.setItem('agri_session', JSON.stringify(currentUser));
            saveDB();

            document.getElementById('db-farmer-name').textContent = currentUser.name;
            renderMarketplace();
            showToast('Farmer profile configuration updated!', 'settings');
        }
    });

    // Render Farmer Listings
    function renderFarmerListings() {
        const tbody = document.getElementById('db-my-listings-tbody');
        tbody.innerHTML = '';

        const myProducts = products.filter(p => p.farmerId === currentUser.id);

        if (myProducts.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" class="text-center" style="color: var(--clr-text-light);">No produce listed yet. Go to Upload Produce tab to list.</td></tr>`;
            return;
        }

        myProducts.forEach(p => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="font-weight:600;">${p.cropName}</td>
                <td>${p.category}</td>
                <td style="color:var(--clr-primary); font-weight:700;">₹${p.price} / ${p.unit}</td>
                <td>${p.qty} ${p.unit}s</td>
                <td><span class="user-badge" style="background-color: var(--clr-primary-light); color: var(--clr-primary);">Active</span></td>
                <td>
                    <button class="btn btn-secondary delete-listing-btn" data-id="${p.id}" style="padding:6px 12px; font-size:0.8rem; background-color: var(--clr-primary-light); color: var(--clr-danger);">
                        <i data-lucide="trash-2" style="width:14px; height:14px;"></i> Delete
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        // Add delete button events
        tbody.querySelectorAll('.delete-listing-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const prodId = btn.dataset.id;
                products = products.filter(p => p.id !== prodId);
                saveDB();
                renderFarmerListings();
                renderMarketplace();
                showToast('Produce listing removed.', 'trash-2');
            });
        });

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // Upload product
    formUploadProduct.addEventListener('submit', (e) => {
        e.preventDefault();

        const newProd = {
            id: 'p_' + Date.now(),
            farmerId: currentUser.id,
            farmerName: currentUser.name,
            cropName: document.getElementById('prod-name').value,
            category: document.getElementById('prod-category').value,
            price: parseFloat(document.getElementById('prod-price').value),
            unit: document.getElementById('prod-unit').value,
            qty: parseFloat(document.getElementById('prod-qty').value),
            location: currentUser.location || 'Tamil Nadu',
            img: document.getElementById('prod-img').value,
            desc: document.getElementById('prod-desc').value,
            phone: currentUser.phone || '9876543210'
        };

        products.unshift(newProd);
        saveDB();

        formUploadProduct.reset();

        // Go back to listings panel
        document.querySelector('.db-nav-btn[data-panel="db-panel-mycrops"]').click();
        renderFarmerListings();
        renderMarketplace();
        showToast('New produce listed successfully!', 'check');
    });

    // Open upload from Marketplace
    btnMarketplaceUpload.addEventListener('click', () => {
        if (!currentUser) {
            showToast('Please Login or Register as a Farmer to upload produce.', 'shield-alert');
            openModal(modalAuth);
        } else if (currentUser.role !== 'farmer') {
            showToast('Only verified farmers can upload produce listing crops.', 'shield-alert');
        } else {
            openFarmerDashboard();
            document.querySelector('.db-nav-btn[data-panel="db-panel-upload"]').click();
        }
    });

    // ---------------------------------------------------------
    // Main Authentication Form Submissions
    // ---------------------------------------------------------

    // Login
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-password').value;
        const role = document.getElementById('login-role').value;

        const matched = users.find(u => u.email === email && u.password === pass && u.role === role);

        if (matched) {
            currentUser = matched;
            sessionStorage.setItem('agri_session', JSON.stringify(currentUser));
            updateAuthUI();
            closeModal(modalAuth);
            formLogin.reset();

            showToast(`Logged in successfully as ${currentUser.name}!`, 'shield-check');

            if (currentUser.role === 'farmer') {
                openFarmerDashboard();
            } else if (currentUser.role === 'admin') {
                openModal(modalAdminDB);
                renderAdminDashboard();
            }
        } else {
            showToast('Invalid Email, Password or User Type combination.', 'shield-alert');
        }
    });

    // Farmer Register
    formRegisterFarmer.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('farmer-email').value;
        if (users.find(u => u.email === email)) {
            showToast('This email is already registered.', 'shield-alert');
            return;
        }

        const newFarmer = {
            id: 'u_' + Date.now(),
            name: document.getElementById('farmer-name').value,
            phone: document.getElementById('farmer-phone').value,
            email: email,
            password: document.getElementById('farmer-password').value,
            role: 'farmer',
            location: document.getElementById('farmer-location').value,
            acres: document.getElementById('farmer-acres').value,
            crops: document.getElementById('farmer-crops').value
        };

        users.push(newFarmer);
        saveDB();

        currentUser = newFarmer;
        sessionStorage.setItem('agri_session', JSON.stringify(currentUser));
        updateAuthUI();

        closeModal(modalAuth);
        formRegisterFarmer.reset();

        showToast('Farmer account registered successfully!', 'check');
        openFarmerDashboard();
    });

    // Buyer Register
    formRegisterBuyer.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('buyer-email').value;
        if (users.find(u => u.email === email)) {
            showToast('This email is already registered.', 'shield-alert');
            return;
        }

        const newBuyer = {
            id: 'u_' + Date.now(),
            name: document.getElementById('buyer-name').value,
            phone: document.getElementById('buyer-phone').value,
            email: email,
            password: document.getElementById('buyer-password').value,
            role: 'buyer',
            type: document.getElementById('buyer-type').value
        };

        users.push(newBuyer);
        saveDB();

        currentUser = newBuyer;
        sessionStorage.setItem('agri_session', JSON.stringify(currentUser));
        updateAuthUI();

        closeModal(modalAuth);
        formRegisterBuyer.reset();

        showToast('Buyer account registered successfully!', 'check');
        location.href = '#marketplace';
    });

    // ---------------------------------------------------------
    // Marketplace Display, Search & Category Filters
    // ---------------------------------------------------------
    let currentCategory = 'all';

    // Set background classes depending on simulated image tags
    function getProdImgURL(tag) {
        switch (tag) {
            case 'default-veg':
                return 'linear-gradient(135deg, rgba(22,101,52,0.8), rgba(11,44,25,0.9)), url("https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=500&q=80")';
            case 'default-fruit':
                return 'linear-gradient(135deg, rgba(22,101,52,0.7), rgba(11,44,25,0.9)), url("https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&w=500&q=80")';
            case 'default-grain':
                return 'linear-gradient(135deg, rgba(22,101,52,0.7), rgba(11,44,25,0.9)), url("https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=500&q=80")';
            case 'default-spices':
                return 'linear-gradient(135deg, rgba(22,101,52,0.7), rgba(11,44,25,0.9)), url("https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80")';
            default:
                return 'linear-gradient(135deg, rgba(22,101,52,0.7), rgba(11,44,25,0.9)), url("https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=500&q=80")';
        }
    }

    function renderMarketplace() {
        productsGrid.innerHTML = '';

        const searchQuery = marketSearch.value.toLowerCase().trim();

        const filtered = products.filter(p => {
            const matchesCat = (currentCategory === 'all') || (p.category === currentCategory);
            const matchesSearch = p.cropName.toLowerCase().includes(searchQuery) ||
                p.farmerName.toLowerCase().includes(searchQuery) ||
                p.location.toLowerCase().includes(searchQuery);
            return matchesCat && matchesSearch;
        });

        if (filtered.length === 0) {
            productsGrid.innerHTML = `<div class="text-center" style="grid-column: 1/-1; padding: 40px; color: var(--clr-text-light);">
                <i data-lucide="package-open" style="width: 48px; height: 48px; margin: 0 auto 16px; color: var(--clr-primary);"></i>
                <p>No agricultural products matching your criteria found.</p>
            </div>`;
            if (typeof lucide !== 'undefined') { lucide.createIcons(); }
            return;
        }

        filtered.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card';

            // Format WhatsApp Link
            const waText = encodeURIComponent(`Hello ${p.farmerName}, I saw your product "${p.cropName}" on Adhiraiyan Agro. I would like to inquire about buying. Price: ₹${p.price}/${p.unit}, Available Qty: ${p.qty}. Please share details.`);
            const waLink = `https://wa.me/91${p.phone}?text=${waText}`;

            card.innerHTML = `
                <div class="product-img-wrapper" style="background-image: ${getProdImgURL(p.img)}">
                    <span class="product-badge">${p.category}</span>
                </div>
                <div class="product-body">
                    <h3 class="product-title">${p.cropName}</h3>
                    <div class="product-price">₹${p.price}<span>/${p.unit}</span></div>
                    <div class="product-meta">
                        <div class="meta-item">
                            <i data-lucide="user"></i>
                            <span>${p.farmerName}</span>
                        </div>
                        <div class="meta-item">
                            <i data-lucide="scale"></i>
                            <span>Available: ${p.qty} ${p.unit}s</span>
                        </div>
                        <div class="meta-item">
                            <i data-lucide="map-pin"></i>
                            <span>${p.location}</span>
                        </div>
                    </div>
                </div>
                <div class="product-actions">
                    <a href="${waLink}" target="_blank" class="btn btn-whatsapp-buy">
                        <i data-lucide="message-circle"></i> Buy via WhatsApp
                    </a>
                </div>
            `;
            productsGrid.appendChild(card);
        });

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // Listeners for Marketplace
    marketSearch.addEventListener('input', renderMarketplace);

    categoryTabs.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            currentCategory = tab.dataset.category;
            renderMarketplace();
        });
    });

    renderMarketplace();

    // ---------------------------------------------------------
    // Admin Dashboard Render & Actions
    // ---------------------------------------------------------
    function renderAdminDashboard() {
        const farmersList = users.filter(u => u.role === 'farmer');
        const buyersList = users.filter(u => u.role === 'buyer');

        // Stats
        document.getElementById('admin-stat-farmers').textContent = farmersList.length;
        document.getElementById('admin-stat-buyers').textContent = buyersList.length;
        document.getElementById('admin-stat-total').textContent = users.length;

        // Render Members Table
        const usersTbody = document.getElementById('admin-users-tbody');
        usersTbody.innerHTML = '';
        users.forEach(u => {
            const roleBadge = u.role === 'admin'
                ? `<span class="user-badge admin-badge">Admin</span>`
                : (u.role === 'farmer' ? `<span class="user-badge">Farmer</span>` : `<span class="user-badge" style="background-color:hsl(210,69%,95%); color:hsl(210,60%,40%); border-color:transparent;">Buyer</span>`);

            const waShareText = encodeURIComponent(`Adhiraiyan Agro Client Details: Name: ${u.name}, Role: ${u.role}, Phone: ${u.phone || 'N/A'}, Email: ${u.email}`);
            const waShareLink = `https://wa.me/919342449732?text=${waShareText}`; // Link to share client details to admin team

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="font-weight:600;">${u.name}</td>
                <td>${roleBadge}</td>
                <td>${u.email}</td>
                <td>${u.phone || 'N/A'}</td>
                <td style="font-size:0.85rem; color:var(--clr-text-light); max-width:200px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                    ${u.role === 'farmer' ? `Acres: ${u.acres || 0}, Crops: ${u.crops || 'N/A'}` : `Type: ${u.type || 'N/A'}`}
                </td>
                <td>
                    ${u.role !== 'admin' ? `
                    <a href="${waShareLink}" target="_blank" class="btn btn-secondary" style="padding:6px 12px; font-size:0.8rem; background-color:#25D366; color:white;">
                        <i data-lucide="share-2" style="width:12px; height:12px;"></i> Share WhatsApp
                    </a>` : 'Root Admin'}
                </td>
            `;
            usersTbody.appendChild(tr);
        });

        // Render Products Table
        const prodTbody = document.getElementById('admin-products-tbody');
        prodTbody.innerHTML = '';
        products.forEach(p => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="font-weight:600;">${p.cropName}</td>
                <td>${p.farmerName}</td>
                <td style="color:var(--clr-primary); font-weight:700;">₹${p.price}/${p.unit}</td>
                <td>${p.qty} ${p.unit}s</td>
                <td>
                    <button class="btn btn-secondary admin-remove-prod" data-id="${p.id}" style="padding:6px 12px; font-size:0.8rem; background-color: var(--clr-primary-light); color: var(--clr-danger);">
                        Remove
                    </button>
                </td>
            `;
            prodTbody.appendChild(tr);
        });

        // Register Remove product listener
        prodTbody.querySelectorAll('.admin-remove-prod').forEach(btn => {
            btn.addEventListener('click', () => {
                const prodId = btn.dataset.id;
                products = products.filter(p => p.id !== prodId);
                saveDB();
                renderAdminDashboard();
                renderMarketplace();
                showToast('Product listing deleted by administrator.', 'trash-2');
            });
        });

        // Render B2B Clients Table
        renderAdminClients();

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    function renderAdminClients() {
        const tbody = document.getElementById('admin-clients-tbody');
        tbody.innerHTML = '';

        if (clients.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" class="text-center" style="color: var(--clr-text-light);">No B2B clients configured yet.</td></tr>`;
            return;
        }

        clients.forEach(c => {
            const shareText = encodeURIComponent(`*Adhiraiyan Agro Client Partnership details*:\n\nCompany: ${c.company}\nPOC: ${c.poc}\nClassification: ${c.type}\nLocation: ${c.location}\nPhone: ${c.phone}\nEmail: ${c.email}`);
            const waShareClient = `https://wa.me/919342449732?text=${shareText}`;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="font-weight:600;">${c.company}</td>
                <td>${c.poc}</td>
                <td>${c.location}</td>
                <td><span class="user-badge" style="background-color: var(--clr-primary-light); color: var(--clr-primary); border-color:transparent;">${c.type}</span></td>
                <td>${c.phone}</td>
                <td>
                    <a href="${waShareClient}" target="_blank" class="btn btn-secondary" style="padding:6px 12px; font-size:0.8rem; background-color:#25D366; color:white;">
                        <i data-lucide="share-2" style="width:12px; height:12px;"></i> WhatsApp Details
                    </a>
                </td>
            `;
            tbody.appendChild(tr);
        });

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // Add client form submission
    formAdminAddClient.addEventListener('submit', (e) => {
        e.preventDefault();

        const newClient = {
            id: 'c_' + Date.now(),
            company: document.getElementById('client-name').value,
            poc: document.getElementById('client-poc').value,
            phone: document.getElementById('client-phone').value,
            email: document.getElementById('client-email').value,
            location: document.getElementById('client-location').value,
            type: document.getElementById('client-type').value
        };

        clients.push(newClient);
        saveDB();

        formAdminAddClient.reset();
        renderAdminClients();
        showToast('B2B Client profile created and linked!', 'check');
    });

    // ---------------------------------------------------------
    // Membership Plans Switcher & Gateways
    // ---------------------------------------------------------
    const toggleFarmers = document.getElementById('toggle-farmers');
    const toggleBuyers = document.getElementById('toggle-buyers');
    const farmerPlans = document.getElementById('farmer-plans');
    const buyerPlans = document.getElementById('buyer-plans');

    toggleFarmers.addEventListener('click', () => {
        toggleFarmers.classList.add('active');
        toggleBuyers.classList.remove('active');
        farmerPlans.classList.add('active');
        buyerPlans.classList.remove('active');
    });

    toggleBuyers.addEventListener('click', () => {
        toggleBuyers.classList.add('active');
        toggleFarmers.classList.remove('active');
        buyerPlans.classList.add('active');
        farmerPlans.classList.remove('active');
    });

    // Open Checkout Modal on plan selection
    document.querySelectorAll('.plan-cta').forEach(btn => {
        btn.addEventListener('click', () => {
            const planName = btn.dataset.plan;
            const priceVal = btn.dataset.price;

            if (!priceVal) {
                // Free Plan
                showToast(`You have successfully enrolled in the free ${planName} Plan!`, 'check');
                return;
            }

            // Pay Plan
            document.getElementById('checkout-plan-name').textContent = planName;
            document.getElementById('checkout-plan-price').textContent = `₹${priceVal}.00`;
            document.getElementById('checkout-plan-total').textContent = `₹${priceVal}.00`;

            openModal(modalCheckout);
        });
    });

    btnCloseCheckout.addEventListener('click', () => closeModal(modalCheckout));

    // Checkout payment tabs
    const payTabs = document.querySelectorAll('.pay-tab');
    const payPanels = document.querySelectorAll('.pay-panel');

    payTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            payTabs.forEach(t => t.classList.remove('active'));
            payPanels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            const method = tab.dataset.paymethod;
            if (method === 'card') {
                document.getElementById('pay-panel-card').classList.add('active');
            } else {
                document.getElementById('pay-panel-upi').classList.add('active');
            }
        });
    });

    formPayment.addEventListener('submit', (e) => {
        e.preventDefault();

        const btnSubmit = document.getElementById('btn-submit-payment');
        btnSubmit.textContent = 'Processing Transaction...';
        btnSubmit.disabled = true;

        setTimeout(() => {
            closeModal(modalCheckout);
            btnSubmit.textContent = 'Proceed Securely';
            btnSubmit.disabled = false;

            showToast('Payment Settled Successfully! Membership Activated.', 'shield-check');
            formPayment.reset();
        }, 2000);
    });

    // ---------------------------------------------------------
    // Contact Form & Toast
    // ---------------------------------------------------------
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contact-name').value;
        showToast(`Thank you, ${name}! Your inquiry message was processed. We will get back to you soon.`, 'check');
        contactForm.reset();
    });
});
