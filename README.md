# y-not

## Notice

STILL UNDER DEVELOPMENT

## Name

Yea I know the repo is called y-component, and the package name is y-not.

Didn't realize there is already one call y-component. And I simply got frustrated about naming.

## Why

Build small but shared features for multi projects using different frameworks like React, Vue, Angular etc.

Avoid writing same code n times.

## Selling point

NONE.

## Install

```bash
npm i -D y-not
# or
yarn add -D y-not
```

## Browser support

IE9+.

> Need to include polyfill like `@babel/polyfill` yourself if targeting non-es6 compatible browsers. Or just use [Polyfill.io](https://polyfill.io/v2/docs/)

## Usage

### Write a component

```js
import { Component } from "y-not";

export default class MyComponent extends Component {
  state = {
    text: "This is MyComponent"
  };
  render() {
    return `<div>${this.state.text}</div>`;
  }
}
```

### Consume components

```js
import { Component } from "y-not";
import Foo from "./foo";
import Bar from "./bar";

export default class MyComponent extends Component {
  components() {
    // init method must be called
    const foo = new Foo().init();
    const bar = new Bar().init();
    return {
      foo,
      bar
    };
  }
  render() {
    return `
      <div>
        <foo></foo>
        <bar></bar>
      </div>`;
  }
}
```

> _Do not_ use self close component (custom element) since it is not supported by browsers.

### Pass down props

```js
import { Component } from "y-not";
import Foo from "./foo";

export default class MyComponent extends Component {
  state = {
    value: 1
  };
  timer = 0;
  components() {
    // props needs to be a function that returns an object
    const foo = new Foo({
      props: () => {
        return {
          value: this.state.value
        };
      }
    }).init();
    return {
      foo
    };
  }
  didMount() {
    // update state
    this.timer = setInterval(() => {
      this.setState({ value: this.state.value + 1 });
    }, 1000);
  }
  willUnMount() {
    clearInterval(this.timer);
  }
  render() {
    return `<div><foo></foo></div>`;
  }
}
```

### Render root

```js
import Root from "./your-root-component";
const root = new Root({
  el: "#app"
}).init();
```

In your html:

```html
<body>
  <div id="app"></div>
  <script src="./your-entry-js-file.js"></script>
</body>
```

### Use template/children

```js
// in Container.js
export default class Container extends Component {
  components() {
    return {
      children: this.props.children
    }
  }
  render() {
    return '<div><children></children></div>'
  }
}
// in Child.js
export default class Child extends Component {
  render() {
    return '<div>This is child</div>'
  }
}
// in App.js
export default class App extends Component {
  components() {
    const child = new Child().init();
    const container = new Container({
      props: () => {
        children: child
      }
    }).init();
    return {
      container
    }
  }
  render() {
    return '<div><container></container></div>'
  }
}
```

### Event handler

There is no event system for y-not. But property `ref` could be used for such case.

```js
import { Component } from "y-not";
export default class MyComponent extends Component {
  state = {
    count: 0
  };
  didMount() {
    this.ref.querySelector("button").addEventListener("click", () => {
      this.setState({
        count: this.state.count + 1
      });
    });
  }
  render() {
    return `
      <div>
        ${this.state.count}
        <button>click here</button>
      </div>`;
  }
}
```

> Yes, lack of event system make it hard to scale when things get complicated. But do notice y-not _does not_ target for such scenario. Use React, Vue, Angular or other amazing frameworks instead.

## API

### Property

#### state

```ts
type state = object;
```

State for each Component.

#### props

```ts
type props = object;
```

Props that have been passed down.

#### ref

```ts
type ref = HTMLElement;
```

When mounted, the reference to the container element for each component will be assigned to `ref`.

### Methods

#### render

```ts
type render = () => string;
```

Return the html string of your component.

#### didMount

```ts
type didMount = () => void;
```

Called when component is inserted to DOM.

#### didUpdate

```ts
type didUpdate = () => void;
```

Called when component get updated(only a change of view would be considered as an update).

#### shouldUpdate

```ts
type shouldUpdate = () => boolean;
```

Force to update the component even if the view doesn't change.

Non Boolean return value would be ignored.

#### willUnMount

Called when the component will unmount. Clear timers here.

#### setState

```ts
type setState = (state: object) => void;
```

Update state.

#### components

```ts
type components = () => { [name: string]: Component };
```

Return an object consist of `Component` instances.

The `name` can then be used in the `render` method as a custom element tagName.

### Options

```js
const component = new Component(options).init();
```

> `init` must be called!

Valid fields for `options` are showed below.

#### [el]

```ts
type el = string;
```

Selector for root element.

#### [props]

```ts
type props = () => object;
```

Would be passed down as `props` for child component.
