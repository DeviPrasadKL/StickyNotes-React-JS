import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function View() {

    let {id} = useParams();

    let [note, setNote] = useState("");
    let [pending, setpending] = useState(true);
    let [error, seterror] = useState(null);

    useEffect(() => {
        fetch("http://localhost:4000/notes/"+id)
            .then((res) => {
                if (res.ok === false) {
                    throw Error("Searching data not found in this API");
                }
                return res.json();
            })
            .then((data) => {
                setNote(data);
                setpending(false);
            })
            .catch((err) => {
                seterror(err.message);
                setpending(false);
            });
    }, [id]);

    //To get Data from Local Storage and parse it into JSON.
    console.log(localStorage.getItem(`notes`))
    console.log(JSON.parse(localStorage.getItem(`notes`)).color);
    console.log(JSON.parse(localStorage.getItem(`notes`)).notes);
  return (
    <div className="View">
      {pending && <div className="loader"> </div>}
      {error && <h1>{error}</h1>}
      <p style={{ background: `${note.color}` }}>{note.notes}</p>
    </div>
  );
}
