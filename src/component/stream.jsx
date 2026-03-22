import React from 'react'
import './stream.css';
import { Link } from 'react-router-dom';
import AnimatedPage from './animation';

const stream = () => {
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
