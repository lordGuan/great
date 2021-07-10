import { createComponent, GLOBAL_COMPONENT_HOLDER } from "./dom";

export interface StateSetter<T> {
    (newValue: T): void;
}

const STATE_HOLDER = new Map<string, any[]>();
export const counter = {
    name: "",
    index: 0,
};

export function useState<T>(initial: T): [T, StateSetter<T>] {
    const component = GLOBAL_COMPONENT_HOLDER.current;

    let readState = initial;
    if (component) {
        // @ts-ignore
        console.log(">>>>>", component.__name__);
        const name = component.name;
        if (name === counter.name) {
            counter.index++;
        } else {
            counter.name = name;
            counter.index = 0;
        }
        let states = STATE_HOLDER.get(name) || [];
        if (states.length - 1 < counter.index) {
            states.push(readState);
        } else {
            readState = states[counter.index];
        }
        console.log(">>>>>", counter, readState);
        STATE_HOLDER.set(name, states);
        return [
            readState,
            function (newValue) {
                states[counter.index] = newValue;
                let parent = component.__node__?.parentNode;
                if (parent) {
                    for (let child of parent.children) {
                        // @ts-ignore
                        if (child.__component__) {
                            parent.removeChild(child);
                        }
                    }
                    parent.append(createComponent(component));
                }
            },
        ];
    }
    return [readState, function (newValue) {}];
}
