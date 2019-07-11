import React from "react";
import "./App.css";
import "../node_modules/jquery/dist/jquery.min.js";
import HeaderComponent from "./components/headerComponent/Header.Component";
import Router from "./router";
// import "./services/PostData";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";


class App extends React.Component {

  render() {
    return (
      <div className="App">
        <HeaderComponent />
        <Router />
      </div>
    );
  }
}

export default App;
