import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [mode, setMode] = useState(0);

  return (
    <>
      <h1>User Page</h1>

      <button onClick={() => navigate(-1)}>Back</button>

      <br />

      {localStorage.getItem("token") ? (
        <>
          <button
            onClick={() => {
              if (window.confirm("Sign out?")) {
                localStorage.removeItem("token");
                navigate("/");
              }
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
  const [profile, setProfile] = useState({});

  useEffect(() => {
    fetch(`/api/getProfile?id=${localStorage.getItem("token")}`, {
      method: "GET",
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error(data.message);
          });
        }
      })
      .then((data) => {
        setProfile(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  const submitEdit = (e) => {
    e.preventDefault();
    const data = new URLSearchParams(new FormData(e.target));
    data.append("_id", profile._id ?? null);

    fetch("/api/something", { method: e.target.method, body: data })
      .then((res) => {
        if (res.status == 201) {
          res.json().then((data) => {
            alert(data.message);
          });
        } else {
          res.json().then((data) => {
            alert(data.message);
          });
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <form method="post" onSubmit={(e) => submitEdit(e)}>
      <label>
        Firstname:
        <input
          name="firstname"
          pattern="[A-Za-z]{1,}"
          size="30"
          defaultValue={profile.firstname}
          required
        />
      </label>

      <label>
        Lastname:
        <input
          name="lastname"
          pattern="[A-Za-z]{1,}"
          size="30"
          defaultValue={profile.lastname}
          required
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          name="email"
          pattern="([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})"
          size="30"
          defaultValue={profile.email}
          required
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          name="password"
          // pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{6,}$"
          size="30"
          required
        />
      </label>

      <button type="submit">Edit</button>
    </form>
  );
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
