import React, { useState } from "react";
import { UseAuth } from "../contexts/AuthContext";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

const AccountUpdate = ({ update, setUpdate }) => {
  const { user, updateEmail, updatePassword } = UseAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [Form, setForm] = useState({
    newEmail: user?.email,
    currentPassword: "",
    newPassword: "",
  });
  const handleAccountUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Reauthenticate the user with their current credentials
      const credential = EmailAuthProvider.credential(
        user.email,
        Form.currentPassword
      );

      await user.reauthenticateWithCredential(user.email, credential);

      // Update the user's email and display name
      if (Form.newEmail !== user.email) {
        await updateEmail(Form.newEmail);
      }
      if (Form.newPassword) {
        await updatePassword(Form.newPassword);
      }

      setForm({ newEmail: "", currentPassword: "", newPassword: "" });
      setLoading(false);
    } catch (err) {
      setError("Failed to update account");
      console.log("error in account update", err);
    }
  };
  const handleChange = (e) => {
    switch (e.target.name) {
      case "email":
        setForm({ ...Form, newEmail: e.target.value });
        break;
      case "current password":
        setForm({ ...Form, currentPassword: e.target.value });
        break;
      case "new password":
        setForm({ ...Form, newPassword: e.target.value });
        break;
      default:
        "";
        break;
    }
  };
  return (
    <form
      onSubmit={handleAccountUpdate}
      className={`${
        update ? "scale-100" : "scale-0"
      } flex flex-col justify-center border rounded transition-all px-[1rem] sm:px-[2rem] py-[3rem] absolute left-[-3.5rem] sm:left-[-5rem] w-[300px] sm:w-[370px] bottom-[-5rem] bg-black/90 text-center`}
    >
      <h4 className="whitespace-nowrap font-caveat text-[1.5rem] mb-3 text-[var(--main-color)]">
        Please Enter Update info
      </h4>
      {error && <div className="mb-3 text-[#f04141]">{error}</div>}
      <label htmlFor="email">Enter new Email(optional)</label>
      <input
        type="text"
        id="email"
        name="email"
        placeholder="Enter Email"
        className="mb-4 px-3 h-[2.7rem] text-black rounded outline-[var(--main-color)]"
        value={Form.newEmail}
        onChange={handleChange}
      />
      <label htmlFor="current">Current Password</label>
      <input
        required
        type="password"
        id="current"
        name="current password"
        placeholder="Enter Your Current Password"
        onChange={handleChange}
        value={Form.currentPassword}
        className="mb-4 px-3 h-[2.7rem] text-black rounded outline-[var(--main-color)]"
      />
      <label htmlFor="new">New password</label>
      <input
        type="password"
        id="new"
        name="new password"
        placeholder="Leave blank to keep the same password"
        onChange={handleChange}
        value={Form.newPassword}
        className="mb-4 px-3 h-[2.7rem] text-black rounded outline-[var(--main-color)]"
      />
      <div className="my-3">
        <button
          onClick={() => setUpdate(false)}
          className="border rounded p-3 mx-2 cursor-pointer bg-[var(--main-color)] hover:text-black/80"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="border rounded p-3 mx-2 cursor-pointer bg-[var(--main-color)] hover:text-black/80"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default AccountUpdate;
