const WeatherData = ({ location, data}) => {
    return (
        <>
            <div className="weather_data">
                <input type="text" name="location" placeholder="Location..." />
                <button type="submit" name="list">+</button>
                <h3> data </h3>
            </div>
        </>
    );
}
export default WeatherData;
/*
app.get("/weather", async (req, res) => {
    const day = getDate();
    
    try {
      const apiCall = await axios.get("http://api.weatherapi.com/v1/forecast.json", {
        params: {
          q: weatherLocation,
          aqi: "yes",
          key: "b387413b61dc4cc4b53155226233108",
        },
      });
      const myJSON = JSON.stringify(apiCall.data);
      const myObj = JSON.parse(myJSON);
      res.render(__dirname + "/views/weather.ejs", {
        listTitle: "Current weather",
        date: day,
        location: weatherLocation,
        data: myObj,
      });
    } catch (error) {
      res.render(__dirname + "/views/weather.ejs", {
        listTitle: "Current weather",
        date: day,
        location: weatherLocation,
        data: JSON.stringify(error.response?.data),
      });
    }
  });*/