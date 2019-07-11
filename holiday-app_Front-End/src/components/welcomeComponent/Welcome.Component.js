import React, { Component } from "react";
import "./Welcome.Component.css";

class WelcomeComponent extends Component {
  state = {};
  signin() {
    window.location.href = "/login";
  }
  render() {
    return (
      <React.Fragment>
        <div className="owl-item">
          <div className="bg_image">
            <div className="home_slider_content_container">
              <div className="container">
                <div className="row">
                  <div className="col">
                    <div className="home_slider_content">
                      <div className="home_title">
                        <h2 className="head">Let us take you away</h2>
                        <h4 className="head2">
                          Sign In to grab your tickets!!!
                        </h4>
                        <br />
                        <button
                          className="btn btn-primary"
                          onClick={this.signin}
                        >
                          SignIn
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default WelcomeComponent;
