const Login = () => {
  return (
    <>
      <div className="login-form justify-content-center d-flex">
        <form className="col-6" id="login-form">
          <div className="d-flex justify-content-center">
            <img
              className="mb-4 mt-4"
              id="login-logo"
              src="logo-no-background.png"
              alt=""
              width="210"
              height="140"
            />
          </div>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button
            id="login-btn"
            className="w-100 btn btn-md btn-primary"
            type="submit"
          >
            Sign in
          </button>
          <button
            id="signup-btn"
            className="w-100 btn btn-md btn-secondary"
            type="button"
          >
            Sign up
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
