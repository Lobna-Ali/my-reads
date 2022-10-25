import { useEffect, useState } from 'react';
import { getAll, update } from '../BooksAPI'
import { useNavigate } from 'react-router-dom';
import CurrentlyReading from "./components/currently-reading/currentlyReading";
import WantToRead from "./components/want-to-read/wantToRead";
import Read from "./components/read/read";
function MyReads() {
    const [data, setData] = useState([]);
    const [readedBooks, setReadedBooks] = useState([]);
    const [currentlyReading, setCurrentlyReading] = useState([]);
    const [wantToRead, setWantToRead] = useState([]);

    useEffect(async () => {
        if (data && data.length < 1) {
            const result = await getAll();
            setData([...result]);
        }

    }, [data]);

    useEffect(() => {
        if (data && data.length > 0 && (readedBooks.length < 1 || currentlyReading.length < 1 || wantToRead.length < 1)) {
            setDetailsForBooks();

        }
    }, [data]);

    function setDetailsForBooks() {
        setWantToRead((data.filter((book) => book.shelf === 'wantToRead')))
        setCurrentlyReading((data.filter((book) => book.shelf === 'currentlyReading')))
        setReadedBooks((data.filter((book) => book.shelf === 'read')))

    }

    const updateBookDetails = async (updateBookDetails) => {
        await update(updateBookDetails.selectedBook, updateBookDetails.selectedOption);
        setData([]);
        setWantToRead([]);
        setReadedBooks([]);
        setCurrentlyReading([]);
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
                        <CurrentlyReading onSelectedBookUpdated={updateBookDetails} currentlyReading={currentlyReading} />
                        <WantToRead onSelectedBookUpdated={updateBookDetails} wantToRead={wantToRead} />
                        <Read onSelectedBookUpdated={updateBookDetails} readedBooks={readedBooks} />

                    </div>
                </div>
                <div className="open-search">
                    <a onClick={() => navigate('/search')}>Add a book</a>
                </div>
            </div>
        </div>)
}

export default MyReads;