import React from 'react';
import Square from './Square.jsx'

function Row(props) {
    
    return (
        <div className = "table-row">
            {props.row.map((ele, ind) => {
                return <Square key = {ind} dataYSquare = {props.dataY} dataXSquare = {ind} internalValue = {props.row[ind]}/>
            })}
        </div>        
    );  
        
}


export default Row;