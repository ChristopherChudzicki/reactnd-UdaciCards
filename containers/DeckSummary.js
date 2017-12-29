import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import PropTypes from 'prop-types'
import { lightBlue, gray } from '../utils/colors'

class DeckSummary extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    numTotal: PropTypes.number.isRequired,
    isInEditMode: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired
  }

  onPressEdit = () => {
    alert(`Edit Pressed for ${this.props.id}`)
  }

  onPressDelete = () => {
    alert('Delete Pressed')
  }

  onPress = () => {
    this.props.onPressDeck({id:this.props.id, title:this.props.title})
  }

  render(){

    const {title, numTotal, isInEditMode} = this.props

    return (
      <ListItem
        title={title}
        subtitle={`${numTotal} Questions`}
        onPress={this.onPress}
        underlayColor={lightBlue}
        leftIcon={isInEditMode &&
          <Icon
            name='pencil'
            size={18}
            type='font-awesome'
            iconStyle={[styles.icon, styles.shadow]}
            onPress={this.onPressEdit}
          />
        }
        rightIcon={isInEditMode &&
          <Icon
            name='delete'
            iconStyle={[styles.icon, styles.shadow]}
            onPress={this.onPressDelete}
          />
        }
      />
    )
  }
}

const styles = StyleSheet.create({
  leftIconsContainer: {
    flexDirection:'row'
  },
  icon: {
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

export default connect()(DeckSummary)
