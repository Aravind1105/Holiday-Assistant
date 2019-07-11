import React, { Component } from "react";
import "./SignIn.Component.css";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import { api_url } from '../config';

class SignInComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      passWord: "",
      authenticated: false,
      responseObject: ""
    };

    this.signIn = this.signIn.bind(this);
    this.onChange = this.onChange.bind(this);
    this.moveToRegistration = this.moveToRegistration.bind(this);
  }

  async signIn(e) {
    e.preventDefault();
    if (this.state.email !== "" && this.state.passWord !== "") {
      var loader = document.getElementById("loader");
      loader.className = "fullScreen";
      loader.firstChild.style.display = "inline-block";

      await axios
        .post(
          api_url + "/loginApi/login",
          {
            email: this.state.email,
            password: this.state.passWord
          },
        )
        .then(res => {
          if (res.statusText !== "No Content" && (res.data !== undefined || res.data !== "")) {
            ToastsStore.success("You're now Logged In!");
            loader.className = "";
            loader.firstChild.style.display = "none";
            sessionStorage.setItem("userLoggedin", true);
            sessionStorage.setItem("userData", JSON.stringify(res.data));
            window.setTimeout(function () {
              window.location.href = "/dashboard";
            }, 1000);
          }
          else {
            ToastsStore.warning("Invalid Credentials!");
            loader.className = "";
            loader.firstChild.style.display = "none";
            document.getElementById("signin").reset();
          }
        }).catch(error => {
          ToastsStore.info("Please check your Internet Connection!");
          loader.className = "";
          loader.firstChild.style.display = "none";
        });
    }
    else {
      ToastsStore.info("Please enter credentials!");
    }
  }

  isAuthenticated() {
    const token = sessionStorage.getItem("token");
    return token && token.length > 10;
  }
  moveToRegistration() {
    this.props.history.push("/registration");
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  render() {
    const isAlreadyAuthenticated = this.isAuthenticated();
    return (
      <div>
        <div id="loader">
          <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
        <div className="signin-body">
          {isAlreadyAuthenticated ? (
            <Redirect to={{ pathname: "/dashboard" }} />
          ) : (
              <div className="container">
                <div className="row">
                  <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5 card-lay">
                      <div className="card-body">
                        <h5 className="card-title text-center">Sign In</h5>
                        <form className="form-signin">
                          <div className="form-label-group">
                            <input
                              type="email"
                              id="email"
                              className="form-control text-center"
                              placeholder="Email address"
                              onChange={this.onChange}
                              required
                            />
                            <label htmlFor="email">Email address</label>
                          </div>
                          <div className="form-label-group">
                            <input
                              type="password"
                              id="passWord"
                              className="form-control text-center"
                              placeholder="Password"
                              onChange={this.onChange}
                              required
                            />
                            <label htmlFor="passWord">Password</label>
                          </div>
                          <button
                            className="btn btn-lg btn-primary btn-block text-uppercase"
                            type="submit"
                            onClick={this.signIn}
                          >
                            Sign in
                      </button>
                          <ToastsContainer position={ToastsContainerPosition.BOTTOM_CENTER} store={ToastsStore} />
                          <div className="errormsgs">
                            {this.state.errormsg}
                          </div>
                          {/* <div className="mt-4">
                            <a className="anchor_tag">Forgot password?</a>
                          </div> */}
                          <hr className="my-4" />
                          <div>Haven't registered yet?</div>
                          <a
                            className="anchor_tag"
                            onClick={this.moveToRegistration}
                          >
                            Register now
                      </a>
                          <hr className="my-4" />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>

    );
  }
}

export default SignInComponent;
