//barra de navegación
(() =>{


    let menuBtn = document.querySelector('#menu-btn');
    let navbar = document.querySelector('.header .navbar');

    function closeNavbar(){
        navbar.classList.remove('active');
        menuBtn.classList.add('fa-bars-staggered');
        menuBtn.classList.remove('fa-xmark');
    }

    menuBtn.addEventListener('click', (e) =>{
        e.stopPropagation();
        navbar.classList.toggle('active');
        menuBtn.classList.toggle('fa-bars-staggered');
        menuBtn.classList.toggle('fa-xmark');
    });

    document.addEventListener('click', (e) =>{
        if(!navbar.contains(e.target) && !menuBtn.contains(e.target)) closeNavbar();
    });


    navbar.addEventListener('click', (e)=>
        e.stopPropagation());

    window.addEventListener('scroll', closeNavbar);

})();


//título de inicio

(() =>{
    let home = document.querySelector('.home');
    let title = document.querySelector('.home h1');

    home.onmousemove = e =>{

        let r = home.getBoundingClientRect();
        let x = (e.clientX - r.left - r.width / 2) / r.width * 40;
        let y = (e.clientY - r.top - r.height / 2) / r.height * 40;

        title.style.transform = `translate(${-x}px, ${-y}px)`;
    }


    home.onmouseleave = () =>title.style.transform = ``;



})();





// ============================================================
// CARRUSEL — Iron Spirit
// ============================================================

(() => {

    const track       = document.getElementById('carouselTrack');
    const box         = document.getElementById('carouselBox');
    const dotsWrap    = document.getElementById('carouselDots');
    const progressBar = document.getElementById('carouselProgress');

    if (!track) return; // Si el carrusel no existe en la página, no ejecutar

    const slides   = track.querySelectorAll('.carousel-slide');
    const total    = slides.length;
    const DELAY    = 4500;
    let current    = 0, autoTimer, progressTimer, progressStart;

    // Crear dots
    slides.forEach((_, i) => {
        const d = document.createElement('button');
        d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', 'Ir al slide ' + (i + 1));
        d.onclick = () => { goTo(i); startAuto(); };
        dotsWrap.appendChild(d);
    });

    function updateDots() {
        dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
            d.classList.toggle('active', i === current);
        });
    }

    function resetProgress() {
        clearInterval(progressTimer);
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        progressStart = Date.now();
        setTimeout(() => {
            progressBar.style.transition = 'width .1s linear';
            progressTimer = setInterval(() => {
                const pct = Math.min(100, ((Date.now() - progressStart) / DELAY) * 100);
                progressBar.style.width = pct + '%';
                if (pct >= 100) clearInterval(progressTimer);
            }, 50);
        }, 20);
    }

    function goTo(n) {
        current = (n + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        updateDots();
        resetProgress();
    }

    function startAuto() {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => goTo(current + 1), DELAY);
    }

    document.getElementById('carouselPrev').onclick = () => { goTo(current - 1); startAuto(); };
    document.getElementById('carouselNext').onclick = () => { goTo(current + 1); startAuto(); };

    // Pausa al hacer hover
    box.addEventListener('mouseenter', () => { clearInterval(autoTimer); clearInterval(progressTimer); });
    box.addEventListener('mouseleave', () => { startAuto(); resetProgress(); });

    // Swipe táctil
    let touchX = 0;
    box.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 40) { goTo(current + (dx < 0 ? 1 : -1)); startAuto(); }
    });

    // Inicializar
    goTo(0);
    startAuto();

})();







 
 
// ============================================================
// FILTRO DE PRODUCTOS — Iron Spirit
// ============================================================
 
(() => {
    const filtros = document.querySelectorAll('.filtro-btn');
    const tarjetas = document.querySelectorAll('.producto-card');
 
    if (!filtros.length) return;
 
    filtros.forEach(btn => {
        btn.addEventListener('click', () => {
            // Actualizar botón activo
            filtros.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
 
            const filter = btn.dataset.filter;
 
            tarjetas.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
})();












// ============================================================
// TOGGLE PRICING MENSUAL / ANUAL — Iron Spirit
// ============================================================
 
(() => {
    const toggle = document.getElementById('toggleAnual');
    if (!toggle) return;
 
    const precios = document.querySelectorAll('.price-amount');
    const labelMensual = document.getElementById('labelMensual');
    const labelAnual = document.getElementById('labelAnual');
 
    toggle.addEventListener('change', () => {
        const esAnual = toggle.checked;
 
        precios.forEach(el => {
            const valor = esAnual ? el.dataset.anual : el.dataset.mensual;
            el.textContent = '$' + valor;
        });
 
        labelMensual.style.color = esAnual ? 'rgba(255,255,255,.4)' : 'var(--white)';
        labelAnual.style.color  = esAnual ? 'var(--white)' : 'rgba(255,255,255,.4)';
    });
})();
 






// ============================================================
// FORMULARIO CONTACT — Iron Spirit
// ============================================================
 
(() => {
    const form    = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    if (!form) return;
 
    form.addEventListener('submit', e => {
        e.preventDefault();
        success.style.display = 'flex';
        form.reset();
        setTimeout(() => { success.style.display = 'none'; }, 5000);
    });
})();

