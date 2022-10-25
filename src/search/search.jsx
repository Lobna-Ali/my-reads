import { useEffect, useState } from "react";
import { search, update } from "../BooksAPI";
import BookShelf from "../common/components/book-shelf/bookShelf";
import { useNavigate } from 'react-router-dom';

function Search() {
  const [booksAfterSearch, setBooksAfterSearch] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [callSearchApi, setCallSearchApi] = useState(false);
  const navigate = useNavigate();

  useEffect(async () => {
    if (searchValue || callSearchApi) {
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
    setCallSearchApi(false);

  }, [searchValue, callSearchApi]);

  const setSearchInput = (value) => {
    setSearchValue(value)

  }

  const updatedBook = async (selectedData) => {
    await update(selectedData.selectedBook, selectedData.selectedOption);
    setCallSearchApi(true);
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a
          className="close-search"
          onClick={() => navigate('/')}
        >
          Close
        </a>
        <div className="search-books-input-wrapper">
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div>
        {callSearchApi ? (
          <div className="spinner"><img src="http://pa1.narvii.com/7685/ecc3cbe5a8f3ef7c513c4abc69474e2c1a9da8cer1-200-200_00.gif" alt="Loading ...." /> </div>) : (
          <div className="search-books-results">
            <BookShelf onMovingBook={updatedBook} books={booksAfterSearch} />
          </div>)}
      </div>
    </div>
  )
}

export default Search;