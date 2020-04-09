'use strict';
const Alexa = require('ask-sdk-core');
const commonDispatchers = require('./commonDispatchers');
const splashScreenDocumentData = require('../documents/splashscreen-datasource');
const helpers = require('../utils/helpers');
const myUtil = require('../util');

module.exports = {
  LaunchRequestHandler: {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
      let response;
      response = commonDispatchers.LaunchDispatcher(handlerInput);
      return response;
    }
  },

  SessionEndedRequestHandler: {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
      return handlerInput.responseBuilder
        .addAudioPlayerStopDirective()
        .withShouldEndSession(true)
        .getResponse();
    },
  },

  SystemExceptionEncounteredHandler: {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'System.ExceptionEncountered';
    },
    handle(handlerInput) {
      console.log('System Exception Encountered');
      return handlerInput.responseBuilder.getResponse();
       
    },
  },

  HelpIntentHandler: {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
        Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
      let response;
      response = commonDispatchers.help(handlerInput);
      return response;
    }
  },

  CancelAndStopIntentHandler: {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
        (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent' ||
          Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
      let response;
      response = commonDispatchers.cancelAndStop(handlerInput);
      return response;
    }
  },

  PauseIntentHandler: {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
        Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.PauseIntent';
    },
    handle(handlerInput) {
      return commonDispatchers.PauseIntentDispatcher(handlerInput);
    }
  },

  ResumeIntentHandler: {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
        Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.ResumeIntent';
    },
    handle(handlerInput) {
      return commonDispatchers.ResumeIntentDispatcher(handlerInput);
    }
  },

  AudioPlayerIntentsHandler : {
    canHandle(handlerInput) {

      return (Alexa.getRequestType(handlerInput.requestEnvelope) === 'AudioPlayer.PlaybackStarted' ||
        Alexa.getRequestType(handlerInput.requestEnvelope) === 'AudioPlayer.PlaybackFinished' ||
        Alexa.getRequestType(handlerInput.requestEnvelope) === 'AudioPlayer.PlaybackStopped' ||
        Alexa.getRequestType(handlerInput.requestEnvelope) === 'AudioPlayer.PlaybackNearlyFinished' ||
        Alexa.getRequestType(handlerInput.requestEnvelope) === 'AudioPlayer.PlaybackFailed'
      );
    },
    handle(handlerInput) {
      let requestType = Alexa.getRequestType(handlerInput.requestEnvelope);

      if (requestType === 'AudioPlayer.PlaybackStarted') {
        console.log("AudioPlayerIntentsHandler - Handling Request Type:" + requestType);
      } else if (requestType === 'AudioPlayer.PlaybackFinished') {
        console.log("AudioPlayerIntentsHandler - Handling Request Type:" + requestType);
      } else if (requestType === 'AudioPlayer.PlaybackStopped') {
        console.log("AudioPlayerIntentsHandler - Handling Request Type:" + requestType);
      } else if (requestType === 'AudioPlayer.PlaybackNearlyFinished') {
        console.log("AudioPlayerIntentsHandler - Handling Request Type:" + requestType);
      } else if (requestType === 'AudioPlayer.PlaybackFailed') {
        console.log("AudioPlayerIntentsHandler - Handling Request Type:" + requestType);
      }
      return handlerInput.responseBuilder.getResponse();
    }
  },

  PlaybackPlaycommandHandler: {
    canHandle(handlerInput) {

      return (Alexa.getRequestType(handlerInput.requestEnvelope) === 'PlaybackController.PlayCommandIssued');
    },
    handle(handlerInput) {
      let audioPlayer = handlerInput.requestEnvelope.context.AudioPlayer;
      let offsetInMilliseconds = 0;
      let respond = false;

      if (audioPlayer !== undefined) {
        offsetInMilliseconds = audioPlayer.offsetInMilliseconds;
        if (offsetInMilliseconds === undefined) offsetInMilliseconds = 0;
        respond = (audioPlayer.playerActivity === 'STOPPED') ? true:false;
      }

      if (respond) {
        let response = handlerInput.responseBuilder
          .addAudioPlayerPlayDirective(
            'REPLACE_ALL',
            splashScreenDocumentData.splashScreen.liveStreamURL,
            splashScreenDocumentData.splashScreen.liveStreamURL,
            offsetInMilliseconds,
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
      }
    }
  },

  FallbackIntentHandler: {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
      let response;
      response = commonDispatchers.fallback(handlerInput);
      return response;
    },
  },

  ErrorHandler: {
    canHandle() {
      return true;
    },
    handle(handlerInput, error) {
      console.error(`Error handled: ${error.message}`);
      return null;
    },
  },

  RequestLog: {
    process(handlerInput) {
      console.log(`REQUEST ENVELOPE = ${JSON.stringify(handlerInput.requestEnvelope)}`);
    }
  },

  ResponseLog: {
    process(handlerInput) {
      console.log(`RESPONSE = ${JSON.stringify(handlerInput.responseBuilder.getResponse())}`);
    }
  }
};