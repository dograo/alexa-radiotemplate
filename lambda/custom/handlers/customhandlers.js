'use strict';
const Alexa = require('ask-sdk-core');
const commonDispatchers = require('./commonDispatchers');

module.exports = {

  ChannelStationIntentHandler : {
    canHandle(handlerInput) {
      return (Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
              Alexa.getIntentName(handlerInput.requestEnvelope) === 'ChannelStationIntent') ||
              (Alexa.getRequestType(handlerInput.requestEnvelope) === 'Alexa.Presentation.APL.UserEvent' &&
              handlerInput.requestEnvelope.request.arguments[0] === 'playRadio');
    },
    handle(handlerInput) {
      let response;
      response = commonDispatchers.playAudio(handlerInput, 0, 'PLAY');
      return response;
    }
  }
};