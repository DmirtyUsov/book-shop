let books = [];
fetch('../../assets/books.json') // path to the file with json data
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        books = data;
    });


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
    for (item of books) {
        let book = document.createElement('div');
        book.classList.add('book')
        item.isbn10 = item.imageLink.split('/').at(-1).split('.')[0];
        book.id =  item.isbn10;

        let title = document.createElement('h2');
        title.classList.add('book-title')
        title.textContent = item.title;
        book.append(title);

        let author = document.createElement('h4');
        author.classList.add('book-author');
        author.textContent = item.author;
        book.append(author);

        let price = document.createElement('p');
        price.classList.add('book-price');
        price.textContent = item.price;
        book.append(price);

        let cover = document.createElement('img');
        cover.classList.add('book-cover');
        cover.src = item.imageLink;
        cover.alt = `Cover for ${item.title}`;
        book.append(cover);

        divMy.append(book)
    }
    mainMy.append(divMy);

    divMy = document.createElement('div')
    divMy.classList.add('cart');
    mainMy.append(divMy);
    divMy.innerHTML = "<h2>My Order<h2>";

    fragment.append(mainMy);

    let footerMy = document.createElement('footer')
    fragment.append(footerMy);

    document.body.append(fragment);
}, 900);