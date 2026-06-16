"use client";

import axios from "axios";
import { useState } from "react";

export default function RegisterPage() {

  const [form,setForm] = useState({
    name:"",
    email:"",
    password:""
  });

  const register = async() => {

    await axios.post(
      "/api/register",
      form
    );

    alert("Registered");

    window.location.href="/login";
  };

  return (
    <div className="flex justify-center mt-10">

      <div className="border p-6 w-[350px]">

        <h1 className="text-3xl mb-4">
          Create Account
        </h1>

        <input
          placeholder="Name"
          className="border w-full p-2 mb-3"
          onChange={(e)=>
            setForm({
              ...form,
              name:e.target.value
            })
          }
        />

        <input
          placeholder="Email"
          className="border w-full p-2 mb-3"
          onChange={(e)=>
            setForm({
              ...form,
              email:e.target.value
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-3"
          onChange={(e)=>
            setForm({
              ...form,
              password:e.target.value
            })
          }
        />

        <button
          onClick={register}
          className="bg-yellow-400 w-full p-2"
        >
          Register
        </button>

      </div>

    </div>
  );
}