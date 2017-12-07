import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from "material-ui/RaisedButton";

const styles = {
  customWidth: {
    width: 200,
  },
};

export default class HourMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 0};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value){
  	this.setState({value});
  	this.props.handleChange(event, index, value);
  }

  render() {
    return (
      <div>
        <DropDownMenu value={this.state.value} onChange={this.handleChange} style={styles.customWidth} autoWidth={false}>
          <MenuItem value={0} primaryText="00:00–00:59" />
          <MenuItem value={1} primaryText="01:00–01:59" />
          <MenuItem value={2} primaryText="02:00–02:59" />
          <MenuItem value={3} primaryText="03:00–03:59" />
          <MenuItem value={4} primaryText="04:00–04:59" />
          <MenuItem value={5} primaryText="05:00–05:59" />
          <MenuItem value={6} primaryText="06:00–06:59" />
          <MenuItem value={7} primaryText="07:00–07:59" />
          <MenuItem value={8} primaryText="08:00–08:59" />
          <MenuItem value={9} primaryText="09:00–09:59" />
          <MenuItem value={10} primaryText="10:00–10:59" />
          <MenuItem value={11} primaryText="11:00–11:59" />
          <MenuItem value={12} primaryText="12:00–12:59" />
          <MenuItem value={13} primaryText="13:00–13:59" />
          <MenuItem value={14} primaryText="14:00–14:59" />
          <MenuItem value={15} primaryText="15:00–15:59" />
          <MenuItem value={16} primaryText="16:00–16:59" />
          <MenuItem value={17} primaryText="17:00–17:59" />
          <MenuItem value={18} primaryText="18:00–18:59" />
          <MenuItem value={19} primaryText="19:00–19:59" />
          <MenuItem value={20} primaryText="20:00–20:59" />
          <MenuItem value={21} primaryText="21:00–21:59" />
          <MenuItem value={22} primaryText="22:00–22:59" />
          <MenuItem value={23} primaryText="23:00–23:59" />
        </DropDownMenu>

      </div>
    );
  }
}