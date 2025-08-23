const myLibrary = [];

function Book(name, author, pages, read){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(book){
    myLibrary.push(book);
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
  };
 
addBookToLibrary(new Book('The Hobbit', 'J.R.R. Tolkien', 310, true));
addBookToLibrary(new Book('1984', 'George Orwell', 328, false));
addBookToLibrary(new Book('Clean Code', 'Robert C. Martin', 464, false));
addBookToLibrary(new Book('The Pragmatic Programmer', 'Andrew Hunt', 352, true));

function displayBooks(){
    const table = document.getElementById("table");

    // ✅ clear all rows except the header
    table.querySelectorAll("tr:not(:first-child)").forEach(tr => tr.remove());

    const fragment = document.createDocumentFragment();

    myLibrary.forEach(book => {
        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        td1.textContent = book.name;
        tr.appendChild(td1);

        const td2 = document.createElement("td");
        td2.textContent = book.author;
        tr.appendChild(td2);

        const td3 = document.createElement("td");
        td3.textContent = book.pages;
        tr.appendChild(td3);

        const td4 = document.createElement("td");
        td4.textContent = book.read ? "Yes" : "No";
        tr.appendChild(td4);

        const td5 = document.createElement("td");
        const td5removeBtn = document.createElement("button")
        td5removeBtn.setAttribute("class","secondary-btn")
        td5removeBtn.innerHTML = "Remove"
        td5removeBtn.setAttribute("id", book.id)
        td5removeBtn.addEventListener("click", () => removeBook(book.id))
        td5.appendChild(td5removeBtn)
        tr.appendChild(td5);

        const td6 = document.createElement("td");
        const td6toggleBtn = document.createElement("button")
        td6toggleBtn.setAttribute("class","secondary-btn fixed-btn") 
        td6toggleBtn.textContent = book.read? "Mark Unread" : "Mark Read"
        td6toggleBtn.addEventListener("click", ()=>{
            book.toggleRead();
            displayBooks();
        })
        td6.appendChild(td6toggleBtn)
        tr.appendChild(td6)

        

        fragment.appendChild(tr);
    });

    table.appendChild(fragment);
}


displayBooks();

 // ✅ make this a normal function, outside of displayBooks
 function removeBook(id) {
    // reassign myLibrary to exclude the book
    const index = myLibrary.findIndex(book => book.id === id);
    if (index !== -1) {
    myLibrary.splice(index, 1); // remove that book
    }

    displayBooks(); // refresh the UI
}


const btnNewBook = document.getElementById("btnNewBook");
const container = document.querySelector(".container");

// Open modal on button click
btnNewBook.addEventListener("click", () => {
  container.classList.add("show");
});

// Optional: close modal when clicking outside the card
container.addEventListener("click", (e) => {
  if (e.target === container) {
    container.classList.remove("show");
  }
});
// Optional: close modal when clicking cancel button
  const closeBookModal = document.getElementById("closeBookModal")
  closeBookModal.addEventListener("click",cancelFormHandler)
  function cancelFormHandler(){
    container.classList.remove("show");
    console.log("cancel clicked");
  }

const bookForm = document.getElementById("bookForm")
bookForm.addEventListener("submit",addBookHandler)

function addBookHandler(e) {
    e.preventDefault();
  
    const bookName = document.getElementById("bookName").value;
    const bookAuthor = document.getElementById("bookAuthor").value;    
    const bookPages = document.getElementById("bookPages").value;    
    const bookRead = document.getElementById("bookRead").checked;
  
    addBookToLibrary(new Book(bookName, bookAuthor, bookPages, bookRead));
  
    displayBooks();
    bookForm.reset();
    container.classList.remove("show"); // ✅ optional: close modal after adding
  }
  
  