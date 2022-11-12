import React from 'react'
import { useState } from 'react';
import Db from './bookapi';
import "./index.css"
import "./App.css"
import ReactPaginate from 'react-paginate';

const App = () => {
  const [filteredList, setFilteredList] = useState(Db);
  const [searchQuery, setSearchQuery] = useState({name:"",author:"",subject:""});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const handleSearch = (event) => {
  const query = event.target.value;
  setSearchQuery({
    ...searchQuery,
    [event.target.name]: query
  });

  const searchList = Db.filter((item) => {
    return (item.name.toLowerCase().indexOf(searchQuery.name.toLowerCase()) !== -1) &&
     (item.author.toLowerCase().indexOf(searchQuery.author.toLowerCase()) !== -1) &&
     (item.subject.toLowerCase().indexOf(searchQuery.subject.toLowerCase()) !== -1);
  });
  setFilteredList(searchList);
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////

  
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  const displayUsers = filteredList
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((user) => {
        return (
          
          <div className="card-container" key={user.id}>
            <div className="card ">
              <div className="card-body">
                <span className="card-number card-circle subtle">{user.id}</span>
                <span className="card-author subtle">Date: {user.date}</span>
                <span className="card-author subtle">Author: {user.author}</span>
                <h6 className="card-title">Title: {user.name} </h6>
                <span className="card-description subtle">
                 Subject: {user.subject}
                </span>
              </div>
              <img src={user.image} alt="images" className="card-media" />
            </div>
          </div>
        );
      });
    const pc=filteredList.length;
  const pageCount = Math.ceil(filteredList.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="container">
      <h1>Online Library</h1>

      <div className="list-wrapper">
        <div className="filter-container">
          <input type="text" id="search" placeholder="Search Title" name="name" value={searchQuery.name} onChange={handleSearch} />
        </div>
        <div className="filter-container">
          <input type="text" id="search2" placeholder="Search Author" name="author" value={searchQuery.author} onChange={handleSearch} />
        </div>
        <div className="filter-container">
          <input type="text" id="search3" placeholder="Search Subject" name="subject" value={searchQuery.subject} onChange={handleSearch} />
        </div>
        {/* <div className="filter-container">
          <input type="date" id="search4" placeholder="Search Date" value={searchQuery4} onChange={handleSearch} />
        </div> */}
        <span id="pc">TOTAL RESULT FOUND:{pc}</span>

        <section className="main-card--cointainer">
        {displayUsers}
        </section>

        <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />

      </div>
    </div>
    //Search list of objects

  )}
  //////////////////////////////////////////////////////////////////////////////////////////////////////

export default App