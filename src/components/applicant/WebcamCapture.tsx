// WebcamCapture Component
// Capture photo using hand gesture detection

import { useState, useRef, useEffect } from 'react';

export interface WebcamCaptureProps {
  onCapture: (imageBase64: string) => void;
  required: boolean;
}

export const WebcamCapture: React.FC<WebcamCaptureProps> = ({ onCapture, required }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [currentGesture, setCurrentGesture] = useState<number | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  // TODO: Implement webcam capture with hand gesture detection
  // 1. Initialize webcam
  // 2. Load TensorFlow.js hand pose detection model
  // 3. Detect hand gestures (1, 2, 3 fingers)
  // 4. When 3 fingers detected, start countdown
  // 5. Capture photo after countdown
  // 6. Show preview and allow retake

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      setIsActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const imageData = canvasRef.current.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        onCapture(imageData);
        stopCamera();
      }
    }
  };

  const retake = () => {
    setCapturedImage(null);
    setCurrentGesture(null);
    setCountdown(null);
    startCamera();
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="webcam-capture">
      <h3>
        Profile Picture {required && <span className="required">*</span>}
      </h3>

      {!capturedImage ? (
        <div>
          {!isActive ? (
            <button onClick={startCamera}>Start Camera</button>
          ) : (
            <div>
              <video ref={videoRef} autoPlay playsInline />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
              {currentGesture && (
                <div className="gesture-indicator">
                  Detected: {currentGesture} finger(s)
                </div>
              )}
              {countdown !== null && (
                <div className="countdown">{countdown}</div>
              )}
              <p>Show 1, 2, then 3 fingers to capture photo</p>
              <button onClick={capturePhoto}>Manual Capture</button>
              <button onClick={stopCamera}>Cancel</button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <img src={capturedImage} alt="Captured" />
          <button onClick={retake}>Retake</button>
        </div>
      )}
    </div>
  );
};
