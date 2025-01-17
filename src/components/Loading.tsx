import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading">
      <div className="loading_text">Loading</div>
      <div className="loading_dots">
        <div className="loading_dot"></div>
        <div className="loading_dot"></div>
        <div className="loading_dot"></div>
      </div>
    </div>
  );
};

export default Loading;
