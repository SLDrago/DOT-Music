import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import PageTitle from "./components/PageTitle";
import Loader from "./components/Loader";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound404/NotFound404";
import SignIn from "./pages/Authentication/signIn";
import SignUp from "./pages/Authentication/SignUp";
import ResetPasswordRequest from "./pages/Authentication/ResetPasswordRequest";

import EditProfile from "./pages/EditProfile/EditProfile";
import ResetPassword from "./pages/Authentication/ResetPassword";
import Podcast from "./pages/podcast/Podcast";
import Artists from "./pages/Artists/Artists";
import Albums from "./pages/Albums/Albums";
import Radios from "./pages/Radios/Radios";
import SingleSection from "./pages/SingleSection/SingleSection";
import AdminLogin from "./pages/ArtistAdminPanel/Login";
import AdminRegister from "./pages/ArtistAdminPanel/Register";
import AdminHome from "./pages/ArtistAdminPanel/Home";

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
          path="/signup"
          element={
            <>
              <PageTitle title="SignUp | DOT Music" />
              <SignUp />
            </>
          }
        />
        <Route
          path="/reset-password-request"
          element={
            <>
              <PageTitle title="Reset Password | DOT Music" />
              <ResetPasswordRequest />
            </>
          }
        />
        <Route
          path="/reset-password/*"
          element={
            <>
              <PageTitle title="Reset Password | DOT Music" />
              <ResetPassword />
            </>
          }
        />
        <Route
          path="/bodcast"
          element={
            <>
              <PageTitle title="Bodcast | DOT Music" />
              <Podcast/>
            </>
          }
        />
        <Route
          path="/full-artists"
          element={
            <>
              <PageTitle title="Artists | DOT Music" />
              <Artists/>
            </>
          }
        />
        <Route
          path="/full-albums"
          element={
            <>
              <PageTitle title="Album | DOT Music" />
              <Albums/>
            </>
          }
        />
        <Route
          path="/full-radio"
          element={
            <>
              <PageTitle title="Radios | DOT Music" />
              <Radios/>
            </>
          }
        />
        <Route
          path="/SingleSection/:artistId" 
          element={
            <>
              <PageTitle title="Radios | DOT Music" />
              <SingleSection />
            </>
          }
            />
           <Route 
          path="/edit-profile"
          element={
            <>
              <PageTitle title="Edit Profile | DOT Music" />
              <EditProfile />
            </>
          }
        />
        <Route
          path="/ArtistAdminPanel/login"
          element={
            <>
              <PageTitle title="Artist Login | DOT Music" />
              <AdminLogin />
            </>
          }
        />
        <Route
          path="/ArtistAdminPanel/register"
          element={
            <>
              <PageTitle title="Artist Register | DOT Music" />
              <AdminRegister />
            </>
          }
        />
        <Route
          path="/ArtistAdminPanel/home"
          element={
            <>
              <PageTitle title="Artist Panel | DOT Music" />
              <AdminHome />
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
