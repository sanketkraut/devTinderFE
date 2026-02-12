import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);

  const [saveSuccessful, setSaveSuccessful] = useState(false);
  const [saveError, setSaveError] = useState("");

  const saveProfile = async () => {
    setSaveError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, about, photoUrl, age, gender },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      setSaveSuccessful(true);
      setTimeout(() => {
        setSaveSuccessful(false);
      }, 3000);
    } catch (error) {
      setSaveError(error?.response?.data?.error);
    }
  };

  return (
    user && (
      <>
        <div className="flex justify-center my-20">
          <div className="flex justify-center mx-10">
            <div className="card bg-base-300 w-96 shadow-sm">
              <div className="card-body">
                <h2 className="card-title justify-center">Edit Profile</h2>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">First Name</legend>
                    <input
                      type="text"
                      className="input"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <legend className="fieldset-legend">Last Name</legend>
                    <input
                      type="text"
                      className="input"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <legend className="fieldset-legend">About</legend>
                    <textarea
                      className="textarea"
                      placeholder="About"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                    />
                    <legend className="fieldset-legend">Photo URL</legend>
                    <input
                      type="text"
                      className="input"
                      placeholder="Photo URL"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                    <legend className="fieldset-legend">Age</legend>
                    <input
                      type="number"
                      className="input"
                      placeholder="Age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                    <legend className="fieldset-legend">Gender</legend>
                    <select
                      className="select"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </fieldset>
                </div>
                <p className="text-red-500">{saveError}</p>
                <div className="card-actions justify-center">
                  <button className="btn btn-primary" onClick={saveProfile}>
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
          <UserCard
            user={{ firstName, lastName, about, photoUrl, age, gender }}
          ></UserCard>
        </div>
        {saveSuccessful && (
          <div className="toast toast-top toast-center my-15">
            <div className="alert alert-success">
              <span>Profile updated Successfully!</span>
            </div>
          </div>
        )}
      </>
    )
  );
};

export default EditProfile;
