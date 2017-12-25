import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { white, blue, darkBlue, darkGray } from '../utils/colors'
import PropTypes from 'prop-types'
import PieChart from 'react-native-pie-chart'


Circle.propTypes = {
  diameter: PropTypes.number.isRequired,
  children: PropTypes.object,
  style: PropTypes.object.isRequired
}
Circle.defaultProps = {
  style: {}
}

function Circle (props){
  return (
    <View style={[{
      width:props.diameter,
      height:props.diameter,
      borderRadius:props.diameter/2,
      backgroundColor: props.style.backgroundColor ? props.style.backgroundColor : blue,
      justifyContent: 'center',
      alignItems: 'center'
    }, props.style]}>
      {props.children}
    </View>
  )
}

QuizSummary.propTypes = {
  score: PropTypes.number.isRequired,
  detailsArray: PropTypes.array.isRequired,
  numTotal: PropTypes.number.isRequired,
  onPressHome: PropTypes.func.isRequired
}

export default function QuizSummary (props) {

  const { detailsArray, numTotal, score, onPressHome } = props

  const unanswered = detailsArray[2]['value']

  const series = detailsArray.map(i => i.value)
  const sliceColor = detailsArray.map(i => i.color)

  return (
    <View style={styles.fullContainer}>
      <View style={styles.summaryContainer}>
        {unanswered===0 ?
          <Text style={[styles.title, {color: blue}]}>
            Finished!
          </Text> :
          <Text style={[styles.title, {color: darkGray}]}>
            {`${unanswered} Unanswered`}
          </Text>
        }
        <View>
          <PieChart
            chart_wh={CHART_WH}
            series={series}
            sliceColor={sliceColor}
          />
          <View style={styles.scoreHolder}>
            <Text style={styles.score}>
              {score}%
            </Text>
          </View>
        </View>
        <View style={styles.detailsTable}>
          {detailsArray.map(item => {
            return (
              <View key={item.name} style={styles.detailsRow}>
                <Text style={[styles.detailsItem, {color:item.textColor}]}>{item.name}</Text>
                <Text style={[styles.detailsItem, {color:item.textColor}]}>{item.value}</Text>
              </View>
            )
          })}
          <View style={[styles.detailsRow, {marginTop:10}]}>
            <Text style={styles.detailsItem} >Total</Text>
            <Text style={styles.detailsItem} >{numTotal}</Text>
          </View>
        </View>
      </View>
      <View>
        <Button
          large
          backgroundColor={darkBlue}
          icon={{name:'home'}}
          Component={TouchableOpacity}
          raised
          title="Home"
          onPress={onPressHome}
        />
      </View>
    </View>
  )
}

const CHART_WH = 100

const styles = StyleSheet.create({
  fullContainer: {
    flex:1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  summaryContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize:32,
    fontWeight:'900'
  },
  scoreHolder:{
    position:'absolute',
    left:0,
    top:0,
    width: CHART_WH,
    height: CHART_WH,
    justifyContent:'center',
    alignItems:'center'
  },
  score: {
    fontSize:28,
    color:white,
    fontWeight:'800',
  },
  detailsTable:{
    minWidth:200,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  detailsItem: {
    fontSize:18,
    fontWeight:'800'
  }
})
