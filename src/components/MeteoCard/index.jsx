import React from "react";

class MeteoCard extends React.Component {
  render () {
    const {min, max, icon} = this.props
    return(
      <>
        <div className="card d-flex flex-wrap" style={{width: "40em"}}>
          <img className="card-img-top" src={icon} alt="Card image cap"></img>
          <div className="card-body">
            <h5 className="card-title">Cay</h5>
            <p className="card-text">Max temperature : {max}; Min temperature : {min}</p>
          </div>
        </div>    
      </>
    )
  }
}

export default MeteoCard;
/*
{daily.map((day)=>{
  return <MeteoCard max={day.max} min={day.min} icon={day.icon}/>
})}*/