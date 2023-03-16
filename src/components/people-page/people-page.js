import React, { Component } from "react";
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-service";
import Row from '../row'
import ErrorBoundry from '../error-boundry'

import './people-page.css'

export default class PeoplePage extends Component {
  swapiService = new SwapiService()

  state = {
    selectedPerson: 4
  }

  onPersonSelected = (selectedPerson) => {
    this.setState({ selectedPerson })
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />
    }
    
    const itemList = (
        <ItemList onItemSelected={this.onPersonSelected}
                  getData={this.swapiService.getAllPeople} >
                
            {(i) => 
                (`${i.name} (${i.gender}, ${i.birthYear})`
            )}
        </ItemList>
    )

    const personDetails = (
      <PersonDetails personId={this.state.selectedPerson}/>
    )
    
    return (
      <ErrorBoundry>
        <Row left={itemList} right={personDetails} />
      </ErrorBoundry>
    )
  }
}