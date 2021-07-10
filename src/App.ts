import { createComponent, createElement } from "./core/dom";
import Counter from "./components/Counter";
import { useState } from "./core/hooks";

const App: great.GreatComponent = function () {
    const [a, _] = useState("aaa");
    return createElement("div", {
        children: [
            createElement("h1", { children: a }),
            createComponent(Counter),
        ],
    });
};

export default App;
