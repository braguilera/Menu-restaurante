document.addEventListener('DOMContentLoaded', () => {
    const cartCountElement = document.getElementById('cart-count');
    let cartCount = parseInt(cartCountElement.textContent, 10);
    let cartItems = [];

    const cartModal = document.getElementById('cart-modal');
    const cartIcon = document.querySelector('.cart');
    const closeModal = document.querySelector('.close');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // Abrir modal al hacer clic en el ícono del carrito
    cartIcon.addEventListener('click', () => {
        updateCartModal();
        cartModal.style.display = 'block';
    });

    // Cerrar modal al hacer clic en la 'X'
    closeModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Cerrar modal al hacer clic fuera del contenido del modal
    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    function addToCart(itemElement) {
        // Obtener detalles del producto
        const itemName = itemElement.querySelector('p').textContent;
        const itemPrice = parseFloat(itemElement.querySelector('p:nth-child(2)').textContent.replace('$', ''));

        // Agregar o actualizar el producto en el carrito
        const existingItem = cartItems.find(item => item.name === itemName);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
        }

        // Aumentar el número de elementos en el carrito
        cartCount += 1;
        cartCountElement.textContent = cartCount;

        // Animación del carrito
        animateAddToCart(itemElement.querySelector('button'));
    }

    function animateAddToCart(button) {
        const buttonRect = button.getBoundingClientRect();
        const cartIconRect = cartIcon.getBoundingClientRect();

        const clone = button.cloneNode(true);
        document.body.appendChild(clone);

        clone.style.position = 'absolute';
        clone.style.left = `${buttonRect.left}px`;
        clone.style.top = `${buttonRect.top}px`;
        clone.style.opacity = '0.8';
        clone.style.transition = 'all 0.8s ease';

        requestAnimationFrame(() => {
            clone.style.left = `${cartIconRect.left + window.scrollX}px`;
            clone.style.top = `${cartIconRect.top + window.scrollY}px`;
            clone.style.transform = 'scale(0.1)';
            clone.style.opacity = '0';
        });

        clone.addEventListener('transitionend', () => {
            clone.remove();
        });
    }

    function updateCartModal() {
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cartItems.forEach(item => {
            totalPrice += item.price * item.quantity;

            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');

            cartItemElement.innerHTML = `
                <p>${item.name}</p>
                <div class="quantity-controls">
                    <button class="decrease">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase">+</button>
                </div>
                <p>$${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove">X</button>
            `;

            cartItemsContainer.appendChild(cartItemElement);

            // Funcionalidad para aumentar cantidad
            cartItemElement.querySelector('.increase').addEventListener('click', () => {
                item.quantity += 1;
                cartCount += 1;
                cartCountElement.textContent = cartCount;
                updateCartModal();
            });

            // Funcionalidad para disminuir cantidad
            cartItemElement.querySelector('.decrease').addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    cartCount -= 1;
                } else {
                    cartItems = cartItems.filter(cartItem => cartItem.name !== item.name);
                    cartCount -= item.quantity;
                }
                cartCountElement.textContent = cartCount;
                updateCartModal();
            });

            // Funcionalidad para eliminar artículo
            cartItemElement.querySelector('.remove').addEventListener('click', () => {
                cartItems = cartItems.filter(cartItem => cartItem.name !== item.name);
                cartCount -= item.quantity;
                cartCountElement.textContent = cartCount;
                updateCartModal();
            });
        });

        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    }

    const menuItems = [
        { 
            name: 'Pizza Meat Lovers', 
            price: 630, 
            category: 'pizzas', 
            image: './imgs/Pizza_meat_lover.jpg',
            description: 'Mozzarella, pepperoni, salchicha italiana, jamón y bacon.',
            isVegan: false, 
            isVegetarian: false, 
            isGlutenFree: false
        },
        { 
            name: 'Chicago Stuffed Pizza', 
            price: 360, 
            category: 'pizzas', 
            image: './imgs/pizza_chicago.jpg',
            description: 'Mozzarella, pepperoni, salchicha italiana, champiñones, pimientos y cebolla.',
            isVegan: false, 
            isVegetarian: false, 
            isGlutenFree: false
        },
        { 
            name: 'Pasta Carbonara', 
            price: 450, 
            category: 'pastas', 
            image: './imgs/pasta_carbonara.jpg',
            description: 'Espaguetis, panceta, huevo, queso parmesano y pimienta.',
            isVegan: false, 
            isVegetarian: false, 
            isGlutenFree: false
        },
        { 
            name: 'Pasta Alfredo', 
            price: 500, 
            category: 'pastas', 
            image: './imgs/pasta_alfredo.jpg',
            description: 'Fettuccine, mantequilla, crema y queso parmesano.',
            isVegan: false, 
            isVegetarian: false, 
            isGlutenFree: false
        },
        { 
            name: 'Hamburguesa Clásica', 
            price: 300, 
            category: 'hamburguesas', 
            image: './imgs/hamburguesa_clasica.jpg',
            description: 'Carne de res, queso cheddar, lechuga, tomate y cebolla.',
            isVegan: false, 
            isVegetarian: false, 
            isGlutenFree: false
        },
        { 
            name: 'Hamburguesa BBQ', 
            price: 350, 
            category: 'hamburguesas', 
            image: './imgs/hamburguesa_BBQ.jpg',
            description: 'Carne de res, queso cheddar, cebolla crujiente y salsa BBQ.',
            isVegan: false, 
            isVegetarian: false, 
            isGlutenFree: false
        },
        { 
            name: 'Sopa de Pollo', 
            price: 200, 
            category: 'sopas', 
            image: './imgs/sopa_de_pollo.jpg',
            description: 'Caldo de pollo con verduras, arroz y trozos de pollo.',
            isVegan: false, 
            isVegetarian: false, 
            isGlutenFree: true
        },
        { 
            name: 'Sopa de Tomate', 
            price: 180, 
            category: 'sopas', 
            image: './imgs/sopa_de_tomate.jpg',
            description: 'Tomates frescos, crema, ajo y albahaca.',
            isVegan: true, 
            isVegetarian: true, 
            isGlutenFree: true
        },
        { 
            name: 'Ensalada César', 
            price: 250, 
            category: 'ensaladas', 
            image: './imgs/ensalada_cesar.jpg',
            description: 'Lechuga romana, crutones, queso parmesano y aderezo César.',
            isVegan: false, 
            isVegetarian: true, 
            isGlutenFree: false
        },
        { 
            name: 'Ensalada Griega', 
            price: 270, 
            category: 'ensaladas', 
            image: './imgs/ensalada_griega.jpg',
            description: 'Tomate, pepino, cebolla roja, aceitunas, queso feta y orégano.',
            isVegan: false, 
            isVegetarian: true, 
            isGlutenFree: true
        },
        { 
            name: 'Cheesecake', 
            price: 220, 
            category: 'postres', 
            image: './imgs/cheesecake.jpg',
            description: 'Base de galleta, queso crema y cobertura de frutas.',
            isVegan: false, 
            isVegetarian: true, 
            isGlutenFree: false
        },
        { 
            name: 'Brownie con Helado', 
            price: 240, 
            category: 'postres', 
            image: './imgs/brownie_con_helado.jpg',
            description: 'Brownie de chocolate con helado de vainilla.',
            isVegan: false, 
            isVegetarian: true, 
            isGlutenFree: false
        }
    ];

    const menuContainer = document.getElementById('menu-container');
    const searchInput = document.querySelector('.search-input');
    const categoryButtons = document.querySelectorAll('.menu-categories button');

    function renderMenuItems(items) {
        menuContainer.innerHTML = ''; // Limpiar el contenedor antes de renderizar

        items.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.classList.add('menu-item');
            menuItem.setAttribute('data-category', item.category);

            // Condiciones dietéticas
            let dietaryIcons = '';
            if (item.isVegan) dietaryIcons += '<img src="./imgs/vegan.svg" alt="Vegano" class="item-diet">';
            if (item.isGlutenFree) dietaryIcons += '<img src="./imgs/wheat.svg" alt="Apto para celíacos" class="item-diet">';

            menuItem.innerHTML = `
                <img loading="lazy" src="${item.image}" alt="${item.name}">
                <div class="item-info">
                    <div class="item-title">
                        <p>${item.name} </p>
                        <div>
                            ${dietaryIcons}
                        </div>

                    </div>
                    ${item.description}
                    <p>$${item.price.toFixed(2)}</p>
                    <button>+</button>
                </div>
            `;

            // Asocia el evento de clic con la función addToCart
            menuItem.querySelector('button').addEventListener('click', () => {
                addToCart(menuItem);
            });

            menuContainer.appendChild(menuItem);
        });
    }

    function filterMenuItemsByCategory(category) {
        const filteredItems = category === 'all' ? menuItems : menuItems.filter(item => item.category === category);
        renderMenuItems(filteredItems);
    }

    function filterMenuItemsByName(query) {
        const filteredItems = menuItems.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
        renderMenuItems(filteredItems);
    }

    // Event listeners
    categoryButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const category = event.target.getAttribute('data-category');
            filterMenuItemsByCategory(category);
        });
    });

    searchInput.addEventListener('input', (event) => {
        const query = event.target.value;
        filterMenuItemsByName(query);
    });

    // Render all items by default
    renderMenuItems(menuItems);
});
