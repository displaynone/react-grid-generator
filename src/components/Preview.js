import React from "react";

class Preview extends React.Component {
  render() {
    const { zones, current } = this.props;
    const cells = [...zones, current]
      .filter(zone => !!zone)
      .map((zone, index) => {
        const style = {
          gridArea: `${zone.start.y + 1} / ${zone.start.x + 1} / span ${zone.end
            .y -
            zone.start.y +
            1} / span ${zone.end.x - zone.start.x + 1}`
        };
        const classNames = ["cell"];
        classNames.push(!!zone.current ? "current" : "selected");

        return (
          <div
            className={classNames.join(" ")}
            style={style}
            key={`preview-${index}`}
          >
            {!zone.current && (
              <span
                className="close dashicons dashicons-dismiss"
                onClick={() => this.props.removeZone(index)}
              />
            )}
            {!zone.current && <span className="order">{index + 1}</span>}
          </div>
        );
      });
    return <div className="grid preview">{cells}</div>;
  }
}

export default Preview;
