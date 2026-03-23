import React from 'react'
import './stream.css';
import { Link } from 'react-router-dom';
import AnimatedPage from './animation';
import useSEO from '../utils/useSEO';

const stream = () => {
  useSEO({
    title: 'Choose Your Stream | Biology, Maths, Commerce & Arts',
    description: 'Select your academic stream — Biology (PCB), Mathematics (PCM), Commerce, or Arts — and explore tailored career paths and top courses available for you.',
    keywords: 'choose stream, biology stream careers, maths PCM careers, commerce careers, arts stream careers, stream career guidance',
    canonical: '/streams'
  });
  return (
    <AnimatedPage>
      <div className="body">
        <div className="streamSection"   >
          <h1 className="streamTitle">Choose Your Stream</h1>

          <div className="cardsContainer">
            <div className="streamCard">
              <Link to="/streams/biology" >
                <div className="streamIcon" alt="Biology">🔬</div>
                <h2 className="streamName">Biology</h2>
              </Link>
            </div>

            <div className="streamCard streamCardHover">
              <Link to="/streams/maths" >
                <div className="streamIcon" alt="Maths">📊</div>
                <h2 className="streamName">Maths</h2>
              </Link>
            </div>

            <div className="streamCard streamCardHover">
              <Link to="/streams/commerce" >
                <div className="streamIcon" alt="Commerce">📈</div>
                <h2 className="streamName">Commerce</h2>
              </Link>
            </div>

            <div className="streamCard streamCardHover">
              <Link to="/streams/arts" >
                <div className="streamIcon" alt="Arts">🎨</div>
                <h2 className="streamName">Arts</h2>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}

export default stream
