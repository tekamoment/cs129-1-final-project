// ADAPTED FROM DECK.GL "TRIPLAYERS EXAMPLE"
// https://github.com/uber/deck.gl/tree/master/examples/trips
// Uber Technologies Inc., 2017

/* global window,document */
import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';
import DeckGLOverlay from './deckgl-overlay.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from "material-ui/RaisedButton";
import HourMenu from './HourMenu.js';
import BoroughTotalChips from './BoroughTotalChips.js';

import {json as requestJson} from 'd3-request';

// Set your mapbox token here
const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line

// Source data CSV
const DATA_URL = {
  UBERDATAHOURMAPPED: '/uberData-hourmapped.json',
  BOROUGHS: '/borough_boundaries.geojson'
};

const styles = {
  pegBottom: {
    position: 'absolute',
    bottom: '0px',
  },
};

class Root extends Component {

  colorForBorough(boroughIndex, alpha) {
    switch (boroughIndex) {
            case 1: // Manhattan
              return [244, 241, 187, alpha];
              break;
            case 2: // The Bronx 
              return [230, 235, 224, alpha];
              break;
            case 3: // Brooklyn
              return [155, 193, 188, alpha];
              break;
            case 4: // Queens
              return [92, 164, 169, alpha];
              break;
            case 5: // Staten Island
              return [237, 106, 90, alpha];
              break;
            default:
              return [0, 0, 0, alpha];
              break;
    }
  }

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
      uberData: null,
      hour: 0,
      time: 0,
      nonNY: 0,
      manhattan: 0,
      bronx: 0,
      brooklyn: 0,
      queens: 0,
      statenIsland:0,
    };


    requestJson(DATA_URL.UBERDATAHOURMAPPED, (error, response) => {
      if (!error) {
        console.log("Loaded uberData.");
        this.setState({uberData: response});
        this.setSelectedHour();
      } else {
        console.log("Error encountered while loading uberdata.");
        console.log(error);
      }
    })

    requestJson(DATA_URL.BOROUGHS, (error, response) => {
      if (!error) {
        for (var featureIndex in response.features) {
          const alpha = 70;
          let feature = response.features[featureIndex];
          let boroughCode = parseInt(feature.properties.boro_code)
          feature.properties.color = this.colorForBorough(boroughCode, alpha);
        }

        // console.log(response);
        this.setState({boroughs: response});
      }
    })
  }

  setSelectedHour() {
    console.log("Setting selected hour!");
    if (!this.state.uberData) {
      console.log("NO uber data");
      return;
    }

    console.log("Uber data exists!");
    let selectedHour = this.state.uberData.filter((obj) => parseInt(obj._id.hour) == this.state.hour);
        let hourBoroughs = []
        for (const boroughIndex in selectedHour) {
          let borough = selectedHour[boroughIndex];
          let intBoroughIndex = parseInt(boroughIndex);
          switch (intBoroughIndex) {
            case 0:
              this.setState({nonNY: borough.value.points.length});
              break;
            case 1:
              this.setState({manhattan: borough.value.points.length});
              break;
            case 2:
              this.setState({bronx: borough.value.points.length});
              break;
            case 3:
              this.setState({brooklyn: borough.value.points.length});
              break;
            case 4:
              this.setState({queens: borough.value.points.length});
              break;
            case 5:
              this.setState({statenIsland: borough.value.points.length});
              break;
            default:
              break;
          }

          
          let dotColor = this.colorForBorough(intBoroughIndex, 100);
          let convertedMappedPoints = borough.value.points.map(function (point) {
            let elementObject = {};
            elementObject['type'] = 'Feature';
            elementObject['geometry'] = point;
            elementObject['properties'] = { "color" : dotColor};
            return elementObject;
          });
          hourBoroughs.push({
            "type": "FeatureCollection",
            "features": convertedMappedPoints
          })
        }
        this.setState({trips: hourBoroughs});
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize.bind(this));
    this._resize();
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

  handleChange(event, index, value) {
    this.setState({hour: value});
    console.log("Hour: " + this.state.hour);
    this.setSelectedHour();
  }

  render() {
    const {viewport, boroughs, trips, time, nonNY, manhattan, bronx, brooklyn, queens, statenIsland} = this.state;

    const style = {
      position: 'fixed',
      zIndex: 10,
      margin: 12,
    };

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <HourMenu handleChange={this.handleChange.bind(this)} />
            <BoroughTotalChips 
            nonNY={nonNY}
            manhattan={manhattan}
            bronx={bronx}
            brooklyn={brooklyn}
            queens={queens}
            statenIsland={statenIsland}
            />
          </div>
        </MuiThemeProvider>
        <MapGL
          {...viewport}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          onViewportChange={this._onViewportChange.bind(this)}
          mapboxApiAccessToken={MAPBOX_TOKEN}>
          <DeckGLOverlay viewport={viewport}
            trips={trips}
            boroughs={boroughs}
            />
        </MapGL>
      </div>
    );
  }
}

render(<Root />, document.body.appendChild(document.createElement('div')));
