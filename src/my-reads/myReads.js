import { useEffect, useState } from 'react';
import { getAll, update } from '../BooksAPI'
import { useNavigate } from 'react-router-dom';
import BookShelf from '../common/components/book-shelf/bookShelf';
function MyReads(props) {
    const [data, setData] = useState(props.books || []);
    const [readedBooks, setReadedBooks] = useState([]);
    const [currentlyReading, setCurrentlyReading] = useState([]);
    const [wantToRead, setWantToRead] = useState([]);
    const [updateShelfs, setUpdateShelfs] = useState(false);

    useEffect(async () => {
        if (data && data.length < 1) {
            const result = await getAll();
            setData([...result]);
            props.onBooksUpdated([...result]);
        }

    }, [data]);

    useEffect(() => {
        if (data && data.length > 0 && ((readedBooks.length < 1 || currentlyReading.length < 1 || wantToRead.length < 1) || updateShelfs)) {
            setDetailsForBooks();

        }
    }, [data, updateShelfs]);

    function setDetailsForBooks() {
        setWantToRead((data.filter((book) => book.shelf === 'wantToRead')))
        setCurrentlyReading((data.filter((book) => book.shelf === 'currentlyReading')))
        setReadedBooks((data.filter((book) => book.shelf === 'read')))

    }

    const updateBookDetails = async (updateBookDetails) => {
        updateBookDetails.selectedBook.shelf = updateBookDetails.selectedOption;
        updatebookShelfs(updateBookDetails.selectedBook);
        await update(updateBookDetails.selectedBook, updateBookDetails.selectedOption);

    }

    const updatebookShelfs = (book) => {
        const updatedData = [...data];
        updatedData[updatedData.findIndex(el => el.id === book.id)] = book;
        setData([...updatedData]);
        props.onBooksUpdated([...updatedData]);
        setUpdateShelfs(true);

    }
    const navigate = useNavigate();
    return (
        <div>
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <BookShelf onMovingBook={updateBookDetails} books={currentlyReading} />

                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <BookShelf onMovingBook={updateBookDetails} books={wantToRead} />
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <BookShelf onMovingBook={updateBookDetails} books={readedBooks} />

                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <a onClick={() => navigate('/search')}>Add a book</a>
                </div>
            </div>
        </div>)
}

export default MyReads;