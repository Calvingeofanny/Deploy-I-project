import { useState, useEffect } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { baseUrl } from "../../api/baseUrl";

const Profile = () => {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const fetchProfile = async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: baseUrl + `/profile`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      // console.log(data);
      setUser(data);
      setUsername(data.username);
      setEmail(data.email);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpload = async (e, id) => {
    try {
      const file = e.target.files[0];

      // console.log(file, "ini loh");

      if (!file) return;

      let formData = new FormData();
      formData.append("file", file);

      const { data } = await axios.patch(
        baseUrl + "/change-profile/" + id,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      console.log(data, "data change profile");

      // const { data } = await axios({
      //   method: "PATCH",
      //   url: baseUrl + `/change-profile/${id}`,
      //   headers: {
      //     Authorization: `Bearer ${localStorage.access_token}`,
      //   },
      //   data: formData,
      // });

      fetchProfile();

      Toastify({
        text: `${data.message}`,
        duration: 3000,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    } catch (error) {
      console.log(error, "error change profile");
      Toastify({
        text: `${error.response.data.message}`,
        duration: 3000,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #ff416c, #ff4b2b)",
        },
      }).showToast();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <img className="rounded-full w-50" src={user?.image} alt="" />
          </div>

          <div className="flex justify-center mb-5">
            <input
              type="file"
              id={`uploadFile${user?.id}`}
              onChange={(e) => handleUpload(e, user?.id)}
              className="hidden"
              accept="image/*"
            />
            <label
              htmlFor={`uploadFile${user?.id}`}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg cursor-pointer hover:from-purple-600 hover:to-purple-700 transition duration-300 shadow-md"
            >
              <i className="fas fa-camera mr-2"></i>
              Change Image
            </label>
          </div>

          <form
            className="space-y-6"
            action="#"
            method="POST"
            encType="multipart/form-data"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username:
                </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email:
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                  type="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* <div>
                <div className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Save Changes
                </div>
              </div> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
