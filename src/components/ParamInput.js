import React, { Component } from 'react'
class ParamInput extends Component {
  componentDidUpdate() {
    this.props.inputElement.current.focus()
  }
  render() {
    return (
      <div className="ParamListMain">
      <div className="label">New Param Input</div>
        <form onSubmit={this.props.addParam}>
          <input
            placeholder="my_param_name=value1|value2|value3..."
            ref={this.props.inputElement}
            value={this.props.currentParam.text}
            onChange={this.props.handleInput}
            name="customParam"
          />

          <button className='button addParam' type="submit"> Add Param </button>
        </form>
      </div>
    )
  }
}

export default ParamInput