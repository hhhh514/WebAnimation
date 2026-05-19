// 現代互動效果和動畫
document.addEventListener('DOMContentLoaded', function() {
    // 載入動畫
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 觀察所有 section
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // 平滑滾動到錨點
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 登入表單提交
    const loginForm = document.querySelector('.login-form');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // 模擬載入狀態
        const submitBtn = this.querySelector('.login-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '登入中...';
        submitBtn.disabled = true;

        // 模擬 API 呼叫
        setTimeout(() => {
            alert('登入成功！歡迎回來。');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });

    // 表單提交
    const demoForm = document.querySelector('.form-demo');
    demoForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // 表單驗證
        const requiredFields = this.querySelectorAll('input[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#ff6b6b';
                isValid = false;
            } else {
                field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }
        });

        if (isValid) {
            alert('表單提交成功！感謝您的參與。');
            this.reset();
        } else {
            alert('請填寫所有必填欄位。');
        }
    });

    // 按鈕點擊動畫效果
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        if (!btn.disabled) {
            btn.addEventListener('click', function() {
                // 添加波紋效果
                const ripple = document.createElement('span');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(255, 255, 255, 0.6)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s linear';
                ripple.style.left = '50%';
                ripple.style.top = '50%';
                ripple.style.width = '20px';
                ripple.style.height = '20px';
                ripple.style.marginLeft = '-10px';
                ripple.style.marginTop = '-10px';

                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        }
    });

    // 添加波紋動畫
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // 滑鼠追蹤效果 (3D 互動)
    document.addEventListener('mousemove', function(e) {
        const cards = document.querySelectorAll('.button-group, .card-item');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            } else {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            }
        });
    });

    // 鍵盤導航增強
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.tagName === 'BUTTON') {
            e.target.click();
        }
    });

    // 表單輸入增強
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });

        // 即時驗證
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = 'rgba(168, 85, 247, 0.5)';
            } else {
                this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }
        });
    });

    // 載入完成動畫
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // 添加載入樣式
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    // ===== 新增功能 =====

    // 模態窗口功能
    window.openModal = function() {
        const modal = document.getElementById('modalOverlay');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeModal = function() {
        const modal = document.getElementById('modalOverlay');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    // ESC 鍵關閉模態
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // 標籤頁切換
    window.switchTab = function(index) {
        // 移除所有活躍狀態
        const headers = document.querySelectorAll('.tab-header');
        const contents = document.querySelectorAll('.tab-content');

        headers.forEach(h => h.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        // 添加新的活躍狀態
        headers[index].classList.add('active');
        contents[index].classList.add('active');
    };

    // 手風琴切換
    window.toggleAccordion = function(button) {
        const item = button.closest('.accordion-item');
        const content = item.querySelector('.accordion-content');

        // 檢查是否已經打開
        const isActive = item.classList.contains('active');

        // 如果已打開，則關閉；否則打開
        if (isActive) {
            item.classList.remove('active');
        } else {
            // 可選：同時只打開一個手風琴項
            // document.querySelectorAll('.accordion-item').forEach(acc => {
            //     acc.classList.remove('active');
            // });
            item.classList.add('active');
        }
    };

    // 導航菜單在行動裝置上的切換
    const navToggle = document.querySelector('.navbar-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            const navMenu = document.querySelector('.navbar-menu');
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }
});