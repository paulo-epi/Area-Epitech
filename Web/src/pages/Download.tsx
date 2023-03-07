import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import React from "react";
import ReactDOM from "react-dom";
import { blob } from "stream/consumers";
import { string } from "yup";

class DownloadClass extends React.Component{
    sleep(time: any){
        return new Promise((resolve)=>setTimeout(resolve,time)
      )
    }
    simulateClick(e: any) {
      e.click()
      
    }
    onButtonClick=()=> {
        fetch("http://localhost:3000/favicon.ico")
        .then(response=>response.blob())
        .then(blob => {
            const blobUrl = window.URL.createObjectURL(new Blob([blob]))
            const url = "http://localhost:3000/favicon.ico"
            const filename : any = url.split("/").pop()
            const aTag = document.createElement('a')
            aTag.href=blobUrl
            aTag.setAttribute('download', filename)
            document.body.appendChild(aTag)
            aTag.click()
            aTag.remove()
        })
        this.sleep(2000).then(()=>{
            console.log('you can see me after 2000 milliseconds');
        })
        
    };
    render(){
        return (<div className="UFIInputContainer">
            <Link ref={this.simulateClick} to={process.env.PUBLIC_URL + '/mobile_build/client.apk'} target="_blank" download>Download</Link>
        </div>)
    }
  }

export default function Download() {    
    return (
        <div><DownloadClass></DownloadClass></div>
    )
}