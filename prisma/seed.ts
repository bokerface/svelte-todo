import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	console.log('seeding...');

	await prisma.todo.create({
		data: {
			description: 'Learn Prisma',
			done: false
		}
	});

	console.log('done');
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
