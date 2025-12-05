const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Create Admins
    const admin = await prisma.user.upsert({
        where: { email: 'admin@likids.com' },
        update: {},
        create: {
            id: 'u1',
            name: 'Admin User',
            email: 'admin@likids.com',
            role: 'admin',
            phoneNumber: '010-0000-0000',
        },
    });

    // Create Parents
    const parent = await prisma.user.upsert({
        where: { email: 'parent@likids.com' },
        update: {},
        create: {
            id: 'u2',
            name: 'Parent User',
            email: 'parent@likids.com',
            role: 'parent',
            phoneNumber: '010-1234-5678',
        },
    });

    // Create Programs
    await prisma.program.create({
        data: {
            id: 'p1',
            title: 'Forest Adventure: Bug Hunting',
            description: 'Join us for an exciting day in the forest looking for rare bugs!',
            thumbnail: 'https://images.unsplash.com/photo-1596464716127-f9a8f4e24390?q=80&w=800',
            date: new Date('2024-06-15T10:00:00Z'),
            location: 'Seoul Forest, Entrance 3',
            status: 'recruiting',
            maxParticipants: 10,
            currentParticipants: 4,
            price: 30000,
            images: JSON.stringify([
                "https://images.unsplash.com/photo-1596464716127-f9a8f4e24390?q=80&w=800",
                "https://images.unsplash.com/photo-1444212477490-ca407925329e?q=80&w=800"
            ])
        }
    });

    await prisma.program.create({
        data: {
            id: 'p2',
            title: 'Pottery Class: Make Your Own Bowl',
            description: 'Hands-on pottery class for kids.',
            thumbnail: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800',
            date: new Date('2024-05-20T14:00:00Z'),
            location: 'Pottery Studio, Gangnam',
            status: 'completed',
            maxParticipants: 8,
            currentParticipants: 8,
            price: 45000,
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            images: JSON.stringify([
                "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800"
            ])
        }
    });

    console.log({ admin, parent });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
