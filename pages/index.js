import React from "react";

const Home = () => (
  <div className="home">
    <div className="hero">
      <h1 className="title">Welcome to Proximity Chats!</h1>
      <p className="description">
        A website to join chat rooms and talk only with people close to you!
      </p>
    </div>

    <style jsx>{`
      .hero {
        width: 100%;
        color: black;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 5rem;
        font-size: 3rem;
      }
      .title,
      .description {
        text-align: center;
      }
    `}</style>
  </div>
);

export default Home;
