import React from 'react'

export default function Mealtype(props) {
  //console.log(props)
    const{name,content,image}=props.item
  return (
      <div className="col-lg-4 col-md-4 col-sm-6 col-12 quickSearch__card-container">
        <div className="titleContainer">
          <div className="titleComponent1">
            <img src={require('../'+ image)} height="120" width="140" />
          </div>
          <div className="titleComponent2">
            <div className="componentHeading">
                {name}
            </div>
            <div className="componentSubHeading">
                {content}
            </div>
          </div>
        </div>
      </div>
      
      

    // <div>props.name</div>
  )
}
