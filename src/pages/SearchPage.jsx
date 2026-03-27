import CardsQuery from '../components/CardsQuery';


export default function SearchPage({ results, allGenres, filteredGenre, setFilteredGenre }) {

    const data = [
        {
            endpoint: "movie",
            title: "Movie",
            content: results.movies
        },
        {
            endpoint: "tv",
            title: "Series",
            content: results.series
        }
    ]

    const filterGenres = [...allGenres.movie, ...allGenres.tv];

    return (
        <main>

            <div className="genres-filter">
                <div className="container">

                    <select name="filter-genres" value={filteredGenre} onChange={e => setFilteredGenre(e.target.value)}>
                        <option value="">Filtra per genere</option>
                        {
                            filterGenres.map((genre, i) => (
                                <option key={i} value={genre.id}>{genre.name}</option>
                            ))
                        }
                    </select>

                </div>
            </div>


            {
                data.map((section, i) => {

                    const { title, endpoint, content } = section;

                    return (
                        <section key={i} className="query-list" >
                            <div className="container">

                                <h2>{title}</h2>

                                <CardsQuery endpoint={endpoint} cards={content} allGenres={allGenres} filteredGenre={filteredGenre} />

                            </div>
                        </section>
                    );
                })
            }
        </main >
    );
}