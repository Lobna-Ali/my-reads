import "./App.css";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import MyReads from "./my-reads/myReads";
import Search  from "./search/search";


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
