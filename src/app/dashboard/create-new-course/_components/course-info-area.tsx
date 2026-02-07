"use client";

import { useState } from "react";
import Image from "next/image";
import { InfoTwoSvg, PenThreeSvg, SettingTwoSvg } from "@/components/svg";
const getTodayDate = () => {
  const d = new Date();

  const day = String(d.getDate()).padStart(2, "0");
  const monthNames = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];
  const month = monthNames[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${month} ${year}`;   // → "06 Feb 2026"
};


type RentalForm = {
  from: string;
  to: string;
  date: string;
  plate: string;
  model: string;
  period: string;
  rate: string;
  vehicle: string;
  IncluPlus?: string;
};

export default function CourseInfoArea() {
  const [form, setForm] = useState<RentalForm>({
    from: "legendary",
    to: "",
    date: getTodayDate(),
    plate: "",
    model: "",
    period: "",
    rate: "",
    vehicle: "",
    IncluPlus: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generatePDF = async () => {
    const res = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      alert("PDF generation failed!");
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `lpo-${form.from}.pdf`;
    a.click();
  };

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button tpd-new-course-heading-title"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#panelsStayOpen-collapseOne"
        >
          Legendary LPO System
        </button>
      </h2>

      <div
        id="panelsStayOpen-collapseOne"
        className="accordion-collapse collapse show"
      >
        <div className="accordion-body">
          {/* LEFT BOX */}
          <div className="tpd-new-course-box-1">
            <div className="tpd-input">
              <label>From</label><br></br>
              <select
                style={{
                  width: "50%",
                  padding: "8px 10px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                  backgroundColor: "#fff",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
                name="from"
                value={form.from}
                onChange={handleChange}
              >
                <option value="legendary">Legendary</option>
                <option value="tiffany">Tiffany</option>
              </select>
            </div>

            <div className="tpd-input">
              <label>TO:</label>
              <input type="text"name="to" value={form.to} onChange={handleChange} />
            </div>

            <div className="tpd-input">
              <label>Date</label>
              <input 
                type="text"
                name="date"
                value={form.date}
                onChange={handleChange} 
                placeholder="06 Feb 2026"
              />
            </div>

            <div className="tpd-input">
              <label>Vehicle</label>
              <input
                type="text"
                name="vehicle"
                value={form.vehicle}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* RIGHT BOX */}
          <div className="tpd-new-course-box-2">
            <h4 className="tpd-new-course-setting-title">
              Vehicle Details
            </h4>

            <div className="tp-dashboard-tab-list">
              
            </div>

            <div className="tpd-input">
              <label>Plate Number</label>
              <input
                type="text"
                name="plate"
                value={form.plate}
                onChange={handleChange}
              />
              <p>
                <span>
                  <InfoTwoSvg />
                </span>
                Vehicle registration plate
              </p>
            </div>

            <div className="tpd-input">
              <label>Model</label>
              <input
                type="text"
                name="model"
                value={form.model}
                onChange={handleChange}
              />
            </div>

            <div className="tpd-input">
              <label>Rental Period (Days)</label>
              <input
                type="text"
                name="period"
                value={form.period}
                onChange={handleChange}
              />
            </div>

            <div className="tpd-input">
              <label>Rate (AED / Day)</label>
              <input
                type="text"
                placeholder="  Only write a amount value"
                name="rate"
                value={form.rate}
                onChange={handleChange}
              />
            </div>

            <div className="tpd-input">
              <label>Including or Plus</label>
              <input
                type="text"
                name="IncluPlus"
                value={form.IncluPlus}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* BOTTOM BOX */}
          <div className="tpd-new-course-box-3">
            <div className="tpd-new-course-categories">
              <div className="tpd-input course-file">
                
                <div
                  className="tpd-new-course-file-content text-center"
                  style={{
                    backgroundImage:
                      "url(/assets/img/dashboard/bg/select-file.png)",
                  }}
                >
                  
                  {/* <span className="upload-btn">
                    
                    <label htmlFor="tpd-new-course-file-input">
                     Generate PDF
                    </label>
                  </span> */}
                  
                   <span className="upload-btn">
                    <button
                      type="button"
                      onClick={generatePDF}
                      style={{
                        textAlign: "center",
                        cursor: "pointer",
                        width: "255px",
                        color: "var(--tp-common-white)",
                        backgroundColor: "#c8a429",
                        borderRadius: "6px",
                        marginBottom: "15px",
                        padding: "7px 20px",
                        fontSize: "18px",
                        fontWeight: 500,
                        transition: "all .3s ease-out",
                        boxShadow: "0 10px 20px #14370333",
                        display: "inline-block",
                        border: "none",
                      }}
                    >
                      Generate PDF
                    </button>
                  </span>


                </div>
              </div>

             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
