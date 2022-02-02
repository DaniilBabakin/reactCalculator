import React from 'react';
import { ACTIONS } from '../MyButtons';
const DigitButton = ({id,value,dispatch,className}) => {
  return (
    <button className={className} id={id} onClick = {()=> dispatch({type:ACTIONS.ADD_DIGIT, payload: {value}})}>{value}</button>
    );
}
 
export default DigitButton;