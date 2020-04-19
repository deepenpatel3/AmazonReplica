import React from 'react';
import './App.css';
import Main from "./Main";
import { BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <div >
            <BrowserRouter>
                <div>
                    <Main />
                </div>
            </BrowserRouter>
        </div >
    );
}

export default App;
