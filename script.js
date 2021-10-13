window.onload = () => {
  // Variables
  const bookContainer = document.querySelector(".book-container");
  const button = document.querySelector("button");
  const title = document.querySelector("#title"),
    author = document.querySelector("#author"),
    pages = document.querySelector("#pages"),
    read = document.querySelector("#read");
  (function () {})();

  const myLibrary = [];

  class Book {
    constructor(title, author, pages, read) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
    }
    info() {
      let output = `The ${this.title} by ${this.author}, `;
      output += this.read == true ? "has been read" : "not read yet";
      console.log(output);
    }
  }
  function addBookToLibrary(book) {
    myLibrary.push(book);
  }

  function resetBookIds() {
    let regex = /[a-z]+-[a-z]+-/gi;
    const bookElements = document.querySelectorAll(".book");
    // EEvery book in the list is re-organized by index
    bookElements.forEach((book, index) => {
      book.id = `book-${index + 1}`;
    });

    // Every read text in the list is re-organized by index
    const readTextElements = document.querySelectorAll(".read-text");

    // Extract the id without the number and re-format it in the new order
    readTextElements.forEach((text, index) => {
      let newId = text.id.match(regex);
      text.id = `${newId}${index + 1}`;
    });
  }
  function deleteBook(book) {
    // Matches the number from books id
    let regex = /[0-9]+/g;
    let bookNumber = book.id.match(regex);

    /*Remove the book number that was matched*/ bookContainer.removeChild(
      bookContainer.childNodes[bookNumber - 1]
    );

    // Delete the book from storage

    myLibrary.splice(bookNumber - 1, bookNumber);

    resetBookIds();
  }

  // Updates the read status in library, book element and updates display based on current read status
  function updateReadStatus(book, iconBg, icon) {
    let regex = /[0-9]+/g;
    let bookIndex = book.id.match(regex) - 1;
    const readText = document.querySelector(`#read-text-${bookIndex + 1}`);
    console.log(readText);

    // If it contains icon read, it will be changed to not read
    if (icon.classList.contains("icon-read")) {
      icon.classList.remove("icon-read");
      book.classList.remove("book-read");
      readText.innerText = "Not read";
    } else {
      icon.classList.add("icon-read");
      book.classList.add("book-read");
      readText.innerText = "Read";
    }
  }

  // Draws books to screen by creating button elements and headings from user input
  function renderBooks() {
    // Set current book to last index
    book = myLibrary[myLibrary.length - 1];
    book.number = myLibrary.length;

    // Create book element
    const bookItem = document.createElement("div");
    bookItem.id = `book-${book.number}`;
    bookItem.classList.add("book");

    // Initialize Headings
    const title = document.createElement("h2"),
      author = document.createElement("h2"),
      pages = document.createElement("h2"),
      read = document.createElement("h2");

    // Set text of headings to user inputs
    title.innerText = book.title;
    author.innerText = book.author;
    pages.innerText = book.pages;

    // Set headings to children of book element
    bookItem.appendChild(title);
    bookItem.appendChild(author);
    bookItem.appendChild(pages);
    bookItem.appendChild(read);

    // Create div elements for buttons
    const flexCont = document.createElement("div"),
      flex = document.createElement("div"),
      iconCont = document.createElement("div"),
      iconBg = document.createElement("div"),
      icon = document.createElement("div"),
      flexTwo = document.createElement("div"),
      button = document.createElement("button"),
      buttonText = document.createElement("h2");

    // Add pre styled classes to div elements
    flexCont.classList.add("flex-container");
    flex.classList.add("flex");
    iconCont.classList.add("read-icon-container");

    icon.classList.add("read-icon");
    flexTwo.classList.add("flex");

    iconBg.classList.add("icon-background");
    iconBg.addEventListener("click", (e) => {
      updateReadStatus(bookItem, e.currentTarget, icon);
    });

    buttonText.innerText = "Delete";

    button.classList.add("delete");
    button.addEventListener("click", () => {
      deleteBook(bookItem);
    });
    button.appendChild(buttonText);

    // Set children of elements in order to create buttons
    flexTwo.appendChild(button);

    iconBg.appendChild(icon);
    iconCont.appendChild(iconBg);
    flex.appendChild(iconCont);

    flexCont.appendChild(flex);
    flexCont.appendChild(flexTwo);

    bookItem.appendChild(flexCont);

    if (book.read == true) {
      read.innerText = "Read";
      icon.classList.add("icon-read");
      bookItem.classList.add("book-read");
    } else {
      read.innerText = "Not read";
    }
    read.id = `read-text-${book.number}`;
    read.classList.add("read-text");

    // Add book to main book container
    bookContainer.appendChild(bookItem);
  }
  function clearInput() {
    title.value = "";
    author.value = "";
    pages.value = "";
    read.checked = false;
  }

  function createBook() {
    let titleText = title.value,
      authorText = author.value,
      pagesText = pages.value,
      readIt = read.checked;

    let book = new Book(titleText, authorText, pagesText, readIt);
    myLibrary.push(book);
    renderBooks();
  }

  function checkValid(e) {
    e.preventDefault();
    title.style.border = "1px solid black";
    author.style.border = "1px solid black";
    pages.style.border = "1px solid black";
    let makeBook = true;
    if (title.value == "") {
      title.style.border = "1px solid red";
      makeBook = false;
    }
    if (author.value == "") {
      author.style.border = "1px solid red";
      makeBook = false;
    }
    if (pages.value == "") {
      pages.style.border = "1px solid red";
      makeBook = false;
    }
    if (makeBook) {
      createBook();
      clearInput();
    }
  }

  // Event Listeners

  button.addEventListener("click", checkValid);
};
