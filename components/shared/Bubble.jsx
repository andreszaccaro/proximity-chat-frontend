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
        {distanceToMainUser <= MAX_DISTANCE && (
          <text
            className={
              distanceToMainUser <= MAX_DISTANCE * SHADING_PERCENTAGE
                ? "text-base font-bold"
                : "text-base opacity-80"
            }
            x={currentUserX + 45}
            y={currentUserY + 25}
          >
            {data ? data.lastMessage : ""}
          </text>
        )}
        <circle
          className="text-blue-700 fill-current"
          cx={currentUserX + 20}
          cy={currentUserY + 20}
          r={20}
        />
        <text
          className="text-blue-700 fill-current text-base font-bold"
          textAnchor="middle"
          x={currentUserX + 20}
          y={currentUserY + 55}
        >
          {data ? data.name : ""}
        </text>
      </g>
    </g>
  );
};

export default Bubble;
