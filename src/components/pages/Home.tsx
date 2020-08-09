import React, { useEffect, useRef } from "react";
import { RouteComponentProps } from "react-router-dom";
import { gsap } from "gsap";
import SearchForm from "../ui/SearchForm";
import DisplayWeatherContainer from "../ui/DisplayWeatherContainer";

function Home(props: RouteComponentProps) {
  const headerRef = useRef(null);

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

  useEffect(() => {
    // TweenLite.to(headerRef.current, 1, { x: 100, y: 100 });
    gsap.fromTo(
      headerRef.current,
      { height: "0px", delay: 2 },
      {
        height: "auto",
      }
    );
  }, []);

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
      <span style={{ height: "30px" }} ref={headerRef}>
        Open Weather Map
      </span>
      <SearchForm />
      <DisplayWeatherContainer />
    </div>
  );
}

export default Home;
