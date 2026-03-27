export default function AppHeader({ search, setSearch, handleSubmit }) {
    return (
        <header>
            <div className="container">
                <div className="logo">
                    <h1>BoolFlix</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
                    <button type="submit">Cerca</button>
                </form>
            </div>
        </header>
    );
}