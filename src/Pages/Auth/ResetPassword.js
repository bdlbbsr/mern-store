import { useForm } from "react-hook-form";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  resetPasswordAsync,
  selectError,
  selectPasswordReset,
} from "../../Redux/features/Auth/AuthSlice";

export default function ResetPassword() {
  const params = useParams();
  const passwordReset = useSelector(selectPasswordReset);
  const error = useSelector(selectError);
  // const query = new URLSearchParams(window.location.search);
  // const token = query?.get('token')
  // const email = query?.get('email')

  const token = params.token;

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Container className="containerWrapper centerBox">
      {token ? (
        <div className="LoginBox">
          <h2 className="mb-5 text-center">Enter New Password</h2>
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              dispatch(
                resetPasswordAsync({ token, newPassword: data.password })
              );
            })}
            className=" ">
            <label
              htmlFor="password"
              className="mt-3 mb-1">
              New Password
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
            {passwordReset && <p className="successMsg">Password Reset</p>}
            {error && <p className="errorMsg">{error}</p>}

            <div>
              <button
                type="submit"
                className="sbtBtn">
                Reset Password
              </button>
            </div>
          </form>

          <p className=" ">
            Send me back to{" "}
            <Link
              to="/login"
              className=" ">
              Login
            </Link>
          </p>
        </div>
      ) : (
        <p>Incorrect Link</p>
      )}
    </Container>
  );
}
