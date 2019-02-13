// @flow

import React, { Component, type Node } from 'react';
import rafSchedule from 'raf-schd';

// Need to make outer div full height in case consumer wants to align
// child content vertically center. These styles can be overridden by the
// product using the optional SizeDetector.containerStyle prop.
const containerDivStyle = {
  height: '100%',
  flex: '1 0 auto',
  position: 'relative',
};

// Not using styled-components here for performance
// and framework-agnostic reasons.
const objectStyle = {
  display: 'block',
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  opacity: 0,
  overflow: 'hidden',
  pointerEvents: 'none',
  zIndex: -1,
};

type SizeMetrics = {
  width: number,
  height: number,
};

type Props = {
  /** Function that accepts an object parameter containing 'height' and 'width' properties */
  children: SizeMetrics => Node,
  /** Optional styles object to be applied to the containing element */
  containerStyle?: Object,
  /** Called when the component is resized. */
  onResize?: SizeMetrics => void,
};

type State = {
  sizeMetrics: SizeMetrics,
};

export default class SizeDetector extends Component<Props, State> {
  containerRef = React.createRef();
  objectElementRef = React.createRef();

  static defaultProps = {
    containerStyle: {},
  };

  state = {
    sizeMetrics: {
      width: null,
      height: null,
    },
  };

  componentDidMount() {
    if (this.resizeObjectDocument) {
      // $FlowFixMe - resizeObject is HTMLElement which doesn't contain .data prop
      this.resizeObjectDocument.data = 'about:blank';
    }
  }

  componentWillUnmount() {
    this.handleResize.cancel();

    if (this.resizeObjectDocument) {
      this.resizeObjectDocument.removeEventListener(
        'resize',
        this.handleResize,
      );
    }
  }
  // Attach the resize event to object when it loads
  handleObjectLoad = () => {
    if (!this.objectElementRef.current) {
      return;
    }

    // $FlowFixMe - resizeObject is typed as HTMLElement which has no contentDocument prop
    this.resizeObjectDocument = this.objectElementRef.current.contentDocument.defaultView;
    this.resizeObjectDocument.addEventListener('resize', this.handleResize);

    // Calculate width first time, after object has loaded.
    // Prevents it from getting in a weird state where width is always 0.
    this.handleResize();
  };

  // limit the resize event occure only once per requestAnimationFrame
  handleResize = rafSchedule(() => {
    const { containerRef } = this;
    if (!containerRef.current) {
      return;
    }

    const sizeMetrics = {
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    };

    this.setState({
      sizeMetrics,
    });

    if (this.props.onResize) {
      this.props.onResize(sizeMetrics);
    }
  });

  getInitialSize = () => {
    const { containerRef } = this;
    if (!containerRef.current) {
      return { width: null, height: null };
    }
    return {
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    };
  };

  renderChildren = () => {
    const { sizeMetrics } = this.state;
    if (sizeMetrics.width === null) {
      return this.props.children(this.getInitialSize());
    }
    return this.props.children(sizeMetrics);
  };

  render() {
    return (
      <div
        style={{ ...containerDivStyle, ...this.props.containerStyle }}
        ref={this.containerRef}
      >
        {/* eslint-disable jsx-a11y/alt-text */}
        <object
          type="text/html"
          style={objectStyle}
          ref={this.objectElementRef}
          onLoad={this.handleObjectLoad}
          aria-hidden
          tabIndex={-1}
        />
        {this.renderChildren()}
      </div>
    );
  }
}

// class SizeDetector1 extends Component<Props, State> {
//   static defaultProps = {
//     containerStyle: {},
//   };

//   state = {
//     sizeMetrics: {
//       width: null,
//       height: null,
//     },
//   };

//   container: ?HTMLDivElement;
//   resizeObjectDocument: ?window;
//   resizeObject: ?HTMLElement;
//   ref = React.createRef();

//   handleResize = rafSchedule(() => {
//     const { container } = this;
//     if (!container) {
//       return;
//     }

//     const sizeMetrics = {
//       width: container.offsetWidth,
//       height: container.offsetHeight,
//     };

//     this.setState({
//       sizeMetrics,
//     });

//     if (this.props.onResize) {
//       this.props.onResize(sizeMetrics);
//     }
//   });

//   componentDidMount() {
//     if (this.resizeObject) {
//       // $FlowFixMe - resizeObject is HTMLElement which doesn't contain .data prop
//       this.resizeObject.data = 'about:blank';
//     }
//   }

//   componentWillUnmount() {
//     this.handleResize.cancel();

//     if (this.resizeObjectDocument) {
//       this.resizeObjectDocument.removeEventListener(
//         'resize',
//         this.handleResize,
//       );
//     }
//   }

//   handleContainerRef = (ref: ?HTMLDivElement) => {
//     if (!ref) {
//       return;
//     }
//     this.container = ref;
//     this.handleResize();
//   };

//   handleObjectRef = (ref: ?HTMLElement) => {
//     if (!ref) {
//       return;
//     }
//     this.resizeObject = ref;
//   };

//   handleObjectLoad = () => {
//     if (!this.resizeObject) {
//       return;
//     }

//     // $FlowFixMe - resizeObject is typed as HTMLElement which has no contentDocument prop
//     this.resizeObjectDocument = this.resizeObject.contentDocument.defaultView;
//     this.resizeObjectDocument.addEventListener('resize', this.handleResize);

//     // Calculate width first time, after object has loaded.
//     // Prevents it from getting in a weird state where width is always 0.
//     this.handleResize();
//   };

//   renderChildren = () => {
//     const { children } = this.props;
//     const { sizeMetrics = { width: null, height: null } } = this.state;
//     return children(sizeMetrics);
//   };

//   render() {
//     return (
//       <div
//         style={{ ...containerDivStyle, ...this.props.containerStyle }}
//         ref={this.ref}
//       >
//         {/* eslint-disable jsx-a11y/alt-text */}
//         <object
//           type="text/html"
//           style={objectStyle}
//           ref={this.handleObjectRef}
//           onLoad={this.handleObjectLoad}
//           aria-hidden
//           tabIndex={-1}
//         />
//         {this.renderChildren()}
//       </div>
//     );
//   }
// }
