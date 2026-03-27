import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

function renderHearts(vote_average) {
    const roundedVote = Math.floor(((5 - 1) * vote_average + 5) / (10 - 1));

    const heartList = [];

    for (let i = 0; i < 5; i++) {
        if (i < roundedVote) {
            heartList.push(<FontAwesomeIcon key={i} icon={faHeartSolid} />);
        } else {
            heartList.push(<FontAwesomeIcon key={i} icon={faHeartRegular} />);
        }
    }

    return heartList;
}

export default function AppCard({ poster_path, title, original_title, handleFlag, vote_average }) {

    return (
        <div className="card" >
            <div className="thumb">
                <img src={"https://image.tmdb.org/t/p/w300" + poster_path} alt="" />
            </div>

            <div className="data">
                <div><strong>Titolo: </strong>{title}</div>

                <div><strong>Titolo originale: </strong>{original_title}</div>

                <div>
                    <strong>Lingua: </strong>
                    <span className={`fi fi-${handleFlag}`}></span>
                </div>

                <div>
                    <strong>Voto: </strong>
                    {renderHearts(vote_average)}
                </div>
            </div>
        </div>
    );
}