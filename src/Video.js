import React, { useState } from "react";
import "./VideoPlayer.css";

const MediaLinks = [
  {
    Youtube: "https://www.youtube.com/embed/dz458ZkBMak",
    Vimeo: "https://player.vimeo.com/video/347119375",
    Other: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
];

const Video = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [currentSource, setCurrentSource] = useState("");

  const openPopup = (url) => {
    setCurrentSource(url);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setCurrentSource("");
  };

  return (
    <div className="media-popup-container">
      <div className="button-container">
        {Object.entries(MediaLinks[0]).map(([key, value]) => (
          <button
            key={key}
            className="media-button"
            onClick={() => openPopup(value)}
          >
            Play {key}
          </button>
        ))}
      </div>

      {popupVisible && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closePopup}>
              ✖
            </button>
            {currentSource.includes("youtube.com") ||
            currentSource.includes("vimeo.com") ? (
              <iframe
                src={currentSource}
                title="Video Player"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
              ></iframe>
            ) : (
              <video controls autoPlay>
                <source src={currentSource} type="video/mp4" />
               browser does not support the video tag...
              </video>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
