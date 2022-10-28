import "./App.css";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import MyReads from "./my-reads/myReads";
import Search  from "./search/search";
import { useState } from "react";


function App() {
  const [books, setBooks] = useState([]);

  const setBooksData = (books) => {
    setBooks(books);
    console.log(books)
  }
  const App = () => {
    let routes = useRoutes([
      { path: "/", element: <MyReads onBooksUpdated = {setBooksData} books={books} /> },
      { path: "/search", element: <Search onBooksUpdated = {setBooksData} books={books} /> }
    ]);
    return routes;
  };
  return (

    <div className="app">
      <Router>
        <App />
      </Router>
    </div>
  );

}
export default App;
