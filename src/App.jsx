import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import DefaultLayout from "./layouts/DefaultLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<SearchPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
