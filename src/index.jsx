import React from "react";
import ReactDOM from "react-dom";
import Meteo from './components/Meteo'
import 'bootstrap/dist/css/bootstrap.css';


class App extends React.Component {
  render() {
    return (
      <>
        <div className='d-flex flex-column justify-content-center'>
          <Meteo API="091d15bb86d49b09d44a5bdd811f88e2" />
        </div>
      </>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));