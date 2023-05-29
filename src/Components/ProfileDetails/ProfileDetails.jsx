import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profiledetails } from "../../Redux/AuthSlice";
import { jobs_DetailsPath } from "../../Helper/Helper";

export default function ProfileDetails() {
  const { profile_details } = useSelector((state) => state?.Auth);
  console.log(profile_details, "profile_details");



  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profiledetails());
  }, []);

  

  return (
    <>
      <div id="profile">
        <p><h3><u><i>Your Profile</i> </u> </h3></p><br />
       
        <center>
        <img
          src={jobs_DetailsPath(profile_details?.profile_pic)}
          width="175px"
          height="230px"
          className="image"
          alt="ab"
        />
        

        
          <div className="text">
            <p>
            Name:  {profile_details?.first_name}  {profile_details?.last_name}
            
            <br />
            Emai-ID:  {profile_details?.email}
            </p>
          </div>
        </center>
       
        
      </div>
    </>
  );
}
