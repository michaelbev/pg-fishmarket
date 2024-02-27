import React from 'react'
import PropTypes from 'prop-types'
import Raven from 'raven-js'

import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'
import base from '../base'
// import { useState, useEffect } from "react";

Raven.config(
  'https://ebc689ea1c1d472c8c1bdc545d50563b@o4504121466880000.ingest.sentry.io/4504121477365761',
).install()

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  /**
   * Initializes the component state using local storage and sets up database syncing
   * @example
   * componentDidMount()
   * No return value, but state is updated and database syncing is initiated
   * @param none No parameters for this lifecycle method
   * @description
   *   - This is a lifecycle method from React, automatically invoked after the component is mounted to the DOM.
   *   - It retrieves and parses the store data from localStorage, if available.
   *   - It establishes a two-way binding between the component's state and the database for the given storeId.
   */
  componentDidMount() {
    const { params } = this.props.match
    // first reinstate our localStorage
    const localStorageRef = localStorage.getItem(params.storeId)
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
  }

  addFish = fish => {
    //take copy of fishes
    const newFishes = { ...this.state.fishes }
    // add new fish to fishes variable
    newFishes[`fish${Date.now()}`] = fish
    //set newFishes to state
    this.setState
    {
      this.setState({
        fishes: newFishes,
      })
    }
  }

  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes }
    fishes[key] = updatedFish
    this.setState({ fishes })
  }

  deleteFish = key => {
    const newFishes = { ...this.state.fishes }
    newFishes[key] = null
    this.setState({ fishes: newFishes })
    this.removeFishFromOrder(key)
  }

  removeFishFromOrder = key => {
    const newOrder = { ...this.state.order }
    delete newOrder[key]
    this.setState({ order: newOrder })
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
  }

  addFishToOrder = key => {
    const newOrder = { ...this.state.order }
    newOrder[key] = newOrder[key] + 1 || 1
    this.setState({ order: newOrder })
  }

  /**
   * App component serves as the root for the SeaFood Market application.
   * @component
   * @example
   *   <App match={{params: {storeId: 'unique-store-id'}}} />
   * @prop {object} match - Contains route parameters.
   * @prop {object} match.params - Specific route parameters.
   * @prop {string} match.params.storeId - The unique identifier for the seafood store.
   * @description
   *   - Provides layout and state management for the 'catch-of-the-day' application.
   *   - Manages and passes down 'fishes' and 'order' state to child components.
   *   - Interacts with Inventory component to manipulate fishes state through provided functions.
   *   - Passes functions to child components to allow adding/removing items from order.
   */
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="MEB Fresh SeaFood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addFishToOrder={this.addFishToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFishFromOrder={this.removeFishFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    )
  }
}

export default App
