import { counter } from "./hooks";

type ChildNode = Node | string;

export interface ElementOptions {
    children?: ChildNode[] | ChildNode;
    onclick?: (event: MouseEvent) => void;
}

export function createElement(
    tag: string,
    options: ElementOptions
): HTMLElement {
    let element = document.createElement(tag);
    const { children, onclick } = options;
    if (children) {
        if (Array.isArray(children)) {
            element.append(...children);
        } else {
            element.append(children);
        }
    }

    if (onclick) {
        element.addEventListener("click", (event) => {
            onclick.call(element, event);
        });
    }

    return element;
}

export const GLOBAL_COMPONENT_HOLDER: {
    current: null | great.GreatComponent;
    stack: great.GreatComponent[];
} = {
    current: null,
    stack: [],
};

export function createComponent(component: great.GreatComponent): HTMLElement {
    counter.name = "";
    if (GLOBAL_COMPONENT_HOLDER.current)
        GLOBAL_COMPONENT_HOLDER.stack.push(GLOBAL_COMPONENT_HOLDER.current);
    GLOBAL_COMPONENT_HOLDER.current = component;
    const result = component();
    (result as any).__component__ = GLOBAL_COMPONENT_HOLDER.current;
    GLOBAL_COMPONENT_HOLDER.current.__node__ = result;
    let prev = GLOBAL_COMPONENT_HOLDER.stack.pop();
    GLOBAL_COMPONENT_HOLDER.current = prev || null;

    return result;
}

export function render(component: HTMLElement, root: Element | null) {
    root && root.append(component);
}
