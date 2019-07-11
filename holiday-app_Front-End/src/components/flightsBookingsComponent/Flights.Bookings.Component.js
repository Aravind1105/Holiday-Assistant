import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./Flights.Bookings.Component.css";
import "react-tabs/style/react-tabs.css";
import Axios from "axios";
import { ListGroupItem, Collapse } from 'reactstrap';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import { api_url } from "../config";
var dateFormat = require("dateformat");
// const request = require('request');

class Booked extends Component {
    // bookedData= [];

    constructor(props) {
        super(props);
        // console.log(props.data);
        // console.log(this.props.data[0].email)
        this.state = {
            collapse: false
        };
        this.toggle = this.toggle.bind(this);
        // this.init = this.init.bind(this);
    }
    componentDidMount() {

        console.log(this.props.data)
        // this.setState({ bookedData: this.props.data })
        // this.bookedData
        // console.log(this.state.bookedData);
        // console.log(this.props.data.transactionID);
    }
    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }
    randomString() {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var string_length = 4;
        var randomstring = '';
        for (var i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        return randomstring;
    }
    randomSeat() {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var string_length = 2;
        var randomstring = '';
        for (var i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        return randomstring;
    }
    randomNumber() {
        var chars = "0123456789";
        var string_length = 7;
        var randomstring = '';
        for (var i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        return chars.substring(3, Math.random()) + "-" + randomstring;
    }
    cancel(data) {
        var loader = document.getElementById("loader");
        loader.className = "fullScreen";
        loader.style.display = "inline-block";
        Axios.put(api_url + "/flightsApi/cancelTicket/" + data.transactionID)
            .then(res => {
                console.log(res.data);
                loader.className = "";
                loader.style.display = "none";
                ToastsStore.success("Your Flight ticket is Cancelled");
                window.setTimeout(function () {
                    window.location.href = "/dashboard";
                }, 2000);
            })
    }
    render() {
        return (

            <React.Fragment>
                <div id="loader">
                    {/* <div class="wrap">
                        <div class="loading">
                            <div class="bounceball"></div>
                            <div class="text text-uppercase">Fetching Flight Details</div>
                        </div>
                    </div> */}
                </div>
                <div className="container">
                    <div className="mx-auto">
                        <div className="card row my-5">
                            <div className="card-body">
                                {/* {this.props.data.email} */}
                                {this.props.data.map((data) => (
                                    <div>
                                        <ListGroupItem>
                                            <div>
                                                <p onClick={this.toggle}>
                                                    <strong className="pad">Your Booking ID: {data.transactionID}</strong>
                                                    <span class="cm__myTripSprt cm__myTripSprt--downArrowCircle myTrpFltInfSumryCrd__hadIcon"></span>
                                                </p>
                                                {data.flightDetails.map((details, idx) => (
                                                    <div >

                                                        <Collapse isOpen={this.state.collapse} key={idx}>
                                                            <div class="makeFlex flex" >
                                                                <div class="myTrpFltInfSumryCrd__fltPlacDtalBlok">
                                                                    <div class="font16 latoBlack blackText city">{details.departureCity}<span class="latoBold"></span></div>
                                                                    <div class="appendTop5">
                                                                        <div class="makeFlex end">
                                                                            {/* <div class="myTrpFltInfSumryCrd__oddTimeIndicatScton">
                                                                <span class="cm__myTripSprt cm__myTripSprt--redEye  myTrpFltInfSumryCrd__oddTimeIcon"></span>
                                                                <p class="font14 greyText latoRegular tooltipCompt  ">Red Eye Flight - Departs late in the night</p>
                                                            </div> */}
                                                                            <span class="font18 latoBlack blackText">{dateFormat(details.departureTime, "shortTime")}</span>
                                                                            <div class="font16 latoBold ">, {dateFormat(details.departureTime, "isoDate")}</div>
                                                                        </div>
                                                                        <div class="font14 myTrpFltInfSumryCrd__airportInfo">
                                                                            <div>
                                                                                <span>Terminal: 2</span>
                                                                                {/* <a class="blueText appendLeft10 latoBold" target="_blank" href="https://www.google.com/maps/search/?api=1&amp;query=13.1979,77.706299">View Location</a> */}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="myTrpFltInfSumryCrd__sgmntDuratnContanr">
                                                                    <div class="cm__myTripSprt cm__myTripSprt--flightSmallGreen"></div>
                                                                    <div class="cm__travelLine myTrpFltInfSumryCrd__travelLine"></div>
                                                                    <div class="font14 latoBold appendTop10">{details.duration}</div>
                                                                    <div class="font14 appendTop10 code"><p>Code: {details.aircraftCode}</p></div>

                                                                </div>
                                                                <div class="myTrpFltInfSumryCrd__fltPlacDtalBlok">
                                                                    <div class="font16 latoBlack blackText">{details.arrivalCity}<span class="latoBold"></span></div>
                                                                    <div class="appendTop5">
                                                                        <div class="makeFlex end">
                                                                            <span class="font18 latoBlack blackText">{dateFormat(details.arrivalTime, "shortTime")}</span>
                                                                            <span class="font16 latoBold ">, {dateFormat(details.arrivalTime, "isoDate")}</span>
                                                                        </div>
                                                                        <div class="font14 myTrpFltInfSumryCrd__airportInfo">
                                                                            <div>
                                                                                <span>Terminal: 6</span>
                                                                                {/* <a class="blueText appendLeft10 latoBold" target="_blank" href="https://www.google.com/maps/search/?api=1&amp;query=13.1979,77.706299">View Location</a> */}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="font14 latoBold greyText  myTrpFltInfSumryCrd__sumryInfoCntanr fltTravlrinfoCrd">
                                                                <ul class="myTrpFltInfSumryCrd__sumryInfoLst">
                                                                    <li class="myTrpFltInfSumryCrd__sumryInfoItm ">
                                                                        <span class="cm__myTripSprt cm__myTripSprt--premiumEconomy myTrpFltInfSumryCrd__sumryInfoItmIcon"></span>
                                                                        <span class="myTrpFltInfSumryCrd__sumryInfoItmTxt">Economy</span>
                                                                    </li>
                                                                    <li class="myTrpFltInfSumryCrd__sumryInfoItm cursorPointer">
                                                                        <span class="cm__myTripSprt cm__myTripSprt--luggageGrey myTrpFltInfSumryCrd__sumryInfoItmIcon"></span>
                                                                        <span class="myTrpFltInfSumryCrd__sumryInfoItmTxt">Check In - <span class="redText">Details Not Available</span></span>
                                                                        <p class="font14 greyText latoRegular tooltipCompt tooltipCompt--centerAlign tooltipCompt--tranglPosLft100">Sorry, We could not fetch the details of the included baggage. Please contact the airline for exact baggage inclusions.</p>
                                                                    </li>
                                                                    <li class="myTrpFltInfSumryCrd__sumryInfoItm ">
                                                                        <span class="cm__myTripSprt cm__myTripSprt--carryOn myTrpFltInfSumryCrd__sumryInfoItmIcon"></span>
                                                                        <span class="myTrpFltInfSumryCrd__sumryInfoItmTxt">Carry On - 7 Kgs per adult</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </Collapse>
                                                    </div>
                                                ))}
                                            </div>
                                        </ListGroupItem>
                                        <Collapse isOpen={this.state.collapse}>
                                            <div className="fltTravlrinfoCrd">
                                                <ul className="fltTravlrinfoCrd__lst">
                                                    <li className="font12 latoBold greyText fltTravlrinfoCrd__headItm">
                                                        <div className="fltTravlrinfoCrd__prsonIcon"></div>
                                                        <div className="fltTravlrinfoCrd__nameAgeGendr">TRAVELLER</div>
                                                        <div className="fltTravlrinfoCrd__pnr">PNR</div>
                                                        <div className="fltTravlrinfoCrd__eTicket">E-TICKET NO.</div>
                                                        <div className="fltTravlrinfoCrd__seat">SEAT</div>
                                                        <div className="fltTravlrinfoCrd__meal">MEAL</div>
                                                    </li>
                                                </ul>
                                            </div>
                                            {data.passengerDetails.map((pgr) => (
                                                <ul>
                                                    <li className="font14 latoBold fltTravlrinfoCrd__bodyItm ">
                                                        <div className="fltTravlrinfoCrd__bodyItmRow  ">
                                                            <div className="fltTravlrinfoCrd__prsonIcon">
                                                                <span className="cm__myTripSprt appendRight10 cm__myTripSprt--male"></span>
                                                            </div>
                                                            <div className="fltTravlrinfoCrd__nameAgeGendr ">
                                                                <span className="blackText latoBlack">{pgr.firstName} {pgr.lastName}</span>
                                                                <span className="latoRegular sCaptext"> adult , Male</span>
                                                            </div>
                                                            <div className="fltTravlrinfoCrd__pnr ">{this.randomString()}</div>
                                                            <div className="fltTravlrinfoCrd__eTicket ">{this.randomNumber()}</div>
                                                            <div className="fltTravlrinfoCrd__seat fltTravlrinfoCrd__bodyItmDetailItem">{this.randomSeat()}</div>
                                                            <div className="fltTravlrinfoCrd__meal">(Non Veg)</div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            ))}
                                            <button className="btn btn-primary" onClick={this.cancel.bind(this, data)}>CANCEL TICKET</button>
                                        </Collapse>
                                        {/* </div>
                                            </ListGroupItem>
                                        </div> */}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
class Cancelled extends Component {
    constructor(props) {
        super(props);
        console.log(props.data);
        this.state = {
            cancelledData: [],
            collapse: false
        };
        this.toggle = this.toggle.bind(this);
        // this.init = this.init.bind(this);
    }
    componentDidMount() {
        this.setState({ cancelledData: this.props.data })
        // this.cancelledData = this.props.data;
        console.log(this.props.data);
        console.log(this.state.cancelledData);
    }
    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }
    randomString() {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var string_length = 4;
        var randomstring = '';
        for (var i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        return randomstring;
    }
    randomSeat() {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var string_length = 2;
        var randomstring = '';
        for (var i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        return randomstring;
    }
    randomNumber() {
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
            <React.Fragment>
                <div id="loader">
                </div>
                <div className="container">
                    <div className="mx-auto">
                        <div className="card row my-5">
                            <div className="card-body">
                                {this.state.cancelledData.map((data) => (
                                    <div>
                                        <ListGroupItem>
                                            <div>
                                                <p onClick={this.toggle}>
                                                    <strong className="pad">Your Booking ID: {data.transactionID}</strong>
                                                    <span class="cm__myTripSprt cm__myTripSprt--downArrowCircle myTrpFltInfSumryCrd__hadIcon"></span>
                                                </p>
                                                {data.flightDetails.map((details, idx) => (
                                                    <div >

                                                        <Collapse isOpen={this.state.collapse} key={idx}>
                                                            <div class="makeFlex flex" >
                                                                <div class="myTrpFltInfSumryCrd__fltPlacDtalBlok">
                                                                    <div class="font16 latoBlack blackText city">{details.departureCity}<span class="latoBold"></span></div>
                                                                    <div class="appendTop5">
                                                                        <div class="makeFlex end">
                                                                            {/* <div class="myTrpFltInfSumryCrd__oddTimeIndicatScton">
                                                                <span class="cm__myTripSprt cm__myTripSprt--redEye  myTrpFltInfSumryCrd__oddTimeIcon"></span>
                                                                <p class="font14 greyText latoRegular tooltipCompt  ">Red Eye Flight - Departs late in the night</p>
                                                            </div> */}
                                                                            <span class="font18 latoBlack blackText">{dateFormat(details.departureTime, "shortTime")}</span>
                                                                            <div class="font16 latoBold ">, {dateFormat(details.departureTime, "isoDate")}</div>
                                                                        </div>
                                                                        <div class="font14 myTrpFltInfSumryCrd__airportInfo">
                                                                            <div>
                                                                                <span>Terminal: 7</span>
                                                                                {/* <a class="blueText appendLeft10 latoBold" target="_blank" href="https://www.google.com/maps/search/?api=1&amp;query=13.1979,77.706299">View Location</a> */}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="myTrpFltInfSumryCrd__sgmntDuratnContanr">
                                                                    <div class="cm__myTripSprt cm__myTripSprt--flightSmallGreen"></div>
                                                                    <div class="cm__travelLine myTrpFltInfSumryCrd__travelLine"></div>
                                                                    <div class="font14 latoBold appendTop10">{details.duration}</div>
                                                                    <div class="font14 appendTop10 code"><p>Code: {details.aircraftCode}</p></div>

                                                                </div>
                                                                <div class="myTrpFltInfSumryCrd__fltPlacDtalBlok">
                                                                    <div class="font16 latoBlack blackText">{details.arrivalCity}<span class="latoBold"></span></div>
                                                                    <div class="appendTop5">
                                                                        <div class="makeFlex end">
                                                                            <span class="font18 latoBlack blackText">{dateFormat(details.arrivalTime, "shortTime")}</span>
                                                                            <span class="font16 latoBold ">, {dateFormat(details.arrivalTime, "isoDate")}</span>
                                                                        </div>
                                                                        <div class="font14 myTrpFltInfSumryCrd__airportInfo">
                                                                            <div>
                                                                                <span>Terminal: 4</span>
                                                                                {/* <a class="blueText appendLeft10 latoBold" target="_blank" href="https://www.google.com/maps/search/?api=1&amp;query=13.1979,77.706299">View Location</a> */}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="font14 latoBold greyText  myTrpFltInfSumryCrd__sumryInfoCntanr fltTravlrinfoCrd">
                                                                <ul class="myTrpFltInfSumryCrd__sumryInfoLst">
                                                                    <li class="myTrpFltInfSumryCrd__sumryInfoItm ">
                                                                        <span class="cm__myTripSprt cm__myTripSprt--premiumEconomy myTrpFltInfSumryCrd__sumryInfoItmIcon"></span>
                                                                        <span class="myTrpFltInfSumryCrd__sumryInfoItmTxt">Economy</span>
                                                                    </li>
                                                                    <li class="myTrpFltInfSumryCrd__sumryInfoItm cursorPointer">
                                                                        <span class="cm__myTripSprt cm__myTripSprt--luggageGrey myTrpFltInfSumryCrd__sumryInfoItmIcon"></span>
                                                                        <span class="myTrpFltInfSumryCrd__sumryInfoItmTxt">Check In - <span class="redText">Details Not Available</span></span>
                                                                        <p class="font14 greyText latoRegular tooltipCompt tooltipCompt--centerAlign tooltipCompt--tranglPosLft100">Sorry, We could not fetch the details of the included baggage. Please contact the airline for exact baggage inclusions.</p>
                                                                    </li>
                                                                    <li class="myTrpFltInfSumryCrd__sumryInfoItm ">
                                                                        <span class="cm__myTripSprt cm__myTripSprt--carryOn myTrpFltInfSumryCrd__sumryInfoItmIcon"></span>
                                                                        <span class="myTrpFltInfSumryCrd__sumryInfoItmTxt">Carry On - 7 Kgs per adult</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </Collapse>
                                                    </div>
                                                ))}
                                            </div>
                                        </ListGroupItem>
                                        <Collapse isOpen={this.state.collapse}>
                                            <div className="fltTravlrinfoCrd">
                                                <ul className="fltTravlrinfoCrd__lst">
                                                    <li className="font12 latoBold greyText fltTravlrinfoCrd__headItm">
                                                        <div className="fltTravlrinfoCrd__prsonIcon"></div>
                                                        <div className="fltTravlrinfoCrd__nameAgeGendr">TRAVELLER</div>
                                                        <div className="fltTravlrinfoCrd__pnr">PNR</div>
                                                        <div className="fltTravlrinfoCrd__eTicket">E-TICKET NO.</div>
                                                        <div className="fltTravlrinfoCrd__seat">SEAT</div>
                                                        <div className="fltTravlrinfoCrd__meal">MEAL</div>
                                                    </li>
                                                </ul>
                                            </div>
                                            {data.passengerDetails.map((pgr) => (
                                                <ul>
                                                    <li className="font14 latoBold fltTravlrinfoCrd__bodyItm ">
                                                        <div className="fltTravlrinfoCrd__bodyItmRow  ">
                                                            <div className="fltTravlrinfoCrd__prsonIcon">
                                                                <span className="cm__myTripSprt appendRight10 cm__myTripSprt--male"></span>
                                                            </div>
                                                            <div className="fltTravlrinfoCrd__nameAgeGendr ">
                                                                <span className="blackText latoBlack">{pgr.firstName} {pgr.lastName}</span>
                                                                {/* <span className="latoRegular sCaptext"> adult , Male</span> */}
                                                            </div>
                                                            <div className="fltTravlrinfoCrd__pnr ">{this.randomString()}</div>
                                                            <div className="fltTravlrinfoCrd__eTicket ">{this.randomNumber()}</div>
                                                            <div className="fltTravlrinfoCrd__seat fltTravlrinfoCrd__bodyItmDetailItem">{this.randomSeat()}</div>
                                                            <div className="fltTravlrinfoCrd__meal">(Non Veg)</div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            ))}
                                        </Collapse>
                                        {/* </div>
                                            </ListGroupItem>
                                        </div> */}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

class FlightsBooking extends Component {
    flightsBooked = [
        // {
        //     "transactionID": 13,
        //     "userID": 1,
        //     "email": "mano@gmail.com",
        //     "mobileNo": "7845517191",
        //     "ticketStatus": "Booked",
        //     "noOfPersons": 2,
        //     "perTicketPrice": 521,
        //     "totalTicketPrice": 260,
        //     "flightDetails": [
        //         {
        //             "flightDetailsID": 38,
        //             "arrivalCity": "AMS",
        //             "arrivalTime": "2019-06-29T10:20:00+02:00",
        //             "departureCity": "CDG",
        //             "departureTime": "2019-06-29T08:55:00+02:00",
        //             "duration": "0DT1H25M",
        //             "aircraftCode": "73W"
        //         },
        //         {
        //             "flightDetailsID": 39,
        //             "arrivalCity": "DUS",
        //             "arrivalTime": "2019-06-29T11:50:00+02:00",
        //             "departureCity": "AMS",
        //             "departureTime": "2019-06-29T11:00:00+02:00",
        //             "duration": "0DT0H50M",
        //             "aircraftCode": "E90"
        //         },
        //         {
        //             "flightDetailsID": 40,
        //             "arrivalCity": "AMS",
        //             "arrivalTime": "2019-06-30T07:20:00+02:00",
        //             "departureCity": "DUS",
        //             "departureTime": "2019-06-30T06:20:00+02:00",
        //             "duration": "0DT1H0M",
        //             "aircraftCode": "E75"
        //         },
        //         {
        //             "flightDetailsID": 41,
        //             "arrivalCity": "CDG",
        //             "arrivalTime": "2019-06-30T09:25:00+02:00",
        //             "departureCity": "AMS",
        //             "departureTime": "2019-06-30T08:00:00+02:00",
        //             "duration": "0DT1H25M",
        //             "aircraftCode": "73J"
        //         }
        //     ],
        //     "passengerDetails": [
        //         {
        //             "passengerDetailsID": 11,
        //             "firstName": "Aravind",
        //             "lastName": "M",
        //             "age": 23,
        //             "nationality": "Indian",
        //             "passportNo": "M3456"
        //         },
        //         {
        //             "passengerDetailsID": 11,
        //             "firstName": "Aravind",
        //             "lastName": "M",
        //             "age": 23,
        //             "nationality": "Indian",
        //             "passportNo": "M3456"
        //         },
        //         {
        //             "passengerDetailsID": 11,
        //             "firstName": "Aravind",
        //             "lastName": "M",
        //             "age": 23,
        //             "nationality": "Indian",
        //             "passportNo": "M3456"
        //         },
        //         {
        //             "passengerDetailsID": 11,
        //             "firstName": "Aravind",
        //             "lastName": "M",
        //             "age": 23,
        //             "nationality": "Indian",
        //             "passportNo": "M3456"
        //         },
        //         {
        //             "passengerDetailsID": 12,
        //             "firstName": "Mano",
        //             "lastName": "M",
        //             "age": 25,
        //             "nationality": "German",
        //             "passportNo": "N4569"
        //         }
        //     ]
        // }
    ];
    flightsCancelled = [
        // {
        //     "transactionID": 1,
        //     "userID": 1,
        //     "email": "test@email.com",
        //     "mobileNo": "9897076556",
        //     "ticketStatus": "Canceled",
        //     "noOfPersons": 1,
        //     "perTicketPrice": 145,
        //     "totalTicketPrice": 145,
        //     "flightDetails": [
        //         {
        //             "flightDetailsID": 1,
        //             "arrivalCity": "Chennai",
        //             "arrivalTime": "2019-06-31T09:00:00+02:00",
        //             "departureCity": "Paris",
        //             "departureTime": "2019-06-30T08:00:00+02:00",
        //             "duration": "0DT1H25M",
        //             "aircraftCode": "AE-99"
        //         }
        //     ],
        //     "passengerDetails": [
        //         {
        //             "passengerDetailsID": 1,
        //             "firstName": "Sriram",
        //             "lastName": "Murali",
        //             "age": 27,
        //             "nationality": "Indian",
        //             "passportNo": "N4071550"
        //         }
        //     ]
        // }
    ];
    constructor(props) {
        super(props);
        this.state = {
            // flightsCancelled: [],
            // flightsBooked: [],
            tabIndex: 0
        };
    }
    componentDidMount() {
        if (!(sessionStorage.getItem("userLoggedin"))) {
            this.props.history.push("/login");
        }
        else {
            var userData = JSON.parse(sessionStorage.getItem("userData"));
            Axios.get(api_url + "/flightsApi/getUserFlightDetails/" + userData.userID)
                .then((res) => {
                    console.log(res.data)
                    res.data.map(flights => {
                        if (flights.ticketStatus === "Booked") {
                            this.flightsBooked.push(flights);
                            // this.flightsBooked = flights;
                            // this.setState({ flightsBooked: flights });

                            // that.setState({ flightsBooked: flights }, () =>
                            console.log(this.flightsBooked)
                            console.log(flights)
                            // );
                        }
                        else {
                            this.flightsCancelled.push(flights)
                            // this.flightsCancelled = flights;
                            // this.setState({ flightsCancelled: flights });
                            console.log(this.flightsCancelled);
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
                                                <Booked data={this.flightsBooked} />
                                            </div>
                                        </TabPanel>
                                        <TabPanel>
                                            <div className="container req">
                                                <Cancelled data={this.flightsCancelled} />
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

export default FlightsBooking;
