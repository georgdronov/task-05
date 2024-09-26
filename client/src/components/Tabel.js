import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function Table({ data, fetchMoreDate }) {
  return (
    <InfiniteScroll
      dataLength={data.length}
      next={fetchMoreDate}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      <table className="table table-striped table-hover">
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
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.randomId}</td>
              <td>{item.fullName}</td>
              <td>{item.address}</td>
              <td>{item.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </InfiniteScroll>
  );
}

export default Table;
