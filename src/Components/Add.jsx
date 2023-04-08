import React from 'react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

export default function Add() {
    let h = useHistory();
    const [notes, setnotes] = useState("");
    const [color, setcolor] = useState("");

    let HandleSubmit = (e) => {
        e.preventDefault();
        let newNote = { notes, color };
        
        localStorage.setItem(`notes`, JSON.stringify(newNote));
        

        fetch("http://localhost:4000/notes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newNote)
        })
            .then(() => {
                window.location.reload();
            })
    }

    return (
        <div className="AddNote">
            <form onSubmit={HandleSubmit}>
                <input type="text" id="notesArea" value={notes} onChange={(e) => setnotes(e.target.value)} placeholder="Enter Notes here" />
                <input type="text" value={color} onChange={(e) => setcolor(e.target.value)} placeholder="Enter Color here" />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}
