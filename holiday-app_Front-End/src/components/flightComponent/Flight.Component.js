import React, { Component } from "react";
import "./Flight.Component.css";
import Amadeus from "amadeus";
import $ from 'jquery';
var dateFormat = require("dateformat");
const amadeus = new Amadeus({
  clientId: "ms2o7JGsa83kszn2i9SWgC9jySvpxH3F",
  clientSecret: "IPOV2zCofJsAkuLg"
});
class FlightComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FlightDetailsWithReturn: [],
      FlightDetailsWithoutReturn: [],
      // isLoading: false
    };
    // this.submit = this.submit.bind(this);
  }
  componentDidMount() {
    if (!(sessionStorage.getItem("userLoggedin"))) {
      this.props.history.push("/login");
    }
    else {
      $(document).ready(function () {

        setTimeout(function () {
          $('body').addClass('loaded');
        }, 3000);

      });
      console.log("HERE")
      var flightData = JSON.parse(sessionStorage.getItem("FlightDetails"));
      // this.init();
      // }
      // init() {
      // console.log(flightData.returnDate)
      const that = this;
      if (flightData.returnDate) {
        amadeus.shopping.flightOffers
          .get({
            origin: flightData.origin,
            destination: flightData.destination,
            departureDate: flightData.departureDate,
            returnDate: flightData.returnDate
          })

          .then(function (response) {
            that.setState({ FlightDetailsWithReturn: response.data });
            console.log(response.data);
          })
          .catch(function (responseError) {
            console.log(responseError.code);
          });
      } else {
        amadeus.shopping.flightOffers
          .get({
            origin: flightData.origin,
            destination: flightData.destination,
            departureDate: flightData.departureDate,
            // returnDate: flightData.returnDate
          })
          .then(function (response) {
            that.setState({
              FlightDetailsWithoutReturn: response.data
            });
          })
          .catch(function (responseError) {
            console.log(responseError.code);
          });
      }
    }
  }

  // submit(i, event) {
  //   console.log(i);
  //   // console.log("Sesha" + data.getItem);
  //   console.log(this.state.FlightDetailsWithReturn);
  //   console.log(this.state.FlightDetailsWithReturn[i]);

  //   // this.props.history.push('/userDetails');
  // }
  submit(data) {
    console.log(data);
    sessionStorage.setItem("SelectedFlight", JSON.stringify(data));
    this.props.history.push('/passengerDetails');
  }
  render() {
    return (
      <React.Fragment>
        <div class="wrap">
          <div class="loading">
            <div class="bounceball"></div>
            <div class="text text-uppercase">Fetching Flight Details</div>
          </div>
        </div>
        <div className="card-flight-layout">
          {/* {flightData.returnDate ? <div> */}
          {this.state.FlightDetailsWithReturn.map(
            (data) => (
              <div className="card">
                <div className="card-body content">
                  {data.offerItems.map(Items => (
                    <div className="card-title">
                      <h1 className="title">OUTBOUND</h1>
                      <div class="logo_img" />
                      <div className="card-layout">
                        <h2>ONE-WAY</h2>
                        <div className="rate">
                          <i className="fas fa-euro-sign"></i>{(Math.round(parseFloat(Items.price.total) + parseFloat(Items.price.totalTaxes)))}
                        </div>
                        {Items.services[0].segments.map(segment => (
                          <div className="card-body content">
                            <p className="body">
                              <b>Code: </b>{segment.flightSegment.aircraft.code}
                              <div className="date1">
                                <b>Departs: </b>
                                {dateFormat(
                                  segment.flightSegment.departure.at,
                                  "isoDate"
                                )}
                              </div>
                              <div className="date2">
                                <b>Arrives: </b>
                                {dateFormat(
                                  segment.flightSegment.arrival.at,
                                  "isoDate"
                                )}
                              </div>
                            </p>
                            <p className="time">
                              {dateFormat(
                                segment.flightSegment.departure.at,
                                "shortTime"
                              )}
                              <i className="fas fa-greater-than" />
                              {dateFormat(
                                segment.flightSegment.arrival.at,
                                "shortTime"
                              )}
                            </p>
                            <p className="duration">
                              {segment.flightSegment.duration}
                            </p>
                            <p class="city1">
                              {segment.flightSegment.departure.iataCode}
                            </p>
                            <p class="city2">
                              {segment.flightSegment.arrival.iataCode}
                            </p>
                            <p class="terminal1">Terminal:{segment.flightSegment.departure.terminal}</p>
                            <p class="terminal2">Terminal:{segment.flightSegment.arrival.terminal}</p>
                            <hr />
                            <p className="flight-class">
                              <p1>
                                <b>Travel Class: </b>
                                {
                                  segment.pricingDetailPerAdult.travelClass
                                }
                              </p1>
                              <p1>
                                <b>Fare Class: </b>
                                {
                                  segment.pricingDetailPerAdult.fareClass
                                }
                              </p1>
                              <p1>
                                <b>Availability: </b>
                                {
                                  segment.pricingDetailPerAdult.availability
                                }
                              </p1>
                            </p>
                            {/* <div className="flight-class">
                              <p>
                                <b>Price: </b>
                                {Items.price.total}
                              </p>
                              <p>
                                <b>Tax: </b>
                                {Items.price.totalTaxes}
                              </p>
                            </div>
                            Fare: <i className="fas fa-euro-sign"></i>{(Math.round(parseFloat(Items.price.total) + parseFloat(Items.price.totalTaxes)))} */}
                            <hr />
                          </div>
                        ))}
                        {/* <button type="submit" className="btn btn-primary payment" onClick={this.submit}>SELECT</button> */}
                      </div>
                      <h2>RETURN</h2>
                      {/* <div className="rate">
                        <i className="fas fa-euro-sign"></i>{(Math.round(parseFloat(Items.price.total) + parseFloat(Items.price.totalTaxes)))}
                      </div> */}
                      {Items.services[1].segments.map(segment => (
                        <div className="card-body">
                          <p className="body">
                            <b>Code: </b>{segment.flightSegment.aircraft.code}
                            <div className="date1">
                              <b>Departs: </b>
                              {dateFormat(
                                segment.flightSegment.departure.at,
                                "isoDate"
                              )}
                            </div>
                            <div className="date2">
                              <b>Arrives: </b>
                              {dateFormat(
                                segment.flightSegment.arrival.at,
                                "isoDate"
                              )}
                            </div>
                          </p>
                          <p className="time">
                            {dateFormat(
                              segment.flightSegment.departure.at,
                              "shortTime"
                            )}
                            <i className="fas fa-greater-than" />
                            {dateFormat(
                              segment.flightSegment.arrival.at,
                              "shortTime"
                            )}
                          </p>
                          <p className="duration">
                            {segment.flightSegment.duration}
                          </p>
                          <p class="city1">
                            {segment.flightSegment.departure.iataCode}
                          </p>
                          <p class="city2">
                            {segment.flightSegment.arrival.iataCode}
                          </p>
                          <p class="terminal1">Terminal:{segment.flightSegment.departure.terminal}</p>
                          <p class="terminal2">Terminal:{segment.flightSegment.arrival.terminal}</p>
                          <hr />
                          <p className="flight-class">
                            <p1>
                              <b>Travel Class: </b>
                              {
                                segment.pricingDetailPerAdult.travelClass
                              }
                            </p1>
                            <p1>
                              <b>Fare Class: </b>
                              {
                                segment.pricingDetailPerAdult.fareClass
                              }
                            </p1>
                            <p1>
                              <b>Availability: </b>
                              {
                                segment.pricingDetailPerAdult.availability
                              }
                            </p1>
                          </p>
                          <hr />
                        </div>
                      ))}
                      <button type="submit" className="btn btn-primary payment" onClick={this.submit.bind(this, data)}> SELECT</button>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
          {/* </div> : */}
          <div>
            {this.state.FlightDetailsWithoutReturn.map(
              (data) => (
                <div className="card">
                  <div className="card-body">
                    {data.offerItems.map(Items => (
                      <div className="card-title">
                        <h1 className="title">OUTBOUND</h1>
                        <div class="logo_img" />
                        <div className="card-layout">
                          <h2>ONE-WAY</h2>
                          <div className="rate">
                            <i className="fas fa-euro-sign"></i>{(Math.round(parseFloat(Items.price.total) + parseFloat(Items.price.totalTaxes)))}
                          </div>
                          {Items.services[0].segments.map(segment => (
                            <div className="card-body">
                              <p className="body">
                                <b>Code: </b>{segment.flightSegment.aircraft.code}
                                <div className="date1">
                                  <b>Departs: </b>
                                  {dateFormat(
                                    segment.flightSegment.departure.at,
                                    "isoDate"
                                  )}
                                </div>
                                <div className="date2">
                                  <b>Arrives: </b>
                                  {dateFormat(
                                    segment.flightSegment.arrival.at,
                                    "isoDate"
                                  )}
                                </div>
                              </p>
                              <p className="time">
                                {dateFormat(
                                  segment.flightSegment.departure.at,
                                  "shortTime"
                                )}
                                <i className="fas fa-greater-than" />
                                {dateFormat(
                                  segment.flightSegment.arrival.at,
                                  "shortTime"
                                )}
                              </p>
                              <p className="duration">
                                {segment.flightSegment.duration}
                              </p>
                              <p class="city1">
                                {segment.flightSegment.departure.iataCode}
                              </p>
                              <p class="city2">
                                {segment.flightSegment.arrival.iataCode}
                              </p>
                              <p class="terminal1">Terminal:{segment.flightSegment.departure.terminal}</p>
                              <p class="terminal2">Terminal:{segment.flightSegment.arrival.terminal}</p>
                              <hr />
                              <p className="flight-class">
                                <p1>
                                  <b>Travel Class: </b>
                                  {
                                    segment.pricingDetailPerAdult.travelClass
                                  }
                                </p1>
                                <p1>
                                  <b>Fare Class: </b>
                                  {
                                    segment.pricingDetailPerAdult.fareClass
                                  }
                                </p1>
                                <p1>
                                  <b>Availability: </b>
                                  {
                                    segment.pricingDetailPerAdult.availability
                                  }
                                </p1>
                              </p>
                              {/* <div className="flight-class">
                              <p>
                                <b>Price: </b>
                                {Items.price.total}
                              </p>
                              <p>
                                <b>Tax: </b>
                                {Items.price.totalTaxes}
                              </p>
                            </div>
                            Fare: <i className="fas fa-euro-sign"></i>{(Math.round(parseFloat(Items.price.total) + parseFloat(Items.price.totalTaxes)))} */}
                              <hr />
                            </div>
                          ))}
                          <button type="submit" className="btn btn-primary payment" onClick={this.submit}>SELECT</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}

          </div>
          {/* } */}

        </div>
        {/* <ul>
          {this.state.FlightDetailsWithReturn.map((data, index) => {
            // console.log(data);
            data.offerItems.map(Items => {
              // console.log(Items);
              // <div> {Items.price.total}</div>
              console.log("Total Price:", Items.price.total);
              console.log("Tax:", Items.price.totalTaxes);
              // Items.services.map(services => {
              // console.log(segments.flightSegment.departure.iataCode);
              console.log("One-Way>>>>>>");
              Items.services[0].segments.map(segment => {
                console.log("Code:", segment.flightSegment.aircraft.code);
                console.log("Total Duration:", segment.flightSegment.duration);
                console.log(
                  "TravelClass:",
                  segment.pricingDetailPerAdult.travelClass
                );
                console.log(
                  "FareClass:",
                  segment.pricingDetailPerAdult.fareClass
                );
                console.log(
                  "Availability:",
                  segment.pricingDetailPerAdult.availability
                );
                console.log(
                  "Departure:",
                  segment.flightSegment.departure.iataCode
                );
                console.log(
                  "Departure Time:",
                  segment.flightSegment.departure.at
                );
                console.log(
                  "Departure Terminal:",
                  segment.flightSegment.departure.terminal
                );
                console.log("Arrival:", segment.flightSegment.arrival.iataCode);
                console.log("Arrival Time:", segment.flightSegment.arrival.at);
                console.log(
                  "Arrival Terminal:",
                  segment.flightSegment.arrival.terminal
                );
              });
              console.log("Return>>>>>>");
              Items.services[1].segments.map(segment => {
                console.log("Code:", segment.flightSegment.aircraft.code);
                console.log("Total Duration:", segment.flightSegment.duration);
                console.log(
                  "TravelClass:",
                  segment.pricingDetailPerAdult.travelClass
                );
                console.log(
                  "FareClass:",
                  segment.pricingDetailPerAdult.fareClass
                );
                console.log(
                  "Availability:",
                  segment.pricingDetailPerAdult.availability
                );
                console.log(
                  "Departure:",
                  segment.flightSegment.departure.iataCode
                );
                console.log(
                  "Departure Time:",
                  segment.flightSegment.departure.at
                );
                console.log(
                  "Departure Terminal:",
                  segment.flightSegment.departure.terminal
                );
                console.log("Arrival:", segment.flightSegment.arrival.iataCode);
                console.log("Arrival Time:", segment.flightSegment.arrival.at);
                console.log(
                  "Arrival Terminal:",
                  segment.flightSegment.arrival.terminal
                );
              });
              // });
            });
          })}
        </ul>
        <ul>
          {this.state.FlightDetailsWithoutReturn.map((data, index) => {
            // console.log(data);
            data.offerItems.map(Items => {
              // console.log(Items);
              // { Items.price.total }
              console.log("Total Price:", Items.price.total);
              console.log("Tax:", Items.price.totalTaxes);
              // Items.services.map(services => {
              // console.log(segments.flightSegment.departure.iataCode);
              console.log("One-Way>>>>>>");
              Items.services[0].segments.map(segment => {
                console.log("Code:", segment.flightSegment.aircraft.code);
                console.log("Total Duration:", segment.flightSegment.duration);
                console.log(
                  "TravelClass:",
                  segment.pricingDetailPerAdult.travelClass
                );
                console.log(
                  "FareClass:",
                  segment.pricingDetailPerAdult.fareClass
                );
                console.log(
                  "Availability:",
                  segment.pricingDetailPerAdult.availability
                );
                console.log(
                  "Departure:",
                  segment.flightSegment.departure.iataCode
                );
                console.log(
                  "Departure Time:",
                  segment.flightSegment.departure.at
                );
                console.log(
                  "Departure Terminal:",
                  segment.flightSegment.departure.terminal
                );
                console.log("Arrival:", segment.flightSegment.arrival.iataCode);
                console.log("Arrival Time:", segment.flightSegment.arrival.at);
                console.log(
                  "Arrival Terminal:",
                  segment.flightSegment.arrival.terminal
                );
              });
            });
          })}
          ;
        </ul> */}
      </React.Fragment>
    );
  }
}

export default FlightComponent;
