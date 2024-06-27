import "./App.css";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import WatchList from "./components/WatchList";
import Banner from "./components/Banner";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  let [watchlist, setWatchList] = useState([]);

  let handleAddtoWatchlist = (moviesObj) => {
    let newWatchList = [...watchlist, moviesObj];
    localStorage.setItem("moviesApp", JSON.stringify(newWatchList));
    setWatchList(newWatchList);
    console.log(newWatchList);
  };

  let handleRemoveFromWatchlist = (moviesObj) => {
    let filteredWatchlist = watchlist.filter((movie) => {
      return movie.id !== moviesObj.id;
    });
    localStorage.setItem("moviesApp", JSON.stringify(filteredWatchlist)); // Save the updated list to localStorage
    setWatchList(filteredWatchlist);
    console.log(filteredWatchlist);
  };

  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem("moviesApp");
    if (!moviesFromLocalStorage) {
      return;
    }
    setWatchList(JSON.parse(moviesFromLocalStorage));
  }, []); // Empty dependency array to run only once on mount

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />{" "}
                <Movies
                  watchlist={watchlist}
                  handleAddtoWatchlist={handleAddtoWatchlist}
                  handleRemoveFromWatchlist={handleRemoveFromWatchlist}
                />
              </>
            }
          />
          <Route path="/watchlist" element={<WatchList watchlist={watchlist} setWatchList={setWatchList}  handleRemoveFromWatchlist={handleRemoveFromWatchlist} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
