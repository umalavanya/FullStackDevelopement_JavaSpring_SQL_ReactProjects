// API endpoints (using localStorage as mock backend)
const API = {
    async register(userData) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Get existing users
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if username exists
        if (users.find(u => u.username === userData.username)) {
            throw new Error('Username already exists');
        }
        
        // Check if email exists
        if (users.find(u => u.email === userData.email)) {
            throw new Error('Email already registered');
        }
        
        // Create new user
        const newUser = {
            id: Date.now(),
            ...userData,
            password: btoa(userData.password), // Simple encoding (not secure for production)
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        return { success: true, message: 'Registration successful! Please login.' };
    },
    
    async login(identifier, password) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Get users
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Find user by username or email
        const user = users.find(u => 
            (u.username === identifier || u.email === identifier) && 
            btoa(password) === u.password
        );
        
        if (!user) {
            throw new Error('Invalid username/email or password');
        }
        
        // Store session
        const session = {
            userId: user.id,
            username: user.username,
            email: user.email,
            fullname: user.fullname,
            loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('currentSession', JSON.stringify(session));
        
        return { success: true, message: 'Login successful!', user: session };
    },
    
    async getCurrentUser() {
        const session = localStorage.getItem('currentSession');
        if (!session) {
            throw new Error('No active session');
        }
        return JSON.parse(session);
    },
    
    async logout() {
        localStorage.removeItem('currentSession');
        return { success: true };
    },
    
    async checkAuth() {
        const session = localStorage.getItem('currentSession');
        return !!session;
    }
};

// Helper function to show messages
function showMessage(elementId, message, type) {
    const messageDiv = document.getElementById(elementId);
    messageDiv.innerHTML = `<div class="${type}">${message}</div>`;
    setTimeout(() => {
        if (messageDiv.innerHTML === `<div class="${type}">${message}</div>`) {
            messageDiv.innerHTML = '';
        }
    }, 3000);
}

// Registration Form Handler
if (document.getElementById('registerForm')) {
    const registerForm = document.getElementById('registerForm');
    const registerBtn = document.getElementById('registerBtn');
    const spinner = document.getElementById('spinner');
    const btnText = document.getElementById('btnText');
    
    // Real-time validation
    document.getElementById('username').addEventListener('input', validateUsername);
    document.getElementById('email').addEventListener('input', validateEmail);
    document.getElementById('confirmPassword').addEventListener('input', validateConfirmPassword);
    
    async function validateUsername() {
        const username = document.getElementById('username').value;
        const errorDiv = document.getElementById('usernameError');
        
        if (username.length < 3) {
            errorDiv.textContent = 'Username must be at least 3 characters';
            return false;
        }
        
        // Check if username exists
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(u => u.username === username)) {
            errorDiv.textContent = 'Username already taken';
            return false;
        }
        
        errorDiv.textContent = '';
        return true;
    }
    
    async function validateEmail() {
        const email = document.getElementById('email').value;
        const errorDiv = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            errorDiv.textContent = 'Invalid email format';
            return false;
        }
        
        // Check if email exists
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(u => u.email === email)) {
            errorDiv.textContent = 'Email already registered';
            return false;
        }
        
        errorDiv.textContent = '';
        return true;
    }
    
    function validatePassword() {
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('passwordError');
        
        if (password.length < 6) {
            errorDiv.textContent = 'Password must be at least 6 characters';
            return false;
        }
        
        errorDiv.textContent = '';
        return true;
    }
    
    function validateConfirmPassword() {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const errorDiv = document.getElementById('confirmError');
        
        if (password !== confirmPassword) {
            errorDiv.textContent = 'Passwords do not match';
            return false;
        }
        
        errorDiv.textContent = '';
        return true;
    }
    
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all fields
        const isUsernameValid = await validateUsername();
        const isEmailValid = await validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmValid = validateConfirmPassword();
        
        if (!isUsernameValid || !isEmailValid || !isPasswordValid || !isConfirmValid) {
            return;
        }
        
        // Get form data
        const userData = {
            fullname: document.getElementById('fullname').value,
            email: document.getElementById('email').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };
        
        // Disable button and show spinner
        registerBtn.disabled = true;
        spinner.style.display = 'inline-block';
        btnText.textContent = 'Registering...';
        
        try {
            const result = await API.register(userData);
            showMessage('message', result.message, 'success');
            
            // Redirect to login page after 2 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
            
        } catch (error) {
            showMessage('message', error.message, 'error-message');
        } finally {
            registerBtn.disabled = false;
            spinner.style.display = 'none';
            btnText.textContent = 'Register';
        }
    });
}

// Login Form Handler
if (document.getElementById('loginForm')) {
    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.getElementById('loginBtn');
    const spinner = document.getElementById('spinner');
    const btnText = document.getElementById('btnText');
    
    // Check if already logged in
    API.checkAuth().then(isLoggedIn => {
        if (isLoggedIn) {
            window.location.href = 'dashboard.html';
        }
    });
    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const identifier = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        
        if (!identifier || !password) {
            showMessage('message', 'Please fill in all fields', 'error-message');
            return;
        }
        
        // Disable button and show spinner
        loginBtn.disabled = true;
        spinner.style.display = 'inline-block';
        btnText.textContent = 'Logging in...';
        
        try {
            const result = await API.login(identifier, password);
            showMessage('message', result.message, 'success');
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
            
        } catch (error) {
            showMessage('message', error.message, 'error-message');
        } finally {
            loginBtn.disabled = false;
            spinner.style.display = 'none';
            btnText.textContent = 'Login';
        }
    });
}

// Dashboard Handler
if (document.getElementById('userName')) {
    // Check authentication
    (async () => {
        try {
            const user = await API.getCurrentUser();
            
            // Display user information
            document.getElementById('userName').textContent = user.fullname;
            document.getElementById('dashboardUsername').textContent = user.username;
            document.getElementById('dashboardEmail').textContent = user.email;
            document.getElementById('dashboardFullname').textContent = user.fullname;
            
            // Get registration date from localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const userData = users.find(u => u.id === user.userId);
            if (userData && userData.createdAt) {
                const date = new Date(userData.createdAt);
                document.getElementById('memberSince').textContent = date.toLocaleDateString();
            }
            
        } catch (error) {
            // Not logged in, redirect to login page
            window.location.href = 'login.html';
        }
    })();
    
    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            await API.logout();
            window.location.href = 'login.html';
        });
    }
}

// Prevent access to dashboard if not logged in
if (window.location.pathname.includes('dashboard.html')) {
    (async () => {
        const isLoggedIn = await API.checkAuth();
        if (!isLoggedIn) {
            window.location.href = 'login.html';
        }
    })();
}

// Prevent access to login/register pages if already logged in
if (window.location.pathname.includes('login.html') || window.location.pathname.includes('index.html')) {
    (async () => {
        const isLoggedIn = await API.checkAuth();
        if (isLoggedIn && !window.location.pathname.includes('dashboard.html')) {
            window.location.href = 'dashboard.html';
        }
    })();
}