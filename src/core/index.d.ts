declare module great {
    export interface GreatComponent {
        __node__?: HTMLElement;

        (): HTMLElement;
    }

    export interface FunctionComponent {
        (): GreatElement;
    }

    export interface GreatElement {
        __node__?: HTMLElement;
        __name__: string;
    }
}
