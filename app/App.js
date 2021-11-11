import React from "react";
import { useFonts } from "expo-font";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Navigation } from "./infrastrucutre/navigation";
import store from "./app/store";

import { Provider } from "react-redux";

export default function App() {
  const [loaded] = useFonts({
    BasisGrotesqueProBold: require("./fonts/BasisGrotesqueProBold.ttf"),
    BasisGrotesqueProMiddle: require("./fonts/BasisGrotesqueProMedium.ttf"),
  });

  if (!loaded) return null;
  return (
    <>
      <Provider store={store}>
        <Navigation />
        <ExpoStatusBar style="auto" />
      </Provider>
    </>
  );
}
