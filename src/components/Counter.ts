import { createElement } from "../core/dom";
import { useState } from "../core/hooks";

const Counter: great.GreatComponent = function () {
    const [count, setCount] = useState(0);
    const handleClick = function (_: MouseEvent) {
        setCount(count + 1);
    };
    return createElement("div", {
        children: [
            createElement("p", { children: "Counter" }),
            createElement("p", { children: count + "次" }),
            createElement("button", {
                children: "Counter++",
                onclick: handleClick,
            }),
        ],
    });
};

export default Counter;
