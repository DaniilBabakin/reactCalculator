import React,{useReducer} from 'react';
import DigitButton from './Button/DigitButton';
import OperationButton from './Button/OperationButton';
import './MyButtons.css';


export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  ADD_OPERATION: "add-operation",
  CLEAR: "clear",
  EQUAL: "equal"
}
function reducer (state,{type,payload}){
  switch(type) {
    //КЕЙС ДЛЯ ДОБАВЛЕНИЯ ЦИФРЫ
    case ACTIONS.ADD_DIGIT : 
     if(state.overwrite){
       return{
       ...state,
       currentOperand: payload.value,
       overwrite:false
       }
     }
     if(payload.value ==="0" && state.currentOperand ==="0") return state
     if(payload.value ===".") {
      if(state.currentOperand == null){
        return {
          ...state,
          previousOperand:state.previousOperand,
          currentOperand:"."}
      }
      if(state.currentOperand.includes(".")){
        return state
      }
      
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.value}`
      }
     }
     if(state.currentOperand=="0" && payload.value !=="0"){
      return {
        ...state,
        currentOperand:payload.value
      }
     }
     return {
      ...state,
      currentOperand: `${state.currentOperand || ""}${payload.value}`
    }





    //КЕЙС ДЛЯ ДОБАВЛЕНИЯ ОПЕРАЦИИ
    case ACTIONS.ADD_OPERATION: 
    if(payload.operation==="-" && state.currentOperand ==="0") return{
      ...state,
      currentOperand:payload.operation
    }
    if(state.currentOperand == null && state.previousOperand == null) {return state}
    if(state.previousOperand == null){
      return {
        ...state,
        operation: payload.operation,
        previousOperand:state.currentOperand,
        currentOperand:null,
      }
    }



    //НАЧАЛО ЕСЛИ CURRENT OPERAND == NULL
    if(state.currentOperand == null){
      
      if(!state.previousOperand.includes("-") && payload.operation==="-"){
        return{
          ...state,
          
          previousOperand:`${state.previousOperand}`,
          currentOperand: payload.operation
          }
      }
      
      
      if(payload.operation==="-"){
        return{
        ...state,
        operation:payload.operation,
        currentOperand: payload.operation
        }
      }
      
      if(state.previousOperand.includes("-") && payload.operation==="-"){
        return{
          ...state,
          operation:`${state.previousOperand}${payload.operation}`,
          currentOperand: payload.operation
          }
      }
     
      
      return{
        ...state,
        operation:payload.operation
      }
      
    }
    //КОНЕЦ ЕСЛИ CURRENT OPERAND == NULL



    if(state.previousOperand!= null && state.currentOperand=="-" ){
      return{
        ...state,
        operation:payload.operation,
        previousOperand: state.previousOperand.match(/\d+/),
        currentOperand:null
      }
    } 
    if(state.previousOperand!= null && !(/\d+/.test(state.currentOperand))){
      return{
        ...state,
        operation:payload.operation,
        currentOperand:null
      }
    }
    return {
      ...state,
      previousOperand: equal(state) ,
      operation: payload.operation,
      currentOperand:null
    }





    //КЕЙС ДЛЯ УРАВНИВАНИЯ
    case ACTIONS.EQUAL : 
    if(state.currentOperand == null ||
       state.previousOperand == null || 
       state.operation == null){return state}
    return{
      ...state,
      overwrite:true,
      currentOperand : equal(state),
      operation:null,
      previousOperand:null
    }





    //КЕЙС ДЛЯ ОЧИСТКИ
    case ACTIONS.CLEAR : return {currentOperand:"0"}
    default: return state;
  }
}

function equal ({currentOperand,previousOperand,operation}) {
  let current = parseFloat(currentOperand)
  let prev = parseFloat(previousOperand)
  let final = ""
  switch(operation){
    case "+" : 
      final = prev + current
      break
    case "-" : 
      final = prev - current
      break
    case "*" : 
      final = prev * current
      break
    case "/" : 
      final = prev / current
      break
    default : break
  }
  return final
}

const MyButtons = () => {
  const [{currentOperand,previousOperand,operation},dispatch] = useReducer(reducer,{});
  return (
      <div className='calculator-grid'>
        <div className='calculator-output' id="display">
          <div className='previosValue'>{previousOperand}{operation}</div>
          <div className='currentValue'>{currentOperand}</div>
        </div>
        <button className='big-button-column' id='clear' onClick = {()=> dispatch({type:ACTIONS.CLEAR})}>AC</button>
        <OperationButton id="divide" operation="/" dispatch={dispatch}/>
        <OperationButton id="multiply" operation="*" dispatch={dispatch}/>
        <DigitButton id="seven" value="7" dispatch={dispatch}/>
        <DigitButton id="eight" value="8" dispatch={dispatch}/>
        <DigitButton id="nine" value="9" dispatch={dispatch}/>
        <OperationButton id="subtract" operation="-" dispatch={dispatch}/>
        <DigitButton id="four" value="4" dispatch={dispatch}/>
        <DigitButton id="five" value="5" dispatch={dispatch}/>
        <DigitButton id="six" value="6" dispatch={dispatch}/>
        <OperationButton id="add" operation="+" dispatch={dispatch}/>
        <DigitButton id="one" value="1" dispatch={dispatch}/>
        <DigitButton id="two" value="2" dispatch={dispatch}/>
        <DigitButton id="three" value="3" dispatch={dispatch}/>
        <button className='big-button-row' id="equals" onClick = {()=> dispatch({type:ACTIONS.EQUAL})}>=</button>
        <DigitButton className='big-button-column' id="zero" value="0" dispatch={dispatch}/>
        <DigitButton id="decimal" value="." dispatch={dispatch}/>
      </div>  
  );
}
 
export default MyButtons;