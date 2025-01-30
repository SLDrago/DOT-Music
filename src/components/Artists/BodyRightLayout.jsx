import React, { useEffect, useState } from 'react';
import BottomRightLayout from '../Home/bottomRightLayout';

const BodyRightLayout = () => {
  const [artists, setArtists] = useState([]);

  // Fetch Artists
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/full-artists/')
      .then((response) => response.json())
      .then((data) => {
        console.log(data.artists); // Log the artists array to check profile_picture values
        setArtists(data.artists || []); // Handle cases where `artists` might be undefined
      })
      .catch((error) => console.error('Error fetching artists:', error));
  }, []);

  return (
    <div className="mx-8 my-4 mt-16">
      <div className="mb-10">
        {/* Header Section */}
        <span className="flex flex-row justify-between pb-4">
          <div className="text-2xl font-extrabold">Popular Artists</div>
        </span>

        {/* Artists Section */}
        <div className="grid grid-cols-5 gap-4">
          {artists.map((artist) => (
            <div
              key={artist.id} // Use a unique identifier
              className="flex flex-col items-center hover:bg-slate-700 p-2 rounded-lg cursor-pointer"
            >
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
                {artist.name}
              </span>
              <span className="text-sm font-medium mt-1 self-start text-gray-400">
                {artist.genre}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className='mx-8 my-4 mt-16'>
        <BottomRightLayout/>
      </div>
    </div>
  );
};

export default BodyRightLayout;
