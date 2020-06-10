import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShowMoreText from "react-show-more-text";
import Grid from "@material-ui/core/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCalendar,
  faTv,
  faTicketAlt,
} from "@fortawesome/free-solid-svg-icons";

import axiosClient from "../config/axios";

import Cast from "../components/Cast";
import GridShows from "../components/GridShows";
import Spinner from "../components/Spinner/Spinner";

const TvShowPage = () => {
  const { id } = useParams();

  const [show, setMovie] = useState({});
  const [credits, setCredits] = useState([]);
  const [similar, setSimilar] = useState([]);

  const [loading, setLoading] = useState(false);

  const {
    name,
    poster_path,
    overview,
    vote_average,
    first_air_date,
    number_of_seasons,
    number_of_episodes,
  } = show;

  useEffect(() => {
    const getShow = () => {
      axiosClient
        .get(`tv/${id}?api_key=${process.env.REACT_APP_TMDBKEY}`)
        .then((res) => setMovie(res.data));
    };

    const getCredits = () => {
      axiosClient
        .get(`tv/${id}/credits?api_key=${process.env.REACT_APP_TMDBKEY}`)
        .then((res) => setCredits(res.data));
    };

    const getSimilar = () => {
      axiosClient
        .get(`tv/${id}/similar?api_key=${process.env.REACT_APP_TMDBKEY}`)
        .then((res) => {
          setSimilar(res.data.results);
          setLoading(false);
        });
    };

    if (id) {
      setLoading(true);
      getShow();
      getCredits();
      getSimilar();
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return <Spinner></Spinner>;
  }

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
          <h2>{name}</h2>
          <ShowMoreText
            /* Default options */
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
              }}
            >
              <FontAwesomeIcon className="mr2" icon={faStar} color="red" />
              <p style={{ fontSize: "2rem" }}>{vote_average}</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon className="mr2" icon={faCalendar} color="red" />
              <p style={{ fontSize: "2rem" }}>{first_air_date}</p>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon className="mr2" icon={faTv} color="red" />
              <p style={{ fontSize: "2rem" }}>{number_of_seasons}</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon className="mr2" icon={faTicketAlt} color="red" />
              <p style={{ fontSize: "2rem" }}>{number_of_episodes}</p>
            </div>
          </div>
        </Grid>
      </Grid>

      <h3 style={{ marginBottom: "1rem" }}>Cast</h3>
      <Cast cast={credits.cast || []} />
      {similar.length > 0 ? (
        <h3 style={{ margin: "1rem 0" }}>Similar Tv Shows</h3>
      ) : null}
      <GridShows shows={similar || []} />
    </div>
  );
};

export default TvShowPage;
