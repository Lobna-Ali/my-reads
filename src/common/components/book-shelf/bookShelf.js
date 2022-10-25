import ChangerDropdown from "../../../my-reads/components/changer-dropdown/changerDropdown";

function BookShelf(props) {
  const { books } = props;

  const onOptionChange = (value, selectedBook) => {
    props.onMovingBook({
      selectedOption: value,
      selectedBook
    })
  }
  return (

    <div className="bookshelf-books">
      <ol className="books-grid">
        {books && books.length > 0 ? (books.map((book, index) => {
          return (
            <li key={index}>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage:
                        `url(${book.imageLinks? book.imageLinks.thumbnail: ''})`,
                    }}
                  ></div>
                  <ChangerDropdown selectedOption={onOptionChange} book={book} key={index} />
                </div>
                <div className="book-title"> {book.title}</div>
                <div className="book-authors">{book.authors && book.authors.length ? book.authors.map((author, index) => author +  (book.authors.length > 1 && index < (book.authors.length - 1)  ?',' : '')): ''}</div>
              </div>
            </li>
          )
        })) : null}
      </ol>
    </div>
  )
}

export default BookShelf;