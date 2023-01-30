import React, { useEffect, useMemo, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import Table from "./Table";
import { fetchUsers } from "../feature/userSlice";
import { columns } from "../data/columns";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const Campaign = (props) => {
  const [state, setState] = useState({
    searchCampaign: "",
    startDate: "",
    endDate: "",
  });
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleChange = (e) => {
    setState((prevState) => {
      return {
        ...prevState,
        searchCampaign: e.target.value,
      };
    });
  };

  const getFilteredData = useMemo(() => {
    if (
      state.searchCampaign.trim() === "" &&
      state.startDate === "" &&
      state.endDate === ""
    )
      return user?.users;
    else {
      let result = user.users;
      if (state.searchCampaign.trim() !== "")
        result = user?.users.filter((camp) =>
          camp.campaignName
            .toLowerCase()
            .includes(state.searchCampaign.toLowerCase())
        );
      if (state.startDate !== "") {
        result = result.filter(
          (camp) =>
            moment(camp.startDate).diff(moment(state.startDate), "days") >= 0
        );
      }
      if (state.endDate !== "") {
        result = result.filter(
          (camp) =>
            moment(state.endDate).diff(moment(camp.endDate), "days") >= 0
        );
      }
      return result;
    }
  }, [state.searchCampaign, state.startDate, user.users, state.endDate]);

  const handleDateChange = (date, key) => {
    setState((prevState) => {
      return {
        ...prevState,
        [key]: date,
      };
    });
  };

  return (
    <div className="container">
      <div className="header_div">
        <div className="date-component">
          <div className="date-div">
            <ReactDatePicker
              className="date-input"
              placeholderText="Start-Date"
              selected={state.startDate}
              dateFormat={"dd/MM/yyyy"}
              value={state.startDate}
              onChange={(date) => {
                handleDateChange(date, "startDate");
              }}
              onKeyDown={(e) => {
                e.preventDefault();
              }}
            />
          </div>
          <div className="date-div">
            <ReactDatePicker
              className="date-input"
              placeholderText="End-Date"
              selected={state.endDate}
              minDate={state.startDate}
              dateFormat={"dd/MM/yyyy"}
              value={state.endDate}
              onChange={(date) => {
                handleDateChange(date, "endDate");
              }}
              onKeyDown={(e) => {
                e.preventDefault();
              }}
            />
          </div>
        </div>
        {/* <div className="inpt"> */}
        <div style={{ display: "flex" }}>
          <input
            style={{ border: "1px solid" }}
            value={state.searchCampaign}
            placeholder="Search by name"
            onChange={handleChange}
          />
          <button
            style={{
              padding: "0px 5px",
              backgroundColor: "#4f53d7",
              borderColor: "#4f53d7",
              height: "27px",
            }}
          >
            <img
              width={"15px"}
              height={"15px"}
              alt="Search"
              src="/images/search.png"
            />
          </button>
        </div>
      </div>
      {user.loading && <div>Loading...</div>}
      {!user.loading && user?.error ? <div>Error: {user.error}</div> : null}
      {!user.loading && user?.users.length ? (
        <Table data={getFilteredData} columns={columns} />
      ) : null}
    </div>
  );
};

export default Campaign;
