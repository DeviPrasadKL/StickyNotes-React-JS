import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [apiData, setapiData] = useState(null);
  let [pending, setpending] = useState(true);
  let [error, seterror] = useState(null);
  let [deleted, setDeleted] = useState(0);

  useEffect(() => {
    fetchNotes();
  }, []);

  let fetchNotes = () => {
    fetch("http://localhost:4000/notes")
      .then((res) => {
        if (res.ok === false) {
          throw Error("Searching data not found in this API");
        }
        return res.json();
      })
      .then((data) => {
        setapiData(data);
        setpending(false);
      })
      .catch((err) => {
        seterror(err.message);
        setpending(false);
      });
  }

  let deleteNote = (id) => {
    fetch("http://localhost:4000/notes/" + id, { method: "DELETE" })
    .then(() => {
        setDeleted(deleted + 1);
        fetchNotes();
      }
    );
  };


  let changeColor = (id, color, notes) => {

    let newNote = { notes, color }

    fetch("http://localhost:4000/notes/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote)
    })
      .then(() => {
        fetchNotes();
      })
  }

  return (
    <>
      {error && <h1>{error}</h1>}
      {pending && <div className="loader"> </div>}
      <div className="Home">
        <h1>Sticky Notes</h1>
        <hr />
        {apiData && (
          <div className="HomeContainer">
            <table
              border="2px"
              cellPadding="9px"
              cellSpacing="3px"
              align="center"
            >
              <tbody>
                <tr>
                  <th>Sl No </th>
                  <th>Notes </th>
                  <th colSpan="4">Actions </th>
                  <th>Color </th>
                </tr>
                {apiData.map((value, index) => {
                  return (
                    <>
                      <tr>
                        <td>{index + 1}</td>
                        <td style={{ background: `${value.color}` }}>
                          {value.notes}
                        </td>
                        <td>
                          <Link to={"/addnNote"}>
                            <button>Add</button>
                          </Link>
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              deleteNote(value.id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                        <td>
                          <Link to={`/update/${value.id}`}>
                            <button>Update</button>
                          </Link>
                        </td>
                        <td>
                          <Link to={`/view/${value.id}`}>
                            <button>View</button>
                          </Link>
                        </td>
                        <td>
                          <select onChange={(e) => { changeColor(value.id, e.target.value, value.notes) }} >
                            <option value={`${value.color}`} >Choose Color</option>
                            <option value="Red" >Red</option>
                            <option value="Green" >Green</option>
                            <option value="Blue" >Blue</option>
                            <option value="yellow" >yellow</option>
                            <option value="purple" >purple</option>
                            <option value="pink" >pink</option>
                            <option value="black" >black</option>
                            <option value="white" >white</option>
                            <option value="aqua" >aqua</option>
                            <option value="AliceBlue" >AliceBlue</option>
                            <option value="AntiqueWhite" >AntiqueWhite</option>
                            <option value="Aquamarine" >Aquamarine</option>
                            <option value="Brown" >Brown</option>
                            <option value="Chocolate" >Chocolate</option>
                            <option value="DarkCyan" >DarkCyan</option>
                            <option value="DarkOrange" >DarkOrange</option>
                            <option value="DimGrey" >DimGrey</option>
                            <option value="Gainsboro" >Gainsboro</option>
                            <option value="LightGreen" >LightGreen</option>
                          </select>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
