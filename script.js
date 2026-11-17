const slides = [...document.querySelectorAll(".slide")];

const prev = document.getElementById("prevBtn");
const next = document.getElementById("nextBtn");

const dotsWrap = document.getElementById("dots");
const counter = document.getElementById("slideCounter");
const progress = document.getElementById("progressBar");

let current = 0;

// CRIAR OS INDICADORES DOS SLIDES
slides.forEach((slide, index) => {

    const dot = document.createElement("button");

    dot.className = "dot";
    dot.type = "button";

    dot.setAttribute(
        "aria-label",
        `Ir para o slide ${index + 1}: ${slide.dataset.title}`
    );

    dot.addEventListener("click", () => {
        showSlide(index);
    });

    dotsWrap.appendChild(dot);

});


// FUNÇÃO PARA TROCAR OS SLIDES
function showSlide(index) {

    current = Math.max(0, Math.min(index, slides.length - 1));

    slides.forEach((slide, i) => {

        slide.classList.toggle("active", i === current);

        slide.setAttribute(
            "aria-hidden",
            i === current ? "false" : "true"
        );

    });

    // ATUALIZAR INDICADORES
    [...dotsWrap.children].forEach((dot, i) => {

        dot.classList.toggle("active", i === current);

        dot.setAttribute(
            "aria-current",
            i === current ? "step" : "false"
        );

    });

    // CONTADOR
    counter.textContent =
        `${String(current + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;

    // BARRA DE PROGRESSO
    progress.style.width =
        `${((current + 1) / slides.length) * 100}%`;

    // DESATIVAR BOTÕES NAS EXTREMIDADES
    prev.disabled = current === 0;
    next.disabled = current === slides.length - 1;

}


// BOTÃO ANTERIOR
prev.addEventListener("click", () => {

    showSlide(current - 1);

});


// BOTÃO PRÓXIMO
next.addEventListener("click", () => {

    showSlide(current + 1);

});


// NAVEGAÇÃO PELO TECLADO
document.addEventListener("keydown", event => {

    if (["ArrowRight", "PageDown", " "].includes(event.key)) {

        event.preventDefault();

        showSlide(current + 1);

    }

    else if (["ArrowLeft", "PageUp"].includes(event.key)) {

        event.preventDefault();

        showSlide(current - 1);

    }

    else if (event.key === "Home") {

        showSlide(0);

    }

    else if (event.key === "End") {

        showSlide(slides.length - 1);

    }

});


// INICIAR APRESENTAÇÃO
showSlide(0);