import React from "react";
import Header from "@components/layout/header";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme } from "theme";
import useDisplay from "@hook/useDisplay";
import RouterComponents from "@route/index";

function App() {
  const display = useDisplay();
  const themes = { ...theme, ...display };

  return (
    <ThemeProvider theme={themes}>
      <GlobalStyle />

      <Header />

      <RouterComponents />
    </ThemeProvider>
  );
}

const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul, li {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a{
    text-decoration: none;
    color:inherit
  }
  button{
    background-color: transparent;
    border:none;
    cursor: pointer;
  }
  input{
    &:focus{
      outline:none
    }
  }
  textarea{
    resize: none;
    &:focus{
      outline:none
    }
  }
`;

export default App;
