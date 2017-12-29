import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import PropTypes from 'prop-types'
import { gray } from '../utils/colors'
import { setActiveCard } from '../actions/quiz'
import { setEditCardVisibility } from '../actions/modals'

class CardSummary extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    sortHandlers: PropTypes.object,
    id: PropTypes.string.isRequired,
    setActiveCard: PropTypes.func.isRequired,
    setEditCardVisibility: PropTypes.func.isRequired
  }

  onPressEdit = () => {
    this.props.setActiveCard(this.props.id)
    this.props.setEditCardVisibility(true)
  }

  render(){
    return (
      <ListItem
        title={this.props.data.question}
        leftIcon={
          <Icon
            type='material-community'
            name='drag-vertical'
          />
        }
        rightIcon={
          <Icon
            name='pencil'
            size={18}
            type='font-awesome'
            iconStyle={[styles.editIcon, styles.shadow]}
            onPress={this.onPressEdit}
          />}
        {...this.props.sortHandlers}
      />
    )
  }
}

const styles = StyleSheet.create({
  editIcon: {
    color: gray,
    paddingRight:10
  },
  shadow: {
    shadowRadius: 1.5,
    shadowOpacity: 1,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 1,
      height: 2
    }
  }
})

const mapDispatchToProps = {
  setActiveCard,
  setEditCardVisibility
}

export default connect(null, mapDispatchToProps)(CardSummary)
