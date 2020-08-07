import React, { useRef } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useData } from "../data/DataProvider";
import Header from "../ui/Header";
import SearchForm from "../ui/SearchForm";
import DisplayWeatherContainer from "../ui/DisplayWeatherContainer";
// import { Spring } from "react-spring/renderprops";
import { animated } from "react-spring";
import { stringify } from "querystring";
function Home(props: RouteComponentProps) {
  //     // Build a spring and catch its ref
  //     const springRef = useRef()
  //     const props = useSpring({...values, ref: springRef})
  // // Build a transition and catch its ref
  //     const transitionRef = useRef()
  //     const transitions = useTransition({...values, ref: transitionRef})
  // // First run the spring, when it concludes run the transition
  //     useChain([springRef, transitionRef])
  const headerRef = useRef();
  const items = ["Open", "Weather", "Map"];

  // const transitions = useTransition(items, {
  //   from: {
  //     opacity: "0",
  //     height: "0",
  //     innerHeight: " 0",
  //     transform: "perspective(600px) rotateX(0deg)",
  //   },
  //   enter: [
  //     { opacity: "1", height: "80", innerHeight: "80" },
  //     { transform: "perspective(600px) rotateX(180deg)" },
  //     { transform: "perspective(600px) rotateX(0deg)" },
  //   ],
  //   leave: [{ innerHeight: "0 " }, { opacity: "0", height: " 0" }],
  // });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {/*<Transition*/}
      {/*  items={items}*/}
      {/*  keys={(item) => item}*/}
      {/*  from={{ transform: "translate3d(0,-40px,0)" }}*/}
      {/*  enter={{ transform: "translate3d(0,0px,0)" }}*/}
      {/*  leave={{ transform: "translate3d(0,-40px,0)" }}*/}
      {/*>*/}
      {/*  {(item) => (props) => <div style={props}>{item}</div>}*/}
      {/*</Transition>*/}
      <SearchForm />
      <DisplayWeatherContainer />
    </div>
  );
}

export default Home;
