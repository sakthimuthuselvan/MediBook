import { Router } from "express";
import ClinicInfo from "./clinic-info.routes.js"
import doctorRoutes from "./doctor.routes.js"
import appointmentRoutes from "./appointment.routes.js"

const router: Router = Router();

router.use("/clinic-info", ClinicInfo);
router.use("/doctors", doctorRoutes);
router.use("/appointments", appointmentRoutes);


export default router;
