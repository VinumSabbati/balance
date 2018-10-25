import React from 'react';
import './App.css';

export default class App extends React.Component {
  constructor() {
    super();
    this.brackets = [ ['{','}'] , ['[',']'] , ['(',')'] ];
  }

  checkValidity = () => {
    const input = document.getElementById('code-input').value;
    if (!input) {
      this.showValidResult(true);
    }
    const expression = input.split('');
    let stack = [];
    for (let i = 0; i < expression.length; i++) {
      if (this.isParenthesis(expression[i])) {
        if (this.isOpenParen(expression[i])) {
          stack.push(expression[i]);
        } else {
          if (stack.length === 0) {
            return this.showValidResult(false);
          }
          let top = stack.pop();
          if (!this.matches(top, expression[i])) {
            return this.showValidResult(false);
          } else {
            return this.showValidResult(true);
          }
        }
      }
    }
  };

  // determine if a character is a parenthesis, bracket, etc.
  isParenthesis = character => {
    const string = '{}[]()';
    return string.indexOf(character) > -1;
  };

  // look for an opening character
  isOpenParen = parenthesisCharacter => {
    for (let j = 0; j < this.brackets.length; j++) {
      if (this.brackets[j][0] === parenthesisCharacter) {
        return true;
      }
    }
    return false;
  };

  // see if opening character matches closing character
  matches = (topOfStack, closedParenthesis) => {
    for (let k = 0; k < this.brackets.length; k++) {
      if (this.brackets[k][0] === topOfStack &&
        this.brackets[k][1] === closedParenthesis) {
        return true;
      }
    }
    return false;
  };

  // show some result to the user
  showValidResult = isValid => {
    const input = document.getElementById('code-input').value;
    const result = document.getElementById('result');
    isValid ?
      result.innerHTML = `<span class="valid">"${input}" is valid.</span>`
    :
      result.innerHTML = `<span class="invalid">"${input}" is invalid.</span>`
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h4 className="title">
            Enter your code to check for balanced parenthesis.
          </h4>
          <textarea
            id="code-input"
            className="text-input"
            rows={20}
            cols={60}
          />
          <button className="submit-btn" onClick={this.checkValidity}>
            Check Code
          </button>
          <div id="result" className="response"/>
        </header>
      </div>
    );
  }
}
