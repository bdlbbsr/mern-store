import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Container, Button } from "react-bootstrap";

import {
  createUserAsync,
  checkAuth,
  selectMailSent
} from "../../Redux/features/Auth/AuthSlice";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function Signup() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(checkAuth);
  const mailSent = useSelector(selectMailSent);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: '',
    },
  });

  return (
    <>
      {isAuthenticated && (
        <Navigate
          to="/"
          replace={true}></Navigate>
      )}
      <Container className="containerWrapper centerBox">
        <div className="LoginBox">
          <h2 className="mb-5 text-center">Create a New Account</h2>
          {mailSent && <h5 className="successMsg">User registered successfully. <br/> Please check your email for activation</h5>}
          <form
            noValidate
            className=" "
            onSubmit={handleSubmit((data) => {
              dispatch(
                createUserAsync({
                  firstName: data.fname,
                  lastName: data.lname,
                  email: data.email,
                  password: data.password,
                  role: "user",
                })
              );
              console.log(data);
              reset();
            })}>
            <label
              htmlFor="fname"
              className="mt-3 mb-1">
              First Name
            </label>

            <input
              id="fname"
              {...register("fname", {
                required: "email is required",
              })}
              type="text"
              className="inputBox"
            />
            {errors.fname && <p className="errorMsg">{errors.fname.message}</p>}

            <label
              htmlFor="lname"
              className="mt-3 mb-1">
              Last Name
            </label>

            <input
              id="lname"
              {...register("lname")}
              type="text"
              className="inputBox"
            />

            <label
              htmlFor="email"
              className="mt-3 mb-1">
              Email address
            </label>

            <input
              id="email"
              {...register("email", {
                required: "email is required",
                pattern: {
                  value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                  message: "email not valid",
                },
              })}
              type="email"
              className="inputBox"
            />
            {errors.email && <p className="errorMsg">{errors.email.message}</p>}

            <label
              htmlFor="password"
              className="mt-3 mb-1">
              Password
            </label>

            <input
              id="password"
              {...register("password", {
                required: "password is required",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                  message: `- at least 8 characters\n
                      - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                      - Can contain special characters`,
                },
              })}
              type="password"
              className="inputBox"
            />
            {errors.password && (
              <p className="errorMsg">{errors.password.message}</p>
            )}

            <label
              htmlFor="password"
              className="mt-3 mb-1">
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "confirm password is required",
                validate: (value, formValues) =>
                  value === formValues.password || "password not matching",
              })}
              type="password"
              className="inputBox"
            />
            {errors.confirmPassword && (
              <p className="errorMsg">{errors.confirmPassword.message}</p>
            )}

            <div>
              <button
                type="submit"
                className="sbtBtn">
                Sign Up
              </button>
            </div>
          </form>



          <p className=" ">
            Already a Member?{" "}
            <Link
              to="/login"
              className=" ">
              Log In
            </Link>
          </p>
        </div>
      </Container>
    </>
  );
}
