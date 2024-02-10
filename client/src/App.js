import React from 'react';
import { Outlet } from "react-router-dom";
//Components
import NavBar from "./components/navigation/NavBar";

function App() {

  return (
      <>
          <NavBar />
          <Outlet />
      </>

  );
}

export default App;
