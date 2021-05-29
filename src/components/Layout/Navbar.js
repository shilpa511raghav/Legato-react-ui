import React from "react";

const Navbar = ({userDetail,logout}) => {

  const toUpper=(name)=>{
    return name?name.toUpperCase():"UNKNOWN"
  }
  return (
    <div className="navigation-bar">
        <div className="nav-button website-title"> 
            <div className="nav-link user-title">
            Member Registration Portal : {toUpper(userDetail.memberName)}
            </div>
        </div>
        <div className="nav-button"> 
          <a className="nav-link" href="/home">
            Home
          </a> 
        </div>
        <div className="nav-button" >
            <a className="nav-link" href="/claim/list">
                    Claim List
            </a> 
        </div>
        <div className="nav-button" >
            <a className="nav-link" href="/claim/add">
                    Add Claim
            </a> 
        </div>
       
        <div className="nav-button" >
            <a className="nav-link" href="/" onClick={logout} >
                    Logout
            </a> 
        </div>
    </div>
  );
};

export default Navbar;
