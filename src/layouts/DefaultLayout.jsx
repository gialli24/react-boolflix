import AppHeader from "../components/AppHeader";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const moviesEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=`;
const seriesEndpoint = `https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&query=`;

export default function DefaultLayout() {

    const [search, setSearch] = useState("");

    const [results, setResults] = useState({
        movies: [],
        series: []
    });

    async function fetchSearch(endpoint, search) {
        const res = await fetch(endpoint + search);
        const data = await res.json();
        return data.results;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const [moviesData, seriesData] = await Promise.all([
                fetchSearch(moviesEndpoint, search),
                fetchSearch(seriesEndpoint, search)
            ]);

            setResults({
                movies: moviesData,
                series: seriesData
            });
        } catch (error) {
            console.error("Search failed", error);
        }
    }

    return (
        <>
            <AppHeader search={search} setSearch={setSearch} handleSubmit={handleSubmit} />
            <Outlet context={{ results }} />
        </>
    )
}