/* ABSTRA Estudio - comportamiento común (menú y pie de página) */

/* --- CONFIGURACIÓN CONTACTO --- */
const fonoParaCopiar = '+56977294227';

// Sombra del menú al bajar
const menu = document.querySelector('.menu');
const sombraMenu = () => menu.classList.toggle('con-sombra', window.scrollY > 8);
window.addEventListener('scroll', sombraMenu, { passive: true });
sombraMenu();

// Teléfono: en celular llama; en computador copia el número y lo avisa en el mismo enlace
const elFono = document.getElementById('linkTel');
if (!window.matchMedia('(pointer: coarse)').matches) {
    elFono.style.cursor = 'copy';
    elFono.title = 'Haz clic para copiar';
    elFono.addEventListener('click', (e) => {
        e.preventDefault();
        const texto = elFono.textContent;
        navigator.clipboard.writeText(fonoParaCopiar).then(() => {
            elFono.textContent = '¡Número copiado!';
            setTimeout(() => { elFono.textContent = texto; }, 1800);
        });
    });
}

document.getElementById('year').textContent = new Date().getFullYear();

// Portada: en pantallas anchas la casa se achica lo justo para que todo quepa sin bajar
const hero = document.querySelector('.hero-container');
if (hero) {
    const PROPORCION = 1.918;     // 2070 × 1079
    const DIBUJO = 0.491;         // parte visible de la imagen (desde el 50,9 % del alto)
    const AIRE = 48;              // espacio entre el botón y los árboles (igual que en estilos.css)
    const ajustarCasa = () => {
        if (window.innerWidth <= 768) { hero.style.removeProperty('--alto-casa'); hero.style.removeProperty('--escala-globos'); return; }
        const completa = hero.clientWidth / PROPORCION;
        const texto = hero.querySelector('.hero-content').offsetHeight;
        const disponible = (window.innerHeight - menu.offsetHeight - texto - AIRE) / DIBUJO;
        const alto = Math.max(completa * 0.55, Math.min(completa, disponible));
        hero.style.setProperty('--alto-casa', alto + 'px');
        hero.style.setProperty('--escala-globos', (alto / completa).toFixed(3));
    };
    ajustarCasa();
    window.addEventListener('resize', ajustarCasa);
    document.fonts.ready.then(ajustarCasa);
}
