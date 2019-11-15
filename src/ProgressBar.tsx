import classNames from "classnames";
import * as React from "react";

import { ProgressProps, getPercentage, getColor, COLORS } from "./Progress";

export interface ProgressBarProps extends ProgressProps {
  /**
   * Animate's the stripes from right to left
   */
  animated?: boolean;

  /**
   * Child elements (only allows elements of type <ProgressBar />)
   */
  children?: React.ReactElement<ProgressBarProps>[];

  style?: React.StyleHTMLAttributes<HTMLElement>;
}

class ProgressBar extends React.Component<ProgressBarProps> {
  static defaultProps = {
    min: 0,
    max: 100,
    animated: false,
    style: {},
    colors: COLORS
  };

  renderProgressBar(mergedProps: ProgressBarProps) {
    const {
      min,
      now,
      max,
      color,
      label,
      animated,
      className,
      ...props
    } = mergedProps;
    const style = { ...props.style };
    if (color) {
      style.backgroundColor = color;
    }

    return (
      <div
        {...props}
        role="progressbar"
        className={classNames("ProgressBar__item", className, {
          "ProgressBar__item--animated": animated,
          "ProgressBar__item--striped": animated
        })}
        style={{ width: `${getPercentage(now, min, max)}%`, ...style }}
        aria-valuenow={now}
        aria-valuemin={min}
        aria-valuemax={max}
      >
        {label}
      </div>
    );
  }

  render() {
    const {
      min,
      now,
      max,
      color,
      colors,
      label,
      size,
      animated,
      className,
      children,
      ...wrapperProps
    } = this.props;

    return (
      <div
        {...wrapperProps}
        className={classNames(className, "ProgressBar", {
          [`ProgressBar--${size}`]: size
        })}
      >
        {children
          ? React.Children.map(
              children,
              (child: React.ReactElement<ProgressBarProps>, index) => {
                const mergedProps = {
                  color: getColor(index, colors),
                  ...this.props,
                  ...child.props,
                  min: this.props.min,
                  max: this.props.max
                };

                return this.renderProgressBar(mergedProps);
              }
            )
          : this.renderProgressBar(this.props)}
      </div>
    );
  }
}

export default ProgressBar;
