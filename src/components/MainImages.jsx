//Install dependencies
//npm install @tensorflow/tfjs @tensorflow-models/facemesh react-webcam
//Import dependencies
//setup webcam and canvas
//define references to those
//load facecams
//detect function
//drwaing utilities
//load triangulation
//setup triangle path
//setup point drawing
//add drawMesh to dtetct function

// https://github.com/tensorflow/tfjs-models/tree/master/face-landmarks-detection/src/tfjs

import React, { useRef } from 'react'
import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/facemesh';
import WebCam from 'react-webcam';
import { drawMesh } from './Utilities';

function MainImages() {
    //Set references
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    //Load facemesh
    const runFacemesh = async () => {
        const net = await facemesh.load({
            inputResolution: { width: 640, height: 480 }, scale: 0.8,
        });
        setInterval(() => {
            detect(net);
        }, 100);
    }

    //Detect Function
    const detect = async (net) => {
        if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState === 4) { //Checks if webcam is open and fetching data
            //Get video Properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;
            //Set Video width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.width = videoHeight;

            //Set canvas width
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;
            //Make detections
            const face = await net.estimateFaces(video);
            console.log(face);
            //Get canvas context for drawing
            const ctx = canvasRef.current.getContext("2d");
            drawMesh(face, ctx);

        }
    }

    runFacemesh();

    return (
        <section id="main">
            <header className="app-header">
                <div className="facemesh-container">
                    <WebCam
                        ref={webcamRef}
                        style={{
                            position: 'absolute',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            left: 0, right: 0,
                            textAlign: "center",
                            zIndex: 9,
                            width: 640,
                            height: 480
                        }} />

                    <canvas
                        ref={canvasRef}
                        style={{
                            position: "absolute",
                            marginLeft: "auto",
                            marginRight: "auto",
                            left: 0,
                            right: 0,
                            textAlign: "center",
                            zindex: 9,
                            width: 640,
                            height: 480,
                        }}
                    />
                </div>
            </header>
        </section >
    )
}

export default MainImages