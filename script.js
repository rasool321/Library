
const toggleBtn = document.getElementById("toggle-btn");
const body = document.body;

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    toggleBtn.classList.toggle("active");
  });
}

class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

const booksArray = [];

function addBook(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  booksArray.push(newBook);
  displayBooksAsCards();
}

function removeBook(bookId) {
  const index = booksArray.findIndex((book) => book.id === bookId);
  if (index > -1) {
    booksArray.pop(index, 1);
    displayBooksAsCards();
  }
}

function displayBooksAsCards() {
  const container = document.querySelector(".books-container");
  container.innerHTML = "";

  booksArray.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card");

    const titleElement = document.createElement("h3");
    titleElement.textContent = book.title;
    card.appendChild(titleElement);

    const authorElement = document.createElement("p");
    authorElement.textContent = `Author: ${book.author}`;
    card.appendChild(authorElement);

    const pagesElement = document.createElement("p");
    pagesElement.textContent = `Pages: ${book.pages}`;
    card.appendChild(pagesElement);

    const readElement = document.createElement("p");
    readElement.textContent = `Read: ${book.read ? "Yes" : "No"}`;
    card.appendChild(readElement);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn");
    removeButton.setAttribute("aria-label", `Remove book: ${book.title}`);
    removeButton.onclick = () => removeBook(book.id);
    card.appendChild(removeButton);

    container.appendChild(card);
  });
}


function createAddBookForm() {

  if (document.querySelector(".form-container")) return;

  const formContainer = document.createElement("div");
  formContainer.classList.add("form-container");

  const form = document.createElement("form");

  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Title:";
  titleLabel.htmlFor = "title-input";
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "title-input";
  titleInput.required = true;
  form.appendChild(titleLabel);
  form.appendChild(titleInput);

  const authorLabel = document.createElement("label");
  authorLabel.textContent = "Author:";
  authorLabel.htmlFor = "author-input";
  const authorInput = document.createElement("input");
  authorInput.type = "text";
  authorInput.id = "author-input";
  authorInput.required = true;
  form.appendChild(authorLabel);
  form.appendChild(authorInput);

  const pagesLabel = document.createElement("label");
  pagesLabel.textContent = "Pages:";
  pagesLabel.htmlFor = "pages-input";
  const pagesInput = document.createElement("input");
  pagesInput.type = "number";
  pagesInput.id = "pages-input";
  pagesInput.required = true;
  pagesInput.min = 1;
  form.appendChild(pagesLabel);
  form.appendChild(pagesInput);

  const readLabel = document.createElement("label");
  readLabel.textContent = "Did you read this book?";
  readLabel.htmlFor = "read-input";
  const readInput = document.createElement("input");
  readInput.type = "checkbox";
  readInput.id = "read-input";
  readInput.style.marginLeft = "10px";
  form.appendChild(readLabel);
  form.appendChild(readInput);

  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.type = "submit";
  form.appendChild(submitButton);

  form.onsubmit = (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const pages = parseInt(pagesInput.value);
    const read = readInput.checked;

    if (title === "" || author === "" || isNaN(pages) || pages < 1) {
      alert("Please fill out all fields correctly.");
      return;
    }

    addBook(title, author, pages, read);
    form.reset();
    formContainer.remove();
  };

  formContainer.appendChild(form);
  const addBtn = document.getElementById("add-book-btn");
  addBtn.insertAdjacentElement("afterend", formContainer);
  titleInput.focus();
}

const addButton = document.getElementById("add-book-btn");
addButton.addEventListener("click", createAddBookForm);

displayBooksAsCards();