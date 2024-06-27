import React from "react";
import WatchList from "./WatchList";

function MovieCard({
  poster_path,
  name,
  handleAddtoWatchlist,
  movieObj,
  handleRemoveFromWatchlist,
  watchlist,
}) {
  function doesContain(movieObj) {
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].id == movieObj.id) {
        return true;
      }
    }
    return false;
  }
  return (
    <div
      className="relative h-[50vh] w-[200px] bg-center mb-6 bg-cover rounded-xl hover:cursor-pointer hover:scale-110 duration-300 flex flex-col justify-between items-end"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${poster_path})`,
      }}
    >
      {doesContain(movieObj) ? (
        <div
          onClick={() => handleRemoveFromWatchlist(movieObj)}
          className="m-2 h-7 w-7 flex justify-center items-center rounded-lg bg-gray-900/70"
        >
          &#10060;{" "}
        </div>
      ) : (
        <div
          onClick={() => handleAddtoWatchlist(movieObj)}
          className="m-2 h-7 w-7 flex justify-center items-center rounded-lg bg-gray-900/70"
        >
          &#128525;
        </div>
      )}

      <div className="absolute bottom-0 left-0 line-clamp-2 text-white text-xs w-full p-1 text-center bg-gray-800/50">
        {name}
      </div>
    </div>
  );
}

export default MovieCard;
