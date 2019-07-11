import React, { Component } from 'react';
import './Hotel.Component.css';
import Amadeus from "amadeus";
import $ from 'jquery';
import StarRatingComponent from 'react-star-rating-component';
const amadeus = new Amadeus({
    clientId: "ms2o7JGsa83kszn2i9SWgC9jySvpxH3F",
    clientSecret: "IPOV2zCofJsAkuLg"
});

class HotelComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Hotels: []
        };
        this.toggle = this.toggle.bind(this);
    }
    componentDidMount() {
        if (!(sessionStorage.getItem("userLoggedin"))) {
            this.props.history.push("/login");
        }
        else {
            // var loader = document.getElementById("loader");
            // loader.className = "fullScreen";
            // loader.firstChild.style.display = "inline-block";
            var hotelData = JSON.parse(sessionStorage.getItem("HotelDetails"));
            const that = this;
            amadeus.shopping.hotelOffers
                .get({
                    cityCode: hotelData.city,
                    adults: hotelData.adults
                })
                .then(function (response) {
                    // loader.className = "";
                    // loader.firstChild.style.display = "none";
                    that.setState({ Hotels: response.data });
                    console.log(that.state.Hotels);
                })
                .catch(function (responseError) {
                    console.log(that.state.Hotels, "error");
                });
        }
    }
    toggle() {
        $('.panel-collapse').on('show.bs.collapse', function () {
            $(this).siblings('.panel-heading').addClass('active');
        });

        $('.panel-collapse').on('hide.bs.collapse', function () {
            $(this).siblings('.panel-heading').removeClass('active');
        });
    }
    submit(data) {
        console.log(data);
        sessionStorage.setItem("SelectedHotel", JSON.stringify(data));
        this.props.history.push('/guestDetails');
    }

    render() {
        return (
            <React.Fragment>
                <div class="wrap">
                    <div class="loading">
                        <div class="bounceball"></div>
                        <div class="text text-uppercase">Fetching Hotel Details</div>
                    </div>
                </div>
                <div className="card-hotel-layout align-hotel">
                    {this.state.Hotels.map((hotelData) => (
                        <div className="card">
                            <div className="card-body content1 row">
                                <div id="imgBlock" className="col-3">
                                    {(hotelData.hotel.media != null || hotelData.hotel.media != undefined) ?
                                        (
                                            <img src={hotelData.hotel.media[0].uri} />
                                        ) : null
                                    }
                                    {/* {hotelData.hotel.media[0].uri}) */}
                                </div>
                                <div className="col-9">
                                    {(hotelData.hotel.rating != null || hotelData.hotel.rating != undefined) ?
                                        (
                                            <div className="row head-layout">
                                                <h3> {hotelData.hotel.name}</h3>
                                                <StarRatingComponent
                                                    name="rate2"
                                                    editing={false}
                                                    renderStarIcon={() => <span>☆</span>}
                                                    starCount={5}
                                                    className="star-float"
                                                    value={hotelData.hotel.rating}
                                                />
                                                <p className="star-float">({hotelData.hotel.rating} stars)</p>
                                            </div>
                                        ) : <div className="row head-layout">
                                            <h3> {hotelData.hotel.name}</h3>
                                        </div>
                                    }
                                    {/* <div className="row head-layout">
                                        {(hotelData.hotel.description != null || hotelData.hotel.description != undefined) ?
                                            (<p><b>Description: </b>{hotelData.hotel.description.text}</p>) : null
                                        }
                                    </div> */}
                                    <div className="row">
                                        {hotelData.offers.map((offer) => (
                                            <div>{(offer.room.typeEstimated != null || offer.room.typeEstimated != undefined) ?
                                                (
                                                    <p className="col-8 align-left">
                                                        <div><b>ROOM TYPE: </b>{offer.room.typeEstimated.category}</div>
                                                        <div><b>BEDS: </b>{offer.room.typeEstimated.beds}</div>
                                                        <div><b>BED TYPE: </b>{offer.room.typeEstimated.bedType}</div>
                                                        <div><b>Description: </b>{offer.room.description.text}</div>
                                                    </p>
                                                ) :
                                                (
                                                    <p className="col-8 align-left">
                                                        <div><b>ROOM TYPE: N/A</b></div>
                                                        <div><b>BEDS: N/A</b></div>
                                                        <div><b>BED TYPE: N/A</b></div>
                                                    </p>
                                                )}

                                                <div className="col-4 align-right">
                                                    <div>{offer.guests.adults} adults</div>
                                                    <i className="fas fa-euro-sign euro-sign"></i>{offer.price.total}
                                                    <p>including taxes and fees</p>
                                                </div>
                                            </div>

                                        ))}
                                    </div>
                                    <div>
                                        {(hotelData.hotel.amenities != null || hotelData.hotel.amenities != undefined) ?
                                            (
                                                <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                                    <div class="panel panel-default">
                                                        <div class="panel-heading active" role="tab" id="headingOne">
                                                            <h4 class="panel-title">
                                                                <a role="button" onClick={this.toggle} data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                    Available amenities </a>
                                                            </h4>
                                                        </div>
                                                        <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                                                            <div class="panel-body">
                                                                <div className="tags">
                                                                    <ul>
                                                                        {hotelData.hotel.amenities.map((tag, i) => (
                                                                            <li key={tag + i} className="tag">
                                                                                {tag}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : null}
                                    </div>

                                    {/* </div> */}
                                    {(hotelData.hotel.contact != null || hotelData.hotel.contact != undefined) ?
                                        (
                                            <p> <b>Contact: </b>{hotelData.hotel.contact.phone}</p>
                                        ) : null
                                    }
                                    <p> <b>Address: </b>
                                        {hotelData.hotel.address.lines},
                                    {hotelData.hotel.address.postalCode},
                                    {hotelData.hotel.address.cityName}</p>
                                    <button type="submit" className="btn btn-primary hotel-btn" onClick={this.submit.bind(this, hotelData)}>SELECT</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </React.Fragment>
        );
    }
}
export default HotelComponent;