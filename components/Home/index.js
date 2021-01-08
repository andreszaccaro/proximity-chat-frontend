import React from "react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  return (
    <div className="home">
      <div className="hero">
        <h1 className="title">Welcome to Proximity Chats!</h1>
        <p className="description">
          A website to join chat rooms and talk only with people close to you!
        </p>
      </div>
      <button className="cta" onClick={() => router.push("/rooms")}>
        Take me to the Rooms!
      </button>
      <style jsx>{`
        .home {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
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
        .cta {
          width: 10rem;
        }
      `}</style>
    </div>
  );
};

export default Home;
