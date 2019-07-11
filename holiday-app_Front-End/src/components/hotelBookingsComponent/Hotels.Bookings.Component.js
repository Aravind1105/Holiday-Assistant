import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./Hotels.Bookings.Component.css";
import "react-tabs/style/react-tabs.css";
import Axios from "axios";
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import { api_url } from "../config";
// import $ from 'jquery';

class Cancelled extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    randomNumber() {
        console.log("randim num")
        var chars = "0123456789";
        var string_length = 7;
        var randomstring = '';
        for (var i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        return chars.substring(3, Math.random()) + "-" + randomstring;
    }

    render() {
        return (
            <div>
                {this.props.data.map((hotelData) => (
                    <div className="card">
                        <div className="card-body content1">
                            <div className="row head-layout">
                                <h3> {hotelData.hotelName}</h3>
                            </div>
                            <div className="row r2">
                                <p className="addr col-3"> <i class="fa fa-map-marker" aria-hidden="true"></i>
                                    {hotelData.address.addressLine},
                                    {hotelData.address.postalCode},
                                    {hotelData.address.countryCode}</p>

                                <p className="col-2"><i class="fas fa-user"></i>{hotelData.noOfGuests} adults</p>
                                <p> <i className="fas fa-euro-sign euro-sign"></i>{hotelData.totalPrice} including taxes and fees</p>

                            </div>

                            <div className="row">

                                <p className="col-6">
                                    <span className="mx-3"><b>CATEGORY: </b>{hotelData.category.roomCategory}</span>
                                    <span className="mx-3"><i class="fa fa-bed"></i>: {hotelData.category.beds}</span>
                                    <span className="mx-3"><b>BED TYPE: </b>{hotelData.category.bedType}</span>

                                </p>
                                <p className="col-7"><b>Description: </b>{hotelData.description}</p>
                            </div>
                            <div className="fltTravlrinfoCrd">
                                <ul className="fltTravlrinfoCrd__lst">
                                    <li className="font12 latoBold greyText fltTravlrinfoCrd__headItm">
                                        <div className="fltTravlrinfoCrd__prsonIcon"></div>
                                        <div className="fltTravlrinfoCrd__nameAgeGendr">TRAVELLER</div>
                                        {/* <div className="fltTravlrinfoCrd__pnr">PNR</div> */}
                                        <div className="fltTravlrinfoCrd__eTicket">E-TICKET NO.</div>
                                        {/* <div className="fltTravlrinfoCrd__seat">SEAT</div> */}
                                        <div className="fltTravlrinfoCrd__meal">MEAL</div>
                                    </li>
                                </ul>
                            </div>
                            {hotelData.guestDetails.map((pgr) => (
                                <ul>
                                    <li className="font14 latoBold fltTravlrinfoCrd__bodyItm ">
                                        <div className="fltTravlrinfoCrd__bodyItmRow  ">
                                            <div className="fltTravlrinfoCrd__prsonIcon">
                                                <span className="cm__myTripSprt appendRight10 cm__myTripSprt--male"></span>
                                            </div>
                                            <div className="fltTravlrinfoCrd__nameAgeGendr ">
                                                <span className="blackText latoBlack">{pgr.firstName} {pgr.lastName}</span>
                                            </div>
                                            {/* <div className="fltTravlrinfoCrd__pnr ">{this.randomString}</div> */}
                                            <div className="fltTravlrinfoCrd__eTicket ">{this.randomNumber()}</div>
                                            <div className="fltTravlrinfoCrd__meal">(Non Veg)</div>
                                        </div>
                                    </li>
                                </ul>
                            ))}
                        </div>
                    </div>
                    // </div>
                ))}
            </div>
        );
    }
}

class Booked extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    cancel(data) {
        var loader = document.getElementById("loader");
        loader.className = "fullScreen";
        loader.style.display = "inline-block";
        Axios.put(api_url + "/hotelsApi/cancelHotel/" + data.hotelTransactionID)
            .then(res => {
                console.log(res.data);
                loader.className = "";
                loader.style.display = "none";
                ToastsStore.success("Your Hotel booking is Cancelled");
                window.setTimeout(function () {
                    window.location.href = "/dashboard";
                }, 2000);
            })
    }
    randomNumber() {
        console.log("randim num")
        var chars = "0123456789";
        var string_length = 7;
        var randomstring = '';
        for (var i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        return chars.substring(3, Math.random()) + "-" + randomstring;
    }
    render() {
        return (
            <div>
                <div id="loader">
                </div>
                {this.props.data.map((hotelData) => (
                    <div className="card">
                        <div className="card-body content1">
                            <div className="row head-layout">
                                <h3> {hotelData.hotelName}</h3>
                                <button type="submit" className="btn btn-primary htl-btn" onClick={this.cancel.bind(this, hotelData)}>CANCEL TICKET</button>

                            </div>
                            <div className="row r2">
                                <p className="addr col-3"> <i class="fa fa-map-marker" aria-hidden="true"></i>
                                    {hotelData.address.addressLine},
                                    {hotelData.address.postalCode},
                                    {hotelData.address.countryCode}</p>

                                <p className="col-2"><i class="fas fa-user"></i>{hotelData.noOfGuests} adults</p>
                                <p> <i className="fas fa-euro-sign euro-sign"></i>{hotelData.totalPrice} including taxes and fees</p>

                            </div>

                            <div className="row">

                                <p className="col-6">
                                    <span className="mx-3"><b>CATEGORY: </b>{hotelData.category.roomCategory}</span>
                                    <span className="mx-3"><i class="fa fa-bed"></i>: {hotelData.category.beds}</span>
                                    <span className="mx-3"><b>BED TYPE: </b>{hotelData.category.bedType}</span>

                                </p>

                                <p className="col-7"><b>Description: </b>{hotelData.description}</p>
                            </div>
                            <div className="fltTravlrinfoCrd">
                                <ul className="fltTravlrinfoCrd__lst">
                                    <li className="font12 latoBold greyText fltTravlrinfoCrd__headItm">
                                        <div className="fltTravlrinfoCrd__prsonIcon"></div>
                                        <div className="fltTravlrinfoCrd__nameAgeGendr">TRAVELLER</div>
                                        {/* <div className="fltTravlrinfoCrd__pnr">PNR</div> */}
                                        <div className="fltTravlrinfoCrd__eTicket">E-TICKET NO.</div>
                                        {/* <div className="fltTravlrinfoCrd__seat">SEAT</div> */}
                                        <div className="fltTravlrinfoCrd__meal">MEAL</div>
                                    </li>
                                </ul>
                            </div>
                            {hotelData.guestDetails.map((pgr) => (
                                <ul>
                                    <li className="font14 latoBold fltTravlrinfoCrd__bodyItm ">
                                        <div className="fltTravlrinfoCrd__bodyItmRow  ">
                                            <div className="fltTravlrinfoCrd__prsonIcon">
                                                <span className="cm__myTripSprt appendRight10 cm__myTripSprt--male"></span>
                                            </div>
                                            <div className="fltTravlrinfoCrd__nameAgeGendr ">
                                                <span className="blackText latoBlack">{pgr.firstName} {pgr.lastName}</span>
                                            </div>
                                            {/* <div className="fltTravlrinfoCrd__pnr ">{this.randomString}</div> */}
                                            <div className="fltTravlrinfoCrd__eTicket ">{this.randomNumber()}</div>
                                            <div className="fltTravlrinfoCrd__meal">(Non Veg)</div>
                                        </div>
                                    </li>
                                </ul>
                            ))}
                        </div>
                    </div>
                    // </div>
                ))}
            </div>
        );
    }
}

class HotelBooking extends Component {
    hotelsBooked = [
        // {
        //     "hotelTransactionID": 0,
        //     "userID": 0,
        //     "hotelName": "HOLIDAY INN PARIS-NOTRE DAME",
        //     "cityName": "PARIS",
        //     "mobileNo": "9876543210",
        //     "email": "mano@gmail.com",
        //     "description": "1000 BONUS POINTS NT INCLUDES ROOM AND 1000\n1 BED SUITE WITH SOFA BED NONSMOKING FEEL AT\nHOME IN THIS SUITE DESIGNED LIKE A SMALL COZY",
        //     "basePrice": "484.00",
        //     "totalPrice": "484.00",
        //     "noOfGuests": 2,
        //     "bookingStatus": "BOOKED",
        //     "address": {
        //         "addressLine": "4 RUE DANTON",
        //         "postalCode": "75006",
        //         "countryCode": "FR"
        //     },
        //     "category": {
        //         "roomCategory": "SUITE",
        //         "beds": 2,
        //         "bedType": "KING"
        //     },
        //     "guestDetails": [
        //         {
        //             "guessDetailsID": 0,
        //             "firstName": "Aravind",
        //             "lastName": "Mano",
        //             "age": 25,
        //             "nationality": "Indian"
        //         }
        //     ]
        // }
    ];
    hotelsCancelled = [];
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0
        };
    }
    componentDidMount() {
        if (!(sessionStorage.getItem("userLoggedin"))) {
            this.props.history.push("/login");
        }
        else {
            var userData = JSON.parse(sessionStorage.getItem("userData"));
            Axios.get(api_url + "/hotelsApi/getUserHotelDetails/" + userData.userID)
                .then((res) => {
                    console.log(res.data)
                    res.data.map(hotels => {
                        if (hotels.bookingStatus === "Booked") {
                            this.hotelsBooked.push(hotels);
                            // this.flightsBooked = flights;
                            // this.setState({ flightsBooked: flights });

                            // that.setState({ flightsBooked: flights }, () =>
                            console.log(this.hotelsBooked)
                            console.log(hotels)
                            // );
                        }
                        else {
                            this.hotelsCancelled.push(hotels)
                            // this.flightsCancelled = flights;
                            // this.setState({ flightsCancelled: flights });
                            console.log(this.hotelsCancelled);
                            // console.log(this.flightsBooked);

                            // that.setState({ flightsCancelled: flights }, () =>
                            //     console.log(that.state.flightsCancelled)
                            // );
                        }
                    });
                });
        }
    }

    render() {
        let greeting = "hello"
        return (
            <div>
                <div className="container">
                    <div className="mx-auto">
                        <div className="card row my-5">
                            <div className="card-body">
                                <div className="myTrp">
                                    <div className="banner_img"></div>
                                    <Tabs
                                        className="allTabs"
                                        selectedIndex={this.state.tabIndex}
                                        onSelect={tabIndex => this.setState({ tabIndex })}
                                    >
                                        <TabList>
                                            <Tab>BOOKED</Tab>
                                            <Tab>CANCELLED</Tab>
                                        </TabList>

                                        <TabPanel>
                                            <div className="container req">
                                                <Booked data={this.hotelsBooked} />
                                            </div>
                                        </TabPanel>
                                        <TabPanel>
                                            <div className="container req">
                                                <Cancelled data={this.hotelsCancelled} />
                                            </div>
                                        </TabPanel>
                                    </Tabs>
                                    <ToastsContainer position={ToastsContainerPosition.BOTTOM_CENTER} store={ToastsStore} />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default HotelBooking;