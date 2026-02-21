(function () {
            // ---------- VENDOR DATA (dynamic state) ----------
            const vendorProfile = {
                vendorId: 'V-2001',
                name: 'Pragati Enterprises',
                email: 'contact@pragati.com',
                phone: '+91 98765 43210'
            };

            // orders array (editable)
            let orders = [
                { id: 'O-101', date: '10 Feb 2026', amount: 12500, status: 'Processing' },
                { id: 'O-102', date: '08 Feb 2026', amount: 8200, status: 'Completed' },
                { id: 'O-103', date: '05 Feb 2026', amount: 4300, status: 'Completed' }
            ];

            // payments array
            let payments = [
                { id: 'P-501', date: '09 Feb 2026', amount: 8200, mode: 'UPI' },
                { id: 'P-502', date: '06 Feb 2026', amount: 4300, mode: 'Credit Card' },
                { id: 'P-500', date: '11 Feb 2026', amount: 12500, mode: 'Bank Transfer' }
            ];

            // ----- helper: show modal -----
            function showModal(title, message) {
                const overlay = document.getElementById('infoModal');
                document.getElementById('modalTitle').innerText = title;
                document.getElementById('modalMessage').innerText = message;
                overlay.style.display = 'flex';
            }

            // ----- render dashboard (main view) -----
            function renderDashboard() {
                const main = document.getElementById('mainContent');
                // compute summary stats
                const totalOrders = orders.length;
                const completedOrders = orders.filter(o => o.status === 'Completed').length;
                const processingOrders = orders.filter(o => o.status === 'Processing').length;
                const totalRevenue = orders.reduce((acc, o) => acc + o.amount, 0);

                // last 2 orders for table preview
                const recentOrders = orders.slice(0, 2);
                // last 2 payments
                const recentPayments = payments.slice(0, 2);

                main.innerHTML = `
                <div class="header">
                    <h1>📋 Vendor Dashboard</h1>
                </div>

                <!-- Vendor Profile Card (dynamic) -->
                <div class="card">
                    <h2>👤 Vendor Profile Details</h2>
                    <div class="details">
                        <p><strong>Vendor ID:</strong> ${vendorProfile.vendorId}</p>
                        <p><strong>Name:</strong> ${vendorProfile.name}</p>
                        <p><strong>Email:</strong> ${vendorProfile.email}</p>
                        <p><strong>Phone:</strong> ${vendorProfile.phone}</p>
                    </div>
                </div>

                <!-- KPI mini row (extra) -->
                <div style="display: flex; gap: 18px; margin-bottom: 24px; flex-wrap: wrap;">
                    <div style="background:white; padding:16px 24px; border-radius:20px; flex:1 1 160px; box-shadow: 0 4px 10px rgba(0,0,0,0.02);">
                        <span style="color:#4f6f8f;">📦 Total orders</span>
                        <h3 style="margin:8px 0 0; font-size:28px;">${totalOrders}</h3>
                    </div>
                    <div style="background:white; padding:16px 24px; border-radius:20px; flex:1 1 160px;">
                        <span style="color:#4f6f8f;">✅ Completed</span>
                        <h3 style="margin:8px 0 0; font-size:28px;">${completedOrders}</h3>
                    </div>
                    <div style="background:white; padding:16px 24px; border-radius:20px; flex:1 1 160px;">
                        <span style="color:#4f6f8f;">🔄 Processing</span>
                        <h3 style="margin:8px 0 0; font-size:28px;">${processingOrders}</h3>
                    </div>
                    <div style="background:white; padding:16px 24px; border-radius:20px; flex:1 1 160px;">
                        <span style="color:#4f6f8f;">💰 Revenue</span>
                        <h3 style="margin:8px 0 0; font-size:28px;">₹${totalRevenue.toLocaleString()}</h3>
                    </div>
                </div>

                <!-- Order Summary Card -->
                <div class="card">
                    <h2>📦 Recent Orders</h2>
                    <table>
                        <tr><th>Order ID</th><th>Order Date</th><th>Total Amount</th><th>Status</th></tr>
                        ${recentOrders.map(o => `<tr>
                            <td>${o.id}</td><td>${o.date}</td><td>₹${o.amount.toLocaleString()}</td>
                            <td><span class="badge ${o.status === 'Processing' ? 'processing' : 'completed'}">${o.status}</span></td>
                        </tr>`).join('')}
                    </table>
                    <p style="text-align:right; margin-top:14px; color:#4da6ff; font-size:0.9rem;">+ ${orders.length - 2} more orders</p>
                </div>

                <!-- Payment Section -->
                <div class="card">
                    <h2>💳 Recent Payments</h2>
                    <table>
                        <tr><th>Payment ID</th><th>Date</th><th>Amount</th><th>Mode</th></tr>
                        ${recentPayments.map(p => `<tr><td>${p.id}</td><td>${p.date}</td><td>₹${p.amount.toLocaleString()}</td><td>${p.mode}</td></tr>`).join('')}
                    </table>
                </div>

                <!-- Quick Actions -->
                <div class="card actions">
                    <h2>⚡ Quick Actions</h2>
                    <button id="quickCreateOrder">➕ Create New Order</button>
                    <button id="quickUpdateProfile">✏️ Update Profile</button>
                    <button id="quickTrackOrder">📍 Track Order</button>
                </div>
            `;

                // attach listeners to quick action buttons inside dashboard
                document.getElementById('quickCreateOrder')?.addEventListener('click', () => {
                    showModal('➕ Create Order', 'Redirect to order creation form (dynamic action).');
                });
                document.getElementById('quickUpdateProfile')?.addEventListener('click', () => {
                    // example: update vendor name dynamically (just for demo)
                    vendorProfile.name = 'Pragati Exports';
                    showModal('✅ Profile Updated', 'Vendor name changed to "Pragati Exports" (demo).');
                    renderDashboard();    // re-render with new name
                });
                document.getElementById('quickTrackOrder')?.addEventListener('click', () => {
                    const orderId = orders[0]?.id || 'N/A';
                    showModal('📍 Track Order', `Tracking info for latest order ${orderId} – In transit.`);
                });
            }

            // ----- render full orders page (My Orders) -----
            function renderOrdersPage() {
                const main = document.getElementById('mainContent');
                main.innerHTML = `
                <div class="header"><h1>📦 My Orders</h1></div>
                <div class="card">
                    <h2>All orders (dynamic)</h2>
                    <table>
                        <tr><th>Order ID</th><th>Date</th><th>Amount</th><th>Status</th><th>Action</th></tr>
                        ${orders.map(o => `
                        <tr>
                            <td>${o.id}</td><td>${o.date}</td><td>₹${o.amount.toLocaleString()}</td>
                            <td><span class="badge ${o.status === 'Processing' ? 'processing' : 'completed'}">${o.status}</span></td>
                            <td><button class="markCompleteBtn" data-id="${o.id}" style="background:#1f2d3d; color:white; border:none; padding:4px 12px; border-radius:30px; cursor:pointer;">✓ mark done</button></td>
                        </tr>`).join('')}
                    </table>
                    <div style="margin-top:24px;">
                        <button id="addSampleOrderBtn" style="background:#4da6ff; border:none; color:white; padding:10px 22px; border-radius:40px;">➕ Add sample order</button>
                    </div>
                </div>
            `;

                // mark complete buttons
                document.querySelectorAll('.markCompleteBtn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const orderId = e.target.dataset.id;
                        const order = orders.find(o => o.id === orderId);
                        if (order && order.status !== 'Completed') {
                            order.status = 'Completed';
                            showModal('✅ Order updated', `Order ${orderId} marked as completed.`);
                            renderOrdersPage();  // refresh table
                        } else {
                            showModal('⚠️ Already completed', 'Order already completed.');
                        }
                    });
                });

                document.getElementById('addSampleOrderBtn')?.addEventListener('click', () => {
                    const newId = `O-${Math.floor(200 + Math.random() * 300)}`;
                    const newOrder = {
                        id: newId,
                        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
                        amount: Math.floor(Math.random() * 8000 + 2000),
                        status: 'Processing'
                    };
                    orders.unshift(newOrder);   // add to top
                    showModal('➕ Order created', `Sample order ${newId} added.`);
                    renderOrdersPage();
                });
            }

            // ----- render payments page -----
            function renderPaymentsPage() {
                const main = document.getElementById('mainContent');
                main.innerHTML = `
                <div class="header"><h1>💳 Payments</h1></div>
                <div class="card">
                    <h2>All payment transactions</h2>
                    <table>
                        <tr><th>Payment ID</th><th>Date</th><th>Amount</th><th>Mode</th></tr>
                        ${payments.map(p => `<tr><td>${p.id}</td><td>${p.date}</td><td>₹${p.amount.toLocaleString()}</td><td>${p.mode}</td></tr>`).join('')}
                    </table>
                </div>
            `;
            }

            // ----- render profile page -----
            function renderProfilePage() {
                const main = document.getElementById('mainContent');
                main.innerHTML = `
                <div class="header"><h1>👤 My Profile</h1></div>
                <div class="card">
                    <h2>Vendor Information</h2>
                    <div class="details" style="flex-direction:column; gap:12px;">
                        <p><strong>Vendor ID:</strong> ${vendorProfile.vendorId}</p>
                        <p><strong>Name:</strong> ${vendorProfile.name}</p>
                        <p><strong>Email:</strong> ${vendorProfile.email}</p>
                        <p><strong>Phone:</strong> ${vendorProfile.phone}</p>
                    </div>
                    <button id="editProfileBtn" style="margin-top:24px; background:#1f2d3d; color:white; border:none; padding:12px 32px; border-radius:40px;">✏️ Edit name (demo)</button>
                </div>
            `;
                document.getElementById('editProfileBtn')?.addEventListener('click', () => {
                    vendorProfile.name = 'Pragati International';
                    showModal('✅ Profile changed', 'Vendor name updated to "Pragati International".');
                    renderProfilePage();
                });
            }

            // ----- create order dummy page -----
            function renderCreateOrderPage() {
                const main = document.getElementById('mainContent');
                main.innerHTML = `
                <div class="header"><h1>➕ Create Order</h1></div>
                <div class="card" style="text-align:center; padding:40px;">
                    <p style="margin-bottom:20px;">[ dynamic order form would be here ]</p>
                    <button id="dummyCreateBtn" style="background:#1f2d3d; color:white; border:none; padding:12px 36px; border-radius:40px;">simulate new order</button>
                </div>
            `;
                document.getElementById('dummyCreateBtn')?.addEventListener('click', () => {
                    const newId = `O-${Math.floor(300 + Math.random() * 400)}`;
                    const newOrder = {
                        id: newId,
                        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
                        amount: Math.floor(Math.random() * 10000 + 3000),
                        status: 'Processing'
                    };
                    orders.unshift(newOrder);
                    showModal('✅ Order placed', `New order ${newId} created (dynamic).`);
                });
            }

            // ----- product list placeholder -----
            function renderProductListPage() {
                const main = document.getElementById('mainContent');
                main.innerHTML = `
                <div class="header"><h1>📋 Product List</h1></div>
                <div class="card">
                    <p><strong>Showing sample products</strong> (dynamic data can be added)</p>
                    <ul style="margin-top:20px; list-style: none;">
                        <li>🔹 Industrial pump - Model P20</li>
                        <li>🔹 Copper wire coil (set of 10)</li>
                        <li>🔹 LED panel 24W (vendor SKU: L24)</li>
                    </ul>
                </div>
            `;
            }

            // ---------- navigation & logout ----------
            function handleNavClick(section) {
                switch (section) {
                    case 'dashboard': renderDashboard(); break;
                    case 'profile': renderProfilePage(); break;
                    case 'create': renderCreateOrderPage(); break;
                    case 'orders': renderOrdersPage(); break;
                    case 'payments': renderPaymentsPage(); break;
                    case 'products': renderProductListPage(); break;
                    default: renderDashboard();
                }
            }

            // attach sidebar nav events
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const section = e.target.closest('a').dataset.section;
                    if (section) handleNavClick(section);
                });
            });

            // logout
            document.getElementById('logoutBtn').addEventListener('click', (e) => {
                e.preventDefault();
                showModal('👋 Logged out', 'You have been successfully logged out (demo).');
                // optional: reset to dashboard after modal close? we keep dashboard for demo
            });

            // modal close
            document.getElementById('closeModalBtn').addEventListener('click', () => {
                document.getElementById('infoModal').style.display = 'none';
            });
            window.addEventListener('click', (e) => {
                const modal = document.getElementById('infoModal');
                if (e.target === modal) modal.style.display = 'none';
            });

            // render default dashboard on page load
            renderDashboard();

            // also quick nav to dashboard if clicked on first link
            // ensure dashboard link works
            document.querySelector('[data-section="dashboard"]').addEventListener('click', (e) => {
                e.preventDefault();
                renderDashboard();
            });

            // minor: update profile from sidebar will show profile page
            document.querySelector('[data-section="profile"]').addEventListener('click', (e) => {
                e.preventDefault();
                renderProfilePage();
            });

        })();