import React from "react";
import { useForm } from "react-hook-form";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import app from "../../firebase/firebase.init";
const ForgotPassword = () => {
  const { register, handleSubmit } = useForm();
  const auth = getAuth(app);
  const handleForgotPassword = (data) => {
    firebase
      .auth()
      .sendPasswordResetEmail(data.email)
      .then(() => {
        // Password reset email sent!
        console.log("check inbox");
        // ..
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
    //   closeForgotPasswordModal();
  };
  const closeForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(false);
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white w-[400px] p-6 rounded-lg">
          {/* Add your forgot password form here */}
          <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
          <form onSubmit={handleForgotPassword}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                {...register("email")}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-opacity-50 focus:ring-green-300"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                onClick={closeForgotPasswordModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
