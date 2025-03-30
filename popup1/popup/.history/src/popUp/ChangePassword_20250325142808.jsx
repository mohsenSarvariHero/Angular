import React, { useRef, useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const modalref = useRef();
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // برای هدایت به صفحه بعد از بسته شدن مودال

  const closemodal = (e) => {
    if (modalref.current === e.target) {
      setShowModal(false);
      setTimeout(() => {
        onclose();
        navigate("/"); // هدایت به صفحه اصلی یا هر صفحه‌ای که بخواهید
      }, 500);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
    setShowModal(true);
    return () => setShowModal(false);
  }, []);

  return (
    <div
      ref={modalref}
      onClick={closemodal}
      className={`fixed inset-0 text-amber-50 backdrop-blur-xs flex justify-center items-center mb-5 transition-all duration-500 ${
        showModal ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="mt-10 flex flex-col gap-5 text-black">
        <div
          className={`rounded-xl bg-white flex flex-col gap-5 items-center mx-4 shadow-2xl w-[700px] h-[500px] mb-5 transition-all duration-500 transform ${
            showModal ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
        >
          <h1
            className="text-[#1d2b3e] text-[35px] font-bold mt-9"
            style={{ textShadow: "3px 3px 0px #B5CDF3" }}
          >
            تغییر رمز عبور
          </h1>

          {/* New Password Input */}
          <div className="relative flex flex-col mt-5">
            <label
              htmlFor="password"
              className="absolute right-2 bottom-12 text-l bg-white z-10 font-semibold text-[#334155] px-1 mr-3"
            >
              رمز عبور جدید
            </label>
            <div className="relative">
              <input
                type={showPassword ? "password" : "text"}
                id="password"
                required
                className="border border-[#B5CDF3] rounded-md pl-15 px-5 py-4 w-[400px] placeholder:text-[12px] mt-2 focus:outline-none"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute left-5 top-9 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <FaEyeSlash size={20} color="#3B82F6" />
                ) : (
                  <FaEye size={20} color="#3B82F6" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="relative flex flex-col mt-5">
            <label
              htmlFor="confirmPassword"
              className="absolute right-2 bottom-12 text-l bg-white z-10 font-semibold text-[#334155] px-1 mr-3"
            >
              تکرار رمز عبور
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "password" : "text"}
                id="confirmPassword"
                required
                className="border border-[#B5CDF3] rounded-md pl-15 px-5 py-4 w-[400px] placeholder:text-[12px] mt-2 focus:outline-none"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute left-5 top-9 transform -translate-y-1/2"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={20} color="#3B82F6" />
                ) : (
                  <FaEye size={20} color="#3B82F6" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#3B82F6] text-white w-[135px] h-[45px] cursor-pointer font-bold rounded-xl mt-10"
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
