import React from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
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

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
  }

  addFishToOrder = key => {
    //take copy of order
    const newOrder = { ...this.state.order }
    // add fish to order
    newOrder[key] = newOrder[key] + 1 || 1
    //set newOrder to state
    this.setState({ order: newOrder })
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
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
        <Order />
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />
      </div>
    )
  }
}

export default App
