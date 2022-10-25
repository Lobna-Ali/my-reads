import "./App.css";
import MyReads from "./components/my-reads/myReads";
import Search from "./components/search/search";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";


function App() {

  const App = () => {
    let routes = useRoutes([
      { path: "/", element: <MyReads /> },
      { path: "/search", element: <Search /> }
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
