import React, { useEffect } from "react";
import { useData } from "../data/DataProvider";
import TextField from "@material-ui/core/TextField";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import FormModal from "./FormModal";
import gsap from "gsap";

const styles = makeStyles((theme: Theme) => ({
  lineContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    padding: "0 1rem",
    marginTop: "1.5rem",
  },
  line: {
    width: "40%",
    height: "1px",
    backgroundColor: "rgba(240, 240, 240, 0.2)",
  },

  orSpan: {
    fontSize: "1.rem",
    color: "rgba(240, 240, 240, 0.58)",
  },
}));

export const BreakLine = () => {
  const classes = styles();
  return (
    <div className={classes.lineContainer}>
      <div className={classes.line}></div>
      <span className={classes.orSpan}>OR</span>
      <div className={classes.line}></div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    },
    root: {
      display: "flex",
      flexDirection: "column",
      width: "20%",
      padding: "2.5rem 2rem",
      backgroundColor: "rgb(0, 0, 0, 0.2)",
      justifyContent: "center",
      alignItems: "center",
      margin: "auto",
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "100%",
      },
    },
    button: {
      marginTop: "1.5rem",
      width: "100%",
      borderRadius: "30px",
      fontSize: "1rem",
    },
    input: {
      fontSize: 16,
      width: "auto",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      "& .MuiInputLabel-filled": {
        color: "whitesmoke",
      },
      "& .MuiFilledInput-root": {
        // backgroundColor: "transparent",
        color: "whitesmoke",
        backgroundColor: "rgb(255, 255, 255, 0.1)",

        borderWidth: 2,
      },
      "& .MuiFormLabel-root.Mui-error, & .MuiFilledInput-root.Mui-error": {
        color: "#f44336",
      },
      "& .MuiFilledInput-underline:after ": {
        borderBottom: "2px solid whitesmoke",
      },
      "& .MuiFilledInput-underline.Mui-error:after": {
        borderBottom: "2px solid #f44336",
      },
    },
  })
);
function SignUp() {
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");
  const [error, setError] = React.useState(false);
  const [match, setMatch] = React.useState(false);
  const { user, setUser } = useData();
  const submit = async () => {
    if (password === confirmPass) {
      const res = await fetch("http://localhost:3008/users/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      console.log(res);
      if (res.status === 200) {
        const data = await res.json();
        setError(false);
        console.log(data);
      } else {
        setError(true);
      }
    } else {
      setMatch(true);
    }
  };
  let modalRef = React.useRef(null);
  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(modalRef.current, 1.5, {
      y: -100,
      opacity: 0,
    });
  }, []);

  return (
    <div className={classes.container}>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        ref={modalRef}
      >
        <img
          src={
            "https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png"
          }
          style={{ height: "3rem" }}
        />
        <h2 style={{ color: "whitesmoke" }}>Create New Account</h2>
        <TextField
          className={classes.input}
          error={error}
          id="filled-error-helper-text"
          label="Enter Email"
          defaultValue={email}
          helperText={error ? "Incorrect email or password" : ""}
          variant="filled"
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <TextField
          className={classes.input}
          error={error}
          id="filled-error-helper-text"
          label="Enter password"
          defaultValue={password}
          helperText={error ? "Incorrect email or password" : ""}
          variant="filled"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <TextField
          className={classes.input}
          error={match}
          id="filled-error-helper-text"
          label="Confirm password"
          defaultValue={confirmPass}
          helperText={match ? "Password doesn't match" : ""}
          variant="filled"
          onChange={(e) => setConfirmPass(e.currentTarget.value)}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              marginTop: "1.5rem",
              display: "flex",
              alignItems: "center",
              color: "rgba(240, 240, 240, 0.58)",
            }}
          >
            Already have an account?
            <Link
              to={"/login"}
              style={{
                color: "whitesmoke",
                textDecoration: "none",
              }}
            >
              <span> LOG IN</span>
            </Link>
          </span>
        </div>
        <Button
          onClick={submit}
          className={classes.button}
          variant="contained"
          color="secondary"
          style={{
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          }}
        >
          SIGN UP
        </Button>
        <BreakLine />
        <a
          href={"http://localhost:3008/users/fbLogin"}
          style={{
            textDecoration: "none",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            style={{ background: "rgba(59, 89, 153, 1)" }}
          >
            Login with facebook
          </Button>
        </a>
        <a
          href={"http://localhost:3008/users/googleLogin"}
          style={{
            textDecoration: "none",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            style={{ background: "whitesmoke", color: "rgb(0,0,0,0.7)" }}
          >
            Login with google
          </Button>
        </a>
      </form>
    </div>
  );
}

export default SignUp;
