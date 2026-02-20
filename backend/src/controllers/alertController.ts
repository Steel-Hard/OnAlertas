import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AlertsController {

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const alerts = await prisma.alert.findMany();
      return res.status(200).json(alerts);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching alerts", error });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const alert = await prisma.alert.findUnique({
        where: { id: Number(id) },
      });

      if (!alert) {
        return res.status(404).json({ message: "Alert not found" });
      }

      return res.status(200).json(alert);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching alert", error });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { title, description, severity, local } = req.body;

      const alert = await prisma.alert.create({
        data: {
          title,
          description,
          severity,
          local,
        },
      });

      return res.status(201).json(alert);
    } catch (error) {
      return res.status(500).json({ message: "Error creating alert", error });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { title, description, severity, local } = req.body;

      const alert = await prisma.alert.update({
        where: { id: Number(id) },
        data: {
          title,
          description,
          severity,
          local,
        },
      });

      return res.status(200).json(alert);
    } catch (error) {
      return res.status(500).json({ message: "Error updating alert", error });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      await prisma.alert.delete({
        where: { id: Number(id) },
      });

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Error deleting alert", error });
    }
  }
}

export default new AlertsController();