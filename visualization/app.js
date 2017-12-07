/* global window,document */
import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';
import DeckGLOverlay from './deckgl-overlay.js';

import {json as requestJson} from 'd3-request';

// Set your mapbox token here
const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line

// BOROUGHS: https://raw.githubusercontent.com/tekamoment/cs129-1-final-project/master/Used%20data/borough_boundaries.geojson

// Source data CSV
const DATA_URL = {
  TRIPS: 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/trips/trips.json',  // eslint-disable-line
  BOROUGHS: 'https://raw.githubusercontent.com/tekamoment/cs129-1-final-project/master/visualization/borough_boundaries.geojson'
};

class Root extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        ...DeckGLOverlay.defaultViewport,
        width: 500,
        height: 500
      },
      boroughs: null,
      trips: null,
      time: 0
    };

    requestJson(DATA_URL.TRIPS, (error, response) => {
      if (!error) {
        this.setState({trips: response});
      }
    });

    requestJson(DATA_URL.BOROUGHS, (error, response) => {
      if (!error) {
        for (var featureIndex in response.features) {
          const alpha = 70;
          let feature = response.features[featureIndex];
          
          switch (featureIndex) {
            case "0":
              feature.properties.color = [237, 106, 90, alpha];
              break;
            case "1":
              feature.properties.color = [244, 241, 187, alpha];
              break;
            case "2":
              feature.properties.color = [155, 193, 188, alpha];
              break;
            case "3":
              feature.properties.color = [92, 164, 169, alpha];
              break;
            case "4":
              feature.properties.color = [230, 235, 224, alpha];
              break;
            default:
              break;
          }

        }

        console.log(response);
        this.setState({boroughs: response});
      }
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize.bind(this));
    this._resize();
    this._animate();
  }

  componentWillUnmount() {
    if (this._animationFrame) {
      window.cancelAnimationFrame(this._animationFrame);
    }
  }

  _animate() {
    const timestamp = Date.now();
    const loopLength = 1800;
    const loopTime = 60000;

    this.setState({
      time: ((timestamp % loopTime) / loopTime) * loopLength
    });
    this._animationFrame = window.requestAnimationFrame(this._animate.bind(this));
  }

  _resize() {
    this._onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  _onViewportChange(viewport) {
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    });
  }

  render() {
    const {viewport, boroughs, trips, time} = this.state;

    return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this._onViewportChange.bind(this)}
        mapboxApiAccessToken={MAPBOX_TOKEN}>
        <DeckGLOverlay viewport={viewport}
          trips={trips}
          boroughs={boroughs}
          trailLength={180}
          time={time}
          />
      </MapGL>
    );
  }
}

render(<Root />, document.body.appendChild(document.createElement('div')));
