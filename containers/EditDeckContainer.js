import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Modal from '../components/Modal';
import EditDeckForm from '../components/EditDeckForm'
import { editDeckTitle } from '../actions/decks'
import { setEditDeckVisibility } from '../actions/modals'


class EditDeckContainer extends Component {
  static propTypes = {
    activeDeckId: PropTypes.string.isRequired,
    activeDeckTitle: PropTypes.string.isRequired,
    isEditDeckVisible: PropTypes.bool.isRequired,
    editDeckTitle: PropTypes.func.isRequired,
    setEditDeckVisibility: PropTypes.func.isRequired,
  }

  showModal = () => this.props.setEditDeckVisibility(true)

  hideModal = () => this.props.setEditDeckVisibility(false)

  render(){

    return (
      <Modal
        open={this.props.isEditDeckVisible}
        modalDidClose={this.hideModal}>
        <EditDeckForm
          deckId={this.props.activeDeckId}
          onPressSubmit={this.props.editDeckTitle}
          onPressCancel={this.hideModal}
          title='Edit Deck'
          submitLabel='Submit'
          initialName={this.props.activeDeckTitle}
        />
      </Modal>
    )
  }
}

const mapStateToProps = ({modals, quiz, decks}) => {
  const activeDeckId = quiz.activeDeckId
  return {
    activeDeckId: activeDeckId,
    activeDeckTitle: decks[activeDeckId].title,
    isEditDeckVisible: modals.isEditDeckVisible,
  }
}

const mapDispatchToProps = {
  editDeckTitle,
  setEditDeckVisibility
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDeckContainer)
