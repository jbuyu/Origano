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
    <form onSubmit={submitHandler} className="flex relative mr-6 my-2">
      <input
        type="search"
        className="bg-purple-white shadow rounded border-0 p-3"
        placeholder="Search product..."
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button
        type="submit"
        className="bg-indigo-500 text-white px-3 ml-4 rounded font-semibold"
      >
        Search
      </button>
    </form>
  );
};
