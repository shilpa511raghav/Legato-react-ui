import { useState } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

const MemberRegistrationForm = () => {
  const history = useHistory();
  const { addToast } = useToasts();
  const [userInput, setUserInput] = useState({
    memberName: "",
    memberEmail: "",
    contact: "",
    country: "",
    state: "",
    address: "",
    pan: "",
    birthdate: "",
    password: "",
  });

  const [nameError, setNameError] = useState({});
  const [emailError, setEmailError] = useState({});
  const [contactError, setContactError] = useState({});
  const [countryError, setCountryError] = useState({});
  const [stateError, setStateError] = useState({});
  const [addressError, setAddressError] = useState({});
  const [panError, setPanError] = useState({});
  const [dobError, setDOBError] = useState({});

  const onInputChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const {
    memberName,
    memberEmail,
    country,
    state,
    address,
    pan,
    contact,
    birthdate,
    password,
  } = userInput;

  const memberFormSubmitHandler = async (event) => {
    event.preventDefault();
    const ifFormValidated = formValidation();
    if (ifFormValidated === true) {
      const inputBody = { member: userInput };
      axios.post("http://localhost:5555/member-service/member/add", inputBody);
      addToast(`Member added successfully : ${userInput.memberName}`, {
        appearance: "success",
      });
      history.push("/");
    }
  };

  function ValidateEmail(mail) {
    if (
      mail !== "" &&
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        mail
      )
    ) {
      return true;
    }
    return false;
  }

  const selectCountry = (input) => {
    setUserInput({ ...userInput, country: input });
  };
  const selectState = (input) => {
    setUserInput({ ...userInput, state: input });
  };

  const formValidation = () => {
    const nameError = {};
    const emailError = {};
    const contactError = {};
    const panError = {};
    const countryError = {};
    const stateError = {};
    const dobError = {};
    const addressError = {};

    let isValid = true;

    if (userInput.memberName.trim().length === 0) {
      nameError.nameRequired = "Name is required";
      isValid = false;
    }
    if (userInput.memberName.match(/^[A-Z]+$/)) {
      nameError.formatCapital = "Name should be in capital letters";
      isValid = false;
    }

    if (userInput.memberEmail === "") {
      emailError.emptyEmail = "Email is required";
      isValid = false;
    }

    if (
      userInput.memberEmail !== "" &&
      ValidateEmail(userInput.memberEmail) === false
    ) {
      emailError.validEmail = "Please enter a valid email address";
      isValid = false;
    }

    if (!userInput.pan.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}/)) {
      panError.formatError = " Please enter Valid PAN !";
      isValid = false;
    }

    if (!userInput.contact.match(/^\d{10}$/)) {
      contactError.lengthError = "Phone Number Must be 10 Digit !!";
      isValid = false;
    }
    if (userInput.country === "") {
      countryError.countryRequired = "Country is required";
      isValid = false;
    }
    if (userInput.state === "") {
      stateError.stateRequired = "State is required";
      isValid = false;
    }
    if (userInput.address === "") {
      addressError.addressRequired = "Address is required";
      isValid = false;
    }
    if (userInput.birthdate === "") {
      dobError.dobRequired = "Birth date is required";
      isValid = false;
    }
    setNameError(nameError);
    setEmailError(emailError);
    setPanError(panError);
    setContactError(contactError);
    setStateError(stateError);
    setCountryError(countryError);
    setAddressError(addressError);
    setDOBError(dobError);

    return isValid;
  };

  return (
    <div className="container bg-light mt-5">
      <h2 className="text-center">Register member</h2>
      <form onSubmit={memberFormSubmitHandler}>
        <div className="row">
          <div className="col-6">
            <label>Name:</label>
            <input
              className="form-control"
              id="memberName"
              name="memberName"
              value={memberName}
              type="text"
              onChange={onInputChange}
            />
            {Object.keys(nameError).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>
                  {nameError[key]}
                </div>
              );
            })}
          </div>
          <div className="col-6">
            <label>Password : </label>
            <input
              className="form-control"
              id="password"
              name="password"
              value={password}
              type="text"
              onChange={onInputChange}
            />
            {Object.keys(addressError).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>
                  {addressError[key]}
                </div>
              );
            })}
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label>Contact Number:</label>
            <input
              className="form-control"
              id="contact"
              name="contact"
              value={contact}
              type="text"
              onChange={onInputChange}
            />
            {Object.keys(contactError).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>
                  {contactError[key]}
                </div>
              );
            })}
          </div>
          <div className="col-6 ">
            <label>PAN Number</label>
            <input
              className="form-control"
              id="pan"
              name="pan"
              value={pan}
              type="text"
              onChange={onInputChange}
            />
            {Object.keys(panError).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>
                  {panError[key]}
                </div>
              );
            })}
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <label>Country:</label>
            <CountryDropdown
              className="form-control"
              value={country}
              onChange={(e) => selectCountry(e)}
            />
            {Object.keys(countryError).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>
                  {countryError[key]}
                </div>
              );
            })}
          </div>
          <div className="col-6">
            <label>State:</label>
            <RegionDropdown
              className="form-control"
              country={country}
              value={state}
              onChange={(e) => selectState(e)}
            />
            {Object.keys(stateError).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>
                  {stateError[key]}
                </div>
              );
            })}
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <label>Date of Birth:</label>
            <input
              className="form-control"
              id="birthdate"
              name="birthdate"
              value={birthdate}
              type="date"
              onChange={onInputChange}
            />
            {Object.keys(dobError).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>
                  {dobError[key]}
                </div>
              );
            })}
          </div>

          <div className="col-6">
            <label>Address : </label>
            <input
              className="form-control"
              id="address"
              name="address"
              value={address}
              type="text"
              onChange={onInputChange}
            />
            {Object.keys(addressError).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>
                  {addressError[key]}
                </div>
              );
            })}
          </div>
        </div>
        <div className="row">
          <div className="col-6 ">
            <label>Email</label>
            <input
              className="form-control"
              id="memberEmail"
              name="memberEmail"
              value={memberEmail}
              type="text"
              onChange={onInputChange}
            />
            {Object.keys(emailError).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>
                  {emailError[key]}
                </div>
              );
            })}
          </div>
          <div className="col-3 submit-button">
            <button className="btn btn-primary  btn-submit" type="submit">
              Submit
            </button>
          </div>
          <div className="col-3 submit-button">
            <button
              className="btn btn-secondary  btn-submit"
              onClick={() => {
                history.push("/");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MemberRegistrationForm;
