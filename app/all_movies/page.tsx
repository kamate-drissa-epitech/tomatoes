"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import axios from "axios";

export default function AllMovies() {
  const [data, setData] = useState([]);

  //  const [load, setLoad] = useState(false);
  // const addMovies = () =>{
  //     setMovies(prev => {
  //         return{...prev,
  //             genre: "horreur"
  //         }
  //     })
  // }
  const [page, setPage] = useState(1);
  function prev() {
    let value = page - 1;
    if (value == 0) value = 1;
    setPage(value);
  }
  function next() {
    let value = page + 1;
    setPage(value);
  }

  async function addToMovie(id : any) {
    const {data} = await axios.post('/api/movies/', {movieId : id})
    console.log(data);
  }

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=bbfff3f3d8d41e961ec990b33b20d3bb`
      );
      const reponse = await res.json();
      // console.log(reponse);

      setData(reponse.results);
      //   setLoad(true);
    };
    fetchMovies();
  }, [page]);
  //   console.log(data);

  console.log(data);
  

  return (
    <>
      <div className="flex h-screen bg-gray-200">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header onSidebarOpen={() => {}} />
          <main className="flex-1 px-6 overflow-x-hidden overflow-y-auto bg-gray-200">
            <div className="container  py-8 mx-auto">
              <h3 className="text-3xl font-medium text-gray-700">
                Manage movies
              </h3>
            </div>
            <div className="grid place-items-center gap-8">
              <div className="flex justify-between gap-10">
                <button
                  onClick={prev}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Prev
                </button>
                <button
                  onClick={next}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Next
                </button>
              </div>
              <div className="grid grid-rows-4 grid-flow-col gap-4">
                {data?.map((movies, index) => (
                    <div key={index} className="gap-10 h-[400px] w-[250px] relative">
                      <img
                        src={
                          "https://image.tmdb.org/t/p/w500/" +
                          movies["poster_path"]
                        }
                        alt=""
                      />
                       <button className="absolute bottom-8 left-2" onClick={() =>addToMovie(movies['id'])}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-plus-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                      </button>
                      {/* <p className="italic ">{movies.overview}</p> */}
                    </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
