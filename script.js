const bookContainer = document.querySelector(".book-container");

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
        bookDiv.setAttribute('data-index', i++);

        let bookTitle = document.createElement('h2');
        bookTitle.classList.add("title");
        bookTitle.textContent = book.title;
        let bookAuthor = document.createElement('h3');
        bookAuthor.classList.add("author");
        bookAuthor.textContent = `by ${book.author}`;
        // Read and Delete buttons
        let bookRead = document.createElement('input');
        bookRead.setAttribute('type', 'image');
        bookRead.classList.add('icon', 'read');
        if (book.read) {
            bookRead.setAttribute('src', './images/icons/check-bold-gn.svg');
        }
        else {
            bookRead.setAttribute('src', './images/icons/book-open.svg');
        }
        // Icon hover behavior (somewhat confusing on desktop when you click and stay hovered)
        bookRead.addEventListener('mouseover', ()=> {
            if (book.read) {
                bookRead.setAttribute('src', './images/icons/book-open.svg')
            }
            else {
                bookRead.setAttribute('src', './images/icons/check-bold-gn.svg')
            }
        })
        bookRead.addEventListener('mouseout', ()=> {
            if (book.read) {
                bookRead.setAttribute('src', './images/icons/check-bold-gn.svg')
            }
            else {
                bookRead.setAttribute('src', './images/icons/book-open.svg')
            }
        });
        bookRead.addEventListener('click', (e)=> {
            this.books[e.target.parentNode.dataset.index].toggleRead();
            this.clearBooks();
            this.renderBooks();
        })
        
        let bookDelete = document.createElement('input');
        bookDelete.setAttribute('type', 'image');
        bookDelete.classList.add('icon', 'delete');
        bookDelete.setAttribute('src', "./images/icons/delete-outline.svg");
        bookDelete.addEventListener('mouseover', ()=> {bookDelete.setAttribute('src', './images/icons/delete-outline-rd.svg')})
        bookDelete.addEventListener('mouseout', ()=> {bookDelete.setAttribute('src', './images/icons/delete-outline.svg')})
        bookDelete.addEventListener('click', (e)=>{
            this.books.splice(e.target.parentNode.dataset.index, 1);
            this.clearBooks();
            this.renderBooks();
        })

        bookDiv.append(bookTitle, bookAuthor, bookRead, bookDelete);
        bookContainer.appendChild(bookDiv);
        }
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
