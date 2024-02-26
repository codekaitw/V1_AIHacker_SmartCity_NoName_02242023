import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [result, setResult] = useState("");

  const initialPlaceholders = Array(10).fill("https://via.placeholder.com/100");

  const [images, setImages] = useState({
    top: [...initialPlaceholders],
    left: [...initialPlaceholders],
    right: [...initialPlaceholders],
    bottom: [...initialPlaceholders],
  });

  const [showInputs, setShowInputs] = useState(false);
  const [inputs, setInputs] = useState(["", "", "", ""]);
  const [showGoButton, setShowGoButton] = useState(false);
  const [trafficLight, setTrafficLight] = useState(1);

  const handleGoClick = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numbers: inputs }),
      });
      const data = await response.json();
      setResult(data.result);

      if (data.result.xRoad > data.result.yRoad) {
        setTrafficLight(1);
      } else if (data.result.xRoad < data.result.yRoad) {
        setTrafficLight(2);
      } else {
        setTrafficLight(0);
      }

      setImages((prevImages) => {
        // left
        let updatedLeft = [];
        if (Array.isArray(data.result.left)) {
          updatedLeft = data.result.left;
        } else if (typeof data.result.left === "object") {
          updatedLeft = Object.values(data.result.left);
        } else {
          updatedLeft = [data.result.left];
        }

        // top
        let updatedTop = [];
        if (Array.isArray(data.result.top)) {
          updatedTop = data.result.top;
        } else if (typeof data.result.top === "object") {
          updatedTop = Object.values(data.result.top);
        } else {
          updatedTop = [data.result.top];
        }

        // right
        let updatedRight = [];
        if (Array.isArray(data.result.right)) {
          updatedRight = data.result.right;
        } else if (typeof data.result.right === "object") {
          updatedRight = Object.values(data.result.right);
        } else {
          updatedRight = [data.result.right];
        }

        // down
        let updatedBottom = [];
        if (Array.isArray(data.result.bottom)) {
          updatedBottom = data.result.bottom;
        } else if (typeof data.result.bottom === "object") {
          updatedBottom = Object.values(data.result.bottom);
        } else {
          updatedBottom = [data.result.bottom];
        }

        const newLeft = [
          ...prevImages.left.slice(updatedLeft.length),
          ...updatedLeft,
        ];
        const newTop = [
          ...prevImages.top.slice(updatedTop.length),
          ...updatedTop,
        ];
        const newRight = [
          ...updatedRight,
          ...prevImages.right.slice(updatedRight.length),
        ];
        const newBottom = [
          ...updatedBottom,
          ...prevImages.bottom.slice(updatedBottom.length),
        ];

        return {
          ...prevImages,
          left: newLeft,
          top: newTop,
          right: newRight,
          bottom: newBottom,
        };
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }
    setShowInputs(false);
    setShowGoButton(false);
  };

  const CircleDiv = () => {
    const handleInput = (index, value) => {
      const newInputs = [...inputs];
      newInputs[index] = value;
      setInputs(newInputs);

      setImages({
        top: [...initialPlaceholders],
        left: [...initialPlaceholders],
        right: [...initialPlaceholders],
        bottom: [...initialPlaceholders],
      });

      // Check if all inputs are filled
      if (newInputs.every((input) => input !== "")) {
        setShowGoButton(true);
      } else {
        setShowGoButton(false);
      }
    };

    return (
      <div className="col-2">
        <div className="row">
          <div className="col-4 text-center">
            <div
              className="circle"
              style={{ backgroundColor: "white", height: "30px" }}
            ></div>
          </div>
        </div>
        <div className="row">
          <div className="col-4 text-center">
            <div className=""></div>
          </div>
          <div className="col-4 text-center">
            <div
              className="circle"
              onClick={() => setShowInputs(true)}
              style={
                trafficLight === 0
                  ? {}
                  : trafficLight === 1
                  ? { backgroundColor: "red" }
                  : { backgroundColor: "green" }
              }
            >
              {showInputs && (
                <input
                  type="number"
                  style={{ width: "50px" }}
                  value={inputs[0]}
                  onChange={(e) => handleInput(0, e.target.value)}
                />
              )}
            </div>
          </div>
          <div className="col-4 text-center">
            <div className=""></div>
          </div>
        </div>
        <div className="row">
          <div className="col-4 text-center">
            <div
              className="circle"
              onClick={() => setShowInputs(true)}
              style={
                trafficLight === 0
                  ? {}
                  : trafficLight === 1
                  ? { backgroundColor: "green" }
                  : { backgroundColor: "red" }
              }
            >
              {showInputs && (
                <input
                  type="number"
                  style={{ width: "50px" }}
                  value={inputs[1]}
                  onChange={(e) => handleInput(1, e.target.value)}
                />
              )}
            </div>
          </div>
          <div className="col-4 text-center" style={{ margin: "auto" }}>
            <div
              className={showGoButton ? "circle go-button" : ""}
              onClick={handleGoClick}
            >
              {showGoButton && "GO"}
            </div>
          </div>
          <div className="col-4 text-center">
            <div
              className="circle"
              onClick={() => setShowInputs(true)}
              style={
                trafficLight === 0
                  ? {}
                  : trafficLight === 1
                  ? { backgroundColor: "green" }
                  : { backgroundColor: "red" }
              }
            >
              {showInputs && (
                <input
                  type="number"
                  style={{ width: "50px" }}
                  value={inputs[2]}
                  onChange={(e) => handleInput(2, e.target.value)}
                />
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4 text-center">
            
          </div>
          <div className="col-4 text-center">
            <div
              className="circle"
              onClick={() => setShowInputs(true)}
              style={
                trafficLight === 0
                  ? {}
                  : trafficLight === 1
                  ? { backgroundColor: "red" }
                  : { backgroundColor: "green" }
              }
            >
              {showInputs && (
                <input
                  type="number"
                  style={{ width: "50px" }}
                  value={inputs[3]}
                  onChange={(e) => handleInput(3, e.target.value)}
                />
              )}
            </div>
          </div>
          <div className="col-4 text-center">
            
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="container">
        <div className="row">
          {/* up */}
          <div className="col-1">
            <img src={"tree.png"} alt="tree.png"/>
          </div>
          <div className="col-3 offset-3 text-center">
            {images.top.map((src, index) => (
              <img
                key={`top-${index}`}
                src={
                  src === "https://via.placeholder.com/100"
                    ? "https://via.placeholder.com/100"
                    : `./img/${src}`
                }
                alt={`top ${index + 1}`}
                className="my-1 mx-1"
                style={{ width: "100px", height: "100px" }}
              />
            ))}
          </div>
          <div className="col-1">
            <img src={"tree.png"} alt="tree.png"/>
          </div>
        </div>
        {/* middle */}
        <div className="row">
          {/* left */}
          <div className="col-5 text-center">
            {images.left.map((src, index) => (
              <>
              <img
                key={`left-${index}`}
                src={
                  src === "https://via.placeholder.com/100"
                    ? "https://via.placeholder.com/100"
                    : `./img/${src}`
                }
                alt={`left ${index + 1}`}
                className="my-1"
                style={{ width: "100px", height: "100px" }}
              />
              </>
            ))}
          </div>
          {/* traffic */}

          <CircleDiv />

          {/* right */}
          <div className="col-5 text-center">
            {images.right.map((src, index) => (
              <img
                key={`right-${index}`}
                src={
                  src === "https://via.placeholder.com/100"
                    ? "https://via.placeholder.com/100"
                    : `./img/${src}`
                }
                alt={`right ${index + 1}`}
                className="my-1"
                style={{ width: "100px", height: "100px" }}
              />
            ))}
          </div>
        </div>
        {/* down */}
        <div className="row">
        <div className="col-1">
            <img src={"tree.png"} alt="tree.png"/>
          </div>
          <div className="col-3 offset-3 text-center">
            {images.bottom.map((src, index) => (
              <img
                key={`bottom-${index}`}
                src={
                  src === "https://via.placeholder.com/100"
                    ? "https://via.placeholder.com/100"
                    : `./img/${src}`
                }
                alt={`bottom ${index + 1}`}
                className="my-1 mx-1"
                style={{ width: "100px", height: "100px" }}
              />
            ))}
          </div>
          <div className="col-1">
            <img src={"tree.png"} alt="tree.png"/>
          </div>
          <div
              className="col font-weight-bold"
              style={
                trafficLight === 0
                  ? {}
                  : trafficLight === 1
                  ? { color: "green" }
                  : { color: "red" }
              }
            >
              XRoad: {result.xRoad}
            </div>
          <div
              className="col font-weight-bold"
              style={
                trafficLight === 0
                  ? {}
                  : trafficLight === 1
                  ? { color: "red" }
                  : { color: "green" }
              }
            >
              YRoad: {result.yRoad}
            </div>
        </div>
        
      </div>
    </>
  );
}

export default App;
