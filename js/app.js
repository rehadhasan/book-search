const searchBook = () => {
    const inputField = document.getElementById('input-value');
    const searchText = inputField.value;


    document.getElementById("book-items").innerHTML = "";
    document.getElementById("error-message").innerHTML = "";
    document.getElementById('count-number').innerHTML = "";


    if (searchText === '') {
        document.getElementById("error-message").innerHTML =
            `<p class='text-center text-white p-3 bg-danger'><b>Please enter a book name...</b></p>`
    }
    else {
        const url = `https://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayBook(data))
    }

    inputField.value = '';

}
const displayBook = books => {

    /* for error message */
    const errorMessage = document.getElementById('error-message')
    if (books.docs.length === 0) {
        errorMessage.innerHTML = `
        <p class='text-center text-white p-3 bg-danger'><b>Sorry,Result not found</b></p>`
    }

    /*  for count number  */
    const bookCount = document.getElementById('count-number');
    bookCount.innerHTML = `
    <h3 class="my-4 text-center" >Result Found ${books.docs.length} books from ${books.numFound} books</h3>
    `

    const bookItems = document.getElementById('book-items')
    books.docs.forEach(book => {

        const div = document.createElement('div')
        div.classList.add('book')
        div.innerHTML = `
         <div class="m-3">
          <div class="card h-100 bg-white" >
           <div class="card-footer text-center" >
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top mb-2 " style="height:300px"   alt="...">
             <div class="mt-3" style="height:300px">
              <h4 class="card-title ">Book Name:${book.title}</h4>
              <h4 class="card-title fw-bold mt-2">Writer:${book.author_name}</h4>
              <h6 class="card-title">First published:${book.first_publish_year}</h6>              
              <p class="card-title">publisher:${book.publisher}</p>
             </div>
            </div>
          </div>
   
         </div>`;

        bookItems.appendChild(div)

    });

}