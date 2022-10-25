import ChangerDropdown from "../changer-dropdown/changerDropdown";

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
        {books && books.length > 0 ? (books.map((book) => {
          return (
            <li key={book.title}>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage:
                        `url(${book.imageLinks.thumbnail})`,
                    }}
                  ></div>
                  <ChangerDropdown selectedOption={onOptionChange} book={book} key={book.title} />
                </div>
                <div className="book-title"> {book.title}</div>
                <div className="book-authors">{book.authors[0]}</div>
              </div>
            </li>
          )
        })) : null}
      </ol>
    </div>
  )
}

export default BookShelf;