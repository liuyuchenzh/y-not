import {
  Component,
  render,
  useState,
  useEffect,
  register
} from "../dist/index.mjs";

function useClickState(count = 0) {
  const [getClickCount, updateClickCount] = useState(count);
  return [getClickCount, updateClickCount];
}

function Count(props) {
  const [getOwnCount, updateOwnCount] = useState(0);
  useEffect(ref => {
    ref.addEventListener("click", () => {
      updateOwnCount(getOwnCount() + 1);
    });
  });
  return `
  <div>
    <p>props count: ${props.count}</p>
    <p>own count: ${getOwnCount()}</p>
  </div>`;
}

function Content(props) {
  const [getCount, updateCount] = useState(0);
  const [getClickCount, updateClickCount] = useClickState(0);
  useEffect(ref => {
    const timer = setInterval(() => {
      updateCount(getCount() + 1);
    }, 1500);
    ref.querySelector(".clickP").addEventListener("click", () => {
      updateClickCount(getClickCount() + 1);
    });
    return () => {
      clearInterval(timer);
    };
  });

  register(() => {
    return {
      count: () => Count({ count: getCount() })
    };
  });

  return `
  <div>
    <h2>Test of hooks</h2>
    <p>this is content: ${props.content}</p>
    <count></count>
    <p class="clickP">click count: ${getClickCount()}</p>
  </div>`;
}

function Input() {
  const [getVal, updateVal] = useState("");
  useEffect(ref => {
    ref.querySelector("input").addEventListener("input", e => {
      const {
        target: { value }
      } = e;
      updateVal(value);
    });
  });

  return `
  <div>
    <h2>Test of input</h2>
    <p><input /></p>
    <p>mirror: ${getVal()}</p>
  </div>
  `;
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
      appcontent: () => Content({ content: this.state.content }),
      yinput: () => Input()
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
      <yinput></yinput>
      <appcontent></appcontent>
      <h2>Test of list</h2>
      <list></list>
    </main>
    `;
  }
}
render("#app", App);
