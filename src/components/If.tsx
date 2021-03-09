import { Component } from "solid-js";

const If: Component<{ condition: boolean }> = (props) => {
  return <>{props.condition && props.children}</>;
};

export default If;
