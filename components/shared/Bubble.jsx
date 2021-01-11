import { calculateDistance } from "../../utils/coordinates";
import { MAX_DISTANCE } from "../../utils/enums";

const Bubble = ({ mainUserX, mainUserY, currentUserX, currentUserY, data }) => {
  const distanceToMainUser = calculateDistance(
    mainUserX,
    mainUserY,
    currentUserX,
    currentUserY
  );
  return (
    <g>
      <g>
        <circle
          className="icon"
          cx={currentUserX + 20}
          cy={currentUserY + 20}
          r={20}
        />
        <text x={currentUserX + 5} y={currentUserY + 55}>
          {data ? data.name : ""}
        </text>
        {distanceToMainUser <= MAX_DISTANCE && (
          <text x={currentUserX + 45} y={currentUserY + 25}>
            {data ? data.lastMessage : ""}
          </text>
        )}
      </g>
      <style jsx>{`
        .icon {
          fill: blue;
        }
      `}</style>
    </g>
  );
};

export default Bubble;
