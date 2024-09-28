import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function Table({ data, fetchMoreDate, hasMore }) {
  return (
    <InfiniteScroll
      className="table-responsive"
      dataLength={data.length}
      next={fetchMoreDate}
      hasMore={hasMore}
      loader={<h4>Loading more data...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>No more data to load</b>
        </p>
      }
    >
      <table className="table table-striped table-hover table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Random ID</th>
            <th>Full Name</th>
            <th>Address</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.randomId}</td>
                <td>{item.fullName}</td>
                <td>{item.address}</td>
                <td>{item.phone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </InfiniteScroll>
  );
}

export default Table;
