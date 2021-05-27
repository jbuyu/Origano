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
    <form onSubmit={submitHandler} className="flex relative m-4 my-1">
      <input
        type="search"
        className="bg-purple-white shadow rounded border-0 p-2 w-3/5 "
        placeholder="Search product..."
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button
        type="submit"
        className="bg-indigo-500 text-white px-3 ml-2 rounded font-semibold"
      >
        Search
      </button>
    </form>
  );
};
