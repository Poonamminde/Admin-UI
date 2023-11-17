import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useRef } from "react";

export default function Index({ item, data, setData, deleteArray }) {
  let [update, setUpadate] = useState(false);
  let [refresh, setRefresh] = useState(true);
  let object = useRef({ id: "", name: "", email: "", role: "" });
  /**
   * this is for perform single record deletion on the basis of record id
   * @param {id of record} index
   */
  const handleDelete = (index) => {
    console.log("Deleted record ", index);
    const arrayAfterDeletion = data.filter((item) => item.id !== index);
    console.log(arrayAfterDeletion);
    setData(arrayAfterDeletion);
  };
  /**
   * to perform multiple record deletion
   * stores all checked record's id
   * @param {checked record id} id
   */
  const handleOnclick = (id) => {
    if (!deleteArray.includes(id)) {
      console.log("selected record", id);
      deleteArray.push(id);
      setRefresh(!refresh);
    } else {
      console.log("unselected record", id);
      let removeIdx = deleteArray.indexOf(id);
      console.log(removeIdx);
      deleteArray[removeIdx] = null;
      setRefresh(!refresh);
    }
    console.log(deleteArray);
  };
  /**
   * creating object of updated record
   * object contains name, email, role
   * @param {event} e
   */
  const createObject = (e) => {
    console.log(e.target.name);
    object.current[e.target.name] = e.target.value;
    console.log(object.current);
  };
  /**
   * perform updation in API data
   * @param {id of record} id
   */
  const updateData = (id) => {
    object.current.id = id;
    console.log("Updated record ", id, "with data", object.current);
    let arr = data.map((item) => (item.id === id ? object.current : item));
    setData(arr);
    setUpadate(false);
  };
  return (
    <tr
      key={item.id}
      bgcolor={deleteArray.includes(item.id) ? "aqua" : "white"}
    >
      <input
        type="checkbox"
        id={item.id}
        key={item.id}
        checked={deleteArray.includes(item.id) ? true : false}
        onClick={() => handleOnclick(item.id)}
      />
      {!update && (
        <>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.role}</td>
          <td>
            <EditIcon onClick={() => setUpadate(true)} />
            <DeleteIcon onClick={() => handleDelete(item.id)} />
          </td>
        </>
      )}
      {update && (
        <>
          <td>
            <input
              type="text"
              name="name"
              placeholder="name"
              onChange={(e) => createObject(e)}
            />
          </td>
          <td>
            <input
              type="text"
              name="email"
              placeholder="email"
              onChange={(e) => createObject(e)}
            />
          </td>
          <td>
            <input
              type="text"
              name="role"
              placeholder="role"
              onChange={(e) => createObject(e)}
            />
          </td>
          <td>
            <input
              type="submit"
              value="Update"
              onClick={() => updateData(item.id)}
            />
          </td>
        </>
      )}
    </tr>
  );
}
