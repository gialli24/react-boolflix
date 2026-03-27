import AppHeader from "../components/AppHeader";
import { Outlet } from "react-router-dom";

export default function DefaultLayout({ search, setSearch, handleSubmit }) {

    return (
        <>
            <AppHeader search={search} setSearch={setSearch} handleSubmit={handleSubmit} />
            <Outlet />
        </>
    )
}