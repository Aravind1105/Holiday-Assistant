import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SignInComponent from "./components/signinComponent/SignIn.Component";
import WelcomeComponent from "./components/welcomeComponent/Welcome.Component";
import DashboardComponent from "./components/dashboardComponent/Dashboard.Component";
import Registration from "./components/registrationComponent/Registration.Component";
import ConfirmFlight from "./components/confirmFlightComponent/Confirm.Flight.Component";
import FlightComponent from "./components/flightComponent/Flight.Component";
import HotelComponent from "./components/hotelComponent/Hotel.Component";
import FlightsBooking from "./components/flightsBookingsComponent/Flights.Bookings.Component";
import PassengerDetails from "./components/passengerDetailsComponent/Passenger.Details.Component";
import GuestDetails from "./components/guestDetailsComponent/Guest.Details.Component";
import HotelsBooking from "./components/hotelBookingsComponent/Hotels.Bookings.Component";
import ConfirmHotel from "./components/confirmHotelComponent/Confirm.Hotel.Component";

class Router extends Component {
  state = {};
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/welcome" />
          <Route exact path="/welcome" component={WelcomeComponent} />
          <Route exact path="/registration" component={Registration} />
          <Route path="/login" component={SignInComponent} />
          <Route path="/dashboard" component={DashboardComponent} />
          <Route path="/getFlightData" component={FlightComponent} />
          <Route path="/getHotelData" component={HotelComponent} />
          <Route path="/passengerDetails" component={PassengerDetails} />
          <Route path="/guestDetails" component={GuestDetails} />
          <Route path="/confirmHotel" component={ConfirmHotel} />
          <Route path="/confirmFlight" component={ConfirmFlight} />
          <Route path="/hotelBookings" component={HotelsBooking} />
          <Route path="/flightBookings" component={FlightsBooking} />



        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
