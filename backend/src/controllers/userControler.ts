import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UsersController {
    async register(req: Request, res: Response) {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: "username, email and password are required" });
        }
        try {
            const user = await prisma.user.create({
                data: {
                    username,
                    email,
                    password, // In a real application, make sure to hash the password
                },
            });
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: "Error registering user" });
        }
    }

    async authenticate(req: Request, res: Response) {
        const { username, password } = req.body;
        try {
            const user = await prisma.user.findFirst({
                where: { username },
            });
            if (user && user.password === password) { // In a real application, compare hashed passwords
                res.status(200).json({ message: "Authentication successful" });
            } else {
                res.status(401).json({ error: "Invalid credentials" });
            }
        } catch (error) {
            res.status(500).json({ error: "Error authenticating user" });
        }
    }
}

export default new UsersController();