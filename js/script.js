const searchBook = () => {
    const searchInput = document.getElementById('search-field');
    const searchText = searchInput.value;

    // clearing search field
    searchInput.value = '';

    url = `http://openlibrary.org/search.json?q=${searchText}`;

    // fetch data from api
    fetch(url)
    .then(res => res.json())
    .then(data => displayBooks(data))
}

const displayBooks = data => {
    const resultContainer = document.getElementById('result-container');
    // getting total search result
    const totalResult = data.numFound;
    resultContainer.innerHTML = `
        <h3 class="text-center mb-4">Total Book Found: ${totalResult}</h3>
    `
    // getting all books from object
    const books = data.docs;
    // getting field
    const container = document.getElementById('search-result');
    container.textContent = '';
    books.forEach(book => {
        const url = `https://openlibrary.org/${book.key}`;
        const thumbnail = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        const authorUrl = `https://openlibrary.org/authors/${book.author_key}`
        // console.log(result.title);
        const div = document.createElement('div');
        div.classList.add('col-lg-4');
        div.innerHTML = (
        `
        <div class="book">
        <img src="${thumbnail}" class="img-fluid" alt="...">
          <h4 class="book-title">
            <a href="${url}" target="_blank" rel="noopener">${book.title}</a>
          </h4>
          <h5 class="book-author"><a target="_blank" href="${authorUrl}">Author: ${book?.author_name}</a></h5>
          <h6 class="publisher">Publisher: ${book?.publisher}</h6>
          <p class="publish-date">First Publish On: ${book?.first_publish_year}</p>
        </div>
        `
        );
        container.appendChild(div);
    })
}