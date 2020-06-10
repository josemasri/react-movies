import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Axios from "axios";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";

import axiosClient from "../config/axios";
import useDebounce from "../hooks/useDebounce";
import Spinner from "./Spinner/Spinner";

const Header = ({ title }) => {
  const [media, setMedia] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  // Is searching
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const history = useHistory();

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      // Api Call
      Axios.get(
        `https://api.themoviedb.org/3/search/multi/?query=${debouncedSearchTerm}&api_key=${process.env.REACT_APP_TMDBKEY}`
      ).then((res) => {
        const results = res.data.results;
        setMedia(
          results.map((media) => {
            media.type = "Movie";
            if (!media.title) {
              media.title = media.name;
              media.type = "TV Show";
            }
            if (media.first_air_date) {
              media.year = media.first_air_date.split("-")[0];
            } else if (media.release_date) {
              media.year = media.release_date.split("-")[0];
            }
            return media;
          })
        );
        setIsSearching(false);
      });
    }
  }, [debouncedSearchTerm]);

  // On Random Movie Click
  const handleRandomMovieClick = async () => {
    setIsSearching(true);
    const page = Math.floor(Math.random() * 501);
    const res = await axiosClient.get(
      `discover/movie?page=${page}&with_networks=213&api_key=${process.env.REACT_APP_TMDBKEY}`
    );
    const moviesRes = res.data.results;
    const movie = moviesRes[Math.floor(Math.random() * moviesRes.length)];
    setIsSearching(false);
    history.push(`/movie/${movie.id}`);
  };
  // On Random Show Click
  const handleRandomShowClick = async () => {
    setIsSearching(true);
    const page = Math.floor(Math.random() * 42);
    const res = await axiosClient.get(
      `discover/tv?page=${page}&with_networks=213&api_key=${process.env.REACT_APP_TMDBKEY}`
    );
    const showsRes = res.data.results;
    const show = showsRes[Math.floor(Math.random() * showsRes.length)];
    setIsSearching(false);
    history.push(`/tv-show/${show.id}`);
  };

  return (
    <header>
      <Link style={{ textDecoration: "none", color: "#fff" }} to="/">
        <h1>{title}</h1>
      </Link>
      <div className="search-bar">
        <Autocomplete
          // Selected Media
          value={selectedMedia}
          onChange={(event, newValue) => {
            if (newValue) {
              setSelectedMedia(newValue);
              if (newValue.type === "Movie") {
                history.push(`/movie/${newValue.id}`);
              } else {
                history.push(`/tv-show/${newValue.id}`);
              }
            }
          }}
          options={media}
          getOptionLabel={(option) =>
            `${option.title} - ${option.year} - ${option.type}`
          }
          // Searching Media
          inputValue={searchTerm}
          onInputChange={(e, newInputValue) => setSearchTerm(newInputValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="&#128269; Search Movie / Show..."
            />
          )}
        />
      </div>
      <div className="netfix-btn">
        <Button
          variant="contained"
          color="primary"
          style={{ marginRight: "2rem" }}
          onClick={handleRandomMovieClick}
        >
          <img
            style={{ width: "2rem", marginRight: "1rem" }}
            src="https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg"
            alt=""
          />
          Random Movie
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleRandomShowClick}
        >
          <img
            style={{ width: "2rem", marginRight: "1rem" }}
            src="https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg"
            alt=""
          />
          Random TV Show
        </Button>
      </div>
      {isSearching ? <Spinner /> : null}
    </header>
  );
};

export default Header;
