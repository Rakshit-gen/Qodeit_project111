import React from "react";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useRef } from "react";
import "./App.css";
import DatePicker from "react-datepicker";


function Calculator() {
  const [startDate, setStartDate] = useState(new Date());

  const topTier = [
    {
      title: "Academic",
      hg: 12,
      und: 15,
      bc: 21,
      prf: 25,
    },
    {
      title: "Editing",
      hg: 3,
      und: 5,
      bc: 7,
      prf: 13,
    },
    {
      title: "Calculations",
      hg: 18,
      und: 23,
      bc: 32,
      prf: 38,
    },
  ];
  //topindex =0 midindex=1 toptier[topindex][midTier[midindex]]

  const midTier = ["hg", "und", "bc", "prf"];
  const midtierDiv = useRef();
  const toptierDiv = useRef();
  const [tin, utin] = useState(0);
  const [midin, umidin] = useState(0);
  const [quantity, uquantity] = useState(1);
  const [pages, upages] = useState(true);

  const options = [
    { value: "Research paper", label: "Research paper" },
    { value: "Research proposal", label: "Research proposal" },
    { value: "Speech", label: "Speech" },
    { value: "Thesis", label: "Thesis" },
    { value: "Thesis proposal", label: "Thesis proposal" },
    { value: "Thesis statement", label: "Thesis statement" },
  ];

  function tophandleClick(e) {
    const tierDivChildren = toptierDiv.current.childNodes;

    for (let i = 0; i < tierDivChildren.length; ++i) {
      tierDivChildren[i].classList.remove("highlight");
    }

    if (e.target.getAttribute("data-id")) {
      utin(e.target.getAttribute("data-id"));
      e.target.classList.add("highlight");
    }

    if (e.target.parentElement.getAttribute("data-id")) {
      utin(e.target.parentElement.getAttribute("data-id"));
      e.target.parentElement.classList.add("highlight");
    }
  }

  function midhandleClick(e) {
    const tierDivChildren = midtierDiv.current.childNodes;

    for (let i = 0; i < tierDivChildren.length; ++i) {
      tierDivChildren[i].classList.remove("highlight");
    }

    if (e.target.getAttribute("data-id")) {
      umidin(e.target.getAttribute("data-id"));
      e.target.classList.add("highlight");
    }

    if (e.target.parentElement.getAttribute("data-id")) {
      umidin(e.target.parentElement.getAttribute("data-id"));
      e.target.parentElement.classList.add("highlight");
    }
  }

  function handlePW(e) {
    upages((p) => !p);
  }

  return (
    <div style={{width:'720px', height:'720px', backgroundColor:'#c1c1ff', margin:'auto'}}>
    <div className="calc" style={{width:'700px', height:'700px', margin:'auto', backgroundColor:'white'}}>
    <div className="calculator-cover">
      <div className="calculator">
        <div
          id="top-tier"
          className="tier"
          onClick={tophandleClick}
          ref={toptierDiv}
        >
          <div data-id={0} className="btn-tier highlight" style={{backgroundColor:'#9376be', color:'white'}}>
            <p>Academic writing</p>
          </div>
          <div data-id={1} className="btn-tier" style={{backgroundColor:'#9376be', color:'white'}}>
            <p>Editing and proofreading</p>
          </div>
          <div data-id={2} className="btn-tier" style={{backgroundColor:'#9376be', color:'white'}}>
            <p>Calculations</p>
          </div>
        </div>

        <div
          id="mid-tier"
          className="tier"
          onClick={midhandleClick}
          ref={midtierDiv}
        >
          <div data-id={0} className="btn-tier  highlight" style={{backgroundColor:'#9376be', color:'white'}}>
            <p>High school</p>
          </div>
          <div data-id={1} className="btn-tier" style={{backgroundColor:'#9376be', color:'white'}}>
            <p>Undergraduate</p>
          </div>
          <div data-id={2} className="btn-tier" style={{backgroundColor:'#9376be', color:'white'}}>
            <p> Bachelor</p>
          </div>
          <div data-id={3} className="btn-tier" style={{backgroundColor:'#9376be', color:'white'}}>
            <p>Professional</p>
          </div>
        </div>
        <div className="paper-select">
          <p>Type of paper</p>
          <label>
            <Select className={"select-box"} options={options} loading />
          </label>
        </div>
        <div className="quantity-c">
          <div className="pw-ip-c">
            <div>
              <p>Quantity</p>
              <div className="quantity">
                <label>
                  <input
                    type="number"
                    style={{border:'1px solid black'}}
                    onChange={(e) => {
                      if (e.target.value != 0 && e.target.value <= 100)
                        uquantity(e.target.value);
                    }}
                    value={pages ? quantity : quantity * 275}
                  ></input>
                </label>
              </div>
            </div>
            <div className="pw-c">
              <div className="pw">
                <div className={pages ? "highlight" : ""} onClick={handlePW} style={{backgroundColor:'#9376be', color:'white', textAlign:'center'}}>
                  Pages
                </div>
                <div className={!pages ? "highlight" : ""} onClick={handlePW} style={{backgroundColor:'#9376be', color:'white', textAlign:'center'}}>
                  Words
                </div>
              </div>
            </div>
          </div>

          <div className="calen-c">
            <p>Deadline</p>
            <div className="calen">
              <label style={{border:'1px solid black'}}>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="price-c">
          <div className="price-main">
            <p>Approx. Price</p>
            <div className="price">
              <h2>${quantity * topTier[tin][midTier[midin]]}</h2>
            </div>
          </div>
          <div className="order-btn">
            <button style={{backgroundColor:'orange', color:'black'}}>PROCEED TO ORDER</button>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Calculator;
