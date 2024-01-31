import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Main = (props) => {
  const navigate = useNavigate();
  const [temperature, setTemperature] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [cloudsDes, setCloudDes] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");

  const { favList, setCurrentLocation } = props;

  useEffect(() => {
    const myGeolocator = () => {
      let userLocation = navigator.geolocation;
      if (userLocation) {
        userLocation.getCurrentPosition(success);
      } else {
        console.log("The geolocation API is not supported by your browser.");
      }
    };

    const success = async (data) => {
      let latitude = data.coords.latitude;
      let longitude = data.coords.longitude;

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=cd6490f5e845d98586a9294eee7538e6&units=metric`;
      const options = {
        method: "GET",
      };
      const response = await fetch(url, options);
      const fetchedData = await response.json();
      console.log(fetchedData);

      const temp = Math.round(fetchedData.main.temp);
      setTemperature(temp);

      const location = fetchedData.name;
      setLocation(location);
      setCurrentLocation(location);

      const icon = fetchedData.weather[0].icon;
      const cloudsDes = fetchedData.weather[0].description;
      setCloudDes(cloudsDes);

      const iconImg = await fetch(
        `https://openweathermap.org/img/wn/${icon}.png`
      );
      const fetchedImg = await iconImg.blob();
      const imgUrl = URL.createObjectURL(fetchedImg);
      setImageUrl(imgUrl);

      // 7 days Forecast

      // const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=e4f273e6c4c93188f9964501de66d735`;

      // const responseApi = await fetch(apiUrl, options);
      // const responseData = await responseApi.json();
      // console.log("7", responseData);
    };

    myGeolocator();
  }, []);

  useEffect(() => {
    const getDateTime = () => {
      const now = new Date();
      const hours = `${now.getHours()}`.padStart(2, "0");
      const minutes = `${now.getMinutes()}`.padStart(2, "0");

      setHours(hours);
      setMinutes(minutes);

      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "De",
      ];

      const date = now.getDate();
      const month = months[now.getMonth()];

      setDate(date);

      setMonth(month);
    };

    getDateTime();
  }, []);

  return (
    <div className="main-screen-container">
      <div className="main-card-container">
        <p className="date-month">
          Toady, {date} {""} {month} | {`${hours}:${minutes}`}
        </p>
        <img className="temp-icon" src={imageUrl} alt="tempIcon" />
        <h1 className="temperature">{temperature}</h1>
        <p className="clouds-des">{cloudsDes}</p>
        <h1 className="location">{location}</h1>
      </div>
      <div className="your-fav-container">
        <div className="add-fav-loc-container">
          <span className="fav-title">Your Favourites</span>
          <button
            className="add-fav-loc"
            onClick={() => {
              navigate("/search");
            }}
          >
            Add your Favourite Location
          </button>
        </div>
        <ul className="fav-list-container">
          {favList.length !== 0 &&
            favList.map((each) => (
              <div
                key={each.id}
                className="weather-card-container fav-weather-card border-card"
              >
                <p className="date-month">
                  Toady, {each.date} {""} {each.month}
                </p>
                <img
                  className="temp-image"
                  src={each.imageUrl}
                  alt="temperature"
                />
                <p className="temp">{each.temp}</p>
                <p className="clouds-des">{each.clouds}</p>
                <p className="place">{each.location}</p>
              </div>
            ))}

          {favList.length === 0 && <p className="no-fav">No Favourites</p>}
        </ul>
      </div>
    </div>
  );
};

export default Main;
