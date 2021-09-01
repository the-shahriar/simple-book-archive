const searchBook = () => {
    const searchInput = document.getElementById('search-field');
    const searchText = searchInput.value;

    // clearing search field
    searchInput.value = '';

    url = `http://openlibrary.org/search.json?q=${searchText}`;

    // fetch data from api
    fetch(url)
    .then(res => res.json())
    .then(results => console.log(results.docs))
}
