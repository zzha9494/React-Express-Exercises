import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [mode, setMode] = useState(0);
  const [profile, setProfile] = useState({});

  return (
    <>
      <h1>User Page</h1>

      <button onClick={() => navigate(-1)}>Back</button>

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

          {mode == 0 && (
            <EditProfile profile={profile} setProfile={setProfile} />
          )}
          {mode == 1 && <ChangePassword profile={profile} />}
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

function EditProfile({ profile, setProfile }) {
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
    if (profile._id == null) {
      alert("Invalid user!");
    } else {
      data.append("_id", profile._id);

      fetch("/api/editProfile", { method: e.target.method, body: data })
        .then((res) => {
          if (res.status == 200) {
            res.json().then((data) => {
              alert(data.message);
              setProfile(data.profile);
            });
          } else {
            res.json().then((data) => {
              alert(data.message);
            });
          }
        })
        .catch((error) => console.error(error));
    }
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

function ChangePassword({ profile }) {
  const formRef = useRef(0);

  const submitChangePassword = (e) => {
    e.preventDefault();

    if (!window.confirm("Confirm?")) {
      return;
    } else {
      const data = new URLSearchParams(new FormData(e.target));
      data.append("_id", profile._id ?? null);

      fetch("/api/changePassword", { method: e.target.method, body: data })
        .then((res) => res.json())
        .then((data) => {
          formRef.current.reset();
          alert(data.message);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <form ref={formRef} method="post" onSubmit={(e) => submitChangePassword(e)}>
      <label>
        Current Password:
        <input
          type="password"
          name="currentPassword"
          // pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{6,}$"
          size="30"
          required
        />
      </label>

      <label>
        New Password:
        <input
          type="password"
          name="newPassword"
          // pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{6,}$"
          size="30"
          required
        />
      </label>

      <button type="submit">Confirm</button>
    </form>
  );
}

function ManageListings() {
  return <p1>this is manage.</p1>;
}

function ViewComments() {
  return <p1>this is view.</p1>;
}

export default Profile;
