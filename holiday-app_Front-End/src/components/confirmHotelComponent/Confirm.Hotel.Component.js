import React, { Component } from 'react';
import "./Confirm.Hotel.Component.css";
import Axios from 'axios';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import { api_url } from '../config';

class ConfirmHotel extends Component {
    temp = [];
    temp1 = [];
    guestDetails = {
        "guessDetailsID": 0,
        "firstName": "",
        "lastName": "",
        "age": 0,
        "nationality": ""
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
        var userDetails = JSON.parse(sessionStorage.getItem("HotelGuestDetails"));
        var HotelDetails = JSON.parse(sessionStorage.getItem("SelectedHotel"));
        console.log(HotelDetails.hotel.address.postalCode);


        for (var i = 0; i < userDetails.length; i++) {
            this.guestDetails = new Object();
            this.guestDetails.guestDetailsID = 0
            this.guestDetails.firstName = userDetails[i].firstName
            this.guestDetails.lastName = userDetails[i].lastName
            this.guestDetails.age = parseInt(userDetails[i].age);
            this.guestDetails.nationality = userDetails[i].nationality
            this.temp1.push(this.guestDetails);

        }
        console.log("consolde array", this.temp);

        Axios.post(api_url + "/hotelsApi/bookHotel",
            {
                "hotelTransactionID": 0,
                "userID": userData.userID,
                "hotelName": HotelDetails.hotel.name,
                "cityName": HotelDetails.hotel.address.cityName,
                "mobileNo": e.target.elements.mobNo.value,
                "email": e.target.elements.userEmail.value,
                "description": HotelDetails.offers[0].room.description.text,
                "basePrice": HotelDetails.offers[0].price.base,
                "totalPrice": HotelDetails.offers[0].price.total,
                "noOfGuests": parseInt(HotelDetails.offers[0].guests.adults),
                "bookingStatus": "Booked",
                "address": {
                    "addressLine": HotelDetails.hotel.address.lines[0],
                    "postalCode": HotelDetails.hotel.address.postalCode,
                    "countryCode": HotelDetails.hotel.address.countryCode
                },
                "category": {
                    "roomCategory": HotelDetails.offers[0].room.typeEstimated.category,
                    "beds": 0,
                    "bedType": HotelDetails.offers[0].room.typeEstimated.bedType
                },
                "guestDetails": this.temp1
            }
        )
            .then(res => {
                ToastsStore.success("Your Hotel is Booked");
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
                                    <p className="my-3">Your ticket and hotel information will be sent here.</p>
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

export default ConfirmHotel;