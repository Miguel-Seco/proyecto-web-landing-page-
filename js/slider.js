const controladorBaner = {
    slides: [],
    dots: [],
    currentIndex: 0,
    autoplayInterval: null,
    autoplayDelay: 6000,

    init() {
        this.slides = document.querySelectorAll('.hero-slide');
        this.dots = document.querySelectorAll('.slider-pagination .dot');
        this.prevBtn = document.querySelector('.btn-prev');
        this.nextBtn = document.querySelector('.btn-next');

        if (this.slides.length === 0) return;

        this.irA(0);

        this.prevBtn?.addEventListener('click', () => {
            this.anterior();
            this.resetAutoplay();
        });

        this.nextBtn?.addEventListener('click', () => {
            this.siguiente();
            this.resetAutoplay();
        });

        this.dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                this.irA(i);
                this.resetAutoplay();
            });
        });

        this.startAutoplay();
    },

    irA(index) {
        if (index >= this.slides.length) index = 0;
        if (index < 0) index = this.slides.length - 1;

        this.slides.forEach(s => s.classList.remove('active'));
        this.dots.forEach(d => d.classList.remove('active'));

        this.slides[index].classList.add('active');
        this.dots[index]?.classList.add('active');

        this.currentIndex = index;
    },

    siguiente() {
        this.irA(this.currentIndex + 1);
    },

    anterior() {
        this.irA(this.currentIndex - 1);
    },

    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.siguiente();
        }, this.autoplayDelay);
    },

    resetAutoplay() {
        clearInterval(this.autoplayInterval);
        this.startAutoplay();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    controladorBaner.init();
});
