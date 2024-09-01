import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [inputValue, setInputValue] = useState("");
  const [colorOne, setColorOne] = useState("#ffffff");
  const [colorSec, setColorSec] = useState("#000000");
  const [boxes, setBoxes] = useState([]);

  const addBtnHandler = () => {
    if (inputValue.trim() === "") {
      alert("Please enter some text before adding a box.");
      return;
    }
    const defalutColor = "#ffffff";
    if (colorOne === defalutColor || colorSec == defalutColor) {
      alert("Please choose colors before adding a box.");
      return;
    }

    const newBox = {
      text: inputValue,
      bgColor: colorOne,
      textColor: colorSec,
      createdAt: Date.now(),
      remainingTime: 30000,
    };

    setBoxes((prevBoxes) => [...prevBoxes, newBox]);
    setInputValue("");
    setColorOne("#ffffff");
    setColorSec("#000000");
  };

  useEffect(() => {
    const timers = boxes.map((box, index) => {
      return setInterval(() => {
        setBoxes((prevBoxes) =>
          prevBoxes
            .map((item, i) => {
              if (i === index) {
                const timePassed = Date.now() - item.createdAt;
                const newRemainingTime = Math.max(30000 - timePassed, 0);
                if (newRemainingTime === 0) {
                  clearInterval(timers[index]);
                  return null;
                }
                return { ...item, remainingTime: newRemainingTime };
              }
              return item;
            })
            .filter(Boolean)
        );
      }, 1000);
    });

    return () => timers.forEach(clearInterval);
  }, [boxes]);

  const NavbarStyle = {
    minWidth: "500px",
    height: "80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    color: "darkblue",
    backgroundColor: "#333333",
    padding: "20px",
    borderRadius: "5px",
    textAlign: "center",
  };

  const InputField = {
    width: "200px", // Fixed typo: widht -> width
    borderRadius: "4px",
    border: "1px solid #ccc",
    padding: "10px",
  };

  const InputStyle = {
    padding: "5px",
    border: "none",
    backgroundColor: "white",
  };

  const addBtn = {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const boxcontainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
    padding: "20px",
    marginTop: "20px",
  };
  const box = {
    width: "200px",
    height: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: "10px",
    boxShadow: "0 4px 10px #0000001a",
    flexWrap: "wrap",
    transition: "transform .3s ease",
    textAlign: "center",
    position: "relative",
  };

  const TimeS = {
    position: "absolute",
    bottom: "0",
    right: "0",
    padding: " 5px",
    borderRadius: "5px",
    margin: "0 0 2px 0 ",
    boxShadow: "0 2px 2px rgba(0, 0, 0, 0.4)",
  };

  return (
    <>
      <div style={NavbarStyle}>
        <input
          style={InputField}
          placeholder="Enter text"
          id="inputField"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <input
          style={InputStyle}
          id="inputFieldColorOne"
          value={colorOne}
          type="color"
          onChange={(e) => setColorOne(e.target.value)}
        />
        <input
          style={InputStyle}
          id="inputFieldColorSec"
          type="color"
          value={colorSec}
          onChange={(e) => setColorSec(e.target.value)}
        />
        <button style={addBtn} onClick={addBtnHandler}>
          Add
        </button>
      </div>
      <div style={boxcontainer}>
        {boxes.map((boxItem, index) => (
          <div
            key={index}
            style={{
              ...box,
              backgroundColor: boxItem.bgColor,
              color: boxItem.textColor,
            }}
          >
            <h2>{boxItem.text}</h2>
            <p style={TimeS}>
              Time Left: {Math.ceil(boxItem.remainingTime / 1000)}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
