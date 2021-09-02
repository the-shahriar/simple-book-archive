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
    const mainContainer = document.getElementById('main-container');
    // getting total search result
    const totalResult = data.numFound;
    mainContainer.innerHTML = `
        <h3 class="text-center">Total Book Found: ${totalResult}</h3>
    `
    // Clearing previous result
    mainContainer.textContent = '';
    // getting all books from object
    const books = data.docs;
    // getting field
    const container = document.getElementById('search-result');
    books.forEach(book => {
        const url = `https://openlibrary.org/${book.key}`;
        // console.log(result.title);
        const div = document.createElement('div');
        div.classList.add('col-lg-4');
        div.innerHTML = (
        `
        <div class="book">
          <h4 class="book-title">
            <a href="${url}" target="_blank" rel="noopener">${book.title}</a>
          </h4>
          <h5 class="book-author">Author name: ${book.author_name}</h5>
          <h5 class="publisher">Publisher name: ${book.publisher}</h5>
          <p class="publish-date">First publish on: ${book?.first_publish_year}</p>
        </div>
        `
        );
        container.appendChild(div);
     
    })
}