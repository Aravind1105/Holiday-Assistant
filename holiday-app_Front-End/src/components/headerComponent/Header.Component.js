import React, { Component } from "react";
import "./Header.Component.css";
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import { HelpBlock } from "rsuite";


class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: ''
    }
  }


  logOut() {
    sessionStorage.clear();
    ToastsStore.success("You're now Logged Out!");
    window.setTimeout(function () {
      window.location.href = "/login";
    }, 1000);
  }

  render() {
    var data = JSON.parse(sessionStorage.getItem("userData"));
    var User = JSON.parse(sessionStorage.getItem("userLoggedin"));

    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/dashboard">
            <img
              className="img1"
              src={require("./beach.png")}
              width="50"
              height="50"
              alt="trip logo"
            />
            Holiday-Assistant
        </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className="collapse navbar-collapse row"
            id="navbarSupportedContent"
          >
            <div className="col-2 offset-10">
              <ul className="navbar-nav mr-auto">
                {User ? (
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{<span><i className="fa fa-user"></i> {data.firstName}</span>}</a>

                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <a className="dropdown-item" href="/flightBookings">Flight Bookings</a>
                      <a className="dropdown-item" href="/hotelBookings">Hotel Bookings</a>
                      <a className="dropdown-item" href="#" onClick={this.logOut}>Sign out</a>

                    </div>
                  </li>
                ) : (
                    "Hello, Guest"
                  )}
              </ul>
            </div>
          </div>
        </nav >
        {/* <footer>
          <div id="footer">
            <div class="container c2">
              <div class="row row-bottom-padded-md r5">
                <div class="col-md-2 col-sm-2 col-xs-12 fh5co-footer-link">
                  <h3>About Travel</h3>
                  <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                </div>
                <div class="col-md-2 col-sm-2 col-xs-12 fh5co-footer-link">
                  <h3>Top Flights Routes</h3>
                  <ul>
                    <li><a href="https://www.free-css.com/free-css-templates">Manila flights</a></li>
                    <li><a href="https://www.free-css.com/free-css-templates">Dubai flights</a></li>
                    <li><a href="https://www.free-css.com/free-css-templates">Bangkok flights</a></li>
                    <li><a href="https://www.free-css.com/free-css-templates">Tokyo Flight</a></li>
                    <li><a href="https://www.free-css.com/free-css-templates">New York Flights</a></li>
                  </ul>
                </div>
                <div class="col-md-2 col-sm-2 col-xs-12 fh5co-footer-link">
                  <h3>Top Hotels</h3>
                  <ul>
                    <li><a href="https://www.free-css.com/free-css-templates">Boracay Hotel</a></li>
                    <li><a href="https://www.free-css.com/free-css-templates">Dubai Hotel</a></li>
                    <li><a href="https://www.free-css.com/free-css-templates">Singapore Hotel</a></li>
                    <li><a href="https://www.free-css.com/free-css-templates">Manila Hotel</a></li>
                  </ul>
                </div>
                <div class="col-md-2 col-sm-2 col-xs-12 fh5co-footer-link">
                  <h3>Interest</h3>
                  <ul>
                    <li><a href="https://www.free-css.com/free-css-templates">Beaches</a></li>
                    <li><a href="https://www.free-css.com/free-css-templates">Family Travel</a></li>
                    <li><a href="https://www.free-css.com/free-css-templates">Budget Travel</a></li>
                    <li><a href="https://www.free-css.com/free-css-templates">Food &amp; Drink</a></li>
                    <li><a href="https://www.free-css.com/free-css-templates">Honeymoon and Romance</a></li>
                  </ul>
                </div>
                <div class="col-md-2 col-sm-2 col-xs-12 fh5co-footer-link">
                  <h3>Best Places</h3>
                  <ul>
                    <li><a href="https://www.free-css.com/free-css-templates">Boracay Beach</a></li>
                    <li><a href="https://www.free-css.com/free-css-templates">Dubai</a></li>
                    <li><a href="https://www.free-css.com/free-css-templates">Singapore</a></li>
                    <li><a href="https://www.free-css.com/free-css-templates">Hongkong</a></li>
                  </ul>
                </div>
                <div class="col-md-2 col-sm-2 col-xs-12 fh5co-footer-link">
                  <h3>Affordable</h3>
                  <ul>
                    <li><a href="https://www.free-css.com/free-css-templates">Food &amp; Drink</a></li>
                    <li><a href="https://www.free-css.com/free-css-templates">Fare Flights</a></li>
                  </ul>
                </div>
              </div>
              <div class="row r5">
                <div class="col-md-6 col-md-offset-3 text-center">
                  <p class="fh5co-social-icons"><a href="https://www.free-css.com/free-css-templates"><i class="icon-twitter2"></i></a> <a href="https://www.free-css.com/free-css-templates"><i class="icon-facebook2"></i></a> <a href="https://www.free-css.com/free-css-templates"><i class="icon-instagram"></i></a> <a href="https://www.free-css.com/free-css-templates"><i class="icon-dribbble2"></i></a> <a href="https://www.free-css.com/free-css-templates"><i class="icon-youtube"></i></a></p>
                  <p>Copyright <a href="https://www.free-css.com/free-css-templates">Module</a>. All Rights Reserved.</p>
                  <p> Made with <i class="icon-heart3"></i> by <a target="_blank" rel="nofollow noopener" href="//freehtml5.co/">FreeHTML5.co</a> / Demo Images: Unsplash</p>
                </div>
              </div>
            </div>
          </div>
        </footer> */}
      </React.Fragment >
    );
  }
}

export default HeaderComponent;
