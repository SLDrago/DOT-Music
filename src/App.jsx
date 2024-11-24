import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import PageTitle from "./components/PageTitle";
import Loader from "./components/Loader";
import Home from "./pages/Home/home";
import NotFound from "./pages/NotFound404/NotFound404";
import SignIn from "./pages/Authentication/signIn";

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Home | DOT Music" />
              <Home />
            </>
          }
        />
        <Route
          path="/signin"
          element={
            <>
              <PageTitle title="SignIn | DOT Music" />
              <SignIn />
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <PageTitle title="404 | DOT Music" />
              <NotFound />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
