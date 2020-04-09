module.exports = {

  getAudioData(title, subtitle, artImageURL, bkgImageURL) {
    let audioItemMetadata = {
      "title": title,
      "subtitle": subtitle,
      "art": {
        "sources": [{
          "url": artImageURL,
          "widthPixels ": 512,
          "heightPixels": 512,
          "contentDescription": "example image 1"
        }]
      },
      "backgroundImage": {
        "sources": [{
          "url": bkgImageURL,
          "widthPixels": 1200,
          "heightPixels": 800,
          "contentDescription": "example image 2",
        }]
      }
    };
    return audioItemMetadata;
  },

  getValue(handlerInput, label) {
    const lang = require('./language');
    let locale = handlerInput.requestEnvelope.request.locale;
    console.log("locale -> "+locale);
    console.log(`lang -> ${JSON.stringify(lang)}`);
    console.log(lang[locale]);
    return lang[locale].speech[label];
  },

  isAlexaHosted() {
    return process.env.S3_PERSISTENCE_BUCKET ? true : false;
  }
};