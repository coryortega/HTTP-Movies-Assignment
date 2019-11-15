import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialmovie = {
  title: '',
  director: '',
  metascore: '',
  stars: []
};

const UpdateForm = props => {
  const [movie, setMovie] = useState(initialmovie);
  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === 'metascore') {
      value = parseInt(value, 10);
    }
    setMovie({
      ...movie,
      [ev.target.name]: value
    });
  };


  useEffect(() => {
    if (props.movies.length > 0) {
      const newmovie = props.movies.find(
        thing => `${thing.id}` === props.match.params.id
      );
      setMovie(newmovie);
    }
  }, [props.movies, props.match.params.id]);

  const handleSubmit = e => {
      e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {if (res.status === 200) {
        // props.history.push("/"),
        return props.call;
      }})
      .then(props.history.push("/"))
      .catch(err => console.log(err));
  };

  if (props.movies.length === 0) {
    return <h2>Loading data...</h2>;
  }

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={movie.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={movie.director}
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={movie.metascore}
        />
        <div className="baseline" />

        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="stars"
          value={movie.stars}
        />
        <div className="baseline" />
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
