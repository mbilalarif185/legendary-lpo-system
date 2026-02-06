"use client";

import { useState } from "react";
import Image from "next/image";
import { InfoTwoSvg, PenThreeSvg, SettingTwoSvg } from "@/components/svg";

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
    date: "",
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
              <label>From</label>
              <select
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
              <input name="to" value={form.to} onChange={handleChange} />
            </div>

            <div className="tpd-input">
              <label>Date</label>
              <input name="date" value={form.date} onChange={handleChange} />
            </div>

            <div className="tpd-input">
              <label>Vehicle</label>
              <input
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
                name="model"
                value={form.model}
                onChange={handleChange}
              />
            </div>

            <div className="tpd-input">
              <label>Rental Period (Days)</label>
              <input
                name="period"
                value={form.period}
                onChange={handleChange}
              />
            </div>

            <div className="tpd-input">
              <label>Rate (AED / Day)</label>
              <input
                placeholder="  Only write a amount value"
                name="rate"
                value={form.rate}
                onChange={handleChange}
              />
            </div>

            <div className="tpd-input">
              <label>Including or Plus</label>
              <input
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
