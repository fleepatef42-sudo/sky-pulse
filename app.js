// SkyPulse - Application Logic
let isAuthLogin = true;
let counts = { adult: 1, child: 0 };
let currentClass = 'سياحية';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Remove Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('opacity-0', 'pointer-events-none');
        }, 800);
    }

    // Navbar Scroll Effect
    window.addEventListener('scroll', handleScroll);

    // Close Dropdowns on Click Outside
    document.addEventListener('click', (e) => {
        const pickers = ['passenger-picker', 'class-picker'];
        pickers.forEach(id => {
            const picker = document.getElementById(id);
            const pickerContainer = picker ? picker.parentElement : null;
            if (picker && !picker.classList.contains('hidden') && !pickerContainer.contains(e.target)) {
                picker.classList.add('hidden');
            }
        });
    });

    // Toggle Password Visibility
    const toggleBtn = document.getElementById('toggle-password');
    const passInput = document.getElementById('auth-password');
    if (toggleBtn && passInput) {
        toggleBtn.addEventListener('click', () => {
            const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passInput.setAttribute('type', type);
            const iconName = type === 'password' ? 'eye' : 'eye-off';
            toggleBtn.setAttribute('data-lucide', iconName);
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });
    }

    // Auth Form Submission
    const authForm = document.getElementById('auth-form');
    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.getElementById('auth-submit');
            const originalText = btn.innerText;
            
            btn.innerHTML = '<span class="flex items-center justify-center gap-2"><i data-lucide="loader-2" class="animate-spin w-5 h-5"></i> جاري التحميل...</span>';
            if (typeof lucide !== 'undefined') lucide.createIcons();
            btn.disabled = true;
            
            setTimeout(() => {
                showModal(
                    isAuthLogin ? 'مرحباً بعودتك!' : 'أهلاً بك في سكاي بلس!',
                    isAuthLogin ? 'تم تسجيل الدخول بنجاح. استعد لرحلتك القادمة.' : 'تم إنشاء حسابك بنجاح. ابدأ باستكشاف العالم الآن.',
                    'success'
                );
                btn.innerText = originalText;
                btn.disabled = false;
                showHomePage();
            }, 1500);
        });
    }

    // Reveal animations on scroll
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('opacity-0');
        observer.observe(section);
    });
});

function handleScroll() {
    const navbar = document.getElementById('navbar');
    const logoBg = document.getElementById('logo-bg');
    const logoText = document.getElementById('logo-text');
    const navLinks = document.querySelectorAll('.nav-link');
    const loginBtn = document.getElementById('login-btn');
    const navGlass = document.querySelector('nav .glass');

    if (!navbar || !navGlass) return;

    if (window.scrollY > 50) {
        navbar.classList.remove('lg:top-8');
        navbar.classList.add('top-0');
        navGlass.classList.add('bg-white/95', 'py-3');
        navGlass.classList.remove('bg-white/10', 'py-4', 'border-white/10');
        navGlass.classList.add('border-slate-100');
        
        if (logoBg) logoBg.classList.add('bg-blue-600');
        if (logoText) {
            logoText.classList.add('text-slate-900');
            logoText.classList.remove('text-white');
        }
        
        navLinks.forEach(l => {
            l.classList.add('text-slate-600');
            l.classList.remove('text-white/80');
        });
        
        if (loginBtn) {
            loginBtn.classList.add('bg-blue-600', 'text-white');
            loginBtn.classList.remove('bg-white', 'text-blue-600');
        }
    } else {
        navbar.classList.add('lg:top-8');
        navbar.classList.remove('top-0');
        navGlass.classList.remove('bg-white/95', 'py-3', 'border-slate-100');
        navGlass.classList.add('bg-white/10', 'py-4', 'border-white/10');
        
        if (logoBg) logoBg.classList.add('bg-blue-600');
        if (logoText) {
            logoText.classList.remove('text-slate-900');
            logoText.classList.add('text-white');
        }
        
        navLinks.forEach(l => {
            l.classList.remove('text-slate-600');
            l.classList.add('text-white/80');
        });
        
        if (loginBtn) {
            loginBtn.classList.remove('bg-blue-600', 'text-white');
            loginBtn.classList.add('bg-white', 'text-blue-600');
        }
    }
}

// Global Functions
window.showAuthPage = function() {
    document.getElementById('home-page').classList.add('hidden');
    document.getElementById('auth-page').classList.remove('hidden');
    window.scrollTo(0, 0);
};

window.showHomePage = function() {
    document.getElementById('auth-page').classList.add('hidden');
    document.getElementById('home-page').classList.remove('hidden');
};

window.toggleAuthMode = function() {
    isAuthLogin = !isAuthLogin;
    const title = document.getElementById('auth-title');
    const sub = document.getElementById('auth-subtitle');
    const nameField = document.getElementById('name-field');
    const submitBtn = document.getElementById('auth-submit');
    const switchText = document.getElementById('auth-switch-text');
    const switchBtn = document.getElementById('auth-switch-btn');
    const forgotPass = document.getElementById('forgot-pass-link');

    if (isAuthLogin) {
        title.innerText = 'مرحباً بعودتك';
        sub.innerText = 'سجل دخولك لمتابعة رحلاتك القادمة';
        nameField.classList.add('hidden');
        submitBtn.innerText = 'تسجيل الدخول';
        switchText.innerText = 'ليس لديك حساب بعد؟';
        switchBtn.innerText = 'أنشئ حسابك الآن';
        forgotPass.classList.remove('hidden');
    } else {
        title.innerText = 'أنشئ حسابك';
        sub.innerText = 'ابدأ رحلتك معنا اليوم واحصل على عروض حصرية';
        nameField.classList.remove('hidden');
        submitBtn.innerText = 'إنشاء حساب';
        switchText.innerText = 'لديك حساب بالفعل؟';
        switchBtn.innerText = 'سجل دخولك هنا';
        forgotPass.classList.add('hidden');
    }
};

window.setTripType = function(type) {
    const tabs = document.querySelectorAll('.trip-tab');
    tabs.forEach(tab => {
        if (tab.getAttribute('data-type') === type) {
            tab.classList.remove('bg-slate-100', 'text-slate-500');
            tab.classList.add('bg-blue-600', 'text-white');
        } else {
            tab.classList.add('bg-slate-100', 'text-slate-500');
            tab.classList.remove('bg-blue-600', 'text-white');
        }
    });
};

window.togglePicker = function(id) {
    const picker = document.getElementById(id);
    picker.classList.toggle('hidden');
};

window.togglePassengerPicker = function() {
    window.togglePicker('passenger-picker');
};

window.updateCount = function(type, delta, event) {
    if (event) event.stopPropagation();
    counts[type] = Math.max(type === 'adult' ? 1 : 0, counts[type] + delta);
    document.getElementById(`count-${type}`).innerText = counts[type];
    
    const total = counts.adult + counts.child;
    document.getElementById('passenger-count').innerText = total;
};

window.setFlightClass = function(className, event) {
    if (event) event.stopPropagation();
    currentClass = className;
    
    const display = document.getElementById('flight-class-display');
    if (display) display.innerText = className;

    const btns = document.querySelectorAll('.class-btn');
    btns.forEach(btn => {
        if (btn.innerText.includes(className)) {
            btn.classList.add('bg-blue-50', 'text-blue-600', 'border-blue-600');
            btn.classList.remove('bg-slate-50', 'text-slate-500', 'border-slate-100');
        } else {
            btn.classList.remove('bg-blue-50', 'text-blue-600', 'border-blue-600');
            btn.classList.add('bg-slate-50', 'text-slate-500', 'border-slate-100');
        }
    });
    
    const picker = document.getElementById('class-picker');
    if (picker) picker.classList.add('hidden');
};

window.toggleChat = function() {
    const chat = document.getElementById('chat-window');
    chat.classList.toggle('hidden');
};

window.sendMessage = function() {
    const input = document.getElementById('chat-input');
    const messages = document.getElementById('chat-messages');
    if (!input.value.trim()) return;

    const userMsg = document.createElement('div');
    userMsg.className = 'bg-white text-slate-800 p-4 rounded-2xl rounded-tl-none self-start max-w-[80%] font-bold text-sm shadow-sm border border-slate-100';
    userMsg.innerText = input.value;
    messages.appendChild(userMsg);
    
    const text = input.value;
    input.value = '';
    messages.scrollTop = messages.scrollHeight;

    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'bg-blue-600 text-white p-4 rounded-2xl rounded-tr-none self-end max-w-[80%] font-bold text-sm shadow-md';
        botMsg.innerText = `شكراً لتواصلك معنا! بخصوص "${text}"، سيقوم أحد موظفينا بالرد عليك خلال لحظات.`;
        messages.appendChild(botMsg);
        messages.scrollTop = messages.scrollHeight;
    }, 1000);
};

window.showModal = function(title, message, type = 'info') {
    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md animate-fade-in';
    resultsDiv.innerHTML = `
        <div class="bg-white rounded-5xl p-10 max-w-lg w-full text-center shadow-3xl">
            <div class="w-20 h-20 ${type === 'success' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'} rounded-full flex items-center justify-center mx-auto mb-6">
                <i data-lucide="${type === 'success' ? 'check-circle-2' : 'info'}" class="w-10 h-10"></i>
            </div>
            <h3 class="text-3xl font-black text-slate-900 mb-4">${title}</h3>
            <p class="text-slate-500 font-bold mb-8">${message}</p>
            <button onclick="this.closest('.fixed').remove()" class="w-full py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl">موافق</button>
        </div>
    `;
    document.body.appendChild(resultsDiv);
    if (typeof lucide !== 'undefined') lucide.createIcons();
};

window.handleSearch = function() {
    const from = document.getElementById('input-from').value;
    const to = document.getElementById('input-to').value;
    const searchBtn = document.querySelector('button[onclick="handleSearch()"]');
    
    if (!from || !to) {
        showModal('تنبيه', 'الرجاء تحديد جهة المغادرة والوصول', 'info');
        return;
    }

    const originalHTML = searchBtn.innerHTML;
    searchBtn.innerHTML = '<i data-lucide="loader-2" class="animate-spin w-8 h-8 mx-auto"></i>';
    if (typeof lucide !== 'undefined') lucide.createIcons();
    searchBtn.disabled = true;

    setTimeout(() => {
        searchBtn.innerHTML = originalHTML;
        searchBtn.disabled = false;
        
        let classPhrase = '';
        if (currentClass === 'سياحية') classPhrase = 'على الدرجة السياحية';
        else if (currentClass === 'أعمال') classPhrase = 'على درجة الأعمال';
        else classPhrase = 'على الدرجة الأولى';

        showModal(
            'وجدنا رحلتك المثالية!',
            `لقد عثرنا على 12 رحلة مباشرة من ${from} إلى ${to} بأسعار تبدأ من $199 لعدد ${counts.adult + counts.child} مسافرين ${classPhrase}.`,
            'success'
        );
    }, 2500);
};

window.toggleMobileMenu = function() {
    const menu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const isMenuOpen = menu.classList.contains('opacity-100');
    
    if (isMenuOpen) {
        menu.classList.remove('opacity-100');
        menu.classList.add('opacity-0', 'pointer-events-none');
        if (menuIcon) menuIcon.setAttribute('data-lucide', 'menu');
    } else {
        menu.classList.add('opacity-100');
        menu.classList.remove('opacity-0', 'pointer-events-none');
        if (menuIcon) menuIcon.setAttribute('data-lucide', 'x');
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
};