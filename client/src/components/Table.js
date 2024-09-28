import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import 'bootstrap/dist/css/bootstrap.min.css';

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
            <th style={{ width: "10%" }}>ID</th>
            <th style={{ width: "15%" }}>Random ID</th>
            <th style={{ width: "25%" }}>Full Name</th>
            <th style={{ width: "30%" }}>Address</th>
            <th style={{ width: "20%" }}>Phone</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td style={{ wordBreak: "break-word" }}>{item.id}</td>
                <td style={{ wordBreak: "break-word" }}>{item.randomId}</td>
                <td style={{ wordBreak: "break-word" }}>{item.fullName}</td>
                <td style={{ wordBreak: "break-word" }}>{item.address}</td>
                <td style={{ wordBreak: "break-word" }}>{item.phone}</td>
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
