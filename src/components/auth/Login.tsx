import React from "react";
import { useData } from "../data/DataProvider";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { user, setUser } = useData();
  const submit = () => {
    setUser(true);
  };
  return (
    <div>
      <input
        value={email}
        placeholder={"email"}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <input
        value={password}
        placeholder={"email"}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <input type={"button"} value={"Login"} onClick={submit} />
    </div>
  );
}

export default Login;
