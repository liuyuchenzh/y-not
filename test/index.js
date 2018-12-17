import { Component, render, useState, useEffect } from "../dist/index.mjs";

function Content(props) {
  const [getCount, updateCount] = useState(0);
  const [getClickCount, updateClickCount] = useState(0);
  useEffect(ref => {
    const timer = setInterval(() => {
      updateCount(getCount() + 1);
    }, 1000);
    ref.addEventListener("click", () => {
      updateClickCount(getClickCount() + 1);
    });
    return () => {
      clearInterval(timer);
    };
  });

  return `
  <div>
    <p>this is content: ${props.content}</p>
    <p>count: ${getCount()}</p>
    <p>click count: ${getClickCount()}</p>
  </div>`;
}

class Item extends Component {
  render() {
    return `<div>item: ${this.props.content}</div>`;
  }
}

class App extends Component {
  constructor(options) {
    super(options);
    this.timer = 0;
    this.state = {
      content: 1,
      list: [1, 2, 3, 4, 5]
    };
  }
  components() {
    return {
      list: this.state.list.map(content =>
        new Item({
          props: {
            content
          }
        }).init()
      ),
      appcontent: () => Content({ content: this.state.content })
    };
  }
  didMount() {
    this.timer = setInterval(() => {
      this.setState({
        list: this.state.list.concat(this.state.list.length + 1),
        content: this.state.content + 1
      });
    }, 1000);
  }
  willUnMount() {
    clearInterval(this.timer);
  }
  render() {
    return `
    <main>
      <appcontent></appcontent>
      <list></list>
    </main>
    `;
  }
}
render("#app", App);
