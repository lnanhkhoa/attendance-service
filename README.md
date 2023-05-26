
# Attendance service

Backend Test


## Features

- Login
- Dashboard Administrator
- School list
- School detail 
- Checkin/checkout page

## Tech Stack

**Client:** React.js, Next.js, TailwindCSS, Zustand, [Notus JS Template](https://www.creative-tim.com/learning-lab/tailwind/js/overview/notus)

**Server:** Node, [Keystonejs](https://keystonejs.com/), Prisma, GraphQL

**Package management**: [pnpm](https://pnpm.io/)

**Tools**: [nx](https://nx.dev/)
## Screenshots

![App Screenshot](https://i.ibb.co/MDn6kqz/screencapture-157-230-37-61-4001-admin-dashboard-2023-05-26-22-09-27.png)

![App Screenshot](https://i.ibb.co/Q9SNvHs/screencapture-157-230-37-61-4001-admin-school-cli421r7x00rq5emz8ps57q6f-2023-05-26-22-09-55.png)

![App Screenshot](https://i.ibb.co/QvjyGp6/screencapture-157-230-37-61-4001-admin-schools-2023-05-26-22-09-38.png)

[image_1](https://i.ibb.co/QvjyGp6/screencapture-157-230-37-61-4001-admin-schools-2023-05-26-22-09-38.png)
[image_2](https://i.ibb.co/vP4cjVZ/screencapture-157-230-37-61-4001-attendance-2023-05-26-22-10-21.png)
[image_3](https://i.ibb.co/JsHb2xK/screencapture-157-230-37-61-4001-auth-login-2023-05-26-22-08-59.png)
[image_4](https://i.ibb.co/6sYmRWQ/screencapture-localhost-3315-agents-2023-05-24-23-06-53.png)
## Demo

User as admin role

```
admin@system.com|Admin@123
```

User as student role
```
lekhoa@mailinator.com|Admin@123
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```
NODE_ENV=
SESSION_SECRET=

DATABASE_USER=
DATABASE_PORT=
DATABASE_PASSWORD=
DATABASE_URL=
DATABASE_NAME=

SERVER_PORT=
NEXT_PUBLIC_SERVER_URL="http://localhost:4000"
DASHBOARD_PORT=

TOTAL_SCHOOLS=2
TOTAL_STUDENTS_PER_SCHOOL=200

```


## Setup in local
0. Setup environment variables `.env`

1. Install project with pnpm

```bash
pnpm install
```

2. Prepare postgreSQL as docker container
```bash
pnpm dev:up database
```

3. Start server in development mode, port `4000`
```base
pnpm nx run server:dev
```

4. Seeding data
```base
pnpm nx run seed:seed
```




## Deployment

To deploy this project:

0. Setup environment variables
`.env.docker`

1. Build node base
```bash
pnpm base:build
```

2. Build database
```base
pnpm dev:up database
```

3. Build and depploy Server
```base
pnpm dev:up server
```


4. After server already run, continue build and depploy seed
```base
pnpm dev:up seed
```

5. Finally, build and deploy website
```base
pnpm dev:up dashboard
```


## Authors

- [@lnanhkhoa](https://www.github.com/lnanhkhoa)

