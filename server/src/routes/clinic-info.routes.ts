import { Router } from "express";
import { clinicInfoFun, updateClinicInfo, deleteClinicInfo } from "../controllers/clinic_info.js"; // ESM import

const router: Router = Router();

// GET /api/clinic-info
router.get("/", clinicInfoFun); 
router.post("/update/:id", updateClinicInfo); //api/clinic-info/update/:id
router.delete("/:id", deleteClinicInfo);  // PUT /api/doctors/:id
  // PUT /api/doctors/:id

export default router;
