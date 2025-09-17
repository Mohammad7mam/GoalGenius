import React, { useEffect, useRef } from 'react';
import LogoSvg from "../svg/LogoSvg";


const YoutubeComponent = () => {
  const playerRef = useRef(null);

  useEffect(() => {
    // تحميل سكربت YouTube API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      createPlayer();
    }

    window.onYouTubeIframeAPIReady = () => {
      createPlayer();
    };

    function createPlayer() {
      if (playerRef.current) {
        new window.YT.Player(playerRef.current, {
          videoId: 'RDo094vBnEA',
          playerVars: {
            autoplay: 0,
            controls: 1,
            modestbranding: 1,
            rel: 0,
          },
          events: {
            onReady: () => {
              console.log('YouTube Player Ready');
            },
          },
        });
      }
    }
  }, []);

  return (
    <div className="youtubeComponent" id="contact">
      <div className="sdsdsds">
        <h2>API content</h2>
      </div>
      {/* خلفية معلقة position: fixed داخل الكومبوننت فقط */}
      <div className="youtubeComponent__background"></div>

      {/* الجزء الذي عليه تأثير (فيديو) */}
      <section className="youtubeComponent__overlay">
        <div className="youtubeComponent__video">
          <div ref={playerRef} id="yt-player"></div>
        </div>
      </section>

      {/* القسم الأبيض بدون تأثير */}
      <section className="youtubeComponent__whiteSection">
        {/* <h2>White Section</h2>
        <p>This section has no background effect.</p> */}
      </section>

      {/* الفوتر أيضًا عليه تأثير */}
      <footer className="youtubeComponent__overlay__footer">
        <div className="youtubeComponent__footer">
          <LogoSvg
            fill1={"#FFf"}
            fill2={ "#Fff"}
            fill3={ "#FFf"}
          />
          <p style={{color:"#FFf"}}>© 2025 Footer with background effect</p>
        </div>
      </footer>
    </div>
  );
};

export default YoutubeComponent;
