'use strict';
const Alexa = require('ask-sdk-core');
const splashScreenDocument = require('../documents/splashscreen.json');
const splashScreenDocumentData = require('../documents/splashscreen-datasource');
const helpers = require('../utils/helpers');

module.exports = {
  LaunchDispatcher(handlerInput) {    
    return this.launch(handlerInput, 'WELCOME');
  },

  ResumeIntentDispatcher(handlerInput) {
    let audioPlayer = handlerInput.requestEnvelope.context.AudioPlayer;
    let offsetInMilliseconds = 0;

    if (audioPlayer !== undefined) {
      offsetInMilliseconds = audioPlayer.offsetInMilliseconds;
      if (offsetInMilliseconds === undefined) offsetInMilliseconds = 0;
    }

    return this.playAudio(handlerInput, offsetInMilliseconds, 'RESUME');
  },

  PauseIntentDispatcher(handlerInput) {
    let speechText;
    let response;

    speechText = helpers.getValue(handlerInput, 'PAUSE_ONGOING');
    let audioPlayer = handlerInput.requestEnvelope.context.AudioPlayer;
    let offsetInMilliseconds;

    if (audioPlayer !== undefined) {
      offsetInMilliseconds = audioPlayer.offsetInMilliseconds;
      if (offsetInMilliseconds !== undefined) {
          response = handlerInput.responseBuilder
            .speak(speechText)
            .addAudioPlayerStopDirective()
            .withShouldEndSession(true)
            .getResponse();
        
      } else {
        speechText = helpers.getValue(handlerInput, 'PAUSE_NOPLAYING');
        response = handlerInput.responseBuilder
            .speak(speechText)
            .addAudioPlayerStopDirective()
            .withShouldEndSession(true)
            .getResponse();
      }
    } else {
      speechText = helpers.getValue(handlerInput, 'PAUSE_NOPLAYING');
      response = handlerInput.responseBuilder
          .speak(speechText)
          .addAudioPlayerStopDirective()
          .withShouldEndSession(true)
          .getResponse();
    }
    return response;
  },

  cancelAndStop(handlerInput) {
    const speechText = helpers.getValue(handlerInput, 'EXIT');
    let response;
    
    response = handlerInput.responseBuilder
        .speak(speechText)
        .addAudioPlayerStopDirective()
        .withShouldEndSession(true)
        .getResponse();
    
    return response;
  },

  help(handlerInput) {
    let speechText;
    speechText = helpers.getValue(handlerInput, 'HELP');

    let response = handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(false)
      .getResponse();

    return response;
  },

  launch(handlerInput, label) {
    let response;
    
    if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
      response = handlerInput.responseBuilder
        .speak(helpers.getValue(handlerInput, label))
        .reprompt(helpers.getValue(handlerInput, label))
        .withShouldEndSession(false)
        .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          version: '1.3',
          document: splashScreenDocument,
          datasources: splashScreenDocumentData
        })
        .getResponse();
    } else {
      response = handlerInput.responseBuilder
        .speak(helpers.getValue(handlerInput, label))
        .reprompt(helpers.getValue(handlerInput, label))
        .withShouldEndSession(false)
        .getResponse();
    }
    return response;
  },

  playAudio(handlerInput, offset, label) {
    let response;

    response = handlerInput.responseBuilder
      .speak(helpers.getValue(handlerInput, label))
      .withShouldEndSession(true)
      .addAudioPlayerPlayDirective(
        'REPLACE_ALL',
        splashScreenDocumentData.splashScreen.liveStreamURL,
        'token-' + `${Math.random()}` + `?ts=${Date.now()}`,
        offset,
        null,
        helpers.getAudioData(
          splashScreenDocumentData.splashScreen.liveStreamTitle,
          splashScreenDocumentData.splashScreen.liveStreamSubTitle,
          splashScreenDocumentData.splashScreen.liveStreamArtImage,
          splashScreenDocumentData.splashScreen.liveStreamBackgroundImage
        )
      )
      .getResponse();
    
    return response;
  },

  fallback(handlerInput) {
    let speechText;
    let response;
    speechText = helpers.getValue(handlerInput, 'FALLBACK');
    response = handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
    return response;
  }
};