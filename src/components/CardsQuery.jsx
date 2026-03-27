import AppCard from "./AppCard";

function handleGenres(endpoint, allGenres, thisGenres) {
    const genres = [];

    allGenres[endpoint].map(allGenre => {
        thisGenres.filter(thisGenre => {
            if (allGenre.id === thisGenre) {
                genres.push(allGenre.name)
            }
        })
    });

    return genres;
}

export default function CardsQuery({ endpoint, cards, allGenres, filteredGenre }) {

    return (
        <div className="cards-container">
            {

                cards.map((card, i) => {
                    const { id, poster_path, original_language, vote_average, genre_ids } = card;
                    const title = card.title || card.name;
                    const original_title = card.original_title || card.original_name;

                    const genres = handleGenres(endpoint, allGenres, genre_ids);

                    let isGenre = true;

                    if (filteredGenre) {
                        isGenre = false;
                        genre_ids.forEach(genre => {
                            if (genre == filteredGenre) {
                                isGenre = true;
                            }
                        })
                    }


                    if (isGenre) {
                        return (
                            <AppCard key={i} id={id} endpoint={endpoint} poster_path={poster_path} title={title} original_title={original_title} lang={original_language} genres={genres} vote_average={vote_average} />
                        );
                    }


                })

            }
        </div>
    );
}