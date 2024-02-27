import React from 'react'
import PropTypes from 'prop-types'

class EditfishForm extends React.Component {
  static propTypes = {
    fish: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number,
    }),
    index: PropTypes.string,
    updateFish: PropTypes.func,
  }

  handleChange = event => {
    const updatedFish = {
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value,
    }
    this.props.updateFish(this.props.index, updatedFish)
  }

  /**
   * A component for editing the properties of a fish item in an inventory system
   * @component
   * @example
   *   <EditFishForm fish={{name: 'Salmon', price: 1299, status: 'available', desc: 'Fresh salmon from Norway', image: 'salmon.jpg'}} index="fish1" deleteFish={deleteFunction}/>
   * @prop {object} fish - Object containing properties of the fish to be edited
   * @prop {string} index - Unique key associated with the fish to identify it in the list
   * @prop {function} deleteFish - Function to be called to delete a fish from the inventory
   * @description
   *   - The component provides inputs for editing fish properties such as name, price, status, description, and image URL
   *   - The `status` field is a dropdown that allows selection between "available" (Fresh!) and "unavailable" (Sold Out!)
   *   - Updates to the fish properties are handled via the onChange event handler `handleChange`
   *   - The `deleteFish` prop function is executed with the `index` as an argument when the "Remove Fish" button is clicked
   */
  render() {
    return (
      <div className="fish-edit">
        <input type="text" name="name" onChange={this.handleChange} value={this.props.fish.name} />
        <input
          type="number"
          name="price"
          onChange={this.handleChange}
          value={this.props.fish.price}
        />
        <select
          type="text"
          name="status"
          onChange={this.handleChange}
          value={this.props.fish.status}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" onChange={this.handleChange} value={this.props.fish.desc} />
        <input
          type="text"
          name="image"
          onChange={this.handleChange}
          value={this.props.fish.image}
        />
        <button onClick={() => this.props.deleteFish(this.props.index)}>Remove Fish</button>
      </div>
    )
  }
}

export default EditfishForm
