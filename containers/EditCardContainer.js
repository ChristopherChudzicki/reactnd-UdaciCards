import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Modal from '../components/Modal';
import EditCardForm from '../components/EditCardForm'
import { editCard } from '../actions/cards'
import { setEditCardVisibility } from '../actions/modals'


class EditCardContainer extends Component {
  static propTypes = {
    activeDeckId: PropTypes.string.isRequired,
    activeCardId: PropTypes.string,
    activeCard: PropTypes.object,
    isEditCardVisible: PropTypes.bool.isRequired,
    editCard: PropTypes.func.isRequired,
    setEditCardVisibility: PropTypes.func.isRequired,
  }

  showModal = () => this.props.setEditCardVisibility(true)

  hideModal = () => this.props.setEditCardVisibility(false)

  render(){

    const { activeCard } = this.props
    const initialQuestion = activeCard ? activeCard.question : ''
    const initialAnswer = activeCard ? activeCard.answer : ''

    return (
      <Modal
        open={this.props.isEditCardVisible}
        modalDidClose={this.hideModal}>
        <EditCardForm
          cardId={this.props.activeCardId}
          deckId={this.props.activeDeckId}
          onPressSubmit={this.props.editCard}
          onPressCancel={this.hideModal}
          title='Edit Card'
          submitLabel='Submit'
          initialQuestion={initialQuestion}
          initialAnswer={initialAnswer}
        />
      </Modal>
    )
  }
}

const mapStateToProps = ({modals, quiz, cards}) => ({
  activeDeckId: quiz.activeDeckId,
  activeCardId: quiz.activeCardId,
  activeCard: cards[quiz.activeCardId],
  isEditCardVisible: modals.isEditCardVisible,
})

const mapDispatchToProps = {
  editCard,
  setEditCardVisibility
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCardContainer)
