import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";

import axiosClient from "../config/axios";

import GridMovies from "../components/GridMovies";
import GridShows from "../components/GridShows";

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
        <h3 style={{ margin: "1rem 0" }}>Trending</h3>
        <GridMovies movies={popularMovies} />
        <h3 style={{ margin: "1rem 0" }}>In Theaters</h3>
        <GridMovies movies={cinemaMovies} />
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
        <h3 style={{ margin: "1rem 0" }}>Trending</h3>
        <GridShows shows={popularShows} />
        <h3 style={{ margin: "1rem 0" }}>Top Rated</h3>
        <GridShows shows={topRatedShows} />
      </Grid>
    </Grid>
  );
}

export default HomePage;
