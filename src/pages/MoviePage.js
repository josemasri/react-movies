import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShowMoreText from "react-show-more-text";
import Grid from "@material-ui/core/Grid";

import axiosClient from "../config/axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCalendar,
  faMoneyBill,
  faHandHoldingUsd,
} from "@fortawesome/free-solid-svg-icons";

import { formatMoney } from "../utils";
import Cast from "../components/Cast";
import GridMovies from "../components/GridMovies";

const MoviePage = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState({});
  const [credits, setCredits] = useState([]);
  const [similar, setSimilar] = useState([]);

  const {
    title,
    poster_path,
    overview,
    vote_average,
    release_date,
    budget,
    revenue,
  } = movie;

  useEffect(() => {
    const getMovie = () => {
      axiosClient
        .get(`movie/${id}?api_key=${process.env.REACT_APP_TMDBKEY}`)
        .then((res) => setMovie(res.data));
    };

    const getCredits = () => {
      axiosClient
        .get(`movie/${id}/credits?api_key=${process.env.REACT_APP_TMDBKEY}`)
        .then((res) => setCredits(res.data));
    };

    const getSimilar = () => {
      axiosClient
        .get(`movie/${id}/similar?api_key=${process.env.REACT_APP_TMDBKEY}`)
        .then((res) => setSimilar(res.data.results));
    };

    if (id) {
      getMovie();
      getCredits();
      getSimilar();
    }
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div>
      <Grid container>
        <Grid item xs={6} lg={4}>
          <img
            className="poster-img"
            style={{
              width: "80%",
              height: "auto",
              maxWidth: "300px",
              borderRadius: "15px",
            }}
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt=""
          />
        </Grid>

        <Grid item xs={6} lg={4}>
          <h2>{title}</h2>
          <ShowMoreText
            lines={3}
            more="Show more"
            less="Show less"
            anchorClass=""
            expanded={false}
            width={280}
          >
            {overview}
          </ShowMoreText>
        </Grid>
        <Grid item xs={12} lg={4}>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <FontAwesomeIcon icon={faStar} color="red" />
              <p style={{ fontSize: "2rem" }}>{vote_average}</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <FontAwesomeIcon icon={faCalendar} color="red" />
              <p style={{ fontSize: "2rem" }}>{release_date}</p>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <FontAwesomeIcon icon={faHandHoldingUsd} color="red" />
              <p style={{ fontSize: "2rem" }}>{formatMoney(budget, 0)}</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <FontAwesomeIcon icon={faMoneyBill} color="red" />
              <p style={{ fontSize: "2rem" }}>{formatMoney(revenue, 0)}</p>
            </div>
          </div>
        </Grid>
      </Grid>

      <h3 style={{ marginBottom: "1rem" }}>Cast</h3>
      <Cast cast={credits.cast || []} />
      <h3 style={{ margin: "1rem 0" }}>Similar Movies</h3>
      <GridMovies movies={similar || []} />
    </div>
  );
};

export default MoviePage;
