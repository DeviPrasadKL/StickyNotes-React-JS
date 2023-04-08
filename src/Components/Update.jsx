import React from 'react';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Update() {
    let {id} = useParams();

    let [pending, setpending] = useState(true);
    let [error, seterror] = useState(null);
    const [notes, setnotes] = useState("");
    const [color, setcolor] = useState("");
    const [note,setnote] = useState();
    
    useEffect(() => {
        fetch("http://localhost:4000/notes/"+id)
            .then((res) => {
                if (res.ok === false) {
                    throw Error("Searching data not found in this API");
                }
                return res.json();
            })
            .then((data) => {
                setnotes(data.notes)
                setcolor(data.color)
                setpending(false);
            })
            .catch((err) => {
                seterror(err.message);
                setpending(false);
            });
    }, []);

    let HandleSubmit = (e) => {
        e.preventDefault();
        let newNote = { notes, color }

        fetch("http://localhost:4000/notes/"+id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newNote)
        })
            .then(() => {
                window.location.reload();
            })
    }

    return (
        <div className="AddNote">
            {pending && <div className="loader"> </div>}
            {error && <h1>{error}</h1>}
            <form onSubmit={HandleSubmit}>
                <input type="text" id="notesArea" value={notes} onChange={(e) => setnotes(e.target.value)} />
                <input type="text" value={color} onChange={(e) => setcolor(e.target.value)} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}
