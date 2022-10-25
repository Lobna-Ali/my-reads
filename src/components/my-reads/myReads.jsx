import Read from '../read/read'
import CurrentlyReading from "../currently-reading/currentlyReading";
import WantToRead from "../want-to-read/wantToRead";
import { useEffect, useState } from 'react';
import { getAll, update } from '../../BooksAPI'
import { useNavigate } from 'react-router-dom';

function MyReads() {
    const [showSearchPage, setShowSearchpage] = useState(false);
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
        const result = await update(updateBookDetails.selectedBook, updateBookDetails.selectedOption);
        setData([]);
        setWantToRead([]);
        setReadedBooks([]);
        setCurrentlyReading([]);
    }
    const navigate = useNavigate();
    return (
        <div>
            {data && data.length < 1 ? (
                <div className="spinner"><img src="http://pa1.narvii.com/7685/ecc3cbe5a8f3ef7c513c4abc69474e2c1a9da8cer1-200-200_00.gif" alt="Loading ...." /> </div>) : (
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
            )}</div>)
}

export default MyReads;