import React, { useEffect, useState } from 'react';
import './App.css'
import Head from './todoComponent/Head';
import DataAdder from './todoComponent/DataAdder';
import ShowData from './todoComponent/ShowData';
import axios from 'axios';
import WeatherData from './todoComponent/Weather';

const App = () => {
  const host = 'http://localhost:3000';
  const [item, setItem] = useState({ data: '' });
  const [addData, setAddData] = useState([]);
  const [holderText, setHolderText] = useState("Add Item");
  const [deleted, setDeleted] = useState(false);
  const [setWeather] = useState([]);

  useEffect(() => {
    axios
      .get(`${host}/api/data`)
      .then((res) => {
        setAddData(res.data);
        setDeleted(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [item, deleted]);

  const addItem = () => {
    if (item.data !== "") {
      axios
        .post(`${host}/api/data`, item)
        .then((res) => {
          setItem({ data: ' ' });
          setHolderText("Add Item");
          console.log(res.data.message);
        })
        .catch((err) => {
          console.log("Error couldn't add Item");
          console.error(err.message);
        });
    } else {
      setHolderText("Can't Empty");
    }
  }

  const deleteItem = (id) => {
    axios.delete(`${host}/api/data/${id}`);
    setDeleted(true);
  }

  const weatherData = () => {
    axios
      .get("http://api.weatherapi.com/v1/forecast.json", {
        params: {
          q: "Waterloo",
          aqi: "yes",
          key: "b387413b61dc4cc4b53155226233108",
        },
      })
      .then((res) => {
        const myJSON = JSON.stringify(res.data);
        const myObj = JSON.parse(myJSON);
        setWeather(myObj);
      })
      .catch((err) => {
        console.log("Error couldn't add Item");
        console.error(err.message);
      });
  }

  return (
    <>
      <div className="container">
        <div className="center_container">
          <Head />
          <div className="body">
            <DataAdder item={item} setItem={setItem} click={addItem} placeholderText={holderText} />
            <ol className="lists">
              {
                addData.map((item) => {
                  return <ShowData key={item._id} item={item} onSelect={deleteItem} />
                })
              }
            </ol>
          </div>
        </div>
      </div>
      {/*<div className="container">
        <div className="center_container"> 
          <div className="body">
            <WeatherData location={"Waterloo"} data={weatherData} />
            <ol className="lists">
              {
                addData.map((item) => {
                  return <ShowData key={item._id} item={item} onSelect={deleteItem} />
                })
              }
            </ol>
          </div>
        </div>
      </div>*/}
    </>
  );
}

export default App;