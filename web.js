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
