import React from 'react'
import PropTypes from 'prop-types'

class AddFishForm extends React.Component {
  nameRef = React.createRef()
  priceRef = React.createRef()
  statusRef = React.createRef()
  descRef = React.createRef()
  imageRef = React.createRef()

  static propTypes = {
    addFish: PropTypes.func.isRequired,
  }

  createFish = event => {
    event.preventDefault()
    const fish = {
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value),
      //FIXME: status: needs to return option name, not option value
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value,
    }
    this.props.addFish(fish)
    // refresh the form
    event.currentTarget.reset()
  }

  /**
   * Provides a form for adding a new fish to the inventory
   * @component
   * @example
   *   <AddFishForm onFishAdd={(fishData) => console.log("Fish added", fishData)} />
   * @prop {Function} onFishAdd - Callback to invoke when a new fish is added with the form data as its argument
   * @description
   *   - `nameRef`, `priceRef`, `statusRef`, `descRef`, and `imageRef` hold references to the respective form fields.
   *   - The `createFish` method is called on form submission. You must bind this method in the constructor or use class field syntax.
   *   - Utilize the `ref` attribute to collect input values directly from the DOM.
   *   - The state is not managed within this component; all data is handled through refs and passed back up to the parent component via `onFishAdd`.
   */
  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input name="name" ref={this.nameRef} type="text" placeholder="Name" />
        <input name="price" ref={this.priceRef} type="text" placeholder="Price" />
        <select name="status" ref={this.statusRef}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" ref={this.descRef} placeholder="Desc" />
        <input name="image" ref={this.imageRef} type="text" placeholder="Image" />
        <button type="submit">+ Add Fish</button>
      </form>
    )
  }
}

export default AddFishForm
