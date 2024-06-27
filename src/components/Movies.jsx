import React from "react";
import MovieCard from "./MovieCard";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Pagination from "./Pagination";

function Movies({handleAddtoWatchlist , handleRemoveFromWatchlist, watchlist}) {

  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const handlePrev = () => {
    if (pageNo === 1) {
      setPageNo(pageNo);
    } else {
      setPageNo(pageNo - 1);
    }
  }

  const handleNext = () => {
    setPageNo(pageNo + 1);
  }

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=b93a7885898c319897a9849a565cb552&language=en-US&page=${pageNo}`
      )
      .then(function (res) {
        setMovies(res.data.results)
      })
  }, [pageNo]);

  return (
    <div className="p-5">
      <div className="text-2xl text-center font-bold m-5">Trending Movies</div>

      <div className="flex flex-row  flex-wrap justify-around">
        {movies.map((moviesObj) => {
          return (
            <MovieCard
            key={moviesObj.id}
            movieObj={moviesObj}
              poster_path={moviesObj.poster_path}
              name={moviesObj.original_title}
              handleAddtoWatchlist={handleAddtoWatchlist}
              handleRemoveFromWatchlist={handleRemoveFromWatchlist}
              watchlist={watchlist}
            />
          );
        })}
      </div>

      <Pagination
        pageNo={pageNo}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    </div>
  );
}

export default Movies;
