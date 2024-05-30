import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { checkAuth, loginUserAsync, selectError } from "../../Redux/features/Auth/AuthSlice";

export default function Login() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const isAuthenticated = useSelector(checkAuth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <>
      {isAuthenticated && (
        <Navigate
          to="/"
          replace={true}></Navigate>
      )}
      <Container className="containerWrapper centerBox">
        

        <div className="LoginBox">
        <h2 className="mb-5">Log in to your account</h2>
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              dispatch(
                loginUserAsync({ email: data.email, password: data.password })
              );
            })}
            className=" ">
            
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
                {errors.email && (
                  <p className="errorMsg">{errors.email.message}</p>
                )}
               

             
              <div className="d-flex align-items-center justify-content-between">
                <label
                  htmlFor="password"
                  className="mt-3 mb-1">
                  Password
                </label>
                <div className="smallTxt">
                  <Link
                    to="/forgot-password"
                    className=" ">
                    <small>Forgot password?</small>
                  </Link>
                </div>
              </div>
              
                <input
                  id="password"
                  {...register("password", {
                    required: "password is required",
                  })}
                  type="password"
                  className="inputBox"
                />
                {errors.password && (
                  <p className="errorMsg">{errors.password.message}</p>
                )}
              
              {error && <p className="errorMsg">{error || error?.message}</p>}
            

            <div>
              <button
                type="submit"
                className="sbtBtn">
                Log in
              </button>
            </div>
          </form>

          <p className="">
            Not a member?{" "}
            <Link
              to="/signup"
              className=" ">
              Create an Account
            </Link>
          </p>
        </div>
      </Container>
    </>
  );
}
