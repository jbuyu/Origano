import React, { useState } from "react";

export const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <form className="flex" onSubmit={submitHandler} class="relative mr-6 my-2">
      <input
        type="search"
        className="bg-purple-white shadow rounded border-0 p-3"
        placeholder="Search..."
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button
        type="submit"
        className="bg-indigo-500 text-white p-2 ml-4 rounded font-semibold"
      >
        Search
      </button>
    </form>
  );
};
