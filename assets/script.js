let books = [];
let draggedNow = null;

fetch('../../assets/books.json') // path to the file with json data
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        books = data;
    });
// functions for EventListners

const togglePopup = (idx) => {
    console.log('press', idx);
    document.getElementById(`popup-${idx}`).classList.toggle("active"); 
}

const addBookToOrder = (idx) => {
    console.log('add', idx);

    let fragment = new DocumentFragment();
    let book = document.createElement('div');
    book.classList.add('book');
    let title = document.createElement('h5');
    title.classList.add('book-title')
    title.textContent = books[idx].title;

    book.append(title);
    fragment.append(book);
    let order = document.getElementById('cart');
    order.insertAdjacentElement('beforeend', book);
    draggedNow = null;
}

const startDrag = (idx) => {
    console.log('Drag', idx);
    draggedNow = idx;
}

document.documentElement.lang = 'en';

document.head.innerHTML = `
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../../assets/style.css">
    <title>Book Shop</title>`;

setTimeout(() => { // wait for data from fetch
    let fragment = new DocumentFragment();

    let headerMy = document.createElement('header')
    headerMy.insertAdjacentHTML('afterbegin', '<h1>Book Shop</h1>')
    fragment.append(headerMy);

    let mainMy = document.createElement('main');
    let divMy = document.createElement('div');
    divMy.classList.add('catalog');
    divMy.innerHTML = "<h2>Catalog<h2>";


    console.log(books, Array.isArray(books), books.length, books[0]);
    for (const [idx,item] of books.entries()) {
        let book = document.createElement('div');
        book.classList.add('book')
        item.isbn10 = item.imageLink.split('/').at(-1).split('.')[0];
        book.id =  idx;

        let title = document.createElement('h2');
        title.classList.add('book-title')
        title.textContent = item.title;

        let author = document.createElement('h4');
        author.classList.add('book-author');
        author.textContent = item.author;

        let price = document.createElement('p');
        price.classList.add('book-price');
        price.textContent = `Price: \$${item.price}`;

        let cover = document.createElement('img');
        cover.classList.add('book-cover');
        cover.src = item.imageLink;
        cover.alt = `Cover for ${item.title}`;
        cover.addEventListener("dragstart", function(){startDrag(idx)});

        let popup = document.createElement('div');
        popup.classList.add('popup');
        popup.id = `popup-${idx}`;
        let popupOverlay = document.createElement('div');
        popupOverlay.classList.add('overlay');
        let popupCloseButton = document.createElement('div');
        popupCloseButton.classList.add('close-button');
        popupCloseButton.addEventListener('click', function(){togglePopup(idx)});
        popupCloseButton.textContent = 'X';
        let popupContent = document.createElement('div');
        popupContent.append(popupCloseButton);
        popupContent.classList.add('content');
        let popupContentTitle = document.createElement('h2')
        popupContentTitle.textContent = item.title
        popupContent.append(popupContentTitle)
        let popupContentText = document.createElement('p');
        popupContentText.textContent = item.description;
        popupContent.append(popupContentText)

        popup.append(popupOverlay);
        popup.append(popupContent)


        let more = document.createElement('button');
        more.classList.add('book-more');
        more.textContent = 'Show more';
        more.addEventListener('click', function(){togglePopup(idx)});

        let add = document.createElement('button');
        add.classList.add('book-add');
        add.textContent = 'Add to Order';
        add.addEventListener('click', function(){addBookToOrder(idx)});

        book.append(popup);
        book.append(title);
        book.append(author);
        book.append(price);
        book.append(cover);
        book.append(more);
        book.append(add);

        divMy.append(book)
    }
    mainMy.append(divMy);

    divMy = document.createElement('div')
    divMy.classList.add('cart');
    divMy.id = 'cart';
    divMy.addEventListener("dragover", (event) => {
        // prevent default to allow drop
        event.preventDefault();
        console.log('dragover');
      });
    divMy.addEventListener("drop", function(){addBookToOrder(draggedNow)})
    divMy.innerHTML = "<h2>My Order<h2>";
    mainMy.append(divMy);

    fragment.append(mainMy);

    let footerMy = document.createElement('footer')
    fragment.append(footerMy);

    document.body.append(fragment);
}, 900);