import { useEffect, useState } from "react";
import { search, update } from "../BooksAPI";
import BookShelf from "../common/components/book-shelf/bookShelf";
import { Link } from 'react-router-dom';

function Search() {
  const [booksAfterSearch, setBooksAfterSearch] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(async () => {
    if (searchValue) {
      const result = await search(searchValue, 20);
      console.log(result.hasOwnProperty('error'), result)
      if (!result.hasOwnProperty('error') && result.length > 0) {
        setBooksAfterSearch([...result]);
      } else {
        setBooksAfterSearch(new Array());
      }
    } else if (!searchValue) {
      setBooksAfterSearch(new Array());
    }

  }, [searchValue]);

  const setSearchInput = (value) => {
    setSearchValue(value)

  }

  const updatedBook = async (selectedData) => {
    await update(selectedData.selectedBook, selectedData.selectedOption);
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link
          className="close-search"
          to= '/'
        >
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div>
          <div className="search-books-results">
            <BookShelf onMovingBook={updatedBook} books={booksAfterSearch} />
          </div>
      </div>
    </div>
  )
}

export default Search;