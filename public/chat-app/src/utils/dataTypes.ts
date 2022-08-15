/**
 * @description:types of data
 */
export type FirstPaint = {
    event:"first_paint";
    type:"web_performance";
    params:{
        timestamp:string;//start time
    } 
}

export type FirstContentfulPaint = {
    event:"first_contentful_paint";
    type:"web_performance";
    params:{
        timestamp:string;//start time
    } 
}

export type LargestContentfulPaint = {
    event:"largest_contentful_paint";
    type:"web_performance";
    params:{
        timestamp:string;//start time
    } 
}

export type FirstMeaningfulPaint = {
    event:"first_meaningful_paint";
    type:"web_performance";
    params:{
        timestamp:string;//start time
    } 
}

export type DOMContentLoaded = {
    event:"dom_content_loaded";
    type:"web_performance";
    params:{
        timestamp:string;//start time
    } 
}

export type Loaded = {
    event:"loaded";
    type:"web_performance";
    params:{
        timestamp:string;//start time
    } 
}

export type TimeToInteractive = {
    event:"time_to_interactive";
    type:"web_performance";
    params:{
        interactiveTime:string;//interactive time
    } 
}

export type FirstInputDelay = {
    event:"first_input_delay";
    type:"web_performance";
    params:{
        inputStartTime:string;//input start time
        processingStartTime:string;//processing start time
        delayTime:string //delay
    } 
}


