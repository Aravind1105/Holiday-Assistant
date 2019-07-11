import React, { Component } from 'react';
import "./Confirm.Flight.Component.css";
import Axios from 'axios';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import { api_url } from '../config';

class ConfirmFlight extends Component {
    temp = [];
    temp1 = [];
    flightDetails = {
        "flightDetailsID": "",
        "arrivalCity": "",
        "arrivalTime": "",
        "departureCity": "",
        "departureTime": "",
        "duration": "",
        "aircraftCode": ""
    }
    passengerDetails = {
        "passengerDetailsID": 0,
        "firstName": "",
        "lastName": "",
        "age": 0,
        "nationality": "",
        "passportNo": ""
    }
    constructor(props) {
        super(props)
        this.state = {
        }

        this.submit = this.submit.bind(this);
    }
    componentDidMount() {
        if (!(sessionStorage.getItem("userLoggedin"))) {
            this.props.history.push("/login");
        }
    }
    submit(e) {
        e.preventDefault();
        var loader = document.getElementById("loader");
        loader.className = "fullScreen";
        loader.firstChild.style.display = "inline-block";
        var userData = JSON.parse(sessionStorage.getItem("userData"));
        // var passengers = sessionStorage.getItem("Passengers");
        var userDetails = JSON.parse(sessionStorage.getItem("FlightUserDetails"));
        var flightDetails = JSON.parse(sessionStorage.getItem("SelectedFlight"));
        console.log(flightDetails)
        var perTicketPrice = Math.round((parseFloat(flightDetails.offerItems[0].price.total)) * parseFloat(userDetails.length));
        for (var i = 0; i < flightDetails.offerItems[0].services.length; i++) {
            for (var j = 0; j < flightDetails.offerItems[0].services[i].segments.length; j++) {
                this.flightDetails = new Object();
                this.flightDetails.flightDetailsID = 0
                this.flightDetails.arrivalCity = flightDetails.offerItems[0].services[i].segments[j].flightSegment.arrival.iataCode
                this.flightDetails.arrivalTime = flightDetails.offerItems[0].services[i].segments[j].flightSegment.arrival.at
                this.flightDetails.departureCity = flightDetails.offerItems[0].services[i].segments[j].flightSegment.departure.iataCode
                this.flightDetails.departureTime = flightDetails.offerItems[0].services[i].segments[j].flightSegment.departure.at
                this.flightDetails.duration = flightDetails.offerItems[0].services[i].segments[j].flightSegment.duration
                this.flightDetails.aircraftCode = flightDetails.offerItems[0].services[i].segments[j].flightSegment.aircraft.code
                this.temp.push(this.flightDetails);
            }
        }
        for (i = 0; i < userDetails.length; i++) {
            this.passengerDetails = new Object();
            this.passengerDetails.passengerDetailsID = 0
            this.passengerDetails.firstName = userDetails[i].firstName
            this.passengerDetails.lastName = userDetails[i].lastName
            this.passengerDetails.age = parseInt(userDetails[i].age);
            this.passengerDetails.nationality = userDetails[i].nationality
            this.passengerDetails.passportNo = userDetails[i].passportNo
            this.temp1.push(this.passengerDetails);

        }
        console.log(userData);
        console.log(this.temp1);
        console.log(perTicketPrice);
        console.log("consolde array", this.temp);

        Axios.post(api_url + "/flightsApi/bookFlight",
            {
                "transactionID": 0,
                "userID": userData.userID,
                "email": e.target.elements.userEmail.value,
                "mobileNo": e.target.elements.mobNo.value,
                "ticketStatus": "Booked",
                "noOfPersons": userDetails.length,
                "perTicketPrice": perTicketPrice,
                "totalTicketPrice": parseInt(flightDetails.offerItems[0].price.total),
                "flightDetails": this.temp,
                "passengerDetails": this.temp1
            }
        )
            .then(res => {
                ToastsStore.success("Your Flight ticket is Booked");
                loader.className = "";
                loader.firstChild.style.display = "none";
                console.log("POST SUCCESS");
                window.setTimeout(function () {
                    window.location.href = "/dashboard";
                }, 2000);
            })

    }
    render() {
        return (
            <div>
                <div id="loader">
                    <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
                <div className="container c1">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card card-signin my-5 card-lay">
                                <div className="card-body">
                                    <h5 className="card-header text-center">Contact Details</h5>
                                    <p className="my-3">Your ticket and flights information will be sent here.</p>
                                    {/* <h5 className="card-title text-center">Sign In</h5> */}
                                    <form className="form-signin" onSubmit={this.submit}>
                                        <div className="form-label-group">
                                            <input
                                                type="email"
                                                id="email"
                                                name="userEmail"
                                                className="form-control text-center"
                                                placeholder="Email address"
                                                // onChange={this.onChange}
                                                required
                                            />
                                            <label htmlFor="email">Email address</label>
                                        </div>
                                        <div className="form-label-group">
                                            <input
                                                type="text"
                                                id="number"
                                                name="mobNo"
                                                className="form-control text-center"
                                                placeholder="Mobile Number"
                                                onChange={this.onChange}
                                                required
                                            />
                                            <label htmlFor="number">Mobile No</label>
                                        </div>
                                        <button
                                            className="btn btn-lg btn-primary btn-block text-uppercase"
                                            type="submit"

                                        >
                                            SUBMIT
                      </button>
                                        <ToastsContainer position={ToastsContainerPosition.BOTTOM_CENTER} store={ToastsStore} />
                                        <hr className="my-4" />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConfirmFlight;