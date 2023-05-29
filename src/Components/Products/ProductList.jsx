import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  DeleteProduct, productList } from "../../Redux/CrudSlice";
import { Link } from "react-router-dom";
import SweetAlertComponent from "../SweetAlert/SweetAlert";
import { Pagination } from "@mui/material";

export default function ProductList() {
    
  const { list, totalpage } = useSelector((state) => state?.Crud);
  const [delete_id, setDelete_id] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [totalRecords, setPage] = useState("");
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productList());
  }, []);

  const delete_func = (id) => {
    if (delete_id !== "") {
      dispatch(
        DeleteProduct({
          id: delete_id,
        })
      ).then(() => {
        dispatch(productList());
      });
    }

    setDelete_id("");
    setIsDelete(false);
  };

  const handleChange = (e, pageno) => {
    setPage(pageno);
    dispatch(
      productList({
        page: pageno,
        perpage: 10,
      })
    );
  };

  return (
    <>
    {list?.length !==0?(
      <div class="list">
        

        <table class="table">
          <thead>
            <tr>
              
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {list?.map((item) => {
              return (
                <tr>
                  
                  <td>{item?.title}</td>
                  <td>{item?.description}</td>

                  <Link
                    to=""
                    onClick={() => {
                      setDelete_id(item?._id);
                      setIsDelete(true);
                    }}
                    class="btn btn-danger mr"
                  >
                    Delete
                  </Link>
                </tr>
              );
            })}
          </tbody>
        </table>

        {isDelete && (
          <SweetAlertComponent
            confirm={delete_func}
            cancle={() => setIsDelete(false)}
            title={"Are You Sure?"}
            subtitle={"You'll not be able to recover!"}
          />
        )}

        <Pagination
          count={totalpage}
          onChange={handleChange}
          totalRecords={totalRecords}
        />
      </div>
    ):(
      
      <h3> ***NO DATA FOUND***  </h3>
    )}
    </>
  );
}
