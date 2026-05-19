document.addEventListener('DOMContentLoaded', function() {
    const loadingCat = document.getElementById('loadingCat');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingPercent = document.getElementById('loadingPercent');
    const loadingAnimation = document.querySelector('.loading-animation');
    const gameScreen = document.getElementById('gameScreen');
    const gameStage = document.getElementById('gameStage');
    const gameCat = document.getElementById('gameCat');
    const feedBtn = document.getElementById('feedBtn');

    let affection = 0;
    const maxAffection = 100;
    const totalHearts = 5;   // ← 新增這行

    function updateAffection() {
        const percent = affection / maxAffection;
        const heart = document.getElementById('heartLiquid');

        if (!heart) return;

        // 💧 水位（從底部往上）
        const reveal = 100 - percent * 100;
        heart.style.clipPath = `inset(${reveal}% 0 0 0)`;

        // 💥 滿格效果
        if (percent >= 1) {
            heart.classList.add('full');
        } else {
            heart.classList.remove('full');
        }
    }
    function showGameScreen() {
        loadingAnimation.style.opacity = '0';
        setTimeout(() => {
            loadingAnimation.style.display = 'none';
            gameScreen.classList.remove('hidden');
            initCatMovement();
        }, 500);
    }

    // ==================== 貓咪移動系統 ====================
    let catX = 200, catY = 150;
    let isDragging = false;
    let walkTimer = null;
    let targetX, targetY;

    function initCatMovement() {
        const rect = gameStage.getBoundingClientRect();
        catX = rect.width / 2 - 60;
        catY = rect.height / 2 - 45;
        
        gameCat.style.left = catX + 'px';
        gameCat.style.top = catY + 'px';
        gameCat.style.transform = 'none'; 

        setRandomTarget();
        walkTimer = setInterval(() => {
            if (!isDragging) setRandomTarget();
        }, 2500);

        requestAnimationFrame(animateCat);
    }

    function setRandomTarget() {
        const rect = gameStage.getBoundingClientRect();
        targetX = Math.random() * (rect.width - 120) + 30;
        targetY = Math.random() * (rect.height - 120) + 30;
    }

    function animateCat() {
        if (!isDragging) {
            const dx = targetX - catX;
            const dy = targetY - catY;
            const smooth = 0.006;

            catX += dx * smooth;
            catY += dy * smooth;

            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 2) {
                gameStage.classList.remove('walking');
            } else {
                gameStage.classList.add('walking');
            }

            // 邊界限制
            if (catX < 20) { catX = 20; targetX = catX + 80; }
            if (catX > gameStage.offsetWidth - 100) { 
                catX = gameStage.offsetWidth - 100; 
                targetX = catX - 80; 
            }
            if (catY < 20) { catY = 20; targetY = catY + 80; }
            if (catY > gameStage.offsetHeight - 100) { 
                catY = gameStage.offsetHeight - 100; 
                targetY = catY - 80; 
            }

            gameCat.style.left = catX + 'px';
            gameCat.style.top = catY + 'px';
        }

        requestAnimationFrame(animateCat);
    }

    // ==================== 拖曳功能 ====================
    function startDrag(e) {
        isDragging = true;
        gameStage.classList.remove('walking');
        gameCat.style.transition = 'none';
    }

    function onDrag(e) {
        if (!isDragging) return;
        
        const rect = gameStage.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        catX = clientX - rect.left - 60;
        catY = clientY - rect.top - 45;

        catX = Math.max(20, Math.min(catX, rect.width - 100));
        catY = Math.max(20, Math.min(catY, rect.height - 100));

        gameCat.style.left = catX + 'px';
        gameCat.style.top = catY + 'px';
    }

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        gameCat.style.transition = 'transform 0.1s ease';
        setRandomTarget();
    }

    // 事件綁定
    gameCat.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', endDrag);

    gameCat.addEventListener('touchstart', (e) => { e.preventDefault(); startDrag(e); });
    window.addEventListener('touchmove', (e) => { e.preventDefault(); onDrag(e); });
    window.addEventListener('touchend', endDrag);

    // ==================== 餵食按鈕 ====================
    feedBtn.addEventListener('click', () => {
        if (affection < maxAffection) {
            affection = Math.min(maxAffection, affection + 10);
            updateAffection();

            gameCat.classList.add('feed-bounce');
            setTimeout(() => {
                gameCat.classList.remove('feed-bounce');
            }, 500);
        }
    });

    // ==================== 載入動畫 ====================
    if (loadingCat && loadingProgress && loadingPercent) {
        let progress = 0;
        const containerWidth = 400;

        const loadingInterval = setInterval(() => {
            progress += Math.max(1, Math.random() * 3);
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadingInterval);
                setTimeout(showGameScreen, 400);
            }

            loadingProgress.style.width = progress + '%';
            loadingPercent.textContent = Math.round(progress) + '%';

            const catPos = (containerWidth * progress / 100) - 40;
            loadingCat.style.left = Math.max(0, catPos) + 'px';
        }, 30);
    }

    updateAffection();
});