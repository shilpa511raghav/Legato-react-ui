import { useState } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";
import { CookiesHelper } from "../common/CookiesHelper";
import { useToasts } from "react-toast-notifications";

const cookieService = CookiesHelper();
const AddClaim = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const storeactiveUserDetail = cookieService.readCookie("activeUserDetail");

  const submitClaim = () => {
    const claimDetail = {
      ...userInput,
      memberName: activeUserDetail.memberName,
      birthdate: activeUserDetail.birthdate,
    };
    const inputBody = { claim: claimDetail };
    axios.post(`http://localhost:5555/claim-service/claim/add`, inputBody);
    setTimeout(function () {
      addToast(`Claim added Successfully : ${claimDetail.provider}`, {
        appearance: "success",
      });
      history.push("/claim/list");
    }, 1000);
  };
  const [activeUserDetail, setActiveUserDetail] = useState(
    storeactiveUserDetail
  );
  const [userInput, setUserInput] = useState({
    dateOfDischarge: "",
    dateOfAdmission: "",
    provider: "",
    totalBill: "",
  });

  const { dateOfAdmission, dateOfDischarge, provider, totalBill } = userInput;
  const onInputChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  return (
    <div className="container bg-light mt-5">
      <h2 className="text-center">Add Claim</h2>
      <div className="row">
        <div className="col-6">
          <label>Member Name:</label>
          <input
            className="form-control"
            value={activeUserDetail.memberName}
            type="text"
            disabled
          />
        </div>
        <div className="col-6">
          <label>Date of Birth:</label>
          <input
            className="form-control"
            value={activeUserDetail.birthdate}
            type="text"
            disabled
          />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <label>Date Admission:</label>
          <input
            className="form-control"
            value={dateOfAdmission}
            name="dateOfAdmission"
            type="date"
            onChange={onInputChange}
          />
        </div>
        <div className="col-6">
          <label>Date Discharge:</label>
          <input
            className="form-control"
            value={dateOfDischarge}
            name="dateOfDischarge"
            type="date"
            onChange={onInputChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <label>Provider:</label>
          <input
            className="form-control"
            value={provider}
            name="provider"
            type="text"
            onChange={onInputChange}
          />
        </div>
        <div className="col-6">
          <label>Total bill:</label>
          <input
            className="form-control"
            value={totalBill}
            name="totalBill"
            type="number"
            onChange={onInputChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4">
          <button className="btn btn-primary  btn-submit" onClick={submitClaim}>
            Submit Claim
          </button>
          <div className="col-4"></div>
        </div>
      </div>
    </div>
  );
};

export default AddClaim;
