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

> IE8+ if adding `jQuery` + `JSON` shim to your page

> Need to include polyfill like `@babel/polyfill` yourself if targeting non-es6 compatible browsers. Or just use [Polyfill.io](https://polyfill.io/v2/docs/)

## Usage

### Class component

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

### Consume class components

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

> For components defined in class, `init` method has to be called.

### Functional component

```js
function Child(props) {
  return `<div>${props.content}</div>`;
}

class Parent extends Component {
  state = {
    content: "child content"
  }
  components() {
    return {
      child: () => Child({content: this.state.content});
    }
  }
  render() {
    return `<div><child></child></div>`
  }
}
```

### Consume component within functional component

```js
import { register } from "y-not";

function Child() {
  return `<div>This is child</div>`;
}

function Parent() {
  // make Child a component within Parent
  register(() => {
    return {
      child: () => Child()
    };
  });

  return `
    <div>
      <child></child>
    </div>
  `;
}
```

`register` accepts a function that return an object. The keys are the component name, and values are components either in class or function

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
    // props could also to be a function that returns an object
    const foo = new Foo({
      props: {
        value: this.state.value
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

> `props` can also be a function that returns an object.

### Render list

```js
class Item extends Component {
  render() {
    return `<li>${this.props.text}</li>`;
  }
}
class App extends Component {
  state = {
    list: ["a", "b", "c"]
  };
  components() {
    const list = this.state.list.map(text =>
      new Item({
        props: { text }
      }).init()
    );
    return { list };
  }
  render() {
    return "<ul><list></list></ul>";
  }
}
```

### Render root

```js
import { render } from "y-not";
import Root from "./your-root-component";
render("#app", Root);
```

> For the time being, `Root` component has to be written in class manner.

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
      props: {
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

### Hooks

```js
import { useState, useEffect } from "y-not";

function Content() {
  const [getCount, updateCount] = useState(0);
  useEffect(ref => {
    ref.addEventListener("click", () => {
      updateCount(getCount() + 1);
    });
  });

  return `
    <div>
      <p>count: ${getCount()}</p>
    </div>`;
}
```

> The first element returned by `useState` is a function, which returns the corresponding state value.

> `ref` of the root HTMLElement within the component will be passed in as the first argument in `useEffect`.

Custom hooks are supported:

```js
import { useState, useEffect } from "y-not";

function useCount(initialValue = 0) {
  const [getCount, updateCount] = useState(initialValue);
  return [getCount, updateCount];
}

function Count() {
  const [getCount, updateCount] = useCount(1);
  useEffect(ref => {
    ref.addEventListener("click", () => {
      updateCount(getCount() + 1);
    });
  });

  return `<div>count: ${getCount()}</div>`;
}
```

Hooks with `register` can cover most use cases:

```js
import { register, useEffect, useState } from "y-not";

function Child(props) {
  return `<span>${props.content}</span>`;
}

function Parent() {
  const [getContent, updateContent] = useState("");
  useEffect(() => {
    fetch("/some/api")
      .then(res => res.json())
      .then(json => {
        updateContent(json.content);
      });
  });
  register(() => {
    return {
      child: () => Child({ content: getContent() })
    };
  });

  return `<div><child></child></div>`;
}
```

## API

### Class Component

#### Property

##### state

```ts
type state = object;
```

State for each Component.

##### props

```ts
type props = object;
```

Props that have been passed down.

##### ref

```ts
type ref = HTMLElement;
```

When mounted, the reference to the container element for each component will be assigned to `ref`.

#### Methods

##### render

```ts
type render = () => string;
```

Return the html string of your component.

##### didMount

```ts
type didMount = () => void;
```

Called when component is inserted to DOM.

##### didUpdate

```ts
type didUpdate = () => void;
```

Called when component get updated(only a change of view would be considered as an update).

##### shouldUpdate

```ts
type shouldUpdate = () => boolean;
```

Force to update the component even if the view doesn't change.

Non Boolean return value would be ignored.

##### willUnMount

Called when the component will unmount. Clear timers here.

##### setState

```ts
// pass in an object
type setState = (state: object) => void;
// given the old state, return the new one
type setState = (callback: (oldState: object) => object)
```

Update state.

##### components

```ts
type components = () => { [name: string]: Component };
```

Return an object consist of `Component` instances.

The `name` can then be used in the `render` method as a custom element tagName.

#### Options

```js
const component = new Component(options).init();
```

> `init` must be called!

Valid fields for `options` are showed below.

##### [el]

```ts
type el = string;
```

Selector for root element.

##### [props]

```ts
type props = () => object;
```

Would be passed down as `props` for child component.

### Global API

#### register

To register child component within functional component.

```ts
import { register } from "y-not";

function Child() {
  return `<div>This is child</div>`;
}

function Parent() {
  // this makes Child a component within Parent
  register(() => {
    return {
      child: () => Child()
    };
  });

  return `
    <div>
      <child></child>
    </div>
  `;
}
```

#### useState

Use state within functional component

Returns an array with two function elements, first of which will return the current state value while the second is just like `setState` for class component.

> The second function element (`setState`) can only be passed in an object but not a function.

```ts
import { useState } from "y-not";

function Component() {
  const [getContent, updateContent] = useState("content");

  return `<div>${getContent()}</div>`;
}
```

#### useEffect

Provide `didMount` and `willUnMount` life cycle to functional element.

Accept one parameter as function, which will act as `didMount` with `ref` as its only parameter.

Such function could return a function, which will act like `willUnMount`.

```ts
import { useState, useEffect } from "y-not";

function Component() {
  const [getClick, updateClick] = useState(0);
  const [getCount, updateCount] = useState(0);
  useEffect(ref => {
    ref.addEventListener("click", () => {
      updateState(getState() + 1);
    });

    const timer = setInterval(() => {
      updateCount(getCount() + 1);
    }, 1000);

    return () => clearInterval(timer);
  });

  return `
  <div>
    <div>click: ${getClick()}</div>
    <div>auto count: ${getCount()}</div>
  </div>
  `;
}
```
