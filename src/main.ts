import App from "./App";
import { createComponent, render } from "./core/dom";

render(createComponent(App), document.querySelector("#root"));

export default {};
