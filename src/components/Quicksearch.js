import React, { Component } from 'react'
import Mealtype from './Mealtype';

export default class Quicksearch extends Component {

    constructor() {
        super();
      this.state={
        mealtypes:[]
      }
    }
  componentDidMount(){
    fetch('https://final-backend-a.herokuapp.com/mealtype',{method:'GET'})
    .then(response=>response.json())
    .then(data=>this.setState({mealtypes:data.data}))
  }

  render() {

  let quickSearchList=this.state.mealtypes.length && this.state.mealtypes.map((item)=><Mealtype item={item} key={item.name}></Mealtype>)

    return (
    <div>
        <div className="quicksearch">
        <p className="quicksearchHeading">Quick Searches</p>
        <p className="quicksearchSubHeading">
        Discover Restaurants By Type Of Meal :
        </p>
        <div className="container-fluid">
            <div className="row">
                {quickSearchList} 
            </div>
        </div>
        </div>
    </div>
    )
  }
}
