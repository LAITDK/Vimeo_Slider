var players = $("[data-vimeo=player]"),
    baseUrl = "https://vimeo.com/api/oembed.json?url=",
    vimeoOverlayElm = $("[data-vimeo=overlay]"),
    vimeoCheckbox = $("[data-vimeo=checkbox]");

players.each((index, element) => {
    var playerElement = $(element),
        originalVideo = playerElement.find("[data-vimeo=video]"),
        video = originalVideo,
        player: Vimeo.Player = null,
        videoContainer = $(originalVideo.get(0).offsetParent),
        playerWindowWidth = videoContainer.width(),
        playerWindowHeight = videoContainer.height(),
        sliderItems = playerElement.find("[data-vimeo-slider-url]");


    playerElement.on("click", "[data-vimeo-slider-url]", function (e) {
        e.preventDefault();
        StartPlayer($(this), true);
        return false;
    });

    function StartPlayer(element: JQuery, start: boolean) {
        var url = element.data("vimeo-slider-url"),
            videoClone = originalVideo.clone();

        video.replaceWith(videoClone);
        video = videoClone;
        //if (player == null) {
        video.attr("data-vimeo-url", url);
        video.attr("data-vimeo-width", playerWindowWidth);
        video.attr("data-vimeo-height", playerWindowHeight);
        player = new Vimeo.Player(videoClone.get(0));

       
        // show thumbnail, title & descr, of current video playing.
        // find elements
        var videoImageElm = element.find($("[data-vimeo-image]"));
        var vimeoTitleElm = element.find($("[data-vimeo-title]"));
        var vimeoDescrElm = element.find($("[data-vimeo-descr]"));

        //get data
        var vimeoImage = videoImageElm.data("vimeo-image");
        var vimeoTitle = vimeoTitleElm.data("vimeo-title");
        var vimeoDescr = vimeoDescrElm.data("vimeo-descr");

        //insert into place.
        if (vimeoImage != null){ 
        $("[data-vimeo=headline]").text(vimeoTitle);
        }
        if (vimeoTitle != null) { 
            $("[data-vimeo=descr]").text(vimeoDescr);
        }
        if(vimeoDescr != null){
        $("[data-vimeo=overlay]").css("background-image", 'url(' + vimeoImage + ')');
        }

        // play the player.
        if (start === true) {
            player.play();
        }

        player.on('pause', e => {
            // uncheck checkbox.
            vimeoCheckbox.attr('checked', false);
            // show overlay.
            vimeoOverlayElm.show();
        });
        player.on('play', e => {
            vimeoCheckbox.attr('checked', true);
            vimeoOverlayElm.fadeOut();
        });
    }

    StartPlayer(sliderItems.first(), false);

    sliderItems.each((index, element) => {
        var selectedElement = $(element);
        var url = selectedElement.data("vimeo-slider-url"),
            encodedUrl = encodeURIComponent(url),
            requestUrl = baseUrl + encodedUrl;

        $.ajax({
            url: requestUrl,
            context: document.body
        }).done(function (data: IVimeoData) {
            // get duration and convert to minutes.
            var duration = data.duration,
                convertedDuration = durationFromMiliseconds(duration * 1000);

            //insert into element
            selectedElement.find("[data-vimeo=length]").text(convertedDuration);

        });
    });

    vimeoCheckbox.click(function () {
        if (player != null && vimeoCheckbox.prop('checked') == true) {
            player.play();
            vimeoOverlayElm.fadeOut();
        }
    });
});

interface IVimeoData {
    type: string;
    version: string;
    provider_name: string;
    provider_url: string;
    title: string;
    author_name: string;
    author_url: string;
    is_plus: string;
    html: string;
    width: number;
    height: number;
    duration: number;
    description: string;
    thumbnail_url: string;
    thumbnail_width: number;
    thumbnail_height: number;
    thumbnail_url_with_play_button: string;
    upload_date: string;
    video_id: number;
    uri: string;
}
function durationFromMiliseconds(duration: number) {
    var durationInSeconds = Math.floor(duration / 1000),
        hours = Math.floor(durationInSeconds / 3600),
        minutes = Math.floor((durationInSeconds / 60) - (hours * 60)),
        seconds = Math.floor(durationInSeconds - (minutes * 60) - (hours * 3600)),
        underTenMin = "",
        underTenSek = "";

    if (minutes < 10) {
        underTenMin = "0";
    }
    if (seconds < 10) {
        underTenSek = "0";
    }

    return hours + ":" + underTenMin + minutes + ":" + underTenSek + seconds;
}

interface JQuery {
    attr(attributeName: string, value: boolean): JQuery;
}