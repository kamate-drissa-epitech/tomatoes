"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Statics() {
  const [globals, setGlobals] = useState([]);

  const getGlobals = async () => {
    const { data } = await axios.get("/api/statics");
    console.log(data);
    setGlobals(data);
  };
  useEffect(() => {
    getGlobals();
  }, []);

  const {users, fiveRecent,movies} =  globals
  
  return (
    <div>
      <div>Static</div>
      <div>{users}</div>
    </div>
  );
}
