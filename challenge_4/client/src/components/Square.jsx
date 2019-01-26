import React from 'react';

class  Square extends React.Component {

        constructor(props) {
           super(props)
           this.state = {
                style: {
                  width: "50px",
                  height: "50px",
                  display: "table-cell",
                  background:"lightgray"
                }
           }
           this.changeColor = this.changeColor.bind(this);
        }
        
        componentDidUpdate(prevProps) {
          if (prevProps.internalValue !== this.props.internalValue) {
            this.changeColor()
          }
        }
          
          
        changeColor() {    
          if (this.props.internalValue === 0) {
            this.setState({
              style: {
                width: "50px",
                height: "50px",
                display: "table-cell",
                background:"lightgray"
              }
            })
          } else if (this.props.internalValue ===1) {
            this.setState({
              style: {
                width: "50px",
                height: "50px",
                display: "table-cell",
                background:"red"
              }
            })
          } else {
            this.setState({
              style: {
                width: "50px",
                height: "50px",
                display: "table-cell",
                background:"yellow"
              }
            })
          }
        }

        render() {

          return (
            <div data-y = {this.props.dataYSquare} data-x = {this.props.dataXSquare} style={this.state.style} className="cell" ></div>
          ) 

        }  

}



export default Square;