import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

import { langs } from "../data/flags";

import axios from 'axios';
import { useEffect, useState } from 'react';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const baseURL = `https://api.themoviedb.org/3/`;

function renderHearts(vote_average) {
    const roundedVote = Math.floor(((5 - 1) * vote_average + 5) / (10 - 1));

    const heartList = [];

    for (let i = 0; i < 5; i++) {
        if (i < roundedVote) {
            heartList.push(<FontAwesomeIcon key={i} icon={faStarSolid} />);
        } else {
            heartList.push(<FontAwesomeIcon key={i} icon={faStarRegular} />);
        }
    }

    return heartList;
}

function handleFLag(code) {
    return langs[code] || code;
}

export default function AppCard({ id, endpoint, poster_path, title, original_title, lang, vote_average }) {

    const [credits, setCredits] = useState([]);

    function fetchCredits(baseURL, endpoint, id) {
        axios.get(baseURL + `${endpoint}/` + id + `/credits?api_key=${TMDB_API_KEY}`)
            .then(response => {
                setCredits(response.data.cast.slice(0, 5));
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        fetchCredits(baseURL, endpoint, id);
    }, []);

    return (
        <div className="card" >
            <div className="thumb">
                <img src={"https://image.tmdb.org/t/p/w342" + poster_path} alt="" />
            </div>

            <div className="data">
                <div><strong>Titolo: </strong>{title}</div>

                <div><strong>Titolo originale: </strong>{original_title}</div>

                {

                    credits.length > 0 &&

                    <div>
                        <strong>Attori: </strong>
                        {
                            credits.map((credit, i) => (
                                <span key={i}>{credit.name} {i !== credits.length - 1 ? "," : ""} </span>
                            ))
                        }
                    </div>
                }
                <div>
                    <strong>Lingua: </strong>
                    <span className={`fi fi-${handleFLag(lang)}`}></span>
                </div>

                <div>
                    <strong>Voto: </strong>
                    {renderHearts(vote_average)}
                </div>
            </div>
        </div>
    );
}