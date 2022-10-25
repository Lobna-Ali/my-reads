import BookShelf from "../book-shelf/bookShelf";
import ChangerDropdown from "../changer-dropdown/changerDropdown";

function WantToRead(props) {
  const { wantToRead } = props;
  const updatedBook = (selectedData) => {
    props.onSelectedBookUpdated(selectedData);
  }
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Want to Read</h2>
      <BookShelf onMovingBook={updatedBook} books={wantToRead} />
    </div>
  )
}

export default WantToRead;