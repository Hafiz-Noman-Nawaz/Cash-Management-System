// src/pages/Records.js or wherever you place it

import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
const Records = () => {
  const [allRecords, setAllRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [search, setSearch] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const headers = [
    { label: "Username", key: "username" },
    { label: "Income", key: "income" },
    { label: "Expense", key: "expense" },
    { label: "Description", key: "description" },
    { label: "Category", key: "category" },
    { label: "Date", key: "date" },
  ];
  useEffect(() => {
    const stored = localStorage.getItem('data');
    if (stored) {
      const parsedData = JSON.parse(stored);
      setAllRecords(parsedData);
      setFilteredRecords(parsedData);
    }
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    applyFilters(value, fromDate, toDate);
  };

  const applyFilters = (searchTerm, from, to) => {
    let filtered = allRecords;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.username.toLowerCase().includes(searchTerm)
      );
    }

    if (from && to) {
      const fromTime = new Date(from).getTime();
      const toTime = new Date(to).getTime();
      filtered = filtered.filter(item => {
        const itemTime = new Date(item.date).getTime();
        return itemTime >= fromTime && itemTime <= toTime;
      });
    }

    setFilteredRecords(filtered);
  };

  const handleFromDate = (e) => {
    const value = e.target.value;
    setFromDate(value);
    applyFilters(search, value, toDate);
  };

  const handleToDate = (e) => {
    const value = e.target.value;
    setToDate(value);
    applyFilters(search, fromDate, value);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">All Records</h2>

      <div className="mb-3 row">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Username"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={fromDate}
            onChange={handleFromDate}
          />
        </div>
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={toDate}
            onChange={handleToDate}
          />
        </div>
      </div>

      <CSVLink
        data={filteredRecords}
        headers={headers}
        filename={"records.csv"}
        className="btn btn-success mb-3"
      >
        Download CSV
        </CSVLink>

      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Username</th>
              <th>Income</th>
              <th>Expense</th>
              <th>Description</th>
              <th>Category</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((item, index) => (
                <tr key={index}>
                  <td>{item.username}</td>
                  <td>{item.income}</td>
                  <td>{item.expense}</td>
                  <td>{item.description}</td>
                  <td>{item.category}</td>
                  <td>{item.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Records;
