import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Nabvar";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import SearchLocation from "./components/SearchLocation";
import "./App.css";

import { useState } from "react";

const App = () => {
  const [isClickedHambugerIocn, setIsClickedHambugerIocn] = useState(false);
  const [favList, setFavList] = useState([]);
  const [currentLocation, setCurrentLocation] = useState("");

  console.log(favList);
  return (
    <div className="app-container">
      <BrowserRouter>
        <Navbar
          isClickedHambugerIocn={isClickedHambugerIocn}
          setIsClickedHambugerIocn={setIsClickedHambugerIocn}
          currentLocation={currentLocation}
        />
        <div className="weather-body-container">
          {!isClickedHambugerIocn && <Sidebar />}
          <div className="routes-container">
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Main
                    favList={favList}
                    setCurrentLocation={setCurrentLocation}
                  />
                }
              />
              <Route
                exact
                path="/search"
                element={<SearchLocation setFavList={setFavList} />}
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
