const bookContainer = document.querySelector(".book-container");
const overlayBg = document.querySelector(".overlay-bg");
const overlayForm = document.querySelector(".overlay-form");

const bookList = {
    books: [],
    addBook: function (title, author, read = false) {
        this.books.push(new Book(title, author, read));
    },
    clearBooks: function() {
        while (bookContainer.hasChildNodes()){
            bookContainer.removeChild(bookContainer.firstChild);
        }
    },
    renderBooks: function() {
    let i = 0;
    for (let book of this.books) {
        
        let bookDiv = document.createElement('div');
        bookDiv.classList.add("book");
        //data-index corresponds with books array index
        bookDiv.setAttribute('data-index', i++);

        let bookTitle = document.createElement('h2');
        bookTitle.classList.add("title");
        bookTitle.textContent = book.title;
        let bookAuthor = document.createElement('h3');
        bookAuthor.classList.add("author");
        bookAuthor.textContent = `by ${book.author}`;
        //Create read button
        let bookRead = document.createElement('input');
        bookRead.setAttribute('type', 'image');
        bookRead.classList.add('icon', 'read');
        //Add appropriate icon if book has been read
        bookRead.setAttribute(
            'src', 
            book.read ? './images/icons/check-bold-gn.svg' : './images/icons/book-open.svg');
        
        bookRead.addEventListener('click', (e)=> {
            this.books[e.target.parentNode.dataset.index].toggleRead();
            this.clearBooks();
            this.renderBooks();
        })
        //Create delete button
        let bookDelete = document.createElement('input');
        bookDelete.setAttribute('type', 'image');
        bookDelete.classList.add('icon', 'delete');
        bookDelete.setAttribute('src', "./images/icons/delete-outline.svg");
        bookDelete.addEventListener('click', this.handleBookDelete);

        

        bookDiv.append(bookTitle, bookAuthor, bookRead, bookDelete);
        bookContainer.appendChild(bookDiv);
        }
    },
    handleBookDelete:function(e) {
        const targetBook = e.target.parentNode;
        const targetBookIndex = targetBook.dataset.index;
        bookList.books.splice(targetBookIndex, 1);
        // Animate book to collapse when deleted
        targetBook.style.maxHeight=0;
        targetBook.style.padding=0;
        setTimeout(
            ()=>{
                bookList.clearBooks();
                bookList.renderBooks();
            }, 200);
    }
} 


function Book(title, author, read = false) {
    this.title = title;
    this.author = author;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read ? this.read = false : this.read = true;
}

bookList.addBook("The Lord of the Rings", "J. R. R. Tolkien", true);
bookList.addBook("A Tale of Two Cities", "Charles Dickens", true);
bookList.addBook("Harry Potter and the Philosopher's Stone", "J. K. Rowling", false);
bookList.addBook("And Then There Were None", "Agatha Christie", true);
bookList.addBook("The Da Vinci Code", "	Dan Brown", true);
bookList.books[3].toggleRead();
console.log(bookList);
bookList.books[0].toggleRead();
console.log(bookList);

bookList.renderBooks();

const overlay = document.querySelector(".overlay-bg");
const closeButton = document.querySelector(".close-button");     
const addContent = document.querySelector(".add-content");
addContent.addEventListener("click", ()=>{overlay.classList.toggle("hidden")});
closeButton.addEventListener("click", 
    ()=>{overlay.classList.toggle("hidden")});

function handleCreateEntry(event) {
    // Prevent form submission
    event.preventDefault();
    const newTitle = document.querySelector("#newTitle");
    const newAuthor = document.querySelector("#newAuthor");
    const newRead = document.querySelector("#newRead");
    bookList.addBook(newTitle.value, newAuthor.value, newRead.checked);
    bookList.clearBooks();
    bookList.renderBooks();
    //Reset values
    newTitle.value=null;
    newAuthor.value=null;
    newRead.checked=false;
    overlayBg.classList.toggle('hidden');
}

overlayForm.addEventListener('submit', handleCreateEntry);