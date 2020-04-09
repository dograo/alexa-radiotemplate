/* eslint-disable  func-names */
/* eslint-disable  no-console */

'use strict';
const Alexa = require('ask-sdk-core');
const commonHandlers = require('./handlers/commonhandlers');
const customHandlers = require('./handlers/customhandlers');

exports.handler =
  Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    commonHandlers.LaunchRequestHandler,
    commonHandlers.ResumeIntentHandler,
    commonHandlers.PauseIntentHandler,
    commonHandlers.HelpIntentHandler,
    commonHandlers.CancelAndStopIntentHandler,
    customHandlers.ChannelStationIntentHandler,
    commonHandlers.AudioPlayerIntentsHandler,
    commonHandlers.PlaybackPlaycommandHandler,    
    commonHandlers.SessionEndedRequestHandler,
    commonHandlers.FallbackIntentHandler
  )
  .addErrorHandlers(commonHandlers.ErrorHandler)
  .addRequestInterceptors(commonHandlers.RequestLog)
  .addResponseInterceptors(commonHandlers.ResponseLog)
  .lambda();