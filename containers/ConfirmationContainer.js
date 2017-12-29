import React, { Component } from 'react'
import { connect } from 'react-redux'
import ConfirmationModal from '../components/ConfirmationModal'
import PropTypes from 'prop-types'
import { setConfirmState } from '../actions/confirmer'

class ConfirmationContainer extends Component {

  static propTypes = {
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
    this.props.setConfirmState({isVisible:false})
  }

  onCancel = ()=>{
    this.props.onCancel(this.props.data)
    this.props.setConfirmState({isVisible:false})
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

const mapStateToProps = state => state.confirmer

const mapDispatchToProps = {
  setConfirmState
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationContainer)
