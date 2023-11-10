import "./App.css";
import fetchData from "./component/api";
import { useEffect, useState, useRef } from "react";
import Table from "./component/table";
import Pagination from "@mui/material/Pagination";

function App() {
  let [data, setData] = useState([]);
  let [filteredArr, setFilteredArr] = useState([]);
  let [pageRefresh, setPageRefresh] = useState(false);
  const startpoint = useRef(0);
  const deleteRow = useRef([]);
  /* 
  fetch API data at the starting of application
   */
  useEffect(() => {
    const getData = async () => {
      let dataArray = await fetchData();
      setData(dataArray);
    };
    getData();
  }, []);

  /**
   * pagination
   * @param {page number} value
   */
  const handleChange = (value) => {
    console.log(value);
    const idx = value - 1;
    if (idx === 0) startpoint.current = idx;
    else startpoint.current = idx * 10;
    setPageRefresh(!pageRefresh);
  };
  /**
   * deletion done by using checked elements
   */
  const deleteSelectedData = () => {
    if (filteredArr.length > 0) {
      if (filteredArr.length === deleteRow.current.length) {
        setFilteredArr([]);
        console.log(filteredArr);
      } else {
        let newData1 = filteredArr.filter(
          (item) => !deleteRow.current.includes(item.id)
        );
        console.log(newData1);
        setFilteredArr(newData1);
      }
    }
    const newData2 = data.filter(
      (item) => !deleteRow.current.includes(item.id)
    );
    deleteRow.current = [];
    console.log(data);
    setData(newData2);
    console.log("selected", data, filteredArr);
  };
  /**
   * search operation on the basis of input
   * @param {*} e
   */
  const searchInput = (e) => {
    e.preventDefault();
    let searchKey = e.target.elements[0].value.toLowerCase();
    let arrayAfterSearch = data.filter((item) => {
      let result =
        item.name.toLowerCase().includes(searchKey) ||
        item.email.toLowerCase().includes(searchKey) ||
        item.role.toLowerCase().includes(searchKey);
      return result;
    });
    setFilteredArr(arrayAfterSearch);
    console.log("filter", data);
  };
  /**
   * refresh page after searching
   */
  const refreshPage = () => {
    let arr = [];
    setFilteredArr(arr);
    console.log("refresh page");
  };
  return (
    <>
      <form
        method="get"
        className="table-actions1"
        onSubmit={(e) => searchInput(e)}
      >
        <input
          type="text"
          placeholder="search record"
          className="searchInput"
        />
        <button type="submit" className="button1" value="submit">
          search
        </button>
      </form>
      {filteredArr.length === 0 ? (
        <Table
          data={data}
          startpoint={startpoint.current}
          setData={setData}
          deleteArray={deleteRow.current}
        />
      ) : (
        <Table
          data={filteredArr}
          startpoint={startpoint.current}
          setData={setFilteredArr}
          deleteArray={deleteRow.current}
        />
      )}
      <div className="table-actions2">
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div onClick={deleteSelectedData} className="button2">
            Delete Selected
          </div>
          <div onClick={refreshPage} className="button3">
            Refresh
          </div>
        </div>
        <div>
          <Pagination
            count={
              filteredArr.length
                ? Math.ceil(filteredArr.length / 10)
                : Math.ceil(data.length / 10)
            }
            color="primary"
            showFirstButton
            showLastButton
            onChange={(e, value) => handleChange(value)}
          />
        </div>
      </div>
    </>
  );
}

export default App;
