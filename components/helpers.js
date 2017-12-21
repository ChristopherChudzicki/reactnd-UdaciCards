import styled from "styled-components/native";

export const Button = styled.TouchableOpacity`
  border-radius:5px;
  padding:5px;
  margin:5px;
  width: ${props => props.widdth || '125'}px;
  height: ${props => props.height || '75'}px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.backgroundColor || 'white'};
  shadow-radius: 3;
  shadow-opacity: 0.8;
  shadowColor: 'rgba(0, 0, 0, 0.24)';
  shadowOffset: 0px 3px;
`
