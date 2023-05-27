/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const languageStrings = {
    es : {
        translation : {
            BIENVENIDA: `Hola, soy una calculadora básica,
            puedo ayudarte a hacer operaciones simples.
            Puedes decir 'Suma 10 más 1' ó 'Cuanto es 5 por 5'`,
            RSUMA: '%s más %s es igual a %s',
            RRESTA: '%s menos %s es igual a %s',
            RMULTIPLICACION: '%s por %s es igual a %s',
            RDIVISION: '%s entre %s es igual a %s',
            AYUDA: `Puedes decir 'Suma 10 más 1' ó 'Cuanto es 5 por 5'`,
            DESPEDIDA: `Adiooooos!!!`,
            NOENTENDO: 'Lo siento, no te entendí. Intenta de nuevo.'
        }
    },
    en : {
        translation : {
            BIENVENIDA: `Hello, I am a basic calculator,
            I can help you to do simple operations.
            You can say 'Add 10 plus 1' or 'What is 5 times 5'`,
            RSUMA: "%s plus %s equals %s",
            RRESTA: "%s minus %s equals %s",
            RMULTIPLICACION: "%s times %s equals %s",
            RDIVISION: "%s divided by %s equals %s",
            AYUDA: `You can say "Add 10 plus 1" or "How much is 5 times 5."`,
            DESPEDIDA: `Good byeeee!!!`,
            NOENTENDO: "I'm sorry, I don't understand. Try again"
        }
    }
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('BIENVENIDA');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const OperacionSumaIntentHandler = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'OperacionSumaIntent';
    },
    handle(handlerInput){
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const valorA = handlerInput.requestEnvelope.request.intent.slots.valorA.value;
        const valorB = handlerInput.requestEnvelope.request.intent.slots.valorB.value;
        const resultado = Number(valorA) + Number(valorB);
        const speakOutput = requestAttributes.t('RSUMA',valorA,valorB,resultado);
        return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt(speakOutput)
                .getResponse();
    }
}

const OperacionRestaIntentHandler = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'OperacionRestaIntent';
    },
    handle(handlerInput){
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const valorA = handlerInput.requestEnvelope.request.intent.slots.valorA.value;
        const valorB = handlerInput.requestEnvelope.request.intent.slots.valorB.value;
        const resultado = valorA - valorB;
        const speakOutput = requestAttributes.t('RRESTA',valorA,valorB,resultado);
        return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt(speakOutput)
                .getResponse();
    }
}

const OperacionMultiplicacionIntentHandler = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'OperacionMultiplicacionIntent';
    },
    handle(handlerInput){
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const valorA = handlerInput.requestEnvelope.request.intent.slots.valorA.value;
        const valorB = handlerInput.requestEnvelope.request.intent.slots.valorB.value;
        const resultado = valorA * valorB;
        const speakOutput = requestAttributes.t('RMULTIPLICACION',valorA,valorB,resultado);
        return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt(speakOutput)
                .getResponse();
    }
}

const OperacionDivisionIntentHandler = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'OperacionDivisionIntent';
    },
    handle(handlerInput){
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const valorA = handlerInput.requestEnvelope.request.intent.slots.valorA.value;
        const valorB = handlerInput.requestEnvelope.request.intent.slots.valorB.value;
        const resultado = valorA / valorB;
        const speakOutput = requestAttributes.t('RDIVISION',valorA,valorB,resultado);
        return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt(speakOutput)
                .getResponse();
        
    }
}

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('AYUDA');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('DESPEDIDA');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('NOENTENDO');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`)
    }
}

const LoggingResponseInterceptor = {
    process(handlerInput, response) {
        console.log(`Outgoing response: ${JSON.stringify(response)}`)
    }
}

const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      fallbackLng: 'es',
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    }
  }
}

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        OperacionSumaIntentHandler,
        OperacionRestaIntentHandler,
        OperacionMultiplicacionIntentHandler,
        OperacionDivisionIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(LoggingRequestInterceptor, LocalizationInterceptor)
    .addResponseInterceptors(LoggingResponseInterceptor)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();