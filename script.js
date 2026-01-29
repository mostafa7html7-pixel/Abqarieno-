document.addEventListener('DOMContentLoaded', () => {
    const backgroundAnimation = document.querySelector('.background-animation');
    const numParticles = 30; // عدد الجسيمات المتحركة

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        backgroundAnimation.appendChild(particle);

        // تعيين خصائص عشوائية لكل جسيم
        const size = Math.random() * 4 + 2; // حجم بين 2 و 6 بكسل
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`; // مدة حركة عشوائية
        particle.style.animationDelay = `${Math.random() * 5}s`; // تأخير عشوائي للحركة
        particle.style.opacity = Math.random() * 0.5 + 0.3; // شفافية عشوائية
    }

    // إضافة كود CSS للجسيمات المتحركة ديناميكياً
    const style = document.createElement('style');
    style.innerHTML = `
        .particle {
            position: absolute;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            pointer-events: none;
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.7);
            animation: floatAndFade 10s infinite ease-in-out alternate;
        }

        @keyframes floatAndFade {
            0% { transform: translate(0, 0) scale(1); opacity: 0.3; }
            50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.1); opacity: 0.8; }
            100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
        }
    `;
    document.head.appendChild(style);
});