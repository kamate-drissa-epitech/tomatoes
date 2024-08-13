"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "../../(components)/Header";

export default function User() {
  const [user, setUser] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState(null);
  const [oldPassword, setOldPassword] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState('')
  const router = useRouter();
  const params = useParams();

  const getUser = async () => {
    // Check if user is connected
    const userId = localStorage.getItem('userId')
    if(!userId) {
      router.push('/auth/login')
    }
    //Fectch connected user
    const { data } = await axios.get(`/api/user`, {
      params: { id: userId },
    });
    if(data.error) {
      router.push('/auth/login')
    }

    setUser(data.user);
    setFavoriteMovies(data.favoriteMovies);
  };

  useEffect(() => {
    getUser();
  }, []);

  // Handle update user
  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const filterName = /^[a-zA-Z0-9._ -]+$/;
    if (!filterName.test(user.username)) {
      return setError("Please provide right name");
    }
    const filterEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!filterEmail.test(user.email)) {
      return setError("Invalid email");
    }
    if (user.password.length < 6) {
      return setError("Password must more than 6 characters");
    }

    if (user.password === "" && oldPassword === "") {
      return setError("Please fill all field");
    }
    const payload = {
      ...user,
      oldPassword: oldPassword,
    };
    const { data } = await axios.put("/api/user", payload, {
      params: { id: params.id },
    });
    // Set error
    if (data.error) {
      return setError(data.error);
    }else{
      setSuccess(data.success)
    }
    
  };

  //Delete user
  async function deleteUser(id: string) {
    const { data } = await axios.delete("/api/users", { params: { id: id } });
    localStorage.removeItem("userId");
    router.push("/auth/register");
  }

  async function deleteFavorite(id: string) {
    const {data} = await axios.delete("/api/user", {params : {userId : params.id, movieId : id}})
    console.log(data);
    window.location.reload()
  }

  return (
    <div>
      <Header />
      <div className="flex gap-20  px-4 py-3">
        <section className="bg-white  dark:bg-gray-900">
          <div className="shadow border-2 rounded max-w-2xl p-8 mx-auto">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Update your Profile
            </h2>
            <form>
            {success && (
              <div className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
              <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">{success}</span>
              </div>
            </div>
              )}
              {error && (
                <div
                  className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                  role="alert"
                >
                  <svg
                    className="flex-shrink-0 inline w-4 h-4 me-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">{error}</span>
                  </div>
                </div>
              )}
              <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                <div className="w-full">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="username"
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                    value={user?.username}
                    required
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    email
                  </label>
                  <input
                    type="email"
                    id="email"
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="example@gmail.com"
                    value={user?.email}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="oldPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Old password
                  </label>
                  <input
                    type="password"
                    onChange={(e) => setOldPassword(e.target.value)}
                    id="oldPassword"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    New password
                  </label>
                  <input
                    type="password"
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    id="password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="text-blue-600 inline-flex items-center hover:text-white border border-blue-600 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900"
                >
                  Update account
                </button>
                <button
                  onClick={() => deleteUser(user?._id)}
                  type="button"
                  className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  <svg
                    className="w-5 h-5 mr-1 -ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Delete account
                </button>
              </div>
            </form>
          </div>
        </section>
        <section className="bg-white  dark:bg-gray-900">
          <div className="shadow border-2 rounded max-w-2xl p-8 mx-auto">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Manage your favorite
            </h2>
            <div className="relative overflow-x-auto sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      release date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      poster
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {favoriteMovies?.map((favorite) => (
                    <tr key={favorite.movieId} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {favorite.title}
                      </th>
                      <td className="px-6 py-4">{favorite.releaseDate}</td>
                      <td className="px-6 py-4">
                        <img
                          className="w-[20px] h-[20px]"
                          src={`https://image.tmdb.org/t/p/original/${favorite.posterImg}`}
                          alt=""
                        />
                      </td>
                      <td className="px-6 py-4 flex gap-5">
                        <p
                          onClick={() => deleteFavorite(favorite.movieId)}
                          className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline"
                        >
                          delete
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
