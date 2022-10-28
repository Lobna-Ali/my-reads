import { useEffect, useState } from "react";
import { search, update } from "../BooksAPI";
import BookShelf from "../common/components/book-shelf/bookShelf";
import { Link } from 'react-router-dom';
import { getBooksData, setBooksData } from "../services/books.service";

function Search() {
  const [booksAfterSearch, setBooksAfterSearch] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(async () => {
    if (searchValue) {
      const result = await search(searchValue, 20);
      if (!result.hasOwnProperty('error') && result.length > 0) {
        const enrichedResult = enrichBooksWithShelf(result);
        setBooksAfterSearch([...enrichedResult]);
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
    const dataFromMyReads = getBooksData();
    const selectedBook = { ...selectedData.selectedBook, shelf: selectedData.selectedOption };
    const indexOfMyReadsBook = dataFromMyReads.findIndex(el => el.id === selectedData.selectedBook.id);
    if (indexOfMyReadsBook > - 1) {
      dataFromMyReads[indexOfMyReadsBook] = selectedBook;
    } else {
      dataFromMyReads.push(selectedBook);
    }
    booksAfterSearch[booksAfterSearch.findIndex(el => el.id === selectedBook.id)] = selectedBook;
    setBooksAfterSearch([...booksAfterSearch]);
    setBooksData([...dataFromMyReads]);
    await update(selectedData.selectedBook, selectedData.selectedOption);
  }

  const enrichBooksWithShelf = (searchResults) => {
    const dataFromMyReads = getBooksData();
    dataFromMyReads.forEach((book) => {
      searchResults[searchResults.findIndex(el => el.id === book.id)] = book;
    });

    return searchResults;
  }
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link
          className="close-search"
          to='/'
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