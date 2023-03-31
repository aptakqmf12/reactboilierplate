import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Header() {
  const FIXED_NAV = [{ to: "/", name: "홈" }];

  return (
    <header>
      <Navigation>
        {FIXED_NAV.map((nav, i) => (
          <li key={i}>
            <Link to={nav.to}>{nav.name}</Link>
          </li>
        ))}
      </Navigation>
    </header>
  );
}

const Navigation = styled.ul`
  display: flex;
  li {
    padding: 4px;
  }
`;
