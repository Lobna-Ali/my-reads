import BookShelf from "../book-shelf/bookShelf";
import ChangerDropdown from "../changer-dropdown/changerDropdown";

function CurrentlyReading(props) {

  const { currentlyReading } = props;
  const updatedBook = (selectedData) => {
    props.onSelectedBookUpdated(selectedData);
  }
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Currently Reading</h2>
      <BookShelf onMovingBook={updatedBook} books={currentlyReading} />

    </div>
  )
}


export default CurrentlyReading;