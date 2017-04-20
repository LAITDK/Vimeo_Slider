angular.module("umbraco").controller("VimeoSliderController", function ($scope: VimeoSlider.IVimeoSliderScope, assetsService: umbraco.services.IAssetsService, entityResource: umbraco.resources.IEntityResource, dialogService: umbraco.services.IDialogService) {
    assetsService.loadCss("/App_Plugins/Vimeo_Slider/vimeoSlider.min.css", $scope, null, 1000);

    if ($scope.control.value == null) {
        $scope.control.value = [];
    }


    // Fjern item.
    $scope.removeItem = function (index) {        
        if (confirm("Are you sure?")) {
            $scope.control.value.splice(index, 1);
        }
        return false;
    }
    


    $scope.openOverlay = function (item: VimeoSlider.IVimeoSliderControlValue | null | undefined) {
        var add = false;
        if (item == null) {
            item = { ImageId: -1, VimeoUrl: "", Title: "", Descr: "", ImageUrl: "" };
            add = true;
        }

        $scope.overlay = {
            view: "/App_Plugins/Vimeo_Slider/vimeo-slider-overlay.html",
            title: "Vimeo Slider",
            show: true,
            submit: function (model) {
                // do submit magic here
                if (add === true) {
                    $scope.control.value.unshift(item);
                    //unshift -> inserts at beginning of array
                }

                $scope.overlay.show = false;
                $scope.overlay = null;
            },
            close: function (oldModel) {
                // do close magic here

                $scope.overlay.show = false;
                $scope.overlay = null;
            },
            openMediaPicker: () => {
                dialogService.mediaPicker({
                    onlyImages: null,
                    callback: (image) => {
                        item.ImageId = image.id;

                        if (item.ImageId != null) {
                            entityResource.getById(item.ImageId, "Media").then(function (ent:any) {
                                item.ImageUrl = ent.metaData.umbracoFile.Value.src;
                            });
                        }
                    }
                })
            },
            control: item
        };
    }

});