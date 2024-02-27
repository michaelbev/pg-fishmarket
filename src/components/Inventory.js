import React from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase'
import AddFishForm from './AddFishForm'
import EditFishForm from './EditFishForm'
import Login from './Login'
import base, { firebaseApp } from '../base'

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    addFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
    storedID: PropTypes.string,
  }

  state = {
    uid: null,
    owner: null,
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user })
      }
    })
  }

  authHandler = async authData => {
    const store = await base.fetch(this.props.storeId, { context: this })

    if (!store.owner) {
      // save it as our own
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid,
      })
    }

    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    })
  }

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]()
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler)
  }

  logout = async () => {
    console.log('Logging out!')
    await firebaseApp.auth().signOut()
    this.setState({ uid: null })
  }

  /**
   * Represents the inventory section of the application, handling the display of login, permission checks, and inventory management.
   * @component
   * @example
   *   <Inventory storeId='store123' fishes={sampleFishes} updateFish={sampleUpdateFish} addFish={sampleAddFish} deleteFish={sampleDeleteFish} loadSampleFishes={sampleLoadFishes} authenticate={sampleAuthenticate} />
   * @prop {Object} fishes - An object of fish items where the key is the fish id and the value is the fish details.
   * @prop {Function} updateFish - The function to call when a fish is updated.
   * @prop {Function} addFish - The function to call when a new fish is added.
   * @prop {Function} deleteFish - The function to call when a fish is deleted.
   * @prop {Function} loadSampleFishes - The function to trigger loading of sample fish data.
   * @prop {Function} authenticate - The function to call for user authentication.
   * @prop {string} storeId - The ID of the current store.
   * @description
   *   - 'this.state.uid' holds the currently authenticated user's ID.
   *   - If 'this.state.uid' is not set, it means the user is not logged in, and the login component is rendered.
   *   - If 'this.state.uid' does not match 'this.state.owner', access is denied to manage the inventory.
   *   - Only the owner of the store, indicated by 'this.state.uid' matching 'this.state.owner', can manage the inventory.
   */
  render() {
    const logout = <button onClick={this.logout}> Log out! </button>
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />
    }
    if (this.state.uid !== this.state.owner)
      return (
        <div>
          {' '}
          <p>
            Sorry, You are not the owner of store <em>{this.props.storeId}</em>{' '}
          </p>{' '}
          {logout}
        </div>
      )
    // user is owner, render inventory
    else
      return (
        <div className="inventory">
          <h2>Inventory</h2>
          {logout}
          {Object.keys(this.props.fishes).map(key => (
            <EditFishForm
              key={key}
              index={key}
              fish={this.props.fishes[key]}
              updateFish={this.props.updateFish}
              deleteFish={this.props.deleteFish}
            />
          ))}
          <AddFishForm addFish={this.props.addFish} />
          <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
        </div>
      )
  }
}

export default Inventory
