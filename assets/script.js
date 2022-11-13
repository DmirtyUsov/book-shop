document.documentElement.lang = 'en';
document.head.innerHTML = `
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../../assets/style.css">
    <title>Book Shop</title>`;

fetch('../../assets/books.json') //path to the file with json data
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
    });