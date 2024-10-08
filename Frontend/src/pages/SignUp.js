import React, { useState, useRef } from 'react';
import loginIcons from '../assest/signin.gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Refs to move between input fields with "Enter"
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imagePic = await imageTobase64(file);
      setData((prev) => ({
        ...prev,
        profilePic: imagePic
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if profilePic is provided
    if (!data.profilePic) {
      toast.error("Profile picture is required");
      return;
    }

    // Validate password
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/; // At least 6 characters, one uppercase, one numeric
    if (!passwordRegex.test(data.password)) {
      toast.error("Password must be at least 6 characters long and contain at least one uppercase letter and one numeric value");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true); // Set loading to true before API call

    try {
      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(`${dataApi.message}. Please verify your email to activate your account.`);
        navigate("/login");
      } else {
        toast.error(dataApi.message);
      }
    } catch (error) {
      toast.error("An error occurred during sign-up. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after API call
    }
  };

  // Handle Enter key for moving to next input
  const handleKeyPress = (e, ref) => {
    if (e.key === "Enter") {
      e.preventDefault();
      ref.current?.focus();
    }
  };

  return (
    <section id='signup'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto'>
          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <img src={data.profilePic || loginIcons} alt='Profile' />
            <form>
              <label>
                <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                  Upload Photo
                </div>
                <input type='file' className='hidden' onChange={handleUploadPic} />
              </label>
            </form>
          </div>

          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='grid'>
              <label>Name:</label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='text'
                  placeholder='Enter your name'
                  name='name'
                  value={data.name}
                  onChange={handleOnChange}
                  ref={nameRef}
                  required
                  className='w-full h-full outline-none bg-transparent'
                  aria-label="Name"
                  onKeyPress={(e) => handleKeyPress(e, emailRef)}
                />
              </div>
            </div>
            <div className='grid'>
              <label>Email:</label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='email'
                  placeholder='Enter email'
                  name='email'
                  value={data.email}
                  onChange={handleOnChange}
                  ref={emailRef}
                  required
                  className='w-full h-full outline-none bg-transparent'
                  aria-label="Email"
                  onKeyPress={(e) => handleKeyPress(e, passwordRef)}
                />
              </div>
            </div>

            <div>
              <label>Password:</label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder='Enter password'
                  value={data.password}
                  name='password'
                  onChange={handleOnChange}
                  ref={passwordRef}
                  required
                  className='w-full h-full outline-none bg-transparent'
                  aria-label="Password"
                  onKeyPress={(e) => handleKeyPress(e, confirmPasswordRef)}
                />
                <div className='cursor-pointer text-xl' onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
            </div>

            <div>
              <label>Confirm Password:</label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder='Confirm password'
                  name='confirmPassword'
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  ref={confirmPasswordRef}
                  required
                  className='w-full h-full outline-none bg-transparent'
                  aria-label="Confirm password"
                />
                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
            </div>

            <button
              type='submit'
              className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <p className='text-center text-xs mt-5'>
            Already have an account? <Link to="/login" className='text-red-600 hover:underline'>Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
