import { calculateDistance } from "../../utils/coordinates";
import { MAX_DISTANCE, SHADING_PERCENTAGE } from "../../utils/enums";

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
        <text className="name" x={currentUserX + 5} y={currentUserY + 55}>
          {data ? data.name : ""}
        </text>
        {distanceToMainUser <= MAX_DISTANCE && (
          <text
            className={
              distanceToMainUser <= MAX_DISTANCE * SHADING_PERCENTAGE
                ? "full-color"
                : "color-shading"
            }
            x={currentUserX + 45}
            y={currentUserY + 25}
          >
            {data ? data.lastMessage : ""}
          </text>
        )}
      </g>
      <style jsx>{`
        .icon {
          fill: blue;
        }
        .name {
          font-weight: bold;
          font-size: 1rem;
        }
        .full-color {
          font-weight: bold;
          font-size: 1rem;
        }
        .color-shading {
          font-weight: 500;
        }
      `}</style>
    </g>
  );
};

export default Bubble;
