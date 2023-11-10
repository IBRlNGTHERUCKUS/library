const bookContainer = document.querySelector(".book-container");

const bookList = {
    books: [],
    addBook: function (title, author, read = false) {
        this.books.push(new Book(title, author, read));
    }
    renderBooks: function() {
    for (let book of this.books) {
        let bookDiv = document.createElement(div);
        bookDiv.classList.add("book");
        let bookTitle = document.create
        }
    }
}


function Book(title, author, read = false) {
    this.title = title;
    this.author = author;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read  ? this.read = false : this.read = true;
}

bookList.addBook("balls", "ass", true);
console.log(bookList);
bookList.books[0].toggleRead();
console.log(bookList);