/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const languageFacts = {
    "javascript":[
        "es un lenguaje usado principalmente para el desarrollo web",
        "es un lenguaje dinámico",
        "está basado en proptotipos"],
    "python":[
        "es un lenguaje interpretado de alto nivel",
        "es usado en áreas como el análisis de datos y la inteligencia artificial",
        "es conocido por su legibilidad y sintaxis clara"
    ],"p. h. p.": [
        "es un lenguaje de programación de servidor",
        "es usado para el desarrollo de aplicaciones web dinámicas",
        "es conocido por su facilidad de uso y amplia documentación"
    ],
    "c#": [
        "El caso más sencillo es el de foreach.",
        "Sintaxis sencilla. La sintaxis de C# es muy similar a Java, lo que simplifica al desarrollador a la hora de escribir código.",
        "Multiplataforma, ejecutable en los sistemas más comunes como Windows, MacOs, Linux."
    ],
    "go": [
        "es un lenguaje de programación de sistemas creado por Google",
        "es usado para crear aplicaciones de alto rendimiento y escalables",
        "es conocido por su sintaxis limpia y facilidad de uso"
    ],
    "java": [
        "es un lenguaje orientado a objetos",
        "es usado para crear aplicaciones de escritorio, aplicaciones móviles y aplicaciones empresariales",
        "es conocido por su portabilidad y seguridad"
    ],
    "c++": [
        "es un lenguaje de programación de alto rendimiento",
        "es usado para crear sistemas operativos, juegos y software de simulación",
        "es conocido por su eficiencia y control cercano del hardware"
    ],
    
    "r": [
        "es un lenguaje de programación utilizado para el análisis estadístico y la creación de gráficos",
        "es usado en áreas como la ciencia de datos y la investigación académica",
        "es conocido por su gran cantidad de paquetes y bibliotecas"
    ],
    "kotlin": [
        "es un lenguaje de programación de tipado estático",
        "es utilizado para el desarrollo de aplicaciones móviles en Android",
        "es conocido por su seguridad y facilidad de uso"
    ]
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = `Hola,
        puedo darte datos curiosos de algún lenguaje de programación,
        solo tienes que mencionarlo, por ejemplo,
        prueba diciendo "dime una curiosidad acerca de javascript"`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CustomLanguageIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CustomLanguageIntent';
    },
    handle(handlerInput){
        const {language} = handlerInput.requestEnvelope.request.intent.slots;
        let response;
        if(language && languageFacts[language.value]){
            response = languageFacts[language.value][Math.floor(Math.random() * languageFacts[language.value].length)];
        }else{
            response = "No tengo información sobre el lenguaje que has mencionado, prueba con otro";
        }
        return handlerInput.responseBuilder
            .speak(response)
            .reprompt(response)
            .getResponse();
    }
}

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = `puedo darte datos curiosos de algún lenguaje de programación,
        prueba diciendo "dime una curiosidad acerca de javascript"`;

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
        const speakOutput = 'Adios, que nunca te falte el punto y coma, tu ru ru';

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
        const speakOutput = 'Lo siento, tuve problemas para hacer lo que me pediste. Inténtalo de nuevo.';
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
        CustomLanguageIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();