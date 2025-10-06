if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}
else{
    ready()
}

function ready()
{
    var removeCartItemButton = document.getElementsByClassName('btn-danger');

    for(var i = 0; i<removeCartItemButton.length;i++)
    {
        var button = removeCartItemButton[i];
        button.addEventListener('click',removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for(var i = 0; i<quantityInputs.length;i++)
    {
        var input = quantityInputs[i]
        input.addEventListener('change',quantityChanged)
    }
}

function removeCartItem(event)
{
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event)
{
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0)
    {
        input.value = 1
    }

    updateCartTotal()
}

function updateCartTotal()
{
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');

    var total = 0

    for(var i = 0; i<cartRows.length;i++)
    {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement= cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('R$',''));
        var quantity = quantityElement.value;
        total +=  (price*quantity);    
    }
    total = Math.round(total*100)/100
    document.getElementsByClassName('cart-total-price')[0].innerText='R$'+total;
}

function addItemToCart(title, author, price, imageSrc)
{
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]

    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="2">
            <button class="btn btn-danger" type="button">REMOVER</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
}