import { Router } from "express";
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  changeAppointmentStatus,
} from "../controllers/appointment.controller.js";

const router = Router();

router.get("/", getAppointments);
router.post("/create", createAppointment); // api/appointments/create
router.get("/:id", getAppointmentById);
router.put("/:id", updateAppointment);
router.put("/status/:id", changeAppointmentStatus);
router.delete("/:id", deleteAppointment);

export default router;
