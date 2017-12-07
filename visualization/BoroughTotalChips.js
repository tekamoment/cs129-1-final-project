import React from 'react';
import Chip from 'material-ui/Chip';
import {blue300, indigo900} from 'material-ui/styles/colors';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  manhattan: "#F4F1BB",
  bronx: "#E6EBE0",
  brooklyn: "#9BC1BC",
  queens: "#5CA4A9",
  statenIsland: "#ED6A5A",
};


export default class BoroughTotalChips extends React.Component {

  render() {
    const {nonNY, manhattan, bronx, brooklyn, queens, statenIsland} = this.props;

    return (
      <div style={styles.wrapper}>

        <Chip
          style={styles.chip}
        >
          Outside of NYC: {nonNY}
        </Chip>

        <Chip
          style={styles.chip}
          backgroundColor={styles.manhattan}
        >
          Manhattan: {manhattan}
        </Chip>

        <Chip
          style={styles.chip}
          backgroundColor={styles.bronx}
        >
          The Bronx: {bronx}
        </Chip>

        <Chip
          style={styles.chip}
          backgroundColor={styles.brooklyn}
        >
          Brooklyn: {brooklyn}
        </Chip>

        <Chip
          style={styles.chip}
          backgroundColor={styles.queens}
        >
          Queens: {queens}
        </Chip>

        <Chip
          style={styles.chip}
          backgroundColor={styles.statenIsland}
        >
          Staten Island: {statenIsland}
        </Chip>
      </div>
    );
  }
}