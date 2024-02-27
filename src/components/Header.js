import React from 'react'
import PropTypes from 'prop-types'

/**
 * Header component displaying the name of the shop and the current tagline
 * @component
 * @example
 *   <Header tagline="Fresh Daily" />
 * @prop {string} tagline - The tagline for the shop
 * @description
 *   - The component uses a header tag to encapsulate the shop title and tagline.
 *   - A combination of nested span tags is used to style parts of the title differently.
 *   - The tagline is received as a prop and is rendered inside an h3 tag.
 *   - The design is meant to give a vibrant and welcoming feel to the top section of the webpage.
 */
const Header = props => (
  <header className="top">
    <h1>
      Catch
      <span className="ofThe">
        <span className="of">of</span>
        <span className="the">the</span>
      </span>
      Day
    </h1>
    <h3 className="tagline">
      <span>{props.tagline}</span>
    </h3>
  </header>
)

Header.propTypes = { tagline: PropTypes.string.isRequired }

export default Header
