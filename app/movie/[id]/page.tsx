"use client";
import React, { useEffect, useState } from "react";
import Header from "../../(components)/Header";
import axios from "axios";
import { useParams } from "next/navigation";

export default function SingleMovie() {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const [rate, setRate] = useState(null);
  const [comment, setComment] = useState(null);
  const [error, setError] = useState(null);

  async function getMovie() {
    const { data } = await axios.get(`/api/movie`, {
      params: { id: params?.id },
    });
    setMovie(data);
  }
  useEffect(() => {
    getMovie();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      userId: localStorage.getItem("userId"),
      movieId: params?.id,
      rate: rate,
      comment: comment,
    };

    const { data } = await axios.post("/api/movie", payload);
    if (data.error) {
      return setError(data.error);
    }
    window.location.reload();
  };

  return (
    <div>
      <Header />
      <div className="relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full  flex-row">
        <div className="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white  shrink-0">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie?.posterImg}`}
            alt="card-image"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="px-6 overflow-scroll">
          <h6 className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
            {movie?.title}
          </h6>
          <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Description
          </h4>
          <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
            {movie?.description}
          </p>
          <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Release Date
          </h4>
          <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
            {movie?.releaseDate}
          </p>
          <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Feedback
          </h4>
          <div className="feebacks">
            {movie?.impressions.map((impression) => (
              <div
                key={impression.userId}
                className="block flex flex-col gap-3 mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700"
              >
                <div className="flex gap-3 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-user"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span className="font-bold">{impression.username}</span>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="stars flex gap-1">
                    {impression.rate && [...Array(parseInt(impression.rate))]?.map(() => (
                         <svg key={impression.rate} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                         className="w-5 h-5 text-yellow-700">
                         <path fill-rule="evenodd"
                           d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                           clip-rule="evenodd"></path>
                       </svg>
                      )
                    )}
                  </div>
                  <div className="text-sm text-gray-400">August 10, 2024</div>
                </div>
                <div className="text-sm leading-5">{impression.comment}</div>
              </div>
            ))}
          </div>
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
          <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Impression
          </h4>
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="small-range"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Rate
              </label>
              <input
                id="small-range"
                min={0}
                max={5}
                onChange={(e) => setRate(e.target.value)}
                type="range"
                className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
              />
            </div>
            <div>
              <label
                htmlFor="small-range"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Comment
              </label>

              <textarea
                id="message"
                onChange={(e) => setComment(e.target.value)}
                rows="4"
                className="block resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your thoughts here..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Send
            </button>
          </form>

          {/* <a href="#" className="inline-block"><button
        className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
        type="button">
        Learn More<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2" className="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
        </svg></button></a> */}
        </div>
      </div>
    </div>
  );
}
