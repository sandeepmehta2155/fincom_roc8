import React from "react";
import * as useComponent from "./index";

import "./styles.css";
import { useTheme } from "./HomePage-Components/theme-context";

export default function App() {
  const { mode } = useTheme();
  return (
    <>
      <div className={mode}>
        <useComponent.Header />
        <useComponent.RouteComponents />
        <useComponent.Footer />
      </div>
    </>
  );
}
