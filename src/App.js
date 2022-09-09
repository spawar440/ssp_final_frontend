// import logo from './logo.svg';
import './App.css';
// import Wallpaper from './components/Wallpaper';
// import Quicksearch from './components/Quicksearch';

import Home from './components/Home';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import RestaurantDetail from './components/RestaurantDetail';
import Filter from './components/Filter';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/details/:rName" element={<RestaurantDetail/>}/>
      <Route path="/filter" element={<Filter/>}/>
    </Routes>  
    
  );
}

export default App;
