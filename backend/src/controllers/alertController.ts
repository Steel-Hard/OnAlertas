import { Request, Response } from "express";
import { PrismaClient, Alert as PrismaAlert } from "@prisma/client";

const prisma = new PrismaClient();

// Converte o modelo do Prisma (banco) para o modelo usado no frontend (UrbanAlert)
function mapAlertToFrontend(alert: PrismaAlert) {
  return {
    id: String(alert.id),
    title: alert.title,
    description: alert.description,
    type: alert.severity, // mapeia severity -> type
    status: alert.isResolved ? "resolvido" : "ativo",
    location: alert.local,
    createdAt: alert.createdAt.toISOString(),
  };
}

class AlertsController {
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const alerts = await prisma.alert.findMany();
      const mapped = alerts.map(mapAlertToFrontend);
      return res.status(200).json(mapped);
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

      return res.status(200).json(mapAlertToFrontend(alert));
    } catch (error) {
      return res.status(500).json({ message: "Error fetching alert", error });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      // Front envia: title, description, type, location
      const { title, description, type, location } = req.body;

      const alert = await prisma.alert.create({
        data: {
          title,
          description,
          severity: type, // salva tipo em severity
          local: location, // salva localização em local
          // isResolved e createdAt usam defaults do schema
        },
      });

      return res.status(201).json(mapAlertToFrontend(alert));
    } catch (error) {
      return res.status(500).json({ message: "Error creating alert", error });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      // Front envia um objeto UrbanAlert com: title, description, type, status, location
      const { title, description, type, status, location } = req.body;

      const alert = await prisma.alert.update({
        where: { id: Number(id) },
        data: {
          title,
          description,
          severity: type,
          local: location,
          isResolved: status === "resolvido",
        },
      });

      return res.status(200).json(mapAlertToFrontend(alert));
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