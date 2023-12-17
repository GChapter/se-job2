"use client"

import { createClient } from '@/utils/supabase/server';
import React from 'react';
import { selectNotes, insertNotes } from './serverComponent';

export function Notes({
  notesTable,
}:
  {
    notesTable: React.ReactNode
    }) {

    // form submit handler
    function handleSubmit(event: any) {
      event.preventDefault();
      insertNotes(
        event.target.id.value,
        event.target.title.value
      );
      alert('note added');
    }

    // create a table show notes
    return (
      <main>
        <div>
          <h1>Notes</h1>
          {notesTable}
        </div>
        <div>
          add new note
          <div className = 'flex flex-row'>
            <form onSubmit = {event => handleSubmit(event)}>
              <input type="number" placeholder="id" />
              <input type="text" placeholder="title" />
              <button>add</button>
            </form>
          </div>
        </div>
      </main>
    )
  }

  export default function NotesPage() {
    const [notesTable, setNotesTable] = React.useState(null);
    

    React.useEffect(() => {
      async function getNotes() {
        const notesTable = await selectNotes();
        setNotesTable(notesTable as any);
      }
      getNotes();
    }, []);

    return (
      <Notes notesTable={notesTable} />
    )
  }