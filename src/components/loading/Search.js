export default function Search(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="loading" width={props.width} height={props.height} viewBox="0 0 100 100">
      <circle cx="50" cy="23" r="13" fill="#ffffff">
        <animate
          attributeName="cy"
          dur="2s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.45 0 0.9 0.55;0 0.45 0.55 0.9"
          keyTimes="0;0.5;1"
          values="23;77;23"
        />
      </circle>
    </svg>
  );
}
