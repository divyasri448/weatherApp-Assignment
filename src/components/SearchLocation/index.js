import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./index.css";

const cities = [
  { id: 1, city: "Ahmedabad" },
  { id: 2, city: "Bangalore" },
  { id: 3, city: "Chennai" },
  { id: 4, city: "Delhi" },
  { id: 5, city: "Hyderabad" },
  { id: 6, city: "Jaipur" },
  { id: 7, city: "Kanpur" },
  { id: 8, city: "Kolkata" },
  { id: 9, city: "Lucknow" },
  { id: 10, city: "Mumbai" },
  { id: 11, city: "Nagpur" },
  { id: 12, city: "Patna" },
  { id: 13, city: "Pune" },
  { id: 14, city: "Rajkot" },
  { id: 15, city: "Surat" },
  { id: 16, city: "Thane" },
  { id: 17, city: "Vadodara" },
  { id: 18, city: "Varanasi" },
  { id: 19, city: "Visakhapatnam" },
  { id: 20, city: "Zirakpur" },
];

const SearchLocation = (props) => {
  const { setFavList } = props;
  const [userSelectedCity, setUserSelectedCity] = useState("");
  const [temp, setTemp] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [pressure, setPressure] = useState("");
  const [feelsLike, setFeelslike] = useState("");
  const [location, setLocation] = useState("");
  const [clouds, setClouds] = useState("");
  const [humidity, setHumidity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [isClickedSubmitButton, setisClickedSubmitButton] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const handleInputLocation = async () => {
    setisClickedSubmitButton(true);
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userSelectedCity}&appid=e4f273e6c4c93188f9964501de66d735&units=metric`;
    const options = {
      method: "GET",
    };

    const response = await fetch(apiUrl, options);
    const data = await response.json();
    console.log(data);
    const temp = Math.round(data.main.temp);
    setTemp(temp);

    const feelsLike = Math.round(data.main.feels_like);
    setFeelslike(feelsLike);

    const minTemp = Math.round(data.main.temp_min);
    setMinTemp(minTemp);

    const maxTemp = Math.round(data.main.temp_max);
    setMaxTemp(maxTemp);

    const humidity = data.main.humidity;
    setHumidity(humidity);

    const pressure = data.main.pressure;
    setPressure(pressure);

    const location = data.name;
    setLocation(location);

    const cloudsDes = data.weather[0].description;
    setClouds(cloudsDes);

    const icon = data.weather[0].icon;
    const iconImg = await fetch(
      `https://openweathermap.org/img/wn/${icon}.png`
    );
    const fetchedImg = await iconImg.blob();
    const imgUrl = URL.createObjectURL(fetchedImg);
    setImageUrl(imgUrl);

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

    const now = new Date();
    const date = now.getDate();
    setDate(date);
    const month = months[now.getMonth()];
    setMonth(month);
  };
  const navigate = useNavigate();
  const handleDetailsButton = () => {
    setShowMore(!showMore);
  };

  const handleFavouritesButton = () => {
    navigate("/");
    setFavList((prevList) => [
      ...prevList,
      {
        id: uuidv4(),
        date,
        month,
        imageUrl,
        clouds,
        temp,
        location,
      },
    ]);
  };
  return (
    <div className="search-tab-container">
      <div>
        <h1 className="input-title">Select Your Location</h1>
        <select
          className="cities-container"
          onChange={(e) => {
            setUserSelectedCity(e.target.value);
          }}
        >
          {cities.map((each) => (
            <option key={each.id}>{each.city}</option>
          ))}
        </select>
        {userSelectedCity && (
          <button type="button" onClick={handleInputLocation}>
            Submit
          </button>
        )}
      </div>
      <div className={isClickedSubmitButton ? "weather-card-container" : ""}>
        {isClickedSubmitButton && (
          <p className="date-month">
            Toady, {date} {""} {month}
          </p>
        )}
        {imageUrl && (
          <img className="temp-image" src={imageUrl} alt="temperature" />
        )}
        <p className="temp">{temp}</p>
        {showMore && <p className="clouds-des">{clouds}</p>}
        <p className="place">{location}</p>
        {showMore && (
          <>
            <p className="other-info ">Pressure : {pressure}</p>
            <p className="other-info ">Humidity : {humidity}</p>
            <p className="other-info ">Feels Like : {feelsLike}</p>
            <p className="other-info ">Min Temp : {minTemp}</p>
            <p className="other-info ">Max Temp : {maxTemp}</p>
          </>
        )}
      </div>
      {isClickedSubmitButton && (
        <div>
          <button className="add-fav-btn" onClick={handleFavouritesButton}>
            Add to Favourites
          </button>
          <button
            className="add-fav-btn detail-btn"
            onClick={handleDetailsButton}
          >
            {showMore ? "Show Less" : "Know in Detail"}
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchLocation;
