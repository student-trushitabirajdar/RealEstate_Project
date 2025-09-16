RealEstate Server

TypeScript Express backend with Prisma ORM.

Scripts

- dev: Run in watch mode
- build: Compile TypeScript
- start: Run compiled code

Environment

Copy `.env.example` to `.env` and adjust values.

Prisma

- Development uses SQLite. To migrate to MySQL later, change `provider` in `prisma/schema.prisma` to `mysql`, update `DATABASE_URL`, then run `npx prisma migrate diff` and `npx prisma migrate deploy` in your deployment pipeline.


