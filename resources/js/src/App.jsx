import React from 'react';
import {createRoot} from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Create from './pages/Create'
import List from './pages/List';
import Edit from './pages/Edit';
export const Base_url = 'http://127.0.0.1:8000';

function App() {
  return (
    <div>
        <HashRouter>
            <Routes>
                <Route path='/' element={<List/>}/>
                <Route path='/create' element={<Create/>}/>
                <Route path='/edit/:id' element={<Edit/>}/>
            </Routes>
        </HashRouter>
    </div>
  )
}

const root = createRoot(document.getElementById('app'));
root.render(<App/>)

