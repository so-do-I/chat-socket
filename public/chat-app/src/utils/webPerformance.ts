/**
 * @description:function for the web performance measurement
 */

import * as dataTypes from "./dataTypes"
import ttiPolyfill from 'tti-polyfill'

export const performanceTime = function(){
    let timing = performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    // 过早获取时，loadEeventEnd 有时会是 0
    if (loadTime <= 0){
        // 未加载完，延迟 200ms 后继续 performanceTime 方法，直到成功
        setTimeout(function(){
            performanceTime();
        }, 200)
        return;
    }
    return {
        redirect: getRedirectTime(),
        dns: getDNSLookupTime(),
        tcp: getTCPConnectTime(),
        ssl: getSSLConnectTime(),
        ttfb: getTTFBRequestTime(),
        datatransfer: getDataTransferTime(),
        resourceload: getResourceLoadTime(),
        fp: getFP(),
        fcp: getFCP(),
        dcl: getDCL(),
        l: getL()
    }
}

export const getRedirectTime:()=>dataTypes.RedirectTime = function(){
    const start = performance.timing.redirectStart;
    const end = performance.timing.redirectEnd;
    const time = end - start;
    return {
        event:"redirect_time",
        type:"network_performance",
        params:{
            redirectStart:start.toString(),//start time
            rediretEnd:end.toString(),//end timefid
            redirectTime:time.toString()//redirect time
        } 
    }
}

export const getDNSLookupTime:()=>dataTypes.DNSLookupTime = function(){
    const start = performance.timing.domainLookupStart;
    const end = performance.timing.domainLookupEnd;
    const time = end - start;
    return {
        event:"DNS_look_up_time",
        type:"network_performance",
        params:{
            domainLookupStart:start.toString(),//start time
            domainLookupEnd:end.toString(),//end time
            domainLookupTime:time.toString()//DNS lookup time
        } 
    }
}

export const getTCPConnectTime:()=>dataTypes.TCPConnectTime = function(){
    const start = performance.timing.connectStart;
    const end = performance.timing.connectEnd;
    const time = end - start;
    return {
        event:"tcp_connect_time",
        type:"network_performance",
        params:{
            connectStart:start.toString(),//start time
            connectEnd:end.toString(),//end time
            connectTime:time.toString()//DNS lookup time
        } 
    }
}

export const getSSLConnectTime:()=>dataTypes.SSLConnectTime = function(){
    const start = performance.timing.secureConnectionStart;
    const end = performance.timing.connectEnd;
    const time = end - start;
    return {
        event:"ssl_connect_time",
        type:"network_performance",
        params:{
            secureConnectionStart:start.toString(),//start time
            connectEnd:end.toString(),//end time
            connectTime:time.toString()//DNS lookup time
        } 
    }
}

export const getTTFBRequestTime:()=>dataTypes.TTFBRequestTime = function(){
    const start = performance.timing.requestStart;
    const end = performance.timing.responseStart;
    const time = end - start;
    return {
        event:"ttfb_request_time",
        type:"network_performance",
        params:{
            requestStart:start.toString(),//start time
            responseStart:end.toString(),//end time
            consumingTime:time.toString()//DNS lookup time
        } 
    }
}

export const getDataTransferTime:()=>dataTypes.DataTransferTime = function(){
    const start = performance.timing.responseStart;
    const end = performance.timing.responseEnd;
    const time = end - start;
    return {
        event:"data_transfer_time",
        type:"network_performance",
        params:{
            responseStart:start.toString(),//start time
            responseEnd:end.toString(),//end time
            tansferringTime:time.toString()//DNS lookup time
        } 
    }
}

export const getResourceLoadTime:()=>dataTypes.ResourceLoadTime = function(){
    const start = performance.timing.domContentLoadedEventEnd;
    const end = performance.timing.loadEventStart;
    const time = end - start;
    return {
        event:"resource_load_time",
        type:"network_performance",
        params:{
            domContentLoadedEventEnd:start.toString(),//start time
            loadEventStart:end.toString(),//end time
            loadingTime:time.toString()//DNS lookup time
        } 
    }
}

//FP FCP DCL L可以和其他指标合并上报
//FirstPaint
export const getFP:()=>dataTypes.FirstPaint = function(){
    const timestamp=performance.getEntriesByType('paint')[0].startTime;
    return {
        event:"first_paint",
        type:"web_performance",
        params:{
            timestamp:timestamp.toString()
        }
    }
}
//FirstContentfulPaint
export const getFCP:()=>dataTypes.FirstContentfulPaint = function(){
    const timestamp=performance.getEntriesByType('paint')[1].startTime;
    return {
        event:"first_contentful_paint",
        type:"web_performance",
        params:{
            timestamp:timestamp.toString()
        }
    }
}

//DOMContentLoaded Event Start
export const getDCL:()=>dataTypes.DOMContentLoaded=function(){
    const timestamp= performance.timing.domContentLoadedEventStart;
    return {
        event:"dom_content_loaded",
        type:"web_performance",
        params:{
            timestamp:timestamp.toString()
        }
    }
}

//Loaded Event Start
export const getL:()=>dataTypes.Loaded=function(){
    const timestamp= performance.timing.loadEventStart;
    return {
        event:"loaded",
        type:"web_performance",
        params:{
            timestamp:timestamp.toString()
        }
    }
}

//以下指标回调触发时上报

//LargestContentfulPaint
export const getLCP:()=>void = function(){
    new PerformanceObserver((entryList, observer) => {
        let entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        observer.disconnect();
        const LCP:dataTypes.LargestContentfulPaint={
            event:"largest_contentful_paint",
            type:"web_performance",
            params:{
                timestamp:lastEntry.startTime.toString()
            }
        }
        console.log(LCP);
    }).observe({type: 'largest-contentful-paint', buffered: true});
}

//First Meaningful Paint
export const getFMP:()=>dataTypes.FirstMeaningfulPaint = function(){
    let timestamp=0;
    var perfEntries = performance.getEntriesByType("mark");
    for (var i = 0; i < perfEntries.length; i++) {
        if(perfEntries[i].name==='meaningful'){
            timestamp=perfEntries[i].startTime;
        }
    }
    //上报
    return {
        event:"first_meaningful_paint",
        type:"web_performance",
        params:{
            timestamp:timestamp.toString()
        }
    }
}

//Time to Interactive
export const getTTI:()=>void = function(){
    ttiPolyfill.getFirstConsistentlyInteractive().then((tti) => {
        if(tti){
            const TTI:dataTypes.TimeToInteractive ={
                event:"time_to_interactive",
                type:"web_performance",
                params:{
                    interactiveTime:tti.toString()
                }
            }
            console.log(TTI);
        }
    });
}

//First Input Delay
export const getFID:()=>void = function(){
    new PerformanceObserver((entryList) => {
        for (let entry of entryList.getEntries()) {
          let Entry = entry as PerformanceEventTiming;
          const delay = Entry.processingStart - Entry.startTime;
          const FID:dataTypes.FirstInputDelay={
            event:"first_input_delay",
            type:"web_performance",
            params:{
                inputStartTime:Entry.processingStart.toString(),
                processingStartTime:Entry.startTime.toString(),
                delayTime:delay.toString()
            }
          }
          console.log(FID)
        }
      }).observe({type: 'first-input', buffered: true});
}

