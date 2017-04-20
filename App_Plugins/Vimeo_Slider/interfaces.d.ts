declare namespace VimeoSlider {
    export interface IVimeoSliderScope extends ng.IScope {

        control: IVimeoSliderControlModel;
        removeItem: (index:number) => void;
        setImageUrl: () => void;
        change: () => void;
        openOverlay: (item: IVimeoSliderControlValue | null | undefined) => void;
        overlay: IVimeoSliderOverlayModel;
        
    }

    export interface IVimeoSliderOverlayModel {
        view: string;
        title: string;
        show: boolean;
        submit: (model:any) => void;
        close: (oldModel: any) => void;
        openMediaPicker: () => void;
        control: IVimeoSliderControlValue;

    }

    // "Control" interfaces - data to be saved
    export interface IVimeoSliderControlModel {
        value: IVimeoSliderControlValue[];
        ImageUrl: string;
    }

    export interface IVimeoSliderControlValue {
        ImageId: number;
        ImageUrl: string;
        VimeoUrl: string;
        Title: string;
        Descr: string;
    }
}