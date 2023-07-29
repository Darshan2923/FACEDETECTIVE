import React, { useEffect, useRef } from 'react'
import '../styles/MainImages.css'
import * as faceapi from 'face-api.js'

function MainImages() {
    const imgRef = useRef();
    const canvasRef = useRef();
    const handleImage = async () => {
        const detect = await faceapi
            .detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions())
            .withAgeAndGender()
            .withFaceExpressions()
            .withFaceLandmarks();

        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(imgRef.current);
        faceapi.matchDimensions(canvasRef.current, {
            width: 60,
            height: 65
        })
        const resized = faceapi.resizeResults(detect, {
            width: 60,
            height: 65,
        })
        faceapi.draw.drawDetections(canvasRef.current, resized)
    }

    useEffect(() => {
        const loadModels = () => {
            Promise.all([
                // import models for detection and recognition tasks respectively
                faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
                faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
                faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
                faceapi.nets.faceExpressionNet.loadFromUri('/models'),
                faceapi.nets.ageGenderNet.loadFromUri('/models'),
            ]).then(console.log(handleImage))
                .catch(e => console.log(e))
        };
        imgRef.current && loadModels();
    }, [])

    return (
        <section id="main">
            {/* Always remember that useRef is getElementById of
             react that we used in javascript */}
            {/* For vanilla javascript understanding of below useRef fllow the link below
            :
            https://codepen.io/Savita-Patel/pen/bGQQvLy */}


            <div className='faceapp__container' >
                <img
                    crossOrigin='anonymous'
                    ref={imgRef}
                    src="https://source.unsplash.com/1600x1600/?people"
                    alt="photos"
                />
                <canvas
                    ref={canvasRef}
                />
            </div>
        </section>

    )
}

export default MainImages