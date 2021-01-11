const Bubble = ({ x, y, data }) => (
  <g>
    <g>
      <circle className="icon" cx={x + 20} cy={y + 20} r={20} />
      <text x={x + 40} y={y + 25}>
        {data ? `${data.name}: ${data.lastMessage}` : ""}
      </text>
    </g>
    <style jsx>{`
      .icon {
        fill: blue;
      }
    `}</style>
  </g>
);

export default Bubble;
