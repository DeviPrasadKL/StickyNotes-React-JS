import React from "react";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function Home() {
    const [apiData, setapiData] = useState(null);
    let [pending, setpending] = useState(true);
    let [error, seterror] = useState(null);
    let [deleted, setDeleted] = useState(0);
    let [drop, setDrop] = useState("Hidden")


    useEffect(() => {
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
    }, [deleted]);

    let deleteNote = (id) => {
        fetch("http://localhost:4000/notes/" + id, { method: "DELETE" }).then(
            () => {
                setDeleted(deleted + 1);
            }
        );
    };


    function dropDown() {
        setDrop("Visible");
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
                                    <th >Color </th>
                                    
                                </tr>
                                {apiData.map((value, index) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td style={{ background: `${value.color}` }}>{value.notes}</td>
                                                <td><Link to={"/addnNote"}><button>Add</button></Link></td>
                                                <td><button onClick={() => { deleteNote(value.id) }} >Delete</button></td>
                                                <td><Link to={`/update/${value.id}`}><button>Update</button></Link></td>
                                                <td><Link to={`/view/${value.id}`}><button>View</button></Link></td>
                                                <td><button onClick={dropDown}>Color</button>
                                                    <div className="drop" style={{ visibility: `${drop}` }} >
                                                        <label className="colorsSelect"><button>Red</button></label>
                                                        <label className="colorsSelect"><button>Blue</button></label>
                                                        <label className="colorsSelect"><button>pink</button></label>
                                                    </div>
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
