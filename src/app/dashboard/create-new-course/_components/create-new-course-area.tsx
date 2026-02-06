
import CourseInfoArea from "./course-info-area";



const listData = [
   "Choose either Legendary or Tiffany from the “From” dropdown before filling the form",
   "Enter all requested information such as To, Date, Vehicle, Plate Number, Model, Rental Period, and Rate in the form fields..",
   "Double-check all entered details to ensure accuracy before generating the document",
   "Press the Generate PDF button to automatically create a formatted LPO letter based on your inputs",
   "The system will download the file automatically, which you can then print, email, or store for records.",
];

export default function CreateNewCourseArea() {
   return (
      <main className="tp-dashboard-body-bg p-relative">
         <div className="tpd-dashboard-wrap-bg" style={{ backgroundImage: "url(/assets/img/dashboard/bg/dashboard-bg-shape-1.jpg)" }}>

            {/* create new course area start */}
            <section className="tpd-new-course-area pt-80 pb-120">
               <div className="container">
                  <div className="row">
                     <div className="col-lg-8">
                        <div className="tpd-new-course-wrap">
                           <div className="tpd-new-course-box">

                              <div className="accordion" id="accordionPanelsStayOpenExample">

                                 {/* course info area start */}
                                 <CourseInfoArea />
                                 {/* course info area end */}



                              </div>

                           </div>
                        </div>
                     </div>
                     <div className="col-lg-4">
                        <div className="tpd-course-enroll-list">
                           <h2 className="tp-dashboard-title">How to use Legendary LPO System?</h2>
                           <ul>
                              {listData.map((tip, index) => (
                                 <li key={index}>
                                    <span>{index + 1}. </span>
                                    {tip}
                                 </li>
                              ))}
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            {/* create new course area end */}

         </div>
      </main>
   )
}
