import React from 'react';

const Search = () => {
  return (
    <div className="flex gap-4 items-center py-4">
      <div className="flex">
        <button className="px-2 py-1 text-lg">Phone</button>
        <button className="px-2 py-1 text-lg">Laptop</button>
        <button className="px-2 py-1 text-lg">PC</button>
        <button className="px-2 py-1 text-lg">Accessory</button>
      </div>
      <div className="py-2 px-4 bg-white bg-opacity-90 flex w-2/3 rounded">
        <input
          type="text"
          className="outline-none bg-transparent flex-1 text-gray-700"
          placeholder="Search..."
        />
        <button className="px-4 py-1 bg-red-400 rounded text-white">Search</button>
      </div>
    </div>
  );
};

export default Search;
