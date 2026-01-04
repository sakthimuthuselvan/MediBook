import { Router } from "express";
import { getAllDoctors, getDoctorById, createDoctor, updateDoctor } from "../controllers/doctor.controller.js";

const router: Router = Router();

// Routes
router.get("/", getAllDoctors);          // GET /api/doctors
router.get("/:id", getDoctorById);      // GET /api/doctors/:id
router.post("/", createDoctor);         // POST /api/doctors
router.put("/:id", updateDoctor);       // PUT /api/doctors/:id
// router.delete("/:id", deleteDoctor);    // DELETE /api/doctors/:id

export default router;
