import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Banner() {
  const [bannerMovie, setBannerMovie] = useState(null);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    const fetchBannerMovie = () => {
      axios
        .get(`https://api.themoviedb.org/3/movie/popular?api_key=b93a7885898c319897a9849a565cb552&language=en-US&page=${pageNo}`)
        .then((res) => {
          setBannerMovie(res.data.results[0]);
        })
        .catch((error) => {
          console.error('Error fetching the banner movie:', error);
        });
    };

    fetchBannerMovie();

    const intervalId = setInterval(() => {
      setPageNo((prevPageNo) => prevPageNo + 1);
    }, 4000); // Change the banner every 5 seconds

    return () => clearInterval(intervalId);
  }, [pageNo]);

  return (
    <div
      className='h-[20vh] md:h-[80vh] bg-cover bg-center flex items-end'
      style={{
        backgroundImage: `url('${bannerMovie?.backdrop_path ? `https://image.tmdb.org/t/p/original/${bannerMovie?.backdrop_path}` : ""})`,
      }}
    >
  
        <div className='text-white text-xl text-center w-full bg-gray-900/60 p-2'>
          {bannerMovie?.title || bannerMovie?.name || bannerMovie?.original_name}
        </div>
      
    </div>
  );
}

export default Banner;
