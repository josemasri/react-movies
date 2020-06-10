import React, { Fragment } from "react";
import Movie from "./Movie";
import Grid from "@material-ui/core/Grid";

const Movies = ({ movies, category }) => {
  return (
    <Fragment>
      <h3 style={{margin: "2rem"}}>{category}</h3>
      <Grid container spacing={3}>
        {movies.slice(10).map((movie) => {
          if (movie.name) movie.title = movie.name;
          return (
            <Grid key={movie.id} item xs={12} lg={6}>
              <Movie movie={movie} />
            </Grid>
          );
        })}
      </Grid>
    </Fragment>
  );
};

export default Movies;
