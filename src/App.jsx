import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import DefaultLayout from "./layouts/DefaultLayout";
import { useState } from "react";
import axios from 'axios';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const moviesEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=`;
const seriesEndpoint = `https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&query=`;

function getData(endpoint, search) {
  return axios.get(endpoint + search);
}

function App() {
  const [search, setSearch] = useState("");

  const [results, setResults] = useState({
    movies: [],
    series: []
  });

  function handleSubmit(e) {
    e.preventDefault();

    Promise.all([getData(moviesEndpoint, search), getData(seriesEndpoint, search)])
      .then(function ([movies, series]) {
        const moviesList = movies.data.results;
        const seriesList = series.data.results;

        setResults({
          movies: moviesList,
          series: seriesList
        })
      });
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout search={search} setSearch={setSearch} handleSubmit={handleSubmit} />}>
            <Route path="/" element={<SearchPage results={results} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
