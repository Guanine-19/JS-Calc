import React from 'react';
import './App.css';

function createButton (id, text, icon, myclass) {
  this.id = id;
  this.text = text;
  this.icon = icon;
  this.class = myclass
}

const CALCBUTTONS = [
  new createButton("backspace","backspace","fas fa-backspace","func-button"),
  new createButton("percent","%","fas fa-percent","func-button"),
  new createButton("divide","/","fas fa-divide","op-button"),
  new createButton("seven","7","","num-button"),
  new createButton("eight","8","","num-button"),
  new createButton("nine","9","","num-button"),
  new createButton("multiply","*","fas fa-times","op-button"),
  new createButton("four","4","","num-button"),
  new createButton("five","5","","num-button"),
  new createButton("six","6","","num-button"),
  new createButton("subtract","-","fas fa-minus","op-button"),
  new createButton("one","1","","num-button"),
  new createButton("two","2","","num-button"),
  new createButton("three","3","","num-button"),
  new createButton("add","+","fas fa-plus","op-button"),
  new createButton("zero","0","","num-button"),
  new createButton("decimal",".","","func-button")
];

const clearButton = new createButton("clear","AC","","func-button");
const equalsButton = new createButton("equals","=","fas fa-equals","func-button");

class History extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    let history = this.props.inhistorySolve.map((solution,i)=>{
      return <p class="dropdown-item">{solution} = {this.props.inhistoryAns[i]}</p>
    })

    return(
      <div id="history" class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        History
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {history}
      </div>
    </div>
    )
  }
}

class CalcButton extends React.Component{
  constructor(props){
    super(props)
    this.letIcon = this.letIcon.bind(this)
    this.updateInputonClick = this.updateInputonClick.bind(this)
  }

  letIcon(){
    if(/*this.props.item.icon!=""*/0){
      return <i class={this.props.item.icon}></i>
    } else return this.props.item.text
  }

  updateInputonClick(){
    this.props.updateInputonClick(this.props.item.text);
  }
  
  render(){
    return(
      <div id={this.props.item.id} class="button col-3 m-0" onClick={this.updateInputonClick}>
        {this.letIcon()}
      </div>
    )
  }
}

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      evaluated: true,
      currentAns: "0",
      input: "0",
      historySolve: [],
      historyAns: [],
    }
    this.updateInput = this.updateInput.bind(this)
    this.evaluate = this.evaluate.bind(this)
    this.clear = this.clear.bind(this)
  }
  updateInput(val){
    if(val === "backspace"){
      if (this.state.input.length>1){
        this.setState({
          input: this.state.input.substring(0,this.state.input.length-1)
        })
      } else {
        this.setState({
          input: "0"
        })
      }
      return
    }
    if(this.state.input==="0"){
      this.setState({
        input: val,
        evaluated: false
      })
    } else if(!this.state.evaluated){
      this.setState({
        input: this.state.input.concat(val),
        currentAns: this.state.input.concat(val)
      })
    } else {
      this.setState({
        input: this.state.historyAns[0]+val,
        currentAns: this.state.input.concat(val),
        evaluated: false
      })
    }
  }
  evaluate(){
    let str = this.state.input.replace(/^0+/g,"");
    try {
      eval(str)
    }
    catch(err) {
      this.setState({
        currentAns: "SYNTAX ERROR"
      });
      setTimeout(this.clear,1000);
      return;
    }
    let answer = 0;
    if(str.length>0){answer = eval(str)}
    this.setState({
      currentAns: answer,
      historySolve: [this.state.input,...this.state.historySolve],
      historyAns: [answer,...this.state.historyAns],
      evaluated: true
    })
  }
  clear(){
    this.setState({
      currentAns: "0",
      input: "0",
      evaluated: false
    })
  }
  render(){
    return(
      <div class="row">
        <div id="display-container" class="col-sm-12 p-3">
          <History inhistoryAns={this.state.historyAns} inhistorySolve={this.state.historySolve}/>
          <p>{this.state.input}</p><br />
          <h2 id="display">{this.state.currentAns}</h2>
        </div>
        <div id={clearButton.id} class="button col-3 p-1" onClick={this.clear}>
          {clearButton.text}
        </div>

        {CALCBUTTONS.map((item)=><CalcButton item={item} updateInputonClick={this.updateInput}/>)}

        <div id={equalsButton.id} class="button col-6 p-1" onClick={this.evaluate}>
          <i class={equalsButton.icon}></i>=
        </div>
      </div>
    )
  }
}

export default App;
