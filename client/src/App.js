import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from 'axios';
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import UpdateForm from "./Movies/UpdateForm";
import Movie from "./Movies/Movie";

const App = () => {


  const [savedList, setSavedList] = useState([]);
  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };


  const [movies, setMovies] = useState([]);

  const callAxios = () => {
    return(
      call
    )
  }

const call = useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovies(res.data))
      .catch(error => console.log(error));
  }, []);


  return (
    <>
      <SavedList list={savedList} />
      {/* <Route exact path="/" component={MovieList} /> */}
      <Route
        exact path="/"
        render={props => (
          <MovieList
            {...props}
            movies={movies}
          />
        )}
      />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} call={call} />;
        }}
      />
        <Route
        exact path="/update-movie/:id"
        render={props => (
          <UpdateForm
            {...props} 
            movies={movies}
          />
        )}
      />
    </>
  );
};

export default App;
