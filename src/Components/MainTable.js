import React from "react";
import { useState, useEffect } from "react";
import "../App.css";
import { addData, removeData, editData } from "../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ConfirmDelete from "./ConfirmDelete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ArrowRightAltOutlined } from "@mui/icons-material";

export const MainTable = (props) => {
  const [formErrors, setFormErrors] = useState({});
  const notifyAdd = () => toast.success("Added successfully!");
  const notifyEdit = () => toast.warn("Edited successfully!");
  const notifyDelete = () => toast.error("Deleted successfully!");
  const [isSubmit, setIsSubmit] = useState(false);
  const [serachValue, setSearchValue] = useState("");
  const [sortAge, setSortAge] = useState(false);
  const [sortDirection, setSortDirection] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    mobileNO: "",
    dob: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState();
  const data = useSelector(({ user }) => user);
  const { items } = data;
  let sortedItems = [...items];
  let userData = [];
  sortedItems.sort((a, b) => {
    if (sortDirection) {
      return b.age - a.age;
    } else {
      return a.age - b.age;
    }
  });

  const setSort = () => {
    if (sortAge) {
      userData = [...sortedItems];
    } else {
      userData = [...items];
    }
  };

  setSort();

  const dispatch = useDispatch();
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const insertData = (e) => {
    e.preventDefault();

    if (
      formData.name.length > 0 &&
      formData.age.length > 0 &&
      formData.email.length > 0 &&
      formData.mobileNO.length > 0 &&
      formData.dob.length > 0
    ) {
      setIsSubmit(false);
      dispatch(addData(formData));
      notifyAdd();
      setFormData({
        name: "",
        age: "",
        email: "",
        mobileNO: "",
        dob: "",
      });
    } else {
      setIsSubmit(true);
      setFormErrors(validate(formData));
    }
  };
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name is Required";
    } else if (values.name.length > 0) {
      errors.name = "";
    }
    if (!values.age) {
      errors.age = "Age is Required";
    } else if (values.age.length > 0) {
      errors.age = "";
    }
    if (!values.email) {
      errors.email = "Email is Required";
    } else if (values.email.length > 0) {
      errors.email = "";
    }
    if (!values.mobileNO) {
      errors.mobileNO = "MobileNo is Required";
    } else if (values.mobileNO.length > 0) {
      errors.mobileNO = "";
    }
    if (!values.dob) {
      errors.dob = "Dob is Required";
    } else if (values.dob.length > 0) {
      errors.dob = "";
    }
    return errors;
  };

  const handleRemove = (userName) => {
    dispatch(removeData(userName));
    notifyDelete();
  };

  const handleEdit = (name, age, email, mobileNO, dob, id) => {
    const element = document.getElementById("form-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setEditMode(true);
    setEditId(id);
    setFormData({
      name: name,
      age: age,
      email: email,
      mobileNO: mobileNO,
      dob: dob,
    });
  };
  const updateData = (e) => {
    e.preventDefault();
    setEditMode(false);
    dispatch(editData({ formData: formData, editId: editId }));
    notifyEdit();
    setFormData({
      name: "",
      age: "",
      email: "",
      mobileNO: "",
      dob: "",
    });
  };
  useEffect(() => {
    if (isSubmit) {
      setFormErrors(validate(formData));
    }
  }, [formData,isSubmit]);
  return (
    <div className="container">
      <ToastContainer />
      <form
        onSubmit={(e) => (editMode ? updateData(e) : insertData(e))}
        id="form-section"
      >
        <div>
          <lable>Name</lable>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <span className="error">{formErrors.name}</span>
        </div>
        <div>
          <lable>Age</lable>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          <span className="error">{formErrors.age}</span>
        </div>
        <div>
          <lable>E-mail</lable>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <span className="error">{formErrors.email}</span>
        </div>
        <div>
          <lable>MobileNo</lable>
          <input
            type="tel"
            name="mobileNO"
            value={formData.mobileNO}
            onChange={handleChange}
          />
          <span className="error">{formErrors.mobileNO}</span>
        </div>
        <div>
          <lable>DOB</lable>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
          <span className="error">{formErrors.dob}</span>
        </div>
        <button type="submit">{editMode ? "edit" : "add"}</button>
      </form>
      <div className="search">
        <input
          type="search"
          placeholder="Search By Name Or Age"
          value={serachValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <table>
        <tr>
          <th>Name</th>
          <th>
            <button
              type="button"
              onClick={() => {
                setSortDirection(!sortDirection);
                setSortAge(true);
              }}
            >
              Age{sortAge ? <>{sortDirection ? "↓" : "↑"}</> : ""}
            </button>

            {sortAge ? (
              <button
                className="cross"
                onClick={() => {
                  setSortAge(false);
                }}
              >
                X
              </button>
            ) : (
              ""
            )}
          </th>
          <th>E-mail</th>
          <th>Mobile No</th>
          <th>DOB</th>
          <th>Actions</th>
        </tr>
        {userData
          .filter((val) => {
            if (serachValue === "") {
              return val;
            } else if (
              val.name.toLowerCase().includes(serachValue.toLowerCase()) ||
              val.age.includes(serachValue)
            ) {
              return val;
            }
          })
          .map((val, i) => (
            
            <tr key={i}>
              <td>{val?.name}</td>
              <td>{val?.age}</td>
              <td>{val?.email}</td>
              <td>{val?.mobileNO}</td>
              <td>{val?.dob}</td>
              <td className="action">
                <ConfirmDelete valName={val.name} handleRemove={handleRemove} />

                <button
                  className="icon-btn"
                  onClick={() =>
                    handleEdit(
                      val.name,
                      val.age,
                      val.email,
                      val.mobileNO,
                      val.dob,
                      i
                    )
                  }
                >
                  {" "}
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </button>
                <Link to={`/show-user/${val.name}`}>
                  <button
                    className="icon-btn"
                    onClick={() => props.setName(val.name)}
                  >
                    <IconButton>
                      <ArrowRightAltOutlined />
                    </IconButton>
                  </button>
                </Link>
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
};
