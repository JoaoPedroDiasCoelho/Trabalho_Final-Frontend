document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('cart-items-container');
    const totalPriceSpan = document.getElementById('total-price');
    // Subtotal não está no HTML, mas mantemos a variável por segurança
    const subtotalPriceSpan = document.getElementById('subtotal-price'); 

    if (!container || !totalPriceSpan) return;

    function updateCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
    
    function renderCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        container.innerHTML = '';
        let totalPrice = 0;

        if (cart.length === 0) {
            container.innerHTML = '<p>Sua sacola está vazia.</p>';
            if (subtotalPriceSpan) subtotalPriceSpan.textContent = 'R$ 0,00';
            totalPriceSpan.textContent = 'R$ 0,00';
            return;
        }

        cart.forEach((item, index) => {
            // Conversão de preço (R$ 89.90 -> 89.90)
            const precoLimpo = parseFloat(item.preco.replace('R$', '').replace(',', '.').trim());
            const itemTotal = precoLimpo * item.quantity;
            totalPrice += itemTotal;

            // Estrutura HTML que o CSS do carrinho espera (com quantity-selector)
            const itemRow = document.createElement('div');
            itemRow.classList.add('cart-row');
            
            itemRow.innerHTML = `
                <div class="cart-item cart-column">
                    <img class="cart-item-image" src="${item.imagem}" width="100" height="100" alt="${item.titulo}">
                    <span class="cart-item-title">${item.titulo}</span>
                </div>
                
                <span class="cart-price cart-column">R$ ${precoLimpo.toFixed(2).replace('.', ',')}</span>
                
                <div class="cart-quantity cart-column">
                    <div class="quantity-selector">
                        <button class="quantity-btn" data-action="decrease" data-index="${index}">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn" data-action="increase" data-index="${index}">+</button>
                    </div>
                    
                    <button class="btn btn-danger remove-item-btn" type="button" data-index="${index}">REMOVER</button>
                </div>
            `;
            container.appendChild(itemRow);
        });

        const totalFormatado = 'R$ ' + totalPrice.toFixed(2).replace('.', ',');
        if (subtotalPriceSpan) subtotalPriceSpan.textContent = totalFormatado;
        totalPriceSpan.textContent = totalFormatado;
    }

    container.addEventListener('click', function(event) {
        const target = event.target.closest('button');
        if (!target) return;

        const index = parseInt(target.dataset.index);
        const action = target.dataset.action;
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Remoção
        if (target.classList.contains('remove-item-btn')) {
            cart.splice(index, 1);
            updateCart(cart);
        }

        // Aumento de Quantidade
        if (action === 'increase') {
            cart[index].quantity++;
            updateCart(cart);
        }

        // Diminuição de Quantidade
        if (action === 'decrease') {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                updateCart(cart);
            } else {
                // Remove o item se a quantidade for 1
                cart.splice(index, 1);
                updateCart(cart);
            }
        }
    });

    renderCart();
});