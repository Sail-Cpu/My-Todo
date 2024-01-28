import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/styles.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
            },
        ],
    },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
