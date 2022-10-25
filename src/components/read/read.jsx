import BookShelf from "../book-shelf/bookShelf";
import ChangerDropdown from "../changer-dropdown/changerDropdown";

function Read(props) {
  const { readedBooks } = props;
  const updatedBook = (selectedData) => {
    props.onSelectedBookUpdated(selectedData);
  }
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Read</h2>
      <BookShelf onMovingBook={updatedBook} books={readedBooks} />

    </div>
  )
}


export default Read;