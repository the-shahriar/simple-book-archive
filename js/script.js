const searchBook = () => {
    const searchInput = document.getElementById('search-field');
    const searchText = searchInput.value;
    // clearing search field
    searchInput.value = '';

    const url = `https://openlibrary.org/search.json?q=${searchText}`;

    // fetch data from api
    fetch(url)
    .then(res => res.json())
    .then(data => displayBooks(data))
}

const displayBooks = data => {
    const resultContainer = document.getElementById('result-container');
    // getting total search hits
    const totalResult = data.numFound;
    if (totalResult == 0) {
        resultContainer.innerHTML = `<h3 class="text-white bg-danger py-3">Sorry! No, Result Found</h3>`;
        // getting field
        const container = document.getElementById('search-result');
        // cleaing previous data
        container.textContent = '';
    }
    else{
        // getting all books from object
        const books = data.docs;
        // total search result found
        const booksLength = books.length;
        resultContainer.innerHTML = `
            <div class="d-flex gap-3 justify-content-center">
                <h3 class="text-center mb-4">Total Hits: ${totalResult}</h3>
                <h3 class="text-center mb-4">Total Books Found: ${booksLength}</h3>
            </div> 
        `
        // getting field
        const container = document.getElementById('search-result');
        // cleaing previous data
        container.textContent = '';

        // getting single book with loop
        books.forEach(book => {
            const cover = book.cover_i;
            const url = `https://openlibrary.org/${book.key}`;
            const coverImageUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
            const authorUrl = `https://openlibrary.org/authors/${book.author_key}`;
            const noImageFound = `../image/not_found.png `;

            // alternate text if no author name not found
            const author = book.author_name;
            const noAuthor = `No Author Found`;

            // alternate text if no publisher not found
            const publisher = book.publisher;
            const noPublisher = `No Publisher Found`;

            // alternate text if first publish year not found
            const publishYear = book.first_publish_year;
            const noPublishYear = `No Year Found`;
            
            // console.log(result.title);
            const div = document.createElement('div');
            div.classList.add('col-lg-3');
            div.innerHTML = (
            `
            <div class="card h-auto">
                <img class="card-img-top" style="height: 400px!important;" src="${cover === undefined?noImageFound:coverImageUrl}">
                <div class="card-body">
                    <h5 class="book-title card-text">
                        <a class="link-dark text-decoration-none" href="${url}" target="_blank" rel="noopener">${book.title}</a>
                    </h5>
                    <h6 class="book-author card-text">Author: <a class="text-success" target="_blank" href="${authorUrl}">${author === undefined?noAuthor:author}</a></h6>
                    <h6 class="publisher card-text">Publisher: ${publisher === undefined?noPublisher:publisher}</h6>
                    <h6 class="publish-date card-text">First published in: ${publishYear === undefined?noPublishYear:publishYear}</h6>
                </div>
            </div>
            `
            );
            container.appendChild(div);
        })

    }

}