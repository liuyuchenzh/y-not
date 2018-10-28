import { Component, render } from "../dist/index.m.js";

function Content(props) {
  return `<div>this is content: ${props.content}</div>`;
}

class App extends Component {
  constructor(options) {
    super(options);
    this.timer = 0;
    this.state = {
      content: 1
    };
  }
  components() {
    return {
      appcontent: () => Content({ content: this.state.content })
    };
  }
  didMount() {
    this.timer = setInterval(() => {
      this.setState({
        content: this.state.content + 1
      });
    }, 1000);
  }
  willUnMount() {
    clearInterval(this.timer);
  }
  render() {
    return `<main><appcontent></appcontent></main>`;
  }
}
render("#app", App);
