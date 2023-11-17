import React from "react";
import Row from "../Row/Row";
import "./table.css";
const index = ({ data, startpoint, setData, deleteArray }) => {
  console.log("table creation");
  return (
    <div className="container">
      <table>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
        <tbody>
          {data.map((item, idx) =>
            startpoint <= idx && startpoint + 10 > idx ? (
              <Row
                item={item}
                data={data}
                setData={setData}
                deleteArray={deleteArray}
              />
            ) : null
          )}
        </tbody>
      </table>
    </div>
  );
};

export default index;
