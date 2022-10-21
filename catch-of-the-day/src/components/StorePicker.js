import React from 'react'
import { getFunName } from '../helpers'
class StorePicker extends React.Component {
  myStore = React.createRef()

  goToStore = event => {
    event.preventDefault()
    this.props.history.push(`/store/${this.myStore.current.value}`)
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter a Store</h2>
        <input
          type="text"
          ref={this.myStore}
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store →</button>
      </form>
    )
  }
}

export default StorePicker
