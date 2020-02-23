import React from "react";
import PropTypes from "prop-types";

class Cell extends React.Component {
  render() {
    const classNames = ["cell"];
    return (
      <div
        className={classNames.join(" ")}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseEnter={this.props.onMouseEnter}
      />
    );
  }
}

Cell.propTypes = {
  onClick: PropTypes.function
};

export default Cell;
