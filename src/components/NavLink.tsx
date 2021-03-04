import { Link, LinkProps, useRouter } from 'solid-app-router';
import { Component } from 'solid-js';

interface Props extends LinkProps {
  active?: boolean;
  route?: string;
}

const NavLink: Component<Props> = (props) => {
  const [router] = useRouter();

  return (
    <Link
      class={props.class}
      classList={{
        active: props.active || router.location === props.route,
      }}
      href={`/${props.href || props.route}`}
    >
      {props.children}
    </Link>
  );
};

export default NavLink;
