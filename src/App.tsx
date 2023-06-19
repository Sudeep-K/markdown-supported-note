import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import { Routes, Route, Navigate } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import { useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import NewNote from './NewNote';
import { v4 as uuidV4 } from 'uuid';


type RawNote = {
  id: string
} & RawNoteData

type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

export type Note = {
  id: string
} & NoteData

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])
  
  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return {...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  }, [notes, tags])

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) }
      ]
    })
  }

  const addTag = (tag: Tag) => {
    setTags(prevTags => [...prevTags, tag])
  }

  return (
    <Container className='my-4'>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/new" element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />} />
        <Route path="/:id">
          <Route index element={<h1>Index</h1>} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App
