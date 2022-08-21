/**
 * @description:types of data
 */

//basic info
export type BasicInfo={
    event:"basic_info";
    params:{
        user_id:string,
        url:string,
        user_ip?:string,
        device_id?:string,
        os_type?:string,
        os_version?:string,
    }
}
// redirect time 
export type RedirectTime = {
    event:"redirect_time";
    type:"network_performance";
    params:{
        redirectStart:string;//start time
        rediretEnd:string;//end time
        redirectTime:string;//redirect time
    } 
}

// DNS lookup 
export type DNSLookupTime = {
    event:"DNS_look_up_time";
    type:"network_performance";
    params:{
        domainLookupStart:string;//start time
        domainLookupEnd:string;//end time
        domainLookupTime:string;//DNS lookup time
    } 
}

// TCP connect 
export type TCPConnectTime = {
    event:"tcp_connect_time";
    type:"network_performance";
    params:{
        connectStart:string;//start time
        connectEnd:string;//end time
        connectTime:string;//TCP connect time
    } 
}

// SSL connect 
export type SSLConnectTime = {
    event:"ssl_connect_time";
    type:"network_performance";
    params:{
        secureConnectionStart:string;//start time
        connectEnd:string;//end time
        connectTime:string;//SSL connect time
    } 
}

// TTFB request 
export type TTFBRequestTime = {
    event:"ttfb_request_time";
    type:"network_performance";
    params:{
        requestStart:string;//start time
        responseStart:string;//end time
        consumingTime:string;//SSL connect time
    } 
}

// data transfer time
export type DataTransferTime = {
    event:"data_transfer_time";
    type:"network_performance";
    params:{
        responseStart:string;//start time
        responseEnd:string;//end time
        tansferringTime:string;//data transfer time
    } 
}

// resource load time
export type ResourceLoadTime = {
    event:"resource_load_time";
    type:"network_performance";
    params:{
        domContentLoadedEventEnd:string;//start time
        loadEventStart:string;//end time
        loadingTime:string;//resource load time
    } 
}

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

export type InterfaceException = {
    event:"interface_exception";
    type:"error_message";
    params:{
        url:string
        message:string
        time:string
    }
}

export type FrontEndException = {
    event:"front_end_exception";
    type:"error_message";
    params:{
        type:number
        message:string
        time:string
    }
}
