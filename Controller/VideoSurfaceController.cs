using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using %SolutionName%.Classes.Cms.MediaTypes;
using %SolutionName%.Models;
using Umbraco.Web;

namespace %SolutionName%.Controllers
{
    public class VideoSurfaceController : Umbraco.Web.Mvc.SurfaceController
    {
        
        [HttpGet]
        public ContentResult GetImageUrl(string mediaId)
        {
            string url = null;
            var mediaItem = Umbraco.TypedMedia(mediaId);
            
                // get img id
                if (mediaItem != null)
                {
                    url = mediaItem.Url;
                }
                
            

            return Content(url);
        }
    }
}