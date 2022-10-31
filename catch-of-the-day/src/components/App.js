import React from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'
import base from '../base'
// import { useState, useEffect } from "react";

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
  }

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

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="CHRISTINE'S SeaFood Market" />
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
