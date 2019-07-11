import React, { Component } from "react";
import "./Dashboard.Component.css";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class DashboardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flightDetails: {
        origin: "",
        destination: "",
        departureDate: "",
        returnDate: "",
        value: '',
      },
      hotelDetails: {
        city: "",
        adults: ""
      },
      departureDate: "",
      returnDate: ""
    };
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
  }
  componentDidMount() {
    if (!(sessionStorage.getItem("userLoggedin"))) {
      this.props.history.push("/login");
    }
  }
  handleChange1(date) {
    this.setState({
      departureDate: date
    });
  }

  handleChange2(date) {
    this.setState({
      returnDate: date
    });
  }

  getFlightData = e => {
    e.preventDefault();
    this.setState(
      {
        flightDetails: {
          origin: e.target.elements.origin.value,
          destination: e.target.elements.destination.value,
          departureDate: e.target.elements.departure.value,
          returnDate: e.target.elements.return.value
        }
      },
      () => this.FlightsAPICallFunction()
    );
  };
  FlightsAPICallFunction() {
    sessionStorage.setItem(
      "FlightDetails",
      JSON.stringify(this.state.flightDetails)
    );
    this.props.history.push("/getFlightData");
  }
  getHotelData = e => {
    e.preventDefault();
    this.setState(
      {
        hotelDetails: {
          city: e.target.elements.city.value,
          adults: e.target.elements.adults.value,
        }
      },
      () => this.HotelAPICallFunction()
    );
  }
  HotelAPICallFunction() {
    sessionStorage.setItem(
      "HotelDetails",
      JSON.stringify(this.state.hotelDetails)
    );
    this.props.history.push("/getHotelData");
  }


  render() {
    return (
      <React.Fragment>
        <div className="image hero-wrap js-fullheight">
          <div className="overlay" />
          <div className="container">
            <div
              className="row no-gutters slider-text js-fullheight align-items-center justify-content-start"
              data-scrollax-parent="true"
            >
              <div
                className="col-md-9 mb-9 pb-9 text-center text-md-left layout"
                data-scrollax=" properties: { translateY: '70%' }"
              >
                <h1
                  className="mb-4"
                  data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"
                >
                  Discover <br />A new Place
                </h1>
                <p data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">
                  Find great places to stay, eat, shop, or visit from local
                  experts
                </p>
              </div>
            </div>
          </div>

          <section className="ftco-section justify-content-end ftco-search layout1">
            <div className="container-wrap ml-auto">
              <div className="row no-gutters">
                <div className="col-md-12 nav-link-wrap">
                  <div
                    className="nav nav-pills justify-content-center text-center"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <a
                      className="nav-link active"
                      id="v-pills-1-tab"
                      data-toggle="pill"
                      href="#v-pills-1"
                      role="tab"
                      aria-controls="v-pills-1"
                      aria-selected="true"
                    >
                      Flight
                    </a>

                    <a
                      className="nav-link"
                      id="v-pills-2-tab"
                      data-toggle="pill"
                      href="#v-pills-2"
                      role="tab"
                      aria-controls="v-pills-2"
                      aria-selected="false"
                    >
                      Hotel
                    </a>

                    {/* <a
                      className="nav-link"
                      id="v-pills-3-tab"
                      data-toggle="pill"
                      href="#v-pills-3"
                      role="tab"
                      aria-controls="v-pills-3"
                      aria-selected="false"
                    >
                      Car Rent
                    </a> */}
                  </div>
                </div>
                <div className="col-md-12 tab-wrap">
                  <div className="tab-content p-4 px-5" id="v-pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="v-pills-1"
                      role="tabpanel"
                      aria-labelledby="v-pills-nextgen-tab"
                    >
                      <form
                        onSubmit={this.getFlightData}
                        className="search-destination" autoComplete="off"
                      >
                        <div className="row">
                          <div className="col-md align-items-end">
                            <div className="form-group">
                              <label htmlFor="from">Origin</label>
                              <div className="form-field">
                                <div className="icon">
                                  <span className="icon-my_location" />
                                </div>
                                <input
                                  type="text"
                                  id="from"
                                  name="origin"
                                  className="form-control c1"
                                  placeholder="From"
                                  list="datalist1" required
                                />
                                <datalist id="datalist1">
                                  <option value="TIA">Tirana Airport, Albania</option>
                                  <option value="EVN">Yerevan Zvartnots Airport, Armenia</option>
                                  <option value="GRZ">Graz Airport, Austria</option>
                                  <option value="ANR">Antwerp Airport, Belgium</option>
                                  <option value="CRL">Charleroi Airport, Belgium</option>
                                  <option value="BOJ">Burgas Airport, Bulgaria	</option>
                                  <option value="DBV">Dubrovnik Airport, Croatia</option>
                                  <option value="BLL">Billund Airport, Denmark</option>
                                  <option value="OUL">Oulu Airport, Finland</option>
                                  <option value="CDG">Paris Charles de Gaulle Airport, France</option>
                                  <option value="LIL">Lille Airport, France</option>
                                  <option value="TXL">Berlin Tegel Airport, Germany</option>
                                  <option value="DUS">Düsseldorf Airport, Germany</option>
                                  <option value="FRA">Frankfurt Airport, Germany</option>
                                  <option value="CGN">Cologne Bonn Airport, Germany</option>
                                  <option value="STR">Stuttgart Airport, Germany</option>
                                  <option value="DUB">Dublin Airport, Ireland</option>
                                  <option value="BLQ">Bologna Airport, Italy</option>
                                  <option value="AMS">Amsterdam Airport Schiphol, Netherlands</option>
                                  <option value="FNC">Madeira Airport, Portugal</option>
                                  <option value="SVX">Koltsovo Airport, Russia</option>
                                  <option value="BCN">Barcelona Airport, Spain</option>
                                  <option value="MAD">Madrid Barajas Airport, Spain</option>
                                  <option value="ARN">Stockholm Arlanda Airport, Sweden</option>
                                  <option value="ISL">Istanbul New Airport, Turkey</option>
                                  <option value="CWL">Cardiff Airport, United Kingdom</option>
                                  <option value="LCY">London City Airport, United Kingdom</option>
                                  <option value="LHR">London Heathrow Airport, United Kingdom</option>
                                </datalist>
                              </div>
                            </div>
                          </div>
                          <div className="col-md align-items-end">
                            <div className="form-group">
                              <label htmlFor="to">Destination</label>
                              <div className="form-field">
                                <div className="icon">
                                  <span className="icon-map-marker" />
                                </div>
                                <input
                                  type="text"
                                  id="to"
                                  name="destination"
                                  className="form-control"
                                  placeholder="To"
                                  list="datalist1" required
                                />

                              </div>
                            </div>
                          </div>
                          <div className="col-md align-items-end">
                            <div className="form-group">
                              <label htmlFor="departureDate">One Way</label>
                              <div className="form-field">
                                <div className="icon icon-date">
                                  <span className="icon-calendar" />
                                </div>
                                <DatePicker
                                  className="form-control"
                                  id="departureDate"
                                  name="departure"
                                  placeholderText="YYYY-MM-DD"
                                  dateFormat="yyy-MM-dd"
                                  selected={this.state.departureDate}
                                  onChange={this.handleChange1}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md align-items-end">
                            <div className="form-group">
                              <label htmlFor="returnDate">Return</label>
                              <div className="form-field">
                                <div className="icon icon-date">
                                  <span className="icon-calendar" />
                                </div>
                                <DatePicker
                                  className="form-control checkout_date"
                                  selected={this.state.returnDate}
                                  onChange={this.handleChange2}
                                  id="returnDate"
                                  name="return"
                                  placeholderText="YYYY-MM-DD"
                                  dateFormat="yyy-MM-dd"
                                />
                              </div>
                            </div>
                          </div>
                          {/* <div className="col-md align-items-end">
                            <div className="form-group">
                              <label htmlFor="total">Travelers</label>
                              <div className="form-field">
                                <div className="select-wrap">
                                  <div className="icon">
                                    <span className="ion-ios-arrow-down" />
                                  </div>
                                  <select
                                    name="total"
                                    id="total"
                                    className="form-control"
                                  >
                                    <option value="">1</option>
                                    <option value="">2</option>
                                    <option value="">3</option>
                                    <option value="">4</option>
                                    <option value="">5</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div> */}
                          <div className="col-md align-self-end">
                            <div className="form-group">
                              <div className="form-field form-search">
                                <input
                                  type="submit"
                                  value="Search"
                                  className="form-control btn btn-primary"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                      {/* {this.state.render && (
                        <Route
                          path="/getFlightData"
                          render={props => <ContainerComponent {...props} />}
                        />
                      )} */}
                    </div>

                    <div
                      className="tab-pane fade"
                      id="v-pills-2"
                      role="tabpanel"
                      aria-labelledby="v-pills-performance-tab"
                    >
                      <form
                        onSubmit={this.getHotelData}
                        className="search-destination"
                      >
                        <div className="row">
                          {/* <div className="col-md align-items-end">
                            <div className="form-group">
                              <label htmlFor="hotelName">Hotel</label>
                              <div className="form-field">
                                <div className="icon">
                                  <span className="icon-map-marker" />
                                </div>
                                <input
                                  type="text"
                                  id="hotelName"
                                  name="hotel"
                                  className="form-control checkin_date"
                                  placeholder="Name"
                                />
                              </div>
                            </div> 
                          </div> */}
                          <div className="col-md align-items-end">
                            <div className="form-group">
                              <label htmlFor="cityName">Country</label>
                              <div className="form-field">
                                <div className="icon">
                                  <span className="icon-map-marker" />
                                </div>
                                <input
                                  type="text"
                                  id="cityName"
                                  name="city"
                                  className="form-control checkout_date"
                                  placeholder="Name"
                                  list="datalist2" required
                                />
                                <datalist id="datalist2">
                                  <option value="BOJ">Bulgaria</option>
                                  <option value="PAR">Paris</option>
                                  <option value="DUS">Düsseldorf</option>
                                  <option value="FRA">Frankfurt</option>
                                  <option value="IRE">Ireland</option>
                                  <option value="POR">Portugal</option>
                                  <option value="BCN">Spain</option>
                                  <option value="LON">London</option>
                                </datalist>
                              </div>
                            </div>
                          </div>
                          <div className="col-md align-items-end">
                            <div className="form-group">
                              <label htmlFor="guests">Number of Guests</label>
                              <div className="form-field">
                                <div className="select-wrap">
                                  <div className="icon">
                                    <span className="ion-ios-arrow-down" />
                                  </div>
                                  <select
                                    name="adults"
                                    id="guests"
                                    className="form-control"
                                  >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md align-self-end">
                            <div className="form-group">
                              <div className="form-field">
                                <input
                                  type="submit"
                                  value="Search"
                                  className="form-control btn btn-primary"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>

                    {/* <div
                      className="tab-pane fade"
                      id="v-pills-3"
                      role="tabpanel"
                      aria-labelledby="v-pills-effect-tab"
                    >
                      <form action="#" className="search-destination">
                        <div className="row">
                          <div className="col-md align-items-end">
                            <div className="form-group">
                              <label htmlFor="#">Where</label>
                              <div className="form-field">
                                <div className="icon">
                                  <span className="icon-map-marker" />
                                </div>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Where"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md align-items-end">
                            <div className="form-group">
                              <label htmlFor="#">Check In</label>
                              <div className="form-field">
                                <div className="icon">
                                  <span className="icon-map-marker" />
                                </div>
                                <input
                                  type="text"
                                  className="form-control checkin_date"
                                  placeholder="Check In"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md align-items-end">
                            <div className="form-group">
                              <label htmlFor="#">Check Out</label>
                              <div className="form-field">
                                <div className="icon">
                                  <span className="icon-map-marker" />
                                </div>
                                <input
                                  type="text"
                                  className="form-control checkout_date"
                                  placeholder="From"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md align-self-end">
                            <div className="form-group">
                              <div className="form-field">
                                <input
                                  type="submit"
                                  value="Search"
                                  className="form-control btn btn-primary"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default DashboardComponent;
