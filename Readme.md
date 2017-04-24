--------------------------------------
Readme for Vimeo Slider:
LAIT ApS 2017
--------------------------------------

Vimeo slider, is build and tested for umbraco 7.5.4.
It is part of the umbraco grid, and works by supplying
a Vimeo.com video link like: https://vimeo.com/183539690,
thumbnail image, headline and text which will be uploaded to umbraco.

in the view, jquery creates the vimeo player from the first available in the playlist,
and displays it in the large player window. A thumbnail overlay is present, with a 
white button, which when pressed will start the video.

The overlay will appear again, when video is paused. 

Pressing an item in the playlist, will load the video into the large player 
and autostart the video.



Install:

notes::: (Dansk)
 - Overfør filer, til de tilsvarende mapper. 
 - App_Plugins -> Vimeo_Slider -> "package.manifest", tilpas Alias til projekt navn.(%SolutionName%)
 - Controller -> "VideoSurfaceController.cs", tilpas namespace samt using. (%SolutionName%) 

 - Tilføj flg. links til master page: (tilpas hvis nødvendigt)

			<script src="https://player.vimeo.com/api/player.js"></script>
            <script src="~/scripts/typings/Custom/VimeoSlider.js"></script>

 note::: (English)
 - Transfer files, to corresponding folders.
 - App_Plugins -> Vimeo_slider -> "package.manifest", adapt Alias to your project name (%SolutionName%)
 - Controller -> "VideoSurfaceController.cs", adapt namespace and using. (%SolutionName%)
 - Add the following links to the master page: ( adapt if needed)

 			<script src="https://player.vimeo.com/api/player.js"></script>
            <script src="~/scripts/typings/Custom/VimeoSlider.js"></script>