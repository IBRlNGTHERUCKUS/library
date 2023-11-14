const bookContainer = document.querySelector(".book-container");
const overlayBg = document.querySelector(".overlay-bg");
const overlayForm = document.querySelector(".overlay-form");

const bookList = {
    books: [],
    addBook: function (title, author, read = false, imageURL) {
        this.books.push(new Book(title, author, read, imageURL));
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
        
        //Add a picture of the book cover if url is      provided
        if(book.imageURL) { 
        let bookImage = document.createElement("img");
        bookImage.setAttribute("src", book.imageURL);
        bookImage.classList.add("book-image");
        bookDiv.appendChild(bookImage);
        }

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

function Book(title, author, read = false, imageURL) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.imageURL = imageURL;
}

Book.prototype.toggleRead = function() {
    this.read ? this.read = false : this.read = true;
}

//Overlay for creating new entries
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

// sample of object to be retrieved from server
let jsonObject = {
    userName: "joseph",
    books: [
    {
        title: "The Lord of the Rings",
        author: "J. R. R. Tolkien",
        read: true,
        imageURL: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1566425108l/33.jpg",
    },
    {
        title: "A Tale of Two Cities",
        author: "Charles Dickens",
        read: false,
        imageURL: "https://prodimage.images-bn.com/pimages/9781411433236_p0_v2_s1200x630.jpg",
    },
    {
        title: "Harry Potter and the Philosopher's Stone",
        author: "J. K. Rowling",
        read: false,
        imageURL: "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg",
    },  
    {
        title: "And Then There Were None",
        author: "Agatha Christie",
        read: true,
        imageURL: "https://m.media-amazon.com/images/I/81B9LhCS2AL._AC_UF1000,1000_QL80_.jpg",
    },
    {
        title: "The Da Vinci Code",
        author: "Dan Brown",
        read: true,
        imageURL: "https://m.media-amazon.com/images/I/91Q5dCjc2KL._AC_UF1000,1000_QL80_.jpg",
    },   
    ]
}

for (let book of jsonObject.books) {
    bookList.addBook(book.title, book.author, book.read, book.imageURL)
}
console.log(bookList.books);
bookList.renderBooks();
