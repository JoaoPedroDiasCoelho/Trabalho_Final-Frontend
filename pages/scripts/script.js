// Script para animações do navbar
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.getElementById('nav');
    const logo = document.getElementById('logo');

    function checkScroll() {
        const scrollPosition = window.scrollY;

        if (scrollPosition > 150) {
            nav.classList.add('animation');
            nav.classList.remove('animation-back');
            nav.style.height = '90px';
            logo.style.height = '80px';
        } else {
            nav.classList.remove('animation');
            nav.classList.add('animation-back');
            nav.style.height = '120px';
            logo.style.height = '100px';
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();

    // Banner carrossel
    const banners = document.querySelectorAll('.banner-img');
    const leftBanner = document.querySelector('.banner-arrow.left');
    const rightBanner = document.querySelector('.banner-arrow.right');
    let bannerIndex = 0;

    function showBanner(idx) {
        banners.forEach((img, i) => {
            img.classList.toggle('active', i === idx);
        });
    }

    if (banners.length) {
        showBanner(bannerIndex);

        leftBanner.addEventListener('click', function() {
            bannerIndex = (bannerIndex - 1 + banners.length) % banners.length;
            showBanner(bannerIndex);
        });

        rightBanner.addEventListener('click', function() {
            bannerIndex = (bannerIndex + 1) % banners.length;
            showBanner(bannerIndex);
        });
    }
});

// Script para o carrossel de livros
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.carousel').forEach(function(carousel) {
        const carouselItems = carousel.querySelector('.carousel-items');
        const leftArrow = carousel.querySelector('.carousel-arrow.left');
        const rightArrow = carousel.querySelector('.carousel-arrow.right');
        const livro = carouselItems.querySelector('.livro');
        if (!carouselItems || !leftArrow || !rightArrow || !livro) return;

        const itemWidth = livro.offsetWidth + 50;

        leftArrow.addEventListener('click', function () {
            carouselItems.scrollBy({
                left: -itemWidth,
                behavior: 'smooth'
            });
        });

        rightArrow.addEventListener('click', function () {
            carouselItems.scrollBy({
                left: itemWidth,
                behavior: 'smooth'
            });
        });
    });

    // Adicionar ao carrinho
    document.querySelectorAll('.add-cart-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const card = btn.closest('.livro');
            const livroInfo = {
                titulo: card.querySelector('.livro-titulo').textContent,
                autor: card.querySelector('.livro-autor').textContent,
                preco: card.querySelector('.livro-preco').textContent,
                imagem: card.querySelector('img').getAttribute('src')
            };
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const jaExiste = cart.some(l => l.titulo === livroInfo.titulo);
            if (jaExiste) {
                alert('Este livro já está no carrinho!');
                return;
            }
            cart.push(livroInfo);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Livro adicionado ao carrinho!\n' + livroInfo.titulo + ' - ' + livroInfo.preco + '\nTotal de itens no carrinho: ' + cart.length);
        });
    });
});

// Carrossel dos cards do Dia do Professor
document.addEventListener('DOMContentLoaded', function () {
    const area = document.querySelector('.professor-carousel-area');
    if (!area) return;

    const carousel = area.querySelector('.professor-carousel');
    const cards = carousel.querySelectorAll('.professor-card');
    const leftArrow = area.querySelector('.professor-carousel-arrow.left');
    const rightArrow = area.querySelector('.professor-carousel-arrow.right');
    const dots = area.querySelectorAll('.professor-dot');
    const cardsPerPage = 2; // Quantos cards aparecem por vez
    let currentPage = 0;
    const totalPages = Math.ceil(cards.length / cardsPerPage);

    function showPage(page) {
        cards.forEach((card, i) => {
            card.style.display = (i >= page * cardsPerPage && i < (page + 1) * cardsPerPage) ? 'flex' : 'none';
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === page);
        });
    }

    leftArrow.addEventListener('click', function () {
        currentPage = (currentPage - 1 + totalPages) % totalPages;
        showPage(currentPage);
    });

    rightArrow.addEventListener('click', function () {
        currentPage = (currentPage + 1) % totalPages;
        showPage(currentPage);
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', function () {
            currentPage = i;
            showPage(currentPage);
        });
    });

    showPage(currentPage);
});