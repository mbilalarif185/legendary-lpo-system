import { Metadata } from "next";
import CreateNewCourseArea from "./dashboard/create-new-course/_components/create-new-course-area";

export const metadata: Metadata = {
   title: "Legendary LPO System",
}

export default function CreateNewCoursePage() {
   return (
      <main className="tp-dashboard-body-bg">

         {/* create new course area start */}
         <CreateNewCourseArea/>
         {/* create new course area end */}

      </main>
   )
}
