import React from "react";
import { useRef } from "react";
import { useState } from "react";

export default function SearchBar(props) {
  const [filteredData, setFilteredData] = useState([]);
  const inputRef = useRef();
  // console.log("In searchBar");
  const dataToBeSearched = props.dataToBeSearched;

  const dataChangeHandler = (event) => {
    const searchedWord = event.target.value;
    // console.log(dataToBeSearched);
    // console.log(searchedWord);
    const newFilteredData = dataToBeSearched.filter((item) =>
      item.userName.toLowerCase().includes(searchedWord.toLowerCase())
    );
    if (searchedWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilteredData);
    }
  };

  const itemSelectHandler = (event) => {
    setFilteredData([]);
    inputRef.current.value = "";
    props.onItemSelected(event.target.id);
  };

  return (
    <>
      <input
        onChange={dataChangeHandler}
        type="text"
        className="form-control"
        id="searchedWord"
        placeholder={props.placeholder}
        ref={inputRef}
      />

      {filteredData.length > 0 && (
        <div className="absolute z-50 bg-slate-50 mt-1 h-auto max-h-52 overflow-y-scroll w-9/12 rounded-md scroll-smooth px-3">
          <ul>
            {filteredData.map((item) => (
              <li
                className="cursor-pointer hover:bg-sky-700 hover:text-slate-100 px-1 my-1 ease-in-out duration-300 rounded-sm"
                key={item.id}
                onClick={itemSelectHandler}
                id={item.id}
              >
                {item.userName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
