import React, { useEffect, useRef, useState } from "react";

export class Example extends React.Component<any, { val: number }> {
  constructor(props: any) {
    super(props);
    this.state = {
      val: 0,
    };
  }

  componentDidMount() {
    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val);
    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val);
    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val);
    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val);
    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val);

    setTimeout(() => {
      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val);

      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val);
    }, 0);
  }

  render() {
    return null;
  }
}
