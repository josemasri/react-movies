import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 150,
  },
  img: {
    borderRadius: "15px",
  },
});

const Movie = ({
  movie: { title, backdrop_path, poster_path, vote_average, overview },
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} style={{ margin: "0 auto" }}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`https://image.tmdb.org/t/p/w500/${
            backdrop_path || poster_path
          }`}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="h2">
            {title.length < 20 ? title : `${title.substring(0, 20)}...`}
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FontAwesomeIcon size="2x" color="red" icon={faStar} />
            <p
              style={{ fontSize: "3rem", fontWeight: 700, marginRight: "2rem" }}
            >
              {vote_average}
            </p>
            <p>
              {overview.length < 100
                ? overview
                : `${overview.substring(0, 100)}...`}
            </p>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Movie;
