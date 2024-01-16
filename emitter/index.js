import { faker } from '@faker-js/faker';
import { Server } from 'socket.io';

const corsOptions = { cors: { origin: "*", methods: ["GET", "POST"] } };
const io = new Server(3050, corsOptions);

const createRandomUser = () => ({
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    avatar: faker.image.avatar(),
    email: faker.internet.email(),
    score: faker.number.int({ min: 0, max: 10000 }),
});

setInterval(() => io.emit("userData", createRandomUser()), 500);
