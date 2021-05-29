import { useState } from "react";
import { CookiesHelper } from "../common/CookiesHelper";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

const cookieService = CookiesHelper();
const Home = ({}) => {
  const history = useHistory();
  const { addToast } = useToasts();

  const [editToggle, setEditToggle] = useState(false);

  const [currentMember, setCurrentMember] = useState(
    cookieService.readCookie("activeUserDetail")
  );

  const [nameError, setNameError] = useState({});
  const [emailError, setEmailError] = useState({});
  const [contactError, setContactError] = useState({});
  const [countryError, setCountryError] = useState({});
  const [stateError, setStateError] = useState({});
  const [addressError, setAddressError] = useState({});
  const [panError, setPanError] = useState({});
  const [dobError, setDOBError] = useState({});
  const [passwordError, setPasswordError] = useState({});

  const {
    memberName,
    memberEmail,
    // contact,
    country,
    state,
    address,
    pan,
    birthdate,
    // id,
    password,
  } = currentMember;

  const updateMember = () => {
    let ifFormValid = formValidation();
    if (ifFormValid === true) {
      setEditToggle(false);

      const inputBody = { member: currentMember };
      axios.put(
        "http://localhost:5555/member-service/member/update/" +
          currentMember.id,
        inputBody
      );
      cookieService.createCookie("activeUserDetail", currentMember);
      addToast(`Member updated Successfully : ${currentMember.id}`, {
        appearance: "success",
      });
      history.push("/home");
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

  const formValidation = () => {
    const nameError = {};
    const emailError = {};
    // const contactError = {};
    const panError = {};
    const countryError = {};
    const stateError = {};
    const dobError = {};
    const addressError = {};
    const passwordError = {};

    let isValid = true;

    if (currentMember.memberName.trim().length === 0) {
      nameError.nameRequired = "Name is required";
      isValid = false;
    }
    if (currentMember.memberName.match(/^[A-Z]+$/)) {
      nameError.formatCapital = "Name should be in capital letters";
      isValid = false;
    }

    if (currentMember.memberEmail === "") {
      emailError.emptyEmail = "Email is required";
      isValid = false;
    }

    if (currentMember.password === "") {
      passwordError.passwordRequired = "Password is required";
      isValid = false;
    }
    if (
      currentMember.memberEmail !== "" &&
      ValidateEmail(currentMember.memberEmail) === false
    ) {
      emailError.validEmail = "Please enter a valid email address";
      isValid = false;
    }

    if (!currentMember.pan.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}/)) {
      panError.formatError = " Please enter Valid PAN !";
      isValid = false;
    }

    // if (!currentMember.contact.match(/^\d{10}$/)) {
    //   contactError.lengthError = "Phone Number Must be 10 Digit !!";
    //   isValid = false;
    // }
    if (currentMember.country === "") {
      countryError.countryRequired = "Country is required";
      isValid = false;
    }
    if (currentMember.state === "") {
      stateError.stateRequired = "State is required";
      isValid = false;
    }
    if (currentMember.address === "") {
      addressError.addressRequired = "Address is required";
      isValid = false;
    }
    if (currentMember.birthdate === "") {
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
    setPasswordError(passwordError);

    return isValid;
  };

  const selectCountry = (input) => {
    setCurrentMember({ ...currentMember, country: input });
  };
  const selectState = (input) => {
    setCurrentMember({ ...currentMember, state: input });
  };

  const onInputChange = (e) => {
    setCurrentMember({ ...currentMember, [e.target.name]: e.target.value });
  };
  return (
    <div className="container  bg-light mt-5">
      <h2 className="text-center">
        {editToggle ? "Edit Profile" : "User Profile"}
      </h2>
      <div className="row">
        <div className="col-6">
          <label>Name:</label>
          <input
            className="form-control"
            disabled={true}
            value={memberName}
            name="memberName"
            onChange={onInputChange}
          />
        </div>
        <div className="col-6">
          <label>Email:</label>
          <input
            className="form-control"
            disabled={!editToggle}
            value={memberEmail}
            name="memberEmail"
            onChange={onInputChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <label>Country:</label>
          <CountryDropdown
            className="form-control"
            name="country"
            value={country}
            disabled={!editToggle}
            onChange={selectCountry}
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
            disabled={!editToggle}
            value={state}
            name="state"
            onChange={selectState}
          />
          {editToggle === true &&
            Object.keys(stateError).map((key) => {
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
          <label>DOB:</label>
          <input
            className="form-control"
            disabled={!editToggle}
            value={birthdate}
            name="birthdate"
            onChange={onInputChange}
          />
          {editToggle === true &&
            Object.keys(dobError).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>
                  {dobError[key]}
                </div>
              );
            })}
        </div>
        <div className="col-6">
          <label>PAN:</label>
          <input
            className="form-control"
            disabled={!editToggle}
            value={pan}
            name="pan"
            onChange={onInputChange}
          />
          {editToggle === true &&
            Object.keys(panError).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>
                  {panError[key]}
                </div>
              );
            })}
        </div>
      </div>
      <div className="row" hidden={!editToggle}>
        <div className="col-6">
          <label>Password:</label>
          <input
            className="form-control"
            disabled={!editToggle}
            value={password}
            name="password"
            onChange={onInputChange}
          />
          {editToggle === true &&
            Object.keys(passwordError).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>
                  {passwordError[key]}
                </div>
              );
            })}
        </div>
        <div className="col-6">
          <label>Address:</label>
          <input
            className="form-control"
            disabled={!editToggle}
            value={address}
            name="address"
            onChange={onInputChange}
          />
          {editToggle === true &&
            Object.keys(addressError).map((key) => {
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
          <button
            className={
              "btn btn-" +
              (editToggle ? "secondary" : "primary") +
              "  btn-submit"
            }
            disabled={editToggle}
            onClick={() => setEditToggle(true)}
          >
            Edit
          </button>
        </div>
        <div className="col-3">
          <button
            className={
              "btn btn-" +
              (editToggle ? "primary" : "secondary") +
              "  btn-submit"
            }
            disabled={!editToggle}
            onClick={() => {
              updateMember();
              // setEditToggle(false);
            }}
          >
            Save
          </button>
        </div>
        <div className="col-3">
          <button
            className={
              "btn btn-" +
              (editToggle ? "primary" : "secondary") +
              "  btn-submit"
            }
            disabled={!editToggle}
            onClick={() => {
              setEditToggle(false);
              window.location.reload();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
