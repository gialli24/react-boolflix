import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import DefaultLayout from "./layouts/DefaultLayout";
import { useEffect, useState } from "react";
import axios from 'axios';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const moviesEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=`;
const seriesEndpoint = `https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&query=`;
const allMoviesGenresEndpoint = `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}`
const allSeriesGenresEndpoint = `https://api.themoviedb.org/3/genre/tv/list?api_key=${TMDB_API_KEY}`

function getData(endpoint) {
  return axios.get(endpoint);
}

function App() {
  const [search, setSearch] = useState("");

  const [results, setResults] = useState({
    movies: [],
    series: []
  });

  const [allGenres, setAllGenres] = useState({
    movie: [],
    tv: []
  });

  function getAllGenres() {
    Promise.all([
      getData(allMoviesGenresEndpoint, search),
      getData(allSeriesGenresEndpoint, search)
    ])
      .then(function ([moviesGenres, seriesGenres]) {
        setAllGenres({
          movie: moviesGenres.data.genres,
          tv: seriesGenres.data.genres
        })
      });
  }

  function getMoviesAndSeries() {
    Promise.all([
      getData(moviesEndpoint + search),
      getData(seriesEndpoint + search)
    ])
      .then(function ([movies, series]) {
        setResults({
          movies: movies.data.results,
          series: series.data.results
        })
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    getMoviesAndSeries();
  }

  useEffect(() => {
    getAllGenres();
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout search={search} setSearch={setSearch} handleSubmit={handleSubmit} />}>
            <Route path="/" element={<SearchPage results={results} allGenres={allGenres} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
