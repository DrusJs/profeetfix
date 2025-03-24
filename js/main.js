const swiper = new Swiper(".main-swiper", {
    slidesPerView: 1,
    effect: "fade",
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        },
    pagination: {
        el: ".swiper-pagination",
    },
});

const swiperMedia = new Swiper(".media-swiper", {
    slidesPerView: 1,
    loop: true,
    centeredSlides: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
    },
    breakpoints:{
        931: {
            slidesPerView: 2,  
            centeredSlides: false,        
        },
        1300: {
            slidesPerView: 3,            
        }
    }

});

function checkBlocksVisibility() {
    let windowHeight = window.innerHeight;
    let blocks = document.querySelectorAll('.fade');
    let delayItem = window.matchMedia("(max-width: 800px)").matches ? 40 : 80
    let accordion = document.querySelector('.faq-item.active')
    let selects = document.querySelectorAll('.select-primary.active')

    blocks.forEach(block => {
        let blockPosition = block.getBoundingClientRect().top;

        if (blockPosition < windowHeight - delayItem) {
            block.style.opacity = "1";
            block.style.transform = "translateY(0)";
        }
    });
    if (accordion) {
        this.isVisible(accordion)
    }
    if (selects.length !== 0) {
        selects.forEach(el => {
            this.isVisible(el)
        })
    }
}
checkBlocksVisibility()

window.addEventListener('scroll', checkBlocksVisibility)


function animateNumbers(element, start, end, duration) {
    let startTime = null;
    const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.innerHTML = formatNumber(currentValue);
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };
    requestAnimationFrame(step);
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function startCounting(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let numberElement = entry.target;
            let endValue = parseInt(numberElement.getAttribute("data-end"));
            animateNumbers(numberElement, 0, endValue, 1000);
            observer.unobserve(numberElement);
        }
    });
}

const observer = new IntersectionObserver(startCounting, { threshold: 0.5 });

document.querySelectorAll(".about-item-num span").forEach(el => {
    el.setAttribute("data-end", el.innerText.replace(/\s/g, ""));
    observer.observe(el);
});

const clipImage = document.querySelectorAll(".clip-image img");

if (clipImage.length > 0) {
    document.addEventListener("mousemove", (event) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
    
      const offsetX = (clientX / innerWidth - 0.5) * -10; 
      clipImage.forEach(el=>{
        el.style.transform = `translateX(${offsetX}px)`;
      })
    });
}

function createShakeEffect(elements, direction, angle) {
    elements.forEach((item) => {
        let frame = 0;
        let shaking = false;
        let requestId = null;
        const element = item.firstElementChild;

        function shake() {
            if (!shaking) return;
            const offset = Math.sin(frame * 0.05) * 10 * direction;
            element.style.transform = `translateX(${offset}px) translateY(${-offset}px) rotate(${angle}deg)`;
            frame++;
            requestId = requestAnimationFrame(shake);
        }

        item.addEventListener("mouseenter", () => {
            shaking = true;
            frame = 0;
            shake();
        });

        item.addEventListener("mouseleave", () => {
            shaking = false;
            if (requestId) cancelAnimationFrame(requestId);
            element.style.transform = "translateX(0) translateY(0) rotate(${angle}deg)";
            
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const prevArrows = document.querySelectorAll(".swiper-button-prev");
    const nextArrows = document.querySelectorAll(".swiper-button-next");

    createShakeEffect(prevArrows, -1, 135); 
    createShakeEffect(nextArrows, 1, -45);  
});