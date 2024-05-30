import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  resetPasswordRequestAsync,
  selectMailSent,
} from "../../Redux/features/Auth/AuthSlice";

export default function ForgotPassword() {
  const mailSent = useSelector(selectMailSent);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Container className="containerWrapper centerBox">
        <div className="LoginBox">
          <h2 className="mb-5">Reset Password Request</h2>

          <div className=" ">
            <form
              noValidate
              onSubmit={handleSubmit((data) => {
                dispatch(resetPasswordRequestAsync(data.email));
              })}
              className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className=" ">
                  Email address
                </label>
                <div className="mt-2">
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
                  {errors.email && (
                    <p className="errorMsg">{errors.email.message}</p>
                  )}
                  {mailSent && <p className="successMsg">Mail Sent</p>}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="sbtBtn">
                  Send Email
                </button>
              </div>
            </form>

            <p className="">
              Send me back to{" "}
              <Link
                to="/login"
                className=" ">
                Login
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
