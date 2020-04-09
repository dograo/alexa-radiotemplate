const util = require('../util');
const helpers = require('../utils/helpers');

var myBkgImage = "bkgimage.jpg";
var myLogoImage = "logoimage.png";
var myTitleText =  "Your title";
var myLiveStreamURL =  "https://yourlivestreamurl";
var myLiveStreamTitle =  "Vagalume";
var myLiveStreamSubTitle = "Your sub title";
var myliveStreamArtImage = "logoimage.png";
var myLiveStreamBackgroundImage = "bkgimage.jpg";

module.exports =
{
    "splashScreen": {
      "backgroundImage": helpers.isAlexaHosted() ? util.getS3PreSignedUrl('Media/'+myBkgImage) : myBkgImage,
      "logoImage": helpers.isAlexaHosted() ? util.getS3PreSignedUrl('Media/'+myLogoImage) : myLogoImage,
      "titleText": myTitleText,
      "liveStreamURL": myLiveStreamURL,
      "liveStreamTitle": myLiveStreamTitle,
      "liveStreamSubTitle": myLiveStreamSubTitle,
      "liveStreamArtImage": helpers.isAlexaHosted() ? util.getS3PreSignedUrl('Media/'+ myliveStreamArtImage) : myliveStreamArtImage,
      "liveStreamBackgroundImage": helpers.isAlexaHosted() ? util.getS3PreSignedUrl('Media/'+ myLiveStreamBackgroundImage) : myLiveStreamBackgroundImage
    }
};