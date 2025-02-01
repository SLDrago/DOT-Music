import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import BottomRightLayout from '../Home/bottomRightLayout';
import '@fortawesome/fontawesome-free/css/all.min.css';

const SingleSection = () => {
  const { artistId } = useParams();
  const [songs, setSongs] = useState([]);
  const [artistName, setArtistName] = useState('');
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/songs/artist/${artistId}`);
        const data = await response.json();
        if (data.songs) setSongs(data.songs);
        if (data.artist_name) setArtistName(data.artist_name);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchSongs();
  }, [artistId]);

  const openModal = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  const closeModal = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setCurrentSongIndex(null);  // Reset the current song index to close the modal
  };

  const playPrevious = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex((prevIndex) => prevIndex - 1);
      setIsPlaying(true);
    }
  };

  const playNext = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex((prevIndex) => prevIndex + 1);
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch((err) => console.error('Audio play error:', err));
    }
  }, [currentSongIndex, isPlaying]);

  return (
    <>
      <div
        style={{
          backgroundImage: `url('https://rmc.dk/sites/default/files/styles/background_full_wide/public/node/field_image/rmc_uddannelse_music_management_0.jpg?h=d88fbc39&itok=qdS2rNsO')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          fontSize: '78px',
        }}
        className="font-extrabold pt-10 pb-10 px-5 rounded-lg text-white"
      >
        {artistName || 'Artist'}
      </div>

      <div className="mx-8 my-4">
        <div className="mt-16 text-xl font-semibold">
          <div className="font-bold text-2xl pb-5">Popular</div>
          <table className="table-auto w-full text-left border-collapse">
            <tbody className="text-base">
              {songs.length > 0 ? (
                songs.map((song, index) => (
                  <tr
                    key={song.id}
                    className="hover:bg-gray-800 cursor-pointer"
                    onClick={() => openModal(index)}
                  >
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 pr-10">
                      <img
                        src={`http://127.0.0.1:8000/media/${song.cover_image}`}
                        alt="Song Cover"
                        className="w-14 h-14 rounded-md"
                      />
                    </td>
                    <td className="py-2 pr-20">{song.title}</td>
                    <td className="py-2">{song.genre}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-2 text-center">
                    No songs available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Background with close event */}
      {currentSongIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
        >
          <div
            className="bg-slate-800 rounded-lg p-8 max-w-md w-full relative"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{songs[currentSongIndex]?.title}</h2>
              <button
                onClick={closeModal} // Close modal when close button is clicked
                className="text-red-500 text-lg font-bold"
              >
                ✖
              </button>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={`http://127.0.0.1:8000/media/${songs[currentSongIndex]?.cover_image}`}
                alt="Song Cover"
                className="w-80 h-80 mb-4 rounded-xl"
              />
              <audio
                ref={audioRef}
                src={`http://127.0.0.1:8000/media/${songs[currentSongIndex]?.audio_file}`}
                controls
                autoPlay
              />
              <div className="w-full flex justify-center items-center space-x-4 my-4">
                <button
                  className="bg-gray-200 text-black py-2 px-4 rounded"
                  onClick={playPrevious}
                  disabled={currentSongIndex === 0}
                >
                  <i className="fas fa-backward"></i>
                </button>
                <button
                  className={`py-2 px-4 rounded ${isPlaying ? 'bg-red-600' : 'bg-green-600'} text-white`}
                  onClick={togglePlayPause}
                >
                  <i className={isPlaying ? 'fas fa-pause' : 'fas fa-play'}></i>
                </button>
                <button
                  className="bg-gray-200 text-black py-2 px-4 rounded"
                  onClick={playNext}
                  disabled={currentSongIndex === songs.length - 1}
                >
                  <i className="fas fa-forward"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mx-8 my-4 mt-16">
        <BottomRightLayout />
      </div>
    </>
  );
};

export default SingleSection;
