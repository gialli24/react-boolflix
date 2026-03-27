import CardsQuery from '../components/CardsQuery';

export default function SearchPage({ results }) {

    return (
        <main>
            <section id="movies" className="query-list">
                <div className="container">

                    <h2>Movies</h2>

                    <CardsQuery cards={results.movies} />

                </div>
            </section >

            <section id="series" className="query-list">
                <div className="container">

                    <h2>Series</h2>

                    <CardsQuery cards={results.series} />
                </div>
            </section >
        </main>
    );
}