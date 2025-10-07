document.addEventListener('DOMContentLoaded', function() {
    const nav = document.getElementById('nav');
    const logo = document.getElementById('logo');

    // Lógica do Scroll da Navegação
    function checkScroll() {
        if (!nav || !logo) return;
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

    // Lógica do Banner (se houver)
    const banners = document.querySelectorAll('.banner-img');
    const leftBanner = document.querySelector('.banner-arrow.left');
    const rightBanner = document.querySelector('.banner-arrow.right');
    let bannerIndex = 0;

    function showBanner(idx) {
        banners.forEach((img, i) => {
            img.classList.toggle('active', i === idx);
        });
    }

    if (banners.length && leftBanner && rightBanner) {
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
    
    // Lógica do Carrossel de Livros
    document.querySelectorAll('.carousel').forEach(function(carousel) {
        const carouselItems = carousel.querySelector('.carousel-items');
        const leftArrow = carousel.querySelector('.carousel-arrow.left');
        const rightArrow = carousel.querySelector('.carousel-arrow.right');
        const livro = carouselItems.querySelector('.livro');
        
        if (!carouselItems || !leftArrow || !rightArrow || !livro) return;
        
        const scrollAmount = livro.offsetWidth + 20;
        leftArrow.addEventListener('click', () => carouselItems.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
        rightArrow.addEventListener('click', () => carouselItems.scrollBy({ left: scrollAmount, behavior: 'smooth' }));
    });
});

// Lógica de Adicionar ao Carrinho (Geralmente em pages como index.html)
document.querySelectorAll('.add-cart-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        const card = btn.closest('.livro') || btn.closest('.professor-card');
        if (!card) return;

        const livroInfo = {
            id: card.querySelector('.livro-titulo')?.textContent.trim() || '',
            titulo: card.querySelector('.livro-titulo')?.textContent.trim() || '',
            autor: card.querySelector('.livro-autor')?.textContent || '',
            preco: card.querySelector('.livro-preco')?.textContent || '',
            imagem: card.querySelector('img')?.getAttribute('src') || ''
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemExistente = cart.find(item => item.id === livroInfo.id);

        if (itemExistente) {
            itemExistente.quantity++;
            alert('Quantidade atualizada no carrinho!');
        } else {
            livroInfo.quantity = 1;
            cart.push(livroInfo);
            alert('Livro adicionado ao carrinho!');
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
    });
});

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