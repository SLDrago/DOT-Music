import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomeMain = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return <div className="text-center py-4 text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="bg-red-500 text-white p-4 rounded-lg">{error}</div>;
  }

  return (
    <div className="p-6">
      {/* Total Songs Card */}
      <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-semibold">Total Songs</h1>
        <p className="text-4xl font-bold">{songs.length}</p>
      </div>
    </div>
  );
};

export default HomeMain;
