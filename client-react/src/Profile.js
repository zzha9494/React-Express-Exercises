import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [mode, setMode] = useState(0);

  return (
    <>
      <h1>User Page</h1>

      {localStorage.getItem("token") ? (
        <>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Sign-out
          </button>

          <br />

          <SwitchMode setMode={setMode} />

          <br />

          {mode == 0 && <EditProfile />}
          {mode == 1 && <ChangePassword />}
          {mode == 2 && <ManageListings />}
          {mode == 3 && <ViewComments />}
        </>
      ) : (
        <p1>Please log in.</p1>
      )}
    </>
  );
}

function SwitchMode({ setMode }) {
  return (
    <>
      <button
        onClick={() => {
          setMode(0);
        }}
      >
        Edit Profile
      </button>

      <button
        onClick={() => {
          setMode(1);
        }}
      >
        Change Password
      </button>

      <button
        onClick={() => {
          setMode(2);
        }}
      >
        Manage Listings
      </button>

      <button
        onClick={() => {
          setMode(3);
        }}
      >
        View Comments
      </button>
    </>
  );
}

function EditProfile() {
  return <p1>this is edit.</p1>;
}

function ChangePassword() {
  return <p1>this is change password.</p1>;
}

function ManageListings() {
  return <p1>this is manage.</p1>;
}

function ViewComments() {
  return <p1>this is view.</p1>;
}

export default Profile;
