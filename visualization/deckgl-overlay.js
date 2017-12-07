import React, {Component} from 'react';
import DeckGL, {PolygonLayer, GeoJsonLayer} from 'deck.gl';
// import TripsLayer from './trips-layer';

const LIGHT_SETTINGS = {
  lightsPosition: [-74.05, 40.7, 8000, -73.5, 41, 5000],
  ambientRatio: 0.05,
  diffuseRatio: 0.6,
  specularRatio: 0.8,
  lightsStrength: [2.0, 0.0, 0.0, 0.0],
  numberOfLights: 2
};

export default class DeckGLOverlay extends Component {

  static get defaultViewport() {
    return {
      longitude: -74,
      latitude: 40.70,
      zoom: 10,
      maxZoom: 13,
      pitch: 45,
      bearing: 0
    };
  }

  render() {
    const {viewport, boroughs, trips, trailLength, time} = this.props;

    const layers = [
      new GeoJsonLayer({
        id: 'boroughs',
        data: boroughs,
        filled: true,
        stroked: true,
        extruded: false,
        getFillColor: f => f.properties.color
      })
    ];

    return (
      <DeckGL {...viewport} layers={layers} initWebGLParameters />
    );
  }
}
