import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'

class QuizSummary extends Component {
  static propTypes = {
    grades: PropTypes.object.isRequired
  }

  render(){
    return (
      <View>
        <Text>{this.props.grades}</Text>
      </View>
    )
  }
}

const mapStateToProps = ({ quiz }) => ({
  grades: JSON.stringify(quiz.grades)
})

export default connect(mapStateToProps)(QuizSummary)
