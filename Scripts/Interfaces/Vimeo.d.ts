declare namespace Vimeo {
    class Player {
        constructor(elm: Element);

        on: (eventName: "play"|"pause", handler:(e:Event) => void)=>void;
        pause: () => JQueryPromise<any>;
        play: () => JQueryPromise<any>;
        loadVideo: (id: string | number) => any;
        unload: () => any;
        getDuration: () => any;
        getPaused: () => any;
    }
}