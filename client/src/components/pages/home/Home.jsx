import React from "react";
import Carousel from "./Carousel";
const Home = () => {
  return (
    <div>
      <div className="container">
        {/* headline */}
        <div className="row">
          <div className="mx-auto">
            <Carousel />
          </div>
        </div>
        <br />
        {/* <!-- footer --> */}
        <footer>
          <p>Coding 101 &copy; 2019</p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error vero
            eligendi laboriosam repellendus nemo dignissimos id, in eius quos
            quia minima cum officiis voluptate, praesentium accusantium. Eos
            libero ea sed?
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
