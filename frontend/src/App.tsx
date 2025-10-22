import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import Createpage from './pages/Createpage'
import NoteDetailPage from './pages/NoteDetailPage'
import toast from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <button onClick={()=> toast.success("Yay")} className='text-red-500 p-4'>click me</button>
      <Routes>
        <Route path="/" element={<HomePage />}> </Route>
        <Route path="/create" element={<Createpage />}> </Route>
        <Route path="/note/:id" element={<NoteDetailPage />}> </Route>
      </Routes>


    </div>
  )
}

export default App
