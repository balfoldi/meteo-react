import React from "react";
import MeteoCard from '../Meteo'
import moment from "moment";

console.log("meteoCard pluged")
class Meteo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      daily: [{
        min: null,
        max: null,
        icon: null
      }],
      min: 0,
      max: 0,
      city: "",
      icon: ""
    };
    this.getInitialise();
  }


  getInitialise = () => {
    if ("geolocation" in navigator) {
      console.log('geo on')
      navigator.geolocation.getCurrentPosition((position) => {
        this.buildGetResponse(`onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&exclude=current,minutely,hourly,alerts`, this.setMeteoDaily)()
      })
    } else {
      console.log('geo off')
    }
    console.log("url")
  }

  buildGetResponse = (defineUrlFragment, defineMethod) => {
    const urlFragment = defineUrlFragment
    const method = defineMethod
    const getResponse = () => {
      console.log("fetching");
      const url = `https://api.openweathermap.org/data/2.5/${urlFragment}&units=metric&appid=12138e2ac209f6e44b459dd80cd86d7b`;
      console.log(url)
      fetch(url, {
        method: "GET",
      })
      .then((response) => response.json())
      .then((response) => {method(response)})
      .catch((error) => console.error(error));
      console.log("####")
    }
    return getResponse
  }

  setMeteoDaily = (setResponse) => {
    const response = setResponse
    console.log(response);
    const fiveDaysData = response.daily.slice(0,5)
    console.log(fiveDaysData)
    this.setState({
      city: "",
      min: 0,
      daily: fiveDaysData.map((day)=>{
        return({
        min: day.temp.min,
        max: day.temp.max,
        icon: `https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`
        })
      })
    });
  };

  setMeteoCurrent = (setResponse) => {
    const response = setResponse
    console.log(response)
    this.setState({
      min: response.main.temp_min,
      max: response.main.temp_max,
      city: response.name,
      icon: `https://openweathermap.org/img/wn/${response.weather[0].icon}@4x.png`
    });
  };

  render() {
    const cardTitle = (day) => {
      if(!this.state.city){
        return day
      }else{
        return this.state.city
      }
    }
    var display = this.state.daily
    console.log(this.state.min)
    if (this.state.min > 0){
      console.log("displaying city")
      display = [{
        min: this.state.min,
        max: this.state.max,
        icon: this.state.icon,
        city: this.state.city
      }]
    }
    const city =  ["San Francisco", "Libreville", "Tokyo", "Montreal"]
    return (
      <>
        <div className="d-flex justify-content-around mt-5">
          {city.map((city)=>{
          return <button className="btn btn-primary" onClick={this.buildGetResponse(`weather?q=${city.toLowerCase()}`, this.setMeteoCurrent)}>{city}</button>
          })}
        </div>
        <button className="btn btn-success m-5 " onClick={this.getInitialise}>Get local weather</button>
        <div className="d-flex flex-wrap justify-content-around mb-3">
          {display.map((day)=>{
            return (
            <div className="card mb-3" style={{width: "17em"}}>
              <img className="card-img-top" src={day.icon} alt="Card image cap"></img>
              <div className="card-body">
                <h1 className="card-title">{cardTitle( moment().add( display.indexOf(day), "d" ).format("dddd") )}</h1>
                <p className="card-text">Max temperature : {day.max} c°</p>
                <p> Min temperature : {day.min} c°</p>
              </div>
            </div>    
          )})}
        </div>
      </>
    );
  }
}
export default Meteo;