import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seed = async () => {
    try {
        // Clear existing data
        await prisma.alert.deleteMany();
        await prisma.user.deleteMany();

        // Seed users
        const user1 = await prisma.user.create({
            data: {
                username: 'admin',
                email: 'admin@example.com',
                password: 'securepassword',
            },
        });

        const user2 = await prisma.user.create({
            data: {
                username: 'user1',
                email: 'user1@example.com',
                password: 'securepassword',
            },
        });

        // Seed alerts
        await prisma.alert.createMany({
            data: [
                {
                    title: 'Flood Alert',
                    description: 'Heavy rainfall expected in the area.',
                    userId: user1.id,
                },
                {
                    title: 'Traffic Alert',
                    description: 'Accident reported on the main road.',
                    userId: user2.id,
                },
            ],
        });

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await prisma.$disconnect();
    }
};

seed();