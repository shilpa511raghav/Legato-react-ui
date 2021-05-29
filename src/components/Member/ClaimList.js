import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CookiesHelper } from "../common/CookiesHelper";
import moment from "moment";

const cookieService = CookiesHelper();
const ClaimList = () => {
  const [claimList, setClaimList] = useState([]);
  const storeactiveUserDetail = cookieService.readCookie("activeUserDetail");

  useEffect(() => {
    loadClaimList();
  }, []);

  console.log(storeactiveUserDetail);

  const loadClaimList = async () => {
    var url = `http://localhost:5555/claim-service/claim/getAllForMember/${storeactiveUserDetail.memberName}`;
    var response = await axios.get(url);
    setClaimList(response.data.claimList);
  };
  const formatDate = (inputDate) => {
    const date = moment(inputDate).format("MMM. D, YYYY h:mm A z");
    return date;
  };
  return (
    <div className="container bg-light mt-5">
      <div className="py-4">
        <h1 className="text-center">List of Claims</h1>
        <table className="table">
          <thead className="thread-dark">
            <tr>
              <th scope="col">S.No.</th>
              <th scope="col">Claim No.</th>
              <th scope="col">Date Of Admission</th>
              <th scope="col">Date Of Discharge</th>
              <th scope="col">Provider</th>
              <th scope="col">totalBill</th>
            </tr>
          </thead>
          <tbody>
            {claimList.map((each, i) => (
              <tr key={each.id}>
                <th scope="row">{i + 1}</th>
                <td>{each.id}</td>
                <td>{formatDate(each.dateOfAdmission)}</td>
                <td>{formatDate(each.dateOfDischarge)}</td>
                <td>{each.provider}</td>
                <td>{each.totalBill}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClaimList;
