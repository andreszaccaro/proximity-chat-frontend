import React from "react";

import { withApollo } from "../../apollo/client";

const Rooms = () => {
  return (
    <div className="rooms">
      <p>This page will contain a list with all existing rooms.</p>
      <style jsx>{``}</style>
    </div>
  );
};

export default withApollo(Rooms);
