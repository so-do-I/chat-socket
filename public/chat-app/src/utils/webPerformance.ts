/**
 * @description:function for the web performance measurement
 */

import * as dataTypes from "./dataTypes"
import ttiPolyfill from 'tti-polyfill'

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

