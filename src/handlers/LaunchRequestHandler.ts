import { HandlerInput, RequestHandler, ResponseBuilder } from "ask-sdk";
import { Response } from "ask-sdk-model";
import fs = require('fs');

export class LaunchRequestHandler implements RequestHandler {
    canHandle(handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest';
    }

    handle(handlerInput: HandlerInput): Response {
        const facts: string = fs.readFileSync('src/resources/chuck-facts.txt', 'utf-8');
        const factArray: string[] = facts.split('\n');
        const responseBuilder: ResponseBuilder = handlerInput.responseBuilder;
        const speechString: string = factArray[LaunchRequestHandler.randomIntFromInterval(0,84)];

        return responseBuilder.speak(speechString)
            .withSimpleCard("Random Chuck Norris (Unofficial) Fact", speechString)
            .withShouldEndSession(true)
            .getResponse();
    }

    static randomIntFromInterval(min,max): number // min and max included
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
        
}