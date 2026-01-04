import AboutCom from '@/components/AboutCom/page'
import DoctorsCom from '@/components/DoctorsCom/page'
import FooterCom from '@/components/Footer/page'
import NavBarCom from '@/components/NavBarCom/page'
import ScheduleCom from '@/components/ScheduleCom/page'
import { serverFetch } from '@/lib/ServerApi'

async function getInfoDetails() {

  const res = await serverFetch("/clinic-info", {
    method: "GET",
    revalidate: true
  })

  if (!res.success) {
    <div>Not Found</div>
  }

  return res?.data?.response_data?.[0] || [];
}


async function getDoctorsData() {
  const res = await serverFetch("/doctors", {
    method: "GET"
  })

  if (!res.success) {
    <div>Not Found</div>
  }

  return res?.data?.data || [];
}

export default async function DoctorSection() {
  const overallInfoData = await getInfoDetails();
  const overallDoctorList = await getDoctorsData();

  const navProps = {
    clinic_name: overallInfoData?.clinicName || "",
    phone_number: overallInfoData?.phone || "",
    email: overallInfoData?.email || "",
  }
  const aboutProps = {
    phone_number: overallInfoData?.phone || "",
    workingHours: overallInfoData?.workingHours || {}
  }
  const scheduleProps = {
    scheduleData: overallInfoData?.consultations || []
  }
  const doctorProps = {
    overallDoctorList: overallDoctorList || []
  }
  return (
    <div>
      <NavBarCom {...navProps} />
      <AboutCom {...aboutProps} />
      <ScheduleCom {...scheduleProps} />
      <DoctorsCom {...doctorProps} />
      <FooterCom />
    </div>
  )
}
