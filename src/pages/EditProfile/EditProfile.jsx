import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const EditProfile = () => {
  var [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    birthday: "",
    new_password: "",
  });
  const [confpassword, setConfPassword] = useState("");
  const { token, user } = useAuth();
  const [profileImage, setProfileImage] = useState(
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`
  );

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/user-profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = response.data;

      setFormData({
        name: userData.name,
        email: userData.email,
        gender: userData.gender,
        birthday: userData.birthday,
        new_password: "",
      });
    } catch (error) {
      console.error(
        "Error fetching user data:",
        error.response?.data || error.message
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePWChange = (e) => {
    const { name, value } = e.target;
    if (name === "new_password") {
      setFormData((prev) => ({
        ...prev,
        new_password: value,
      }));
    } else if (name === "confpassword") {
      setConfPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.new_password || confpassword) {
      if (formData.new_password !== confpassword) {
        toast.error("Passwords do not match. Please try again.");
        return;
      }
    } else {
      const { new_password, ...rest } = formData;
      formData = rest;
    }

    try {
      await toast.promise(
        axiosInstance.patch(`${API_BASE_URL}/users/edit-user/`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        {
          pending: "Updating profile...",
          success: "Profile updated successfully!",
          error: "Failed to update profile. Please try again.",
        }
      );
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Profile Header */}
      <div className="bg-gray-800 p-8 flex items-center space-x-6">
        <div className="relative">
          <img
            src={profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-600"
          />
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const imageUrl = URL.createObjectURL(file);
                setProfileImage(imageUrl);
              }
            }}
          />
        </div>
        <div>
          <h2 className="text-4xl font-bold">{formData.name}</h2>
        </div>
      </div>

      {/* Edit Profile Form */}
      <div className="flex justify-center items-center mt-8">
        <div className="w-full max-w-2xl p-8">
          <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600"
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
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600"
              />
            </div>

            {/* Gender */}
            <div className="mb-6">
              <label htmlFor="gender" className="block text-sm mb-2">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600"
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>

            {/* Birthday */}
            <div className="mb-6">
              <label htmlFor="birthday" className="block text-sm mb-2">
                Birthday
              </label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                value={formData.birthday}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600"
              />
            </div>
            <hr />
            {/* Password */}
            <div className="mb-6 mt-6">
              <label htmlFor="new_password" className="block text-sm mb-2">
                New Password
              </label>
              <input
                type="password"
                id="new_password"
                name="new_password"
                value={formData.new_password}
                onChange={handlePWChange}
                className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600"
              />
              <label htmlFor="confpassword" className="block text-sm mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confpassword"
                name="confpassword"
                value={confpassword}
                onChange={handlePWChange}
                className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600"
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
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
