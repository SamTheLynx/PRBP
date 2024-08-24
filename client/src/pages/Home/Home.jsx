import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import img1 from "../../assets/Home-img1.png";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const ReduxUser=useSelector((state)=>{
    return state.user;
  })

  return (
    <div>
      <div className="background">
        APPLY FOR A RESTAURANT CERTIFICATION ONLINE
      </div>
      <div className="Home-second-div">
        <div className="first-column">
          <img src={img1} />
        </div>
        <div className="second-column">
          <p className="paragraph">
            Now introducing an easier way to get your restaurant certified! Put
            aside all the hassles of traveling far and spending excessive
            amounts of money just so you can start your business. You can now
            put in your applications faster!
          </p>
          <div className="button-container">
            <Link to={ReduxUser.loggedIn ? "/submission" : "/loginOptions"} className="button-home">
              <button className="button-home">APPLY NOW!</button>{" "}
            </Link>
          </div>
        </div>
      </div>
      <div className="footer">{/* <Footer/>*/}</div>
    </div>
  );
}

export default Home;
