import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";

import axiosClient from "../config/axios";

import Movies from "../components/Movies";

function HomePage() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [cinemaMovies, setCinemaMovies] = useState([]);
  const [popularShows, setPopularShows] = useState([]);
  const [topRatedShows, settopRatedShows] = useState([]);

  useEffect(() => {
    const getMedia = (type, category, callback) => {
      axiosClient
        .get(`${type}/${category}?api_key=${process.env.REACT_APP_TMDBKEY}`)
        .then((res) => callback(res.data.results));
    };
    // Movies
    getMedia("movie", "popular", setPopularMovies);
    getMedia("movie", "now_playing", setCinemaMovies);
    // Shows
    getMedia("tv", "popular", setPopularShows);
    getMedia("tv", "top_rated", settopRatedShows);
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <div
          style={{
            padding: "5px",
            color: "#fff",
            backgroundColor: "#114B5F",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Movies</h2>
        </div>
        <Movies movies={popularMovies} category="Trending" />
        <Movies movies={cinemaMovies} category=" Now Playing" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <div
          style={{
            padding: "5px",
            color: "#fff",
            backgroundColor: "#114B5F",
          }}
        >
          <h2 style={{ textAlign: "center" }}>TV Shows</h2>
        </div>
        <Movies movies={popularShows} category="Trending" />
        <Movies movies={topRatedShows} category="Top Rated" />
      </Grid>
    </Grid>
  );
}

export default HomePage;
