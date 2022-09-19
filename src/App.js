import "./App.css";
import React, { useState, useEffect } from "react";
import Icons from "./components/Icons";
const itemArray = new Array(9).fill("empty");
function App() {
  const [isCross, setIsCross] = useState(true);
  const [winMessage, setWinMessage] = useState("");
  const [results, setResults] = useState([]);
  const [disp, setDisp] = useState("none");
  const [resultDisp, setresultDisp] = useState("none");

  useEffect(() => {
    if (localStorage.getItem("results")) {
      let data = localStorage.getItem("results");
      let parsedData = JSON.parse(data);
      setResults(parsedData);
      if (parsedData[4] % 2 !== 0) {
        setIsCross(false);
      } else {
        setIsCross(true);
      }
    } else {
      let name1 = prompt("Enter Player1 name");
      let name2 = prompt("Enter player2 name:");
      if (!name1) {
        name1 = "Player1";
      }
      if (!name2) {
        name2 = "Player2";
      }
      let result = [name1, name2, 0, 0, 0, 0];
      let data = JSON.stringify(result);
      localStorage.setItem("results", data);
      setResults(result);
    }
    displayMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winMessage]);

  const editResults = (a, b, c) => {
    if (a) {
      results[2]++;
      results[4]++;
      let data = JSON.stringify(results);
      localStorage.setItem("results", data);
    } else if (b) {
      results[3]++;
      results[4]++;
      let data = JSON.stringify(results);
      localStorage.setItem("results", data);
    } else if (c) {
      results[5]++;
      results[4]++;
      let data = JSON.stringify(results);
      localStorage.setItem("results", data);
    }
  };

  const displayMessage = () => {
    if (winMessage) {
      setresultDisp("block");
    }
  };

  const handleClick = (i) => {
    if (itemArray[i] === "empty") {
      itemArray[i] = isCross ? "cross" : "circle";
      setIsCross(!isCross);
    } else {
      alert("position Taken already");
    }
    checkIsWinner();
  };

  const handleResults = () => {
    if (disp === "none") {
      setDisp("flex");
    } else {
      setDisp("none");
    }
  };

  const reloadGame = () => {
    console.log("clicked");
    setIsCross(true);
    setWinMessage("");
    itemArray.fill("empty", 0, 9);
    window.location.reload();
  };

  const computeResults = (tm, dr, sc) => {
    let num1 = tm - dr;
    let lost = num1 - sc;
    return lost;
  };

  const checkIsWinner = () => {
    if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[1] &&
      itemArray[1] === itemArray[2]
    ) {
      itemArray[0] === "cross"
        ? editResults(true, false, false)
        : editResults(false, true, false);
      setWinMessage(
        itemArray[0] === "cross" ? `${results[0]} Won` : `${results[1]} Won`
      );
    } else if (
      itemArray[3] !== "empty" &&
      itemArray[3] === itemArray[4] &&
      itemArray[4] === itemArray[5]
    ) {
      itemArray[3] === "cross"
        ? editResults(true, false, false)
        : editResults(false, true, false);
      setWinMessage(
        itemArray[3] === "cross" ? `${results[0]} Won` : `${results[1]} Won`
      );
    } else if (
      itemArray[6] !== "empty" &&
      itemArray[6] === itemArray[7] &&
      itemArray[7] === itemArray[8]
    ) {
      itemArray[6] === "cross"
        ? editResults(true, false, false)
        : editResults(false, true, false);
      setWinMessage(
        itemArray[6] === "cross" ? `${results[0]} Won` : `${results[1]} Won`
      );
    } else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[3] &&
      itemArray[3] === itemArray[6]
    ) {
      itemArray[0] === "cross"
        ? editResults(true, false, false)
        : editResults(false, true, false);
      setWinMessage(
        itemArray[0] === "cross" ? `${results[0]} Won` : `${results[1]} Won`
      );
    } else if (
      itemArray[1] !== "empty" &&
      itemArray[1] === itemArray[4] &&
      itemArray[4] === itemArray[7]
    ) {
      itemArray[1] === "cross"
        ? editResults(true, false, false)
        : editResults(false, true, false);
      setWinMessage(
        itemArray[1] === "cross" ? `${results[0]} Won` : `${results[1]} Won`
      );
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[5] &&
      itemArray[5] === itemArray[8]
    ) {
      itemArray[2] === "cross"
        ? editResults(true, false, false)
        : editResults(false, true, false);
      setWinMessage(
        itemArray[2] === "cross" ? `${results[0]} Won` : `${results[1]} Won`
      );
    } else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[4] &&
      itemArray[4] === itemArray[8]
    ) {
      itemArray[0] === "cross"
        ? editResults(true, false, false)
        : editResults(false, true, false);
      setWinMessage(
        itemArray[0] === "cross" ? `${results[0]} Won` : `${results[1]} Won`
      );
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[4] &&
      itemArray[4] === itemArray[6]
    ) {
      itemArray[2] === "cross"
        ? editResults(true, false, false)
        : editResults(false, true, false);
      setWinMessage(
        itemArray[2] === "cross" ? `${results[0]} Won` : `${results[1]} Won`
      );
    } else {
      let finish = true;
      for (let x in itemArray) {
        if (itemArray[x] === "empty") {
          finish = false;
        }
      }
      if (finish) {
        editResults(false, false, true);
        setWinMessage("Match Drawn");
      }
    }
  };

  const restartGame = () => {
    let resp = window.confirm("Start New Match");
    if (resp) {
      localStorage.removeItem("results");
      window.location.reload();
    }
  };

  const dismissMessage = () => {
    setresultDisp("none");
    itemArray.fill("empty", 0, 9);
    setWinMessage("");
  };

  return (
    <>
      <div>
        <div
          style={{
            display: `${resultDisp}`,
            position: "absolute",
            height: "100vh",
            width: "100vw",
            background:"lightcyan",
            opacity:0.8
          }}
        >
          <div style={{
              padding: "10px",
              position: "absolute",
              top: "45vh",
              left: "45vw",
              color: "#07e61e",
              letterSpacing:"3px",
              fontWeight:"800"
            }}>
          <h2>
            {winMessage}
          </h2>
          <button onClick={dismissMessage}>
            OK&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color:"red"}}></span>
          </button>
          </div>
        </div>
        <h2
          style={{ textAlign: "center", background: "black", color: "white" }}
        >
          TicTacToe Game
        </h2>
        <div
          id="results"
          style={{
            position: "absolute",
            zIndex: 1,
            display: `${disp}`,
            width: "100vw",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              height: "40vh",
              width: "80vw",
              background: "#b0c9bbef",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            <span
              style={{
                fontSize: "40px",
                float: "right",
                position: "relative",
                top: "-40px",
                left: "20px",
                background: "#caa8a8",
                borderRadius: "50%",
                padding: "4px 8px",
                cursor: "pointer",
              }}
              onClick={handleResults}
            >
              X
            </span>
            <table>
              <thead>
                <tr style={{ backgroundColor: "#0cc83e",opacity:"0.7" }}>
                  <th>Name</th>
                  <th>Total Matches</th>
                  <th>Win</th>
                  <th>Lost</th>
                  <th>Draw</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ backgroundColor: "red",opacity:"0.7" }}>
                  <td>{results[0]}</td>
                  <td>{results[4]}</td>
                  <td>{results[2]}</td>
                  <td>
                    {computeResults(
                      results[4],
                      results[5],
                      results[2]
                    ).toString()}
                  </td>
                  <td>{results[5]}</td>
                </tr>
                <tr style={{ background: "blue",opacity:"0.7" }}>
                  <td>{results[1]}</td>
                  <td>{results[4]}</td>
                  <td>{results[3]}</td>
                  <td>
                    {computeResults(
                      results[4],
                      results[5],
                      results[3]
                    ).toString()}
                  </td>
                  <td>{results[5]}</td>
                </tr>
                <tr>
                  <td
                    colSpan={5}
                    style={{
                      background: results[2] > results[3] ? "red" : "blue",opacity:"0.7"
                    }}
                  >
                    {results[2] === results[3]
                      ? "Score Equal"
                      : results[2] > results[3]
                      ? `${results[0]} is ahead.`
                      : `${results[1]} is ahead`}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ width: "80vw", margin: "4px auto" }}>
          <h2 style={{ color: "red", margin: "2px 0px" }}>
            Cross is: {results[0]}
          </h2>
          <h2 style={{ color: "blue", margin: "2px 0px" }}>
            Circle is: {results[1]}
          </h2>
        </div>

        {isCross ? (
          <h2
            style={{ textAlign: "center", color: "red", margin: "20px 0px" }}
          >{`${results[0]} Turn`}</h2>
        ) : (
          <h2
            style={{ textAlign: "center", color: "blue", margin: "20px 0px" }}
          >{`${results[1]} Turn`}</h2>
        )}

        <div
          style={{
            width: "80vw",
            minHeight: "350px",
            margin: "auto",
            display: "flex",
            background: "#c5a2c9",
            flexWrap: "wrap",
            padding: "20px 0px",
          }}
        >
          {itemArray.map((val, i) => {
            return (
              <div
                style={{
                  flex: "31%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "8px 0px",
                  cursor: "pointer",
                }}
                onClick={() => handleClick(i)}
                key={i}
              >
                <Icons key={i} name={val} />
              </div>
            );
          })}
        </div>

        <div style={{ width: "80vw", margin: "auto" }}>
          <button onClick={restartGame}>Start New match</button>

          <button onClick={reloadGame}>Reload Game</button>

          <button onClick={handleResults}>Check Results</button>
        </div>
      </div>
    </>
  );
}

export default App;
