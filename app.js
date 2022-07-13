let myLibrary = [];
let numOfBooks = 0;

class Book {
  constructor(title = "unknown", author = "unknown", pages = "0", read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    numOfBooks++;
    bookNum.textContent = numOfBooks;
  }
}

const menuElements = document.querySelector(".menu-elements1");
const menuNewBook = document.querySelector(".add-newBook");
const books = document.querySelector(".bookNum");
const addBookForm = document.querySelector("form");
const cards = document.querySelector(".cards");
const bookNum = document.querySelector(".bookNum");

const getBook = () => {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#number").value;
  const read = document.querySelector("#check").checked;
  return new Book(title, author, pages, read);
}

const addBook = () => {
  const newBook = getBook();
  myLibrary.push(newBook);
  updateBooksGrid();
  save();
  addBookForm.reset();
}

addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addBook();
})

const updateBooksGrid = () => {
  resetBooksGrid();
  for (let book of myLibrary) {
    createCard(book);
  }
}

const resetBooksGrid = () =>{
  cards.innerHTML = "";
}

const createCard = (book) => {
  const card = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const btnDiv = document.createElement("div");
  const readBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  card.classList.add("card");
  btnDiv.classList.add("btns");
  removeBtn.classList.add("btnRead");
  book.read ? readBtn.classList.add("btnRead") : readBtn.classList.add("btnNotRead");

  title.textContent = `"${book.title}"`;
  author.textContent =   book.author;
  pages.textContent = `${book.pages} pages`;
  readBtn.textContent = book.read ? "Read" : "Not read";
  removeBtn.textContent = "Remove";

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  btnDiv.appendChild(readBtn);
  btnDiv.appendChild(removeBtn);
  card.appendChild(btnDiv);
  cards.appendChild(card);

  readBtn.addEventListener("click", () =>{
    if(readBtn.textContent === "Read"){
      readBtn.classList.remove("btnRead");
      readBtn.classList.add("btnNotRead");
      readBtn.textContent = "Not read";
      book.read = false;
      save();
    }
    else{
      readBtn.classList.remove("btnNotRead");
      readBtn.classList.add("btnRead");
      readBtn.textContent = "Read";
      book.read = true;
      save();
    }
  });

  removeBtn.addEventListener("click", ()=> {
    removeCard(card);
    removeCardFromStorage(book);
    //removeCardFromStorage(book);
  });
}

const removeCard = (card) => {
  cards.removeChild(card);
  numOfBooks--;
  bookNum.textContent = numOfBooks;
}


const removeCardFromStorage = (cardObject) => {

  myLibrary.forEach((book, index) => {
    if(book === cardObject){
        myLibrary.splice(index, 1);
    }
  });
  save();
}

const removeAll = () => {
  while(cards.firstElementChild !== null){
    cards.firstElementChild.remove();
  }
  myLibrary = [];
  save();
  numOfBooks = 0;
  bookNum.textContent = numOfBooks;
}

document.querySelector(".removeAll").addEventListener("click", () => removeAll());
document.querySelector(".addBook").addEventListener("click", () => {
  menuElements.style.display = "none";
  menuNewBook.style.display = "flex";
})
document.querySelector("#back").addEventListener("click", () => {
  menuElements.style.display = "flex";
  menuNewBook.style.display = "none";
})

document.addEventListener("DOMContentLoaded", () => {
  load();
  updateBooksGrid();
});

const  save = () => {
  localStorage.setItem('library', JSON.stringify(myLibrary));
}

const load = () => {
  const books = JSON.parse(localStorage.getItem('library'));

  if (books) {
    myLibrary = books.map((book) => JSONToBook(book));
  } else {
    myLibrary = [];
  }
}

const JSONToBook = (book) => {
  return new Book(book.title, book.author, book.pages, book.read);
}
