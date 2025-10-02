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