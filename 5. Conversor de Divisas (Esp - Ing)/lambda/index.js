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
            BIENVENIDA: `Hola,
            soy un conversor de divisas que te puede ayudar a convertir el valor de una moneda a otra,
            la fecha de corte de los datos es el 25 de mayo del 2023,
            prueba diciendo "Convierte 10 dólares a pesos"`,
            ALGOMALPESOS: 'Lo siento, algo no fue bien con la cantidad que dijiste, intenta diciendo un número positivo como 10 pesos',
            ALGOMALDOLARES: 'Lo siento, algo no fue bien con la cantidad que dijiste, intenta diciendo un número positivo como 10 dólares',
            ALGOMALEUROS: 'Lo siento, algo no fue bien con la cantidad que dijiste, intenta diciendo un número positivo como 10 euros',
            AYUDA: `Soy un conversor de divisas que te puede ayudar a convertir el valor de una moneda a otra,
            puedes intentar decir, convierte 13 euros a pesos.
            O también intenta, convierte 15 dólares a pesos`,
            DESPEDIDA: 'Gracias por usar el conversor, adíos!',
            MXNTOUSD: '%s pesos equivale a %s dólares',
            USDTOMXN: '%s dólares equivale a %s pesos',
            MXNTOEUR:'%s pesos equivale a %s euros',
            EURTOMXN: '%s euros equivale a %s pesos',
            USDTOEUR: '%s dólares equivale a %s euros',
            EURTOUSD: '%s euros equivale a %s dólares',
            FALBACK: 'Lo siento, no sé nada de eso. Inténtalo de nuevo.',
            ERRMXN: 'Lo siento, intenta diciendo un número positivo como 10 pesos',
            ERRUSD: 'Lo siento, intenta diciendo un número positivo como 10 dólares',
            ERREUR: 'Lo siento, intenta diciendo un número positivo como 10 euros'
        }
    },
    en : {
        translation : {
            BIENVENIDA: `Hi,
            I am a currency converter that can help you convert the value of one currency to another,
            the data cut-off date is May 25, 2023,
            try saying "Convert 10 dollars to pesos"`,
            ALGOMALPESOS: 'Sorry, something went wrong with the amount you said, try saying a positive number like 10 pesos',
            ALGOMALDOLARES: 'Sorry, something went wrong with the amount you said, try saying a positive number like 10 dollars',
            ALGOMALEUROS: 'Sorry, something went wrong with the amount you said, try saying a positive number like 10 euros',
            AYUDA: `I am a currency converter that can help you convert the value of one currency to another,
            you can try to say, convert 13 euros to pesos.
            Or also try, convert 15 dollars to pesos`,
            DESPEDIDA: 'Thanks for using the converter, bye!',
            MXNTOUSD: '%s pesos equals %s dollars',
            USDTOMXN: '%s dollars equals %s pesos',
            MXNTOEUR: '%s pesos equals %s euros',
            EURTOMXN: '%s euros equals %s pesos',
            USDTOEUR: '%s dollars equals %s euros',
            EURTOUSD: '%s euros equals %s dollars',
            FALBACK: "Sorry, I don't know anything about that. try again.",
            ERRMXN: 'Sorry, try saying a positive number like 10 pesos',
            ERRUSD: 'Sorry, try saying a positive number like 10 dollars',
            ERREUR: 'Sorry, try saying a positive number like 10 euros'
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

const ConvertirPesosDolaresIntentHandler = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConvertirPesosDolaresIntent';
    },
    handle(handlerInput){
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const pesos = handlerInput.requestEnvelope.request.intent.slots.pesos.value;
        if(pesos > 0){
            const valor = 17.84;
            const resultado = (pesos/valor).toFixed(2);
            const speakOutput = requestAttributes.t('MXNTOUSD',pesos,resultado);
            return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt(speakOutput)
                .getResponse();
        }else{
            const speakOutput = requestAttributes.t('ERRMXN');
            return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt(speakOutput)
                .getResponse();
        }
    }
}

const ConvertirDolaresPesosIntentHandler = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConvertirDolaresPesosIntent';
    },
    handle(handlerInput){
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const dolares = handlerInput.requestEnvelope.request.intent.slots.dolares.value;
        if(dolares > 0){
            const valor = 17.84;
            const resultado = (dolares*valor).toFixed(2);
            const speakOutput = requestAttributes.t('USDTOMXN',dolares,resultado);
            return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt(speakOutput)
                .getResponse();
        }else{
            const speakOutput = requestAttributes.t('ERRUSD');
            return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt(speakOutput)
                .getResponse();
        }
    }
}

const ConvertirPesosEurosIntentHandler = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConvertirPesosEurosIntent';
    },
    handle(handlerInput){
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const pesos = handlerInput.requestEnvelope.request.intent.slots.pesos.value;
        if(pesos > 0){
            const valor = 19.136;
            const resultado = (pesos/valor).toFixed(3);
            const speakOutput = requestAttributes.t('MXNTOEUR',pesos,resultado);
            return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt(speakOutput)
                .getResponse();
        }else{
            const speakOutput = requestAttributes.t('ERRMXN');
            return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt(speakOutput)
                .getResponse();
        }
    }
}

const ConvertirEurosPesosIntentHandler = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConvertirEurosPesosIntent';
    },
    handle(handlerInput){
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const euros = handlerInput.requestEnvelope.request.intent.slots.euros.value;
        if(euros > 0){
            const valor = 19.13;
            const resultado = (euros*valor).toFixed(2);
            const speakOutput = requestAttributes.t('EURTOMXN',euros,resultado);
            return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt(speakOutput)
                .getResponse();
        }else{
            const speakOutput = requestAttributes.t('ERREUR');
            return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt(speakOutput)
                .getResponse();
        }
    }
}

const ConvertirDolaresEurosIntentHandler = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConvertirDolaresEurosIntent';
    },
    handle(handlerInput){
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const dolares = handlerInput.requestEnvelope.request.intent.slots.dolares.value;
        if(dolares > 0){
            const valor = 1.07;
            const resultado = (dolares*valor).toFixed(2);
            const speakOutput = requestAttributes.t('USDTOEUR',dolares,resultado);
            return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt(speakOutput)
                .getResponse();
        }else{
            const speakOutput = requestAttributes.t('ERRUSD');
            return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt(speakOutput)
                .getResponse();
        }
    }
}

const ConvertirEurosDolaresIntentHandler = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConvertirEurosDolaresIntent';
    },
    handle(handlerInput){
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const euros = handlerInput.requestEnvelope.request.intent.slots.euros.value;
        if(euros > 0){
            const valor = 1.07 ;
            const resultado = (euros/valor).toFixed(2);
            const speakOutput = requestAttributes.t('EURTOUSD',euros,resultado);
            return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt(speakOutput)
                .getResponse();
        }else{
            const speakOutput = requestAttributes.t('ERREUR');
            return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt(speakOutput)
                .getResponse();
        }
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
        const speakOutput = requestAttributes.t('FALBACK');

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
        const speakOutput = `Estás diciendo ${intentName}`;

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
        ConvertirPesosDolaresIntentHandler,
        ConvertirDolaresPesosIntentHandler,
        ConvertirPesosEurosIntentHandler,
        ConvertirEurosPesosIntentHandler,
        ConvertirDolaresEurosIntentHandler,
        ConvertirEurosDolaresIntentHandler,
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