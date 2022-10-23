const STORAGE_KEY="BOOK_APPS";
const INCOMPLETE_BOOKSHELFLIST = "incompleteBookshelfList";
const COMPLETE_BOOK_SHELFLIST = "completeBookshelfList";
const BOOK_ITEMID = "itemId";


let book=[];

document.addEventListener('DOMContentLoaded', function(){
    const submitBook = document.getElementById('inputBook');
    submitBook.addEventListener('submit', function (event) {
      event.preventDefault();
      addBook();
    });
});

function isStorageExist() {
  if(typeof(Storage) === undefined){
      alert("Browser anda tidak mendukung local storage");
      return false
  }
  return true;
};

function addBook() {
  const inputBookTitle = document.getElementById('#inputBookTitle');
  const inputBookAuthor = document.getElementById('#inputBookAuthor');
  const inputBookYear = document.getElementById('#inputBookYear');
}

const searchBooks = document.getElementById("searchBook");

function saveData() {
  const parsed = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
};

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);
  if(data !== null)
      books = data;
      document.dispatchEvent(new Event("ondataloaded"));
};

function updateDataToStorage() {
  if(isStorageExist())
      saveData();
};

searchBooks.addEventListener("submit", function(event){
  event.preventDefault();
  searchBook();

  if(isStorageExist()){
    loadDataFromStorage();
  }
});

document.addEventListener("ondatasaved", () => {
  console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks();
});

function changeText(){
  const checkbox = document.getElementById("inputBookIsComplete");
  const textSubmit = document.getElementById(textSubmit);

  if(checkbox.checked ==true){
    textSubmit.innerText = "sudah selesai dibaca";
  }else{
    textSubmit.innerText = "Belum selesai dibaca";
  }
};

function composebookObject(title, author, year, isCompleted) {
  return {
      id: +new Date(),
      title,
      author,
      year,
      isCompleted
  };
};

function findbook(bookId) {
  for(book of books){
      if(book.id === bookId)
      return book;
  }
  return null;
};

function findbookIndex(bookId) {
  let index = 0
  for (book of books) {
      if(book.id === bookId)
      return index;

      index++;
  }
  return -1;
};


function createRemoveButton(){
  return createButton("red", function(event){
      const parent = event.target.parentElement;
      removeBook(parent.parentElement);
  });
};

function addBookToCompleted(bookElement){
  const bookTitled = bookElement.querySelector(".book_item > h3").innerText;
  const bookAuthored = bookElement.querySelector(".book_item > p").innerText;
  const bookYeared = bookElement.querySelector(".year").innerText;
  const bookIsComplete = bookElement.querySelector(".green").innerText;

  if (bookIsComplete == "Sudah Selesai") {
      const newBook = makeBook(bookTitled, bookAuthored, bookYeared, true)
      const book = findbook(bookElement[BOOK_ITEMID]);
      book.isCompleted = true;
      newBook[BOOK_ITEMID] = book.id;
      const completeBookshelfList = document.getElementById(COMPLETE_BOOK_SHELFLIST);
      completeBookshelfList.append(newBook);
  }else{
      const newBook = makeBook(bookTitled, bookAuthored, bookYeared, false)
      const book = findbook(bookElement[BOOK_ITEMID]);
      book.isCompleted = false;
      newBook[BOOK_ITEMID] = book.id;

      const incompleteBookshelfList = document.getElementById(INCOMPLETE_BOOKSHELFLIST);
      incompleteBookshelfList.append(newBook);
  }
  bookElement.remove();
  updateDataToStorage();
};

function refreshDataFromBooks() {
  const listUncompleted = document.getElementById(INCOMPLETE_BOOKSHELFLIST);
  const listCompleted = document.getElementById(COMPLETE_BOOK_SHELFLIST);

  for (book of books){
      const newbook = makebook(book.title, book.author, book.year, book.isCompleted);
      newbook[BOOK_ITEMID] = book.id;

      if(book.isCompleted == false){
          listUncompleted.append(newbook);
      } else {
          listCompleted.append(newbook);
      }
  }
};

function searchBook() {
  const inputSearch = document.getElementById("searchBookTitle").value;
  const moveBook = document.querySelectorAll(".move")

  for(move of moveBook){
      if (inputSearch !== move.innerText){
          console.log(move.innerText)
          move.parentelement.remove();
      }
  }
};