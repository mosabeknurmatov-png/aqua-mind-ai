
const slides = [...document.querySelectorAll(".slide")];

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const currentSlide = document.getElementById("currentSlide");
const totalSlides = document.getElementById("totalSlides");
const progressBar = document.getElementById("progressBar");
const fullscreenBtn = document.getElementById("fullscreenBtn");

let activeIndex = 0;

totalSlides.textContent = String(slides.length).padStart(2, "0");

function showSlide(index) {
    if (index < 0 || index >= slides.length) return;

    slides[activeIndex].classList.remove("active");

    activeIndex = index;

    slides[activeIndex].classList.add("active");

    currentSlide.textContent = String(activeIndex + 1).padStart(2, "0");

    const progress = ((activeIndex + 1) / slides.length) * 100;
    progressBar.style.width = `${progress}%`;

    prevBtn.disabled = activeIndex === 0;
    nextBtn.disabled = activeIndex === slides.length - 1;

    slides[activeIndex].scrollTop = 0;
}

function nextSlide() {
    if (activeIndex < slides.length - 1) {
        showSlide(activeIndex + 1);
    }
}

function previousSlide() {
    if (activeIndex > 0) {
        showSlide(activeIndex - 1);
    }
}

function firstSlide() {
    showSlide(0);
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", previousSlide);

document.querySelectorAll("[data-next]").forEach(button => {
    button.addEventListener("click", nextSlide);
});

document.querySelectorAll("[data-first]").forEach(button => {
    button.addEventListener("click", firstSlide);
});

document.addEventListener("keydown", event => {
    if (event.key === "ArrowRight" || event.key === "PageDown") {
        nextSlide();
    }

    if (event.key === "ArrowLeft" || event.key === "PageUp") {
        previousSlide();
    }

    if (event.key.toLowerCase() === "f") {
        toggleFullscreen();
    }

    if (event.key === "Home") {
        firstSlide();
    }

    if (event.key === "End") {
        showSlide(slides.length - 1);
    }
});

async function toggleFullscreen() {
    try {
        if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen();
        } else {
            await document.exitFullscreen();
        }
    } catch (error) {
        console.error("To‘liq ekran rejimini yoqib bo‘lmadi:", error);
    }
}

fullscreenBtn.addEventListener("click", toggleFullscreen);

document.addEventListener("fullscreenchange", () => {
    fullscreenBtn.textContent = document.fullscreenElement
        ? "⛶ Ekrandan chiqish"
        : "⛶ To‘liq ekran";
});

showSlide(0);
