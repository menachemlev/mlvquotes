import "./BackgroundAdder.css";
export default function BackgroundAdder(props) {
  return (
    <div
      className="background-adder"
      style={{
        backgroundImage: `url('/api/photos/landspace${
          Math.random() >= 0.66 ? "" : Math.random() >= 0.5 ? "2" : `3`
        }.jpg')`,
      }}
    >
      {props.children}
    </div>
  );
}
