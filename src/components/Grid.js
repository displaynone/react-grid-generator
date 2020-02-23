import React from "react";
import Cell from "./Cell";
import Preview from "./Preview";

class Grid extends React.Component {
  constructor() {
    super();
    this.state = {
      grid: [...Array(12).keys()].map(i => [...Array(6)]),
      selected: null,
      lastSelected: null,
      zones: [],
      currentSelection: null
    };
  }

  getCSSRules() {
    return this.state.zones.map((zone, index) => {
      return (
        <p key={index}>{`div:nth-child(${index}) { grid-area: ${zone.start.y +
          1} / ${zone.start.x + 1} / span ${zone.end.y -
          zone.start.y +
          1} / span ${zone.end.x - zone.start.x + 1};}`}</p>
      );
    });
  }

  render() {
    const cells = [...new Array(12 * 6).keys()].map((item, index) => {
      const x = index % 12;
      const y = parseInt(index / 12, 10);
      return (
        <Cell
          key={index}
          onMouseDown={() => {
            if (this.state.grid[x][y]) {
              return;
            }
            const selected = {
              x,
              y
            };
            this.setState({ selected });
          }}
          onMouseUp={() => {
            if (!this.state.selected || !this.state.lastSelected) {
              return;
            }
            const grid = [...this.state.grid];
            for (
              let i = this.state.selected.x;
              i <= this.state.lastSelected.x;
              i++
            ) {
              for (
                let j = this.state.selected.y;
                j <= this.state.lastSelected.y;
                j++
              ) {
                grid[i][j] = true;
              }
            }
            const zones = [
              ...this.state.zones,
              {
                start: this.state.selected,
                end: this.state.lastSelected
              }
            ].sort((zone1, zone2) => {
              if (zone1.start.y > zone2.start.y) {
                return true;
              }
              if (
                zone1.start.y === zone2.start.y &&
                zone1.start.x > zone2.start.x
              )
                return true;
              return false;
            });

            this.setState({
              zones,
              grid,
              selected: null,
              lastSelected: null,
              currentSelection: null
            });
          }}
          onMouseEnter={() => {
            if (!this.state.selected) {
              return;
            }
            for (let i = this.state.selected.x; i <= x; i++) {
              for (let j = this.state.selected.y; j <= y; j++) {
                if (this.state.grid[i][j]) {
                  return;
                }
              }
            }
            const lastSelected = {
              x,
              y
            };
            const currentSelection = {
              start: this.state.selected,
              end: lastSelected,
              current: true
            };
            this.setState({ lastSelected, currentSelection });
          }}
          selected={this.state.grid[x][y]}
        />
      );
    });
    return (
      <div>
        <div className="container">
          <div className="grid">{cells}</div>
          <Preview
            zones={this.state.zones}
            current={this.state.currentSelection}
            removeZone={index => {
              const grid = [...this.state.grid];
              const zone = this.state.zones[index];
              for (let i = zone.start.x; i <= zone.end.x; i++) {
                for (let j = zone.start.y; j <= zone.end.y; j++) {
                  grid[i][j] = false;
                }
              }
              const zones = [...this.state.zones].filter(
                (item, i) => i !== index
              );
              this.setState({ zones, grid });
            }}
          />
        </div>
        <div className="rules">{this.getCSSRules()}</div>
      </div>
    );
  }
}

export default Grid;
