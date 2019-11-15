import classNames from "classnames";
import * as React from "react";

import { ProgressProps, getPercentage, getColor, COLORS } from "./Progress";

function percentageToDegrees(percentage: number) {
  return (percentage / 100) * 360;
}

export interface ProgressCircleProps extends ProgressProps {
  /**
   * Child elements (only allows elements of type <ProgressCircle />)
   */
  children?: React.ReactElement<ProgressCircleProps>[];

  style?: React.StyleHTMLAttributes<SVGCircleElement>;
}

const SQUARE_SIZE = 200;

class ProgressCircle extends React.Component<ProgressCircleProps> {
  static defaultProps = {
    className: "",
    min: 0,
    max: 100,
    colors: COLORS
  };

  getStrokeWidth() {
    if (this.props.size == "big") {
      return 20;
    }

    if (this.props.size == "small") {
      return 5;
    }

    return 10;
  }

  renderProgressCircle(
    mergedProps: ProgressCircleProps,
    rotation: number,
    radius: number
  ) {
    const sqSize = SQUARE_SIZE;
    const strokeWidth = this.getStrokeWidth();

    const { min, now, max, color, colors, className, ...props } = mergedProps;

    // Arc length at 100% coverage is the circle circumference
    const strokeDasharray = radius * Math.PI * 2;

    const percentage = getPercentage(now, min, max);

    // Scale 100% coverage overlay with the actual percent
    const strokeDashoffset =
      strokeDasharray - (strokeDasharray * percentage) / 100;

    const style = { ...props.style };
    if (color) {
      style.stroke = color;
    }

    return (
      <circle
        {...props}
        className={classNames(className, "ProgressCircle__item")}
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        // Start progress marker at 12 O'Clock
        transform={`rotate(${rotation - 90} ${sqSize / 2} ${sqSize / 2})`}
        style={{
          strokeDasharray,
          strokeDashoffset,
          ...style
        }}
      />
    );
  }

  render() {
    const sqSize = SQUARE_SIZE; // Size of the enclosing square
    const strokeWidth = this.getStrokeWidth();

    const { children, label, colors } = this.props;

    // Enclose cicle in a circumscribing square
    const viewBox = `0 0 ${sqSize} ${sqSize}`;

    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (sqSize - strokeWidth) / 2;

    let current = 0;

    return (
      <svg
        width="100%"
        height="100%"
        viewBox={viewBox}
        className="ProgressCircle"
      >
        <circle
          className="ProgressCircle__background"
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
        />
        {children
          ? React.Children.map(
              children,
              (child: React.ReactElement<ProgressCircleProps>, index) => {
                const mergedProps = {
                  color: getColor(index, colors),
                  ...this.props,
                  ...child.props,
                  min: this.props.min,
                  max: this.props.max
                };

                const rotation = percentageToDegrees(current);

                current += getPercentage(
                  mergedProps.now,
                  mergedProps.min,
                  mergedProps.max
                );

                return this.renderProgressCircle(mergedProps, rotation, radius);
              }
            )
          : this.renderProgressCircle(this.props, 0, radius)}
        <text
          className="ProgressCircle__text"
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle"
        >
          {label}
        </text>
      </svg>
    );
  }
}

export default ProgressCircle;
