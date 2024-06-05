



import React, {useRef} from 'react';  //allows us to have references
//import logo from './logo.svg';
import * as tf from "@tensorflow/tfjs"; //tensorflow backend
import * as handpose from "@tensorflow-models/handpose"; //handpose detection
import Webcam from 'react-webcam'; //to use the webcam from device
import './App.css';
import {drawHand} from "./utilities";

function App() {
  //references to the webcam and canvas
  const webcamRef = useRef(null);
  const CanvasRef = useRef(null);

  const runHandpose = async () =>{
    const net = await handpose.load() //loading the handpose model
    console.log('Handpose model loaded.')
    // loop and detect hands  
    setInterval(()=>{
      detect(net)
    }, 100)

  };

  const detect = async (net) =>{
    //check data is available
    if(
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ){
    //get video properties
    const video = webcamRef.current.video;
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    //set video height and width
    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;

    //set canvas height and width
    CanvasRef.current.width = videoWidth;
    CanvasRef.current.height = videoHeight;

    //make detections
    const hand = await net.estimateHands(video);
    console.log(hand);

    //draw mesh
    const ctx = CanvasRef.current.getContext("2d");
    drawHand(hand,ctx);
    }
  };

  runHandpose();

  return (
    <div className="App">
      <header className="App-header">
        <Webcam ref= {webcamRef} //webcam component
        style={{
          position:"absolute",
          marginLeft:"auto",
          marginRight:"auto",
          left:0,
          right:0,
          textAlign:"center",
          zIndex:9,
          width:640,
          height:480,
        }}/>

        <canvas
          ref={CanvasRef} //camvas component
          style={{
            position:"absolute",
            marginLeft:"auto",
            marginRight:"auto",
            left:0,
            right:0,
            textAlign:"center",
            zIndex:9,
            width:640,
            height:480,
          }}
        />
      </header>
    </div>
  );
}

export default App;
