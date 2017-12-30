import React, { Component } from 'react'
import { connect } from 'react-redux'
import ConfirmationModal from '../components/ConfirmationModal'
import PropTypes from 'prop-types'
import { setConfirmState } from '../actions/confirmer'

class ConfirmationContainer extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    setConfirmState: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  }

  static defaultProps = {
    onCancel: () => undefined
  }

  onConfirm = ()=>{
    this.props.onConfirm(this.props.data)
    this.props.setConfirmState({ isVisible:false, id:this.props.id })
  }

  onCancel = ()=>{
    this.props.onCancel(this.props.data)
    this.props.setConfirmState({ isVisible:false, id:this.props.id })
  }

  render (){
    return (
      <ConfirmationModal
        isVisible ={this.props.isVisible}
        title={this.props.title}
        message={this.props.message}
        onCancel={this.onCancel}
        onConfirm={this.onConfirm}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...state.confirmer[ownProps.id]
})

const mapDispatchToProps = {
  setConfirmState
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationContainer)
