import React from "react";
import { Link } from "react-router-dom";
import car1 from "../../Images/car1.jpg";
import { jobsDetailsPath } from "../../Helper/Helper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { productList } from "../../Redux/CrudSlice";

export default function FrontPage() {
  const { list } = useSelector((state) => state?.Crud);
  console.log(list, "list in front page");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productList());
  }, []);

  return (
    <>
      

      <div className="frontpage">
        <h1 style={{
          color: "white",
          marginBottom: "350px"
        }}> <i>Make Your Driving More Exciting...</i> </h1>
      </div>
      
      <br />
      <Link
        to="/login"
        className="btn btn-primary py-sm-3 px-sm-5 me-3 animated slideInLeft"
      >
        click & enter
      </Link>
    </>
  );
}
