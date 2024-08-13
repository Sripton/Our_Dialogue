import React from "react";
import Layout from "../components/Layout";
import { renderToString } from "react-dom/server";

export default function jsxRender(_, initState, callBack) {
  const layout = React.createElement(Layout, { initState });
  const html = renderToString(layout);
  return callBack(null, `<!DOCTYPE html>${html}`);
}
