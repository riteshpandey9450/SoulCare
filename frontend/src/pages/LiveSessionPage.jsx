import { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import {
  FaVideo,
  FaMicrophone,
  FaUserCircle,
  FaPhoneSlash,
  FaVolumeMute,
  FaVideoSlash,
} from "react-icons/fa";

const SIGNALING_SERVER_URL = "http://localhost:5000"; 
let socket;

export default function CounsellorDashboard() {
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [stream, setStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const [callType, setCallType] = useState("video");
  const [inCall, setInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const peerConnectionRef = useRef();

  useEffect(() => {
    // Connect to signaling server
    socket = io(SIGNALING_SERVER_URL);

    // Handle incoming offer
    socket.on("offer", async (offer) => {
      console.log("Received offer from student");

      // Get media
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: callType === "video",
        audio: true,
      });

      setStream(mediaStream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream;
      }

      const pc = new RTCPeerConnection();
      peerConnectionRef.current = pc;

      mediaStream.getTracks().forEach((track) => {
        pc.addTrack(track, mediaStream);
      });

      pc.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit("answer", answer);

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("candidate", event.candidate);
        }
      };

      socket.on("candidate", async (candidate) => {
        try {
          await pc.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (e) {}
      });

      setCallModalOpen(true);
      setInCall(true);
    });

    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    };
  }, [callType]);

  const handleMute = () => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => {
        track.enabled = isMuted;
      });
      setIsMuted(!isMuted);
    }
  };

  const handleCamera = () => {
    if (stream) {
      stream.getVideoTracks().forEach((track) => {
        track.enabled = isCameraOff;
      });
      setIsCameraOff(!isCameraOff);
    }
  };

  const handleCloseModal = () => {
    setCallModalOpen(false);
    setInCall(false);
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setStream(null);
    setRemoteStream(null);
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-indigo-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Welcome, <span className="text-green-600">Counsellor</span> 🧑‍⚕️
      </h1>
      <p className="text-gray-600">Waiting for incoming session requests...</p>

      {/* Modal for video/audio call */}
      {callModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-all duration-300">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl relative border-4 border-green-200">
            <h2 className="text-2xl font-bold mb-2 text-green-700 flex items-center gap-2">
              <FaUserCircle className="text-3xl" /> Live Session
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
              <div className="flex flex-col items-center">
                <div className="mb-2 text-gray-500">You</div>
                {callType === "video" ? (
                  <video
                    ref={localVideoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-40 h-32 bg-black rounded-xl border-2 border-green-400 shadow"
                  />
                ) : (
                  <FaUserCircle className="text-7xl text-green-400" />
                )}
              </div>
              <div className="flex flex-col items-center">
                <div className="mb-2 text-gray-500">Student</div>
                {callType === "video" ? (
                  <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    className="w-40 h-32 bg-black rounded-xl border-2 border-indigo-400 shadow"
                  />
                ) : (
                  <FaUserCircle className="text-7xl text-indigo-400" />
                )}
              </div>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 shadow transition-all duration-200 ${
                  isMuted ? "bg-red-200 text-red-700" : ""
                }`}
                onClick={handleMute}
              >
                {isMuted ? <FaVolumeMute /> : <FaMicrophone />}{" "}
                {isMuted ? "Unmute" : "Mute"}
              </button>
              {callType === "video" && (
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 shadow transition-all duration-200 ${
                    isCameraOff ? "bg-red-200 text-red-700" : ""
                  }`}
                  onClick={handleCamera}
                >
                  {isCameraOff ? <FaVideoSlash /> : <FaVideo />}{" "}
                  {isCameraOff ? "Camera On" : "Camera Off"}
                </button>
              )}
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white shadow transition-all duration-200"
                onClick={handleCloseModal}
              >
                <FaPhoneSlash /> End
              </button>
            </div>
            <span
              className="absolute top-2 right-2 text-gray-400 hover:text-red-600 cursor-pointer text-2xl"
              onClick={handleCloseModal}
              title="Close"
            >
              ✕
            </span>
          </div>
        </div>
      )}
    </div>
  );
}