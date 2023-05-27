/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = `Hola,
        soy un conversor de divisas que te puede ayudar a convertir el valor de una moneda a otra,
        la fecha de corte de los datos es el 18 de mayo del 2023,
        prueba diciendo "Convierte 10 dólares a pesos"`;

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
        const pesos = handlerInput.requestEnvelope.request.intent.slots.pesos.value;
        if(pesos > 0){
            const valor = 17.698;
            const resultado = (pesos/valor).toFixed(2);
            const speakOutput = pesos + ' pesos equivale a ' + resultado + ' dólares';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt(speakOutput)
                .getResponse();
        }else{
            const speakOutput = 'Lo siento, algo no fue bien con la cantidad que dijiste, intenta diciendo un número positivo como 10 pesos';
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
        const dolares = handlerInput.requestEnvelope.request.intent.slots.dolares.value;
        if(dolares > 0){
            const valor = 17.698;
            const resultado = (dolares*valor).toFixed(2);
            const speakOutput = dolares + ' dólares equivale a ' + resultado + ' pesos';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt(speakOutput)
                .getResponse();
        }else{
            const speakOutput = 'Lo siento, algo no fue bien con la cantidad que dijiste, intenta diciendo un número positivo como 10 dólares';
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
        const pesos = handlerInput.requestEnvelope.request.intent.slots.pesos.value;
        if(pesos > 0){
            const valor = 19.080;
            const resultado = (pesos/valor).toFixed(2);
            const speakOutput = pesos + ' pesos equivale a ' + resultado + ' euros';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt(speakOutput)
                .getResponse();
        }else{
            const speakOutput = 'Lo siento, algo no fue bien con la cantidad que dijiste, intenta diciendo un número positivo como 10 pesos';
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
        const euros = handlerInput.requestEnvelope.request.intent.slots.euros.value;
        if(euros > 0){
            const valor = 19.080;
            const resultado = (euros*valor).toFixed(2);
            const speakOutput = euros + ' euros equivale a ' + resultado + ' pesos';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt(speakOutput)
                .getResponse();
        }else{
            const speakOutput = 'Lo siento, algo no fue bien con la cantidad que dijiste, intenta diciendo un número positivo como 10 euros';
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
        const dolares = handlerInput.requestEnvelope.request.intent.slots.dolares.value;
        if(dolares > 0){
            const valor = 1.0780;
            const resultado = (dolares*valor).toFixed(2);
            const speakOutput = dolares + ' dólares equivale a ' + resultado + ' euros';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt(speakOutput)
                .getResponse();
        }else{
            const speakOutput = 'Lo siento, algo no fue bien con la cantidad que dijiste, intenta diciendo un número positivo como 10 dólares';
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
        const euros = handlerInput.requestEnvelope.request.intent.slots.euros.value;
        if(euros > 0){
            const valor = 1.0780 ;
            const resultado = (euros/valor).toFixed(2);
            const speakOutput = euros + ' euros equivale a ' + resultado + ' dólares';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt(speakOutput)
                .getResponse();
        }else{
            const speakOutput = 'Lo siento, algo no fue bien con la cantidad que dijiste, intenta diciendo un número positivo como 10 euros';
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
        const speakOutput = `Soy un conversor de divisas que te puede ayudar a convertir el valor de una moneda a otra,
        puedes intentar decir, convierte 13 euros a pesos.
        O también intenta, convierte 15 dólares a pesos`;

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
        const speakOutput = 'Gracias por usar el conversor, adíos!';

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
        const speakOutput = 'Lo siento, no sé nada de eso. Inténtalo de nuevo.';

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
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();