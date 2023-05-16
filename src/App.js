import { useState } from "react";
import "./App.css";
import { BasicTable } from "./Components/BasicTable";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ShowUser } from "./Components/ShowUser";
import { MainTable } from "./Components/MainTable";


function App() {
  const [name, setName] = useState();
  
  const elements = [
    { element: <BasicTable />, path: "/react-table" },
    { element: <MainTable setName={setName} />, path: "/main-table" },
    { element: <ShowUser name={name} />, path: `/show-user/${name}` },
  ];
  return (
    <BrowserRouter>
      <div>
        <Link to="/main-table">
          <button style={{ width: "200px" }}>Main Table</button>
        </Link>
        <Link to="/react-table">
          <button style={{ width: "200px" }}>React-Table</button>
        </Link>

        <Routes>
          {
            elements.map((val,i)=>
            <Route path={val.path} element={val.element} key={i}></Route>
            )
          }
        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
