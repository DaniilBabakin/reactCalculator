import React from 'react';
import { ACTIONS } from '../MyButtons';
const OperationButton = ({id,operation,dispatch,className}) => {
  return (
    <button className={className} id={id} onClick = {()=> dispatch({type:ACTIONS.ADD_OPERATION, payload: {operation}})}>{operation}</button>
    );
}
 
export default OperationButton;
