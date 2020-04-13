const React = require('react')
const Scroll = require('react-scroll')
const ScrollElement = Scroll.ScrollElement

function SpanElement (props) {
  return (
    <span name={props.name} key={props.key}>
      {props.children}
    </span>
  )
}

export default ScrollElement(SpanElement)
