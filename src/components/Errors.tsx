import { Component, For } from "solid-js";

const Errors: Component<{ errors: Error | Record<string, string[]> }> = (
  props
) => {
  const errors = () => {
    return props.errors instanceof Error
      ? [props.errors.message]
      : Object.entries(props.errors)
          .map(([key, values]) => values.map((value) => `${key} ${value}`))
          .flat();
  };

  return (
    <ul class="error-messages">
      <For each={errors()}>{(error) => <li>{error}</li>}</For>
    </ul>
  );
};

export default Errors;
