const React = require('react')
const Scroll = require('react-scroll')
const ScrollElement = Scroll.ScrollElement

class SpanElement extends React.Component {
  render () {
    return (
      <span {...this.props}>
        {this.props.children}
      </span>
    )
  }
}

export default ScrollElement(SpanElement)
