import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlay, FaPause, FaTrash, FaEdit } from 'react-icons/fa';
import { Dialog } from '@headlessui/react';

const YourLibrary = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSongId, setCurrentSongId] = useState(null);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [songToDelete, setSongToDelete] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [newSong, setNewSong] = useState({
    title: '',
    genre: '',
    releaseDate: '',
    bio: '',
    audioFile: null,
    coverImage: null,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('Authentication token is missing.');

        const response = await axios.get('http://localhost:8000/api/songs/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setSongs(response.data);
      } catch (error) {
        console.error('Error fetching songs:', error);
        setError('Unable to fetch your songs. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

  const handleAddSongSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newSong.title);
    formData.append('genre', newSong.genre);
    formData.append('release_date', newSong.releaseDate);
    formData.append('bio', newSong.bio);
    formData.append('audio_file', newSong.audioFile);
    formData.append('cover_image', newSong.coverImage);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Authentication token is missing.');

      await axios.post('http://localhost:8000/api/songs/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${token}`,
        },
      });

      const response = await axios.get('http://localhost:8000/api/songs/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setSongs(response.data);
      setShowAddModal(false);
      setNewSong({
        title: '',
        genre: '',
        releaseDate: '',
        bio: '',
        audioFile: null,
        coverImage: null,
      });
      setError(null);
    } catch (error) {
      console.error('Error adding song:', error.response?.data || error);
      setError(error.response?.data?.error || 'An error occurred while adding the song');
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Authentication token is missing.');

      await axios.delete(`http://localhost:8000/api/songs/${songToDelete.id}/delete/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      setSongs(songs.filter((song) => song.id !== songToDelete.id));
      setShowDeleteModal(false);
      setError(null);
    } catch (error) {
      console.error('Error deleting song:', error);
      setError('Unable to delete the song. Please try again.');
    }
  };

  const handleEdit = (song) => {
    setSelectedSong(song);
    setShowEditModal(true);
    setNewSong({
      title: song.title,
      genre: song.genre,
      releaseDate: song.release_date,
      bio: song.bio,
      audioFile: null,
      coverImage: null,
    });
  };

  const handleUpdateSongSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newSong.title);
    formData.append('genre', newSong.genre);
    formData.append('release_date', newSong.releaseDate);
    formData.append('bio', newSong.bio);
    if (newSong.audioFile) formData.append('audio_file', newSong.audioFile);
    if (newSong.coverImage) formData.append('cover_image', newSong.coverImage);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Authentication token is missing.');

      await axios.put(`http://localhost:8000/api/songs/${selectedSong.id}/update/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${token}`,
        },
      });

      const response = await axios.get('http://localhost:8000/api/songs/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setSongs(response.data);
      setShowEditModal(false);
      setError(null);
    } catch (error) {
      console.error('Error updating song:', error.response?.data || error);
      setError(error.response?.data?.error || 'An error occurred while updating the song');
    }
  };

  const confirmDelete = (song) => {
    setSongToDelete(song);
    setShowDeleteModal(true);
  };

  const togglePlay = (song) => {
    if (currentSongId === song.id) {
      if (playing) {
        audioPlayer.pause();
      } else {
        audioPlayer.play();
      }
      setPlaying(!playing);
    } else {
      if (audioPlayer) {
        audioPlayer.pause();
      }
      const newAudioPlayer = new Audio(song.audio_file);
      newAudioPlayer.play().catch((err) => {
        console.error('Error playing audio:', err);
        setError('Audio playback failed. Ensure the file format is supported.');
      });
      setAudioPlayer(newAudioPlayer);
      setPlaying(true);
      setCurrentSongId(song.id);
    }
  };

  if (loading) {
    return <div className="text-center py-4 text-xl">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-white">Your Library</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Add Song
        </button>
      </div>

      {error && <div className="bg-red-500 text-white p-3 mb-4">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {songs.map((song) => (
          <div key={song.id} className="bg-gray-800 text-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <div className="relative">
              {song.cover_image ? (
                <img
                  src={song.cover_image}
                  alt={song.title}
                  className="w-full h-56 object-cover rounded-t-lg"
                />
              ) : (
                <div className="w-full h-56 bg-gray-600 flex items-center justify-center rounded-t-lg">
                  <span>No Image</span>
                </div>
              )}
              <button
                onClick={() => togglePlay(song)}
                className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition duration-300"
              >
                {currentSongId === song.id && playing ? <FaPause size={24} /> : <FaPlay size={24} />}
              </button>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold">{song.title}</h2>
              <p className="text-sm text-gray-400">{song.artist_name}</p>
              <p className="text-sm text-gray-400">Genre: {song.genre}</p>
              <p className="text-sm text-gray-400">Released: {song.release_date}</p>
              <p className="mt-2 text-sm text-gray-300">{song.bio}</p>
            </div>
            <div className="flex justify-between p-4">
              <button
                onClick={() => handleEdit(song)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={() => confirmDelete(song)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Song Modal */}
      <Dialog open={showAddModal} onClose={() => setShowAddModal(false)}>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <Dialog.Title className="text-xl font-semibold mb-4">Add a New Song</Dialog.Title>
            <form onSubmit={handleAddSongSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={newSong.title}
                onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <select
                value={newSong.genre}
                onChange={(e) => setNewSong({ ...newSong, genre: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Genre</option>
                <option value="pop">Pop</option>
                <option value="rock">Rock</option>
                <option value="hip_hop">Hip-Hop</option>
                <option value="jazz">Jazz</option>
                <option value="classical">Classical</option>
                <option value="reggae">Reggae</option>
                <option value="electronic">Electronic</option>
                <option value="country">Country</option>
                <option value="blues">Blues</option>
                <option value="metal">Metal</option>
              </select>
              <input
                type="date"
                value={newSong.releaseDate}
                onChange={(e) => setNewSong({ ...newSong, releaseDate: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <textarea
                placeholder="Bio"
                value={newSong.bio}
                onChange={(e) => setNewSong({ ...newSong, bio: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="file"
                onChange={(e) => setNewSong({ ...newSong, audioFile: e.target.files[0] })}
                accept="audio/*"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="file"
                onChange={(e) => setNewSong({ ...newSong, coverImage: e.target.files[0] })}
                accept="image/*"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Add Song
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>

      {/* Edit Song Modal */}
      <Dialog open={showEditModal} onClose={() => setShowEditModal(false)}>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <Dialog.Title className="text-xl font-semibold mb-4">Edit Song</Dialog.Title>
            <form onSubmit={handleUpdateSongSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={newSong.title}
                onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <select
                value={newSong.genre}
                onChange={(e) => setNewSong({ ...newSong, genre: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Genre</option>
                <option value="pop">Pop</option>
                <option value="rock">Rock</option>
                <option value="hip_hop">Hip-Hop</option>
                <option value="jazz">Jazz</option>
                <option value="classical">Classical</option>
                <option value="reggae">Reggae</option>
                <option value="electronic">Electronic</option>
                <option value="country">Country</option>
                <option value="blues">Blues</option>
                <option value="metal">Metal</option>
              </select>
              <input
                type="date"
                value={newSong.releaseDate}
                onChange={(e) => setNewSong({ ...newSong, releaseDate: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <textarea
                placeholder="Bio"
                value={newSong.bio}
                onChange={(e) => setNewSong({ ...newSong, bio: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="file"
                onChange={(e) => setNewSong({ ...newSong, audioFile: e.target.files[0] })}
                accept="audio/*"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="file"
                onChange={(e) => setNewSong({ ...newSong, coverImage: e.target.files[0] })}
                accept="image/*"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <Dialog.Title className="text-xl font-semibold mb-4">Confirm Delete</Dialog.Title>
            <p>Are you sure you want to delete the song "{songToDelete?.title}"?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md mr-4"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default YourLibrary;
