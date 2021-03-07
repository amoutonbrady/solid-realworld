import { Component } from "solid-js";
import { Link } from "solid-app-router";

const Footer: Component = () => {
  return (
    <footer>
      <div class="container">
        <Link href="/" class="logo-font">
          conduit
        </Link>

        <span class="attribution">
          An interactive learning project from{" "}
          <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
          licensed under MIT.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
