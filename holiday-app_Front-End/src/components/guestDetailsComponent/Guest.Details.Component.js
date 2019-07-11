import React, { Component } from 'react';
import './Guest.Details.Component.css';

class GuestDetails extends Component {
    Details = [];
    constructor(props) {
        super(props)
        this.state = {
            pgr: [{
                "firstName": "",
                "lastName": "",
                "age": "",
                "nationality": ""
            }],
        }
        this.next = this.next.bind(this);
        this.add_user = this.add_user.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    add_user() {
        this.setState((prevState) => ({
            pgr: [...prevState.pgr, {
                "firstName": "",
                "lastName": "",
                "age": "",
                "nationality": ""
            }],
        }));
    }

    handleChange(e) {
        e.preventDefault();
        if (["firstName", "lastName", "age", "nationality"].includes(e.target.className)) {
            console.log("IF");
            let pgr = [...this.state.pgr]
            pgr[e.target.dataset.id][e.target.className] = e.target.value
            this.setState({ pgr })
        } else {
            this.setState({ [e.target.name]: e.target.value })
            console.log("ELSE")
        }


    }
    next(e) {
        e.preventDefault();
        console.log(this.state.pgr);
        sessionStorage.setItem("HotelGuestDetails", JSON.stringify(this.state.pgr));
        window.location.href = "/confirmHotel";
    }
    render() {
        let { pgr } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto my-5">
                        <div className="card" >
                            <div className="card-body" id="form-users">
                                <h5 className="card-header text-center">Guest Details</h5>
                                <p className="my-3"><b>IMPORTANT:</b> Enter your name as it is mentioned on your passport or any government approved ID.</p>
                                <form className="form-signin" onSubmit={this.next} onChange={this.handleChange}>
                                    {
                                        pgr.map((val, idx) => {
                                            let fNameId = `fn-${idx}`, lNameId = `ln-${idx}`, ageId = `age-${idx}`, ntId = `nt-${idx}`, ppId = `pp-${idx}`
                                            return (
                                                <div key={idx}>
                                                    <h4>Guest {idx + 1}</h4>
                                                    <div className="form-label-group">
                                                        <input
                                                            style={{ textAlign: 'center' }}
                                                            type="text"
                                                            name={fNameId}
                                                            data-id={idx}
                                                            id={fNameId}
                                                            className="firstName"
                                                            placeholder="First Name"
                                                        />
                                                        <label htmlFor={fNameId}>First Name</label>
                                                    </div>
                                                    <div className="form-label-group">
                                                        <input
                                                            style={{ textAlign: 'center' }}
                                                            type="text"
                                                            name={lNameId}
                                                            data-id={idx}
                                                            id={lNameId}
                                                            className="lastName"
                                                            placeholder="Last Name"
                                                        />
                                                        <label htmlFor={lNameId}>Last Name</label>
                                                    </div>
                                                    <div className="form-label-group">
                                                        <input
                                                            style={{ textAlign: 'center' }}
                                                            type="number"
                                                            name={ageId}
                                                            data-id={idx}
                                                            id={ageId}
                                                            className="age"
                                                            placeholder="Age"
                                                        />
                                                        <label htmlFor={ageId}>Age</label>
                                                    </div>
                                                    <div className="form-label-group">
                                                        <input
                                                            style={{ textAlign: 'center' }}
                                                            type="text"
                                                            name={ntId}
                                                            data-id={idx}
                                                            id={ntId}
                                                            className="nationality"
                                                            placeholder="Nationality"
                                                        />
                                                        <label htmlFor={ntId}>Nationality</label>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    <a onClick={this.add_user}>
                                        <b> + ADD PASSENGER</b>
                                    </a>
                                    <button
                                        className="btn btn-lg btn-secondary btn-block text-uppercase my-3"
                                        type="submit"

                                    >
                                        CONTINUE
                                    </button>
                                </form>
                            </div>
                            <hr className="my-4" id="data" />
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

export default GuestDetails;