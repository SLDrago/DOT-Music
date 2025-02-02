import React, { useEffect, useState } from "react";
import BottomRightLayout from "./bottomRightLayout";
import { Link } from "react-router-dom";

const BodyRightLayout = () => {
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [popularRadio, setPopularRadio] = useState([]);
  const [todayInMusic, setTodayInMusic] = useState([]);

  // Fetch Artists
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/artists/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.artists); // Log the artists array to check profile_picture values
        setArtists(data.artists);
      })
      .catch((error) => console.error("Error fetching artists:", error));
  }, []);

  // Fetch Albums
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/albums/")
      .then((response) => response.json())
      .then((data) => setAlbums(data.albums))
      .catch((error) => console.error("Error fetching albums:", error));
  }, []);

  // Fetch Popular Radio
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/popular-radio/")
      .then((response) => response.json())
      .then((data) => setPopularRadio(data.popular_radio))
      .catch((error) => console.error("Error fetching popular radio:", error));
  }, []);

  // Fetch Today In Music
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/today-in-music/")
      .then((response) => response.json())
      .then((data) => setTodayInMusic(data.today_in_music))
      .catch((error) => console.error("Error fetching popular radio:", error));
  }, []);

  return (
    <div className="mx-8 my-4 mt-16">
      <div className="mb-10">
        {/* Header Section */}
        <span className="flex flex-row justify-between pb-4">
          <div className="text-2xl font-extrabold">Popular artists</div>
          <div className="text-sm font-bold cursor-pointer hover:underline">
            <a href="./full-artists">Show all</a>
          </div>
        </span>

        {/* Artists Section */}
        <div className="grid grid-cols-5 gap-4">
          {/* Artist Card */}
          {artists.map((artist) => (
            <Link to={`SingleSection/${artist.id}`} key={artist.id}>
              {" "}
              {/* Link to artist song page */}
              <div className="flex flex-col items-center hover:bg-slate-700 p-2 rounded-lg cursor-pointer">
                <div className="relative w-40 h-40">
                  <img
                    src={`http://127.0.0.1:8000/media/${artist.profile_picture}`}
                    alt={artist.name}
                    className="rounded-full w-40 h-40 object-cover"
                  />
                  <div className="absolute inset-0 flex items-end justify-end bg-black bg-opacity-40 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-16 h-16 text-orange-500 bg-black rounded-full"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <span className="text-base font-medium mt-2 self-start hover:underline hover:underline-offset-2">
                  {artist.user__name}
                </span>
                <span className="text-sm font-medium mt-1 self-start text-gray-400">
                  {artist.genre}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mb-10">
        {/* Header Section */}
        <span className="flex flex-row justify-between pb-4">
          <div className="text-2xl font-extrabold">Popular albums</div>
          <div className="text-sm font-bold cursor-pointer hover:underline">
            <a href="./full-albums">Show all</a>
          </div>
        </span>

        {/* Album Section */}
        <div className="grid grid-cols-5 gap-4">
          {/* Artist Card */}
          {albums.map((album) => (
            <div
              key={album.id}
              className="flex flex-col items-center hover:bg-slate-700 p-2 rounded-lg cursor-pointer"
            >
              <div className="relative w-40 h-40">
                <img
                  // src='https://media.assettype.com/newindianexpress%2F2024-10-11%2Fpzbzhg9f%2FAnirudh.png'
                  src={`http://127.0.0.1:8000/media/${album.cover_image}`}
                  alt={album.title}
                  className="w-40 h-40 object-cover"
                />
                <div className="absolute inset-0 flex items-end justify-end bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-16 h-16 text-orange-500 bg-black rounded-full"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <span className="text-base font-medium mt-2 self-start hover:underline hover:underline-offset-2">
                {album.title}
              </span>
              <span className="text-sm font-medium mt-1 self-start text-gray-400">
                {album.genre}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-10">
        {/* Header Section */}
        <span className="flex flex-row justify-between pb-4">
          <div className="text-2xl font-extrabold">Popular radio</div>
          <div className="text-sm font-bold cursor-pointer hover:underline">
            <a href="./full-radio">Show all</a>
          </div>
        </span>
        {/* Radio Section */}
        <div className="grid grid-cols-5 gap-4">
          {/* Radio Card */}
          {popularRadio.map((pr) => (
            <div className="flex flex-col items-center hover:bg-slate-700 p-2 rounded-lg cursor-pointer">
              <div className="relative w-40 h-40">
                <img
                  src={`http://127.0.0.1:8000/media/${pr.cover_image}`}
                  alt={pr.name}
                  className="w-40 h-40 object-cover"
                />
                <div className="absolute inset-0 flex items-end justify-end bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-16 h-16 text-orange-500 bg-black rounded-full"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <span
                className="text-sm font-medium mt-1 self-start text-gray-400"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {pr.description}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-10">
        {/* Header Section */}
        <span className="flex flex-row justify-between pb-4">
          <div className="text-2xl font-extrabold">Today in Music</div>
          <div className="text-sm font-bold cursor-pointer hover:underline">
            Show all
          </div>
        </span>

        {/* Today In Music Section */}
        <div className="grid grid-cols-5 gap-4">
          {/* Today In Music Card */}
          {todayInMusic.map((tim) => (
            <div className="flex flex-col items-center hover:bg-slate-700 p-2 rounded-lg cursor-pointer">
              <div className="relative w-40 h-40">
                <img
                  src={`http://127.0.0.1:8000/media/${tim.image}`}
                  alt="Anirudh Ravichander"
                  className="w-40 h-40 object-cover"
                />
                <div className="absolute inset-0 flex items-end justify-end bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-16 h-16 text-orange-500 bg-black rounded-full"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <span
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                className="text-sm font-medium mt-1 self-start text-gray-400"
              >
                {tim.description}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-8 my-4 mt-16">
        <BottomRightLayout />
      </div>
    </div>
  );
};

export default BodyRightLayout;
