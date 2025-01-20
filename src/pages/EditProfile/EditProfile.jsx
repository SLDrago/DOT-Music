// EditProfile.js
import { useState } from "react";

const EditProfile = () => {
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/150" // Placeholder image
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Profile Header */}
      <div className="bg-gray-800 p-8 flex items-center space-x-6">
        <div className="relative">
          {/* Profile Picture */}
          <img
            src={profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-600"
          />
          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleImageChange}
          />
        </div>
        {/* User Details */}
        <div>
          <h2 className="text-4xl font-bold">Dilshanoshada</h2>
          <p className="text-gray-400">1 Follower • 11 Following</p>
        </div>
      </div>

      {/* Edit Profile Form */}
      <div className="flex justify-center items-center mt-8">
        <div className="w-full max-w-2xl p-8">
          <h1 className="text-3xl font-bold mb-8">Edit profile</h1>

          <form>
            {/* name */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value="DilshanOshada"
                disabled
                className="w-full p-3 bg-gray-800 text-gray-400 rounded-lg border border-gray-600"
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value="dilshanoshada7@gmail.com"
                className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 hover:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="********"
                className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 hover:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            {/* Gender */}
            <div className="mb-6">
              <label htmlFor="gender" className="block text-sm mb-2">
                Gender
              </label>
              <select
                id="gender"
                className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 hover:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div className="mb-6 grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="day" className="block text-sm mb-2">
                  Day
                </label>
                <input
                  type="number"
                  id="day"
                  value="15"
                  className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 hover:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="month" className="block text-sm mb-2">
                  Month
                </label>
                <select
                  id="month"
                  className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 hover:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  <option value="December">December</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="july">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                </select>
              </div>
              <div>
                <label htmlFor="year" className="block text-sm mb-2">
                  Year
                </label>
                <input
                  type="number"
                  id="year"
                  value="2000"
                  className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 hover:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Country */}
            <div className="mb-6">
              <label htmlFor="country" className="block text-sm mb-2">
                Country or region
              </label>
              <input
                type="text"
                id="country"
                value="Sri Lanka"
                disabled
                className="w-full p-3 bg-gray-800 text-gray-400 rounded-lg border border-gray-600"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                type="button"
                className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-orange-500 text-black rounded-lg font-medium hover:bg-orange-600"
              >
                Save profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
