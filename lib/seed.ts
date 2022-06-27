import { PrismaClient, Prisma } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// Roles Data to seed
const roles: Prisma.RoleCreateInput[] = [
  {
    name: 'admin',
    description:
      'Admin role. Dapat mengontrol semua fitur yang tersedia yang ada didalam aplikasi',
  },
  {
    name: 'free',
    description: 'Free role. Mendapatkan beberapa fitur yang telah disesuaikan',
  },
  {
    name: 'standart',
    description:
      'Standart role. Mendapatkan beberapa fitur yang telah disesuaikan',
  },
  {
    name: 'premium',
    description:
      'Premium role. Mendapatkan beberapa fitur yang telah disesuaikan',
  },
]

// Permission data to seed
const permissions: Prisma.PermissionCreateInput[] = [
  {
    name: 'read template',
    description: 'membaca semua template yang tersedia',
  },
  {
    name: 'update template',
    description: 'update template yang tersedia',
  },
  {
    name: 'write template',
    description: 'membuat template baru',
  },
  {
    name: 'delete template',
    description: 'menghapus template',
  },
]

async function bootstrap() {
  console.log('Start seeding')

  let adminId = 0

  for (const role of roles) {
    const r = await prisma.role.create({
      data: role,
    })

    console.log(`Role created ${r.name} with id ${r.id}`)
    if (r.name === 'admin') adminId = r.id
  }

  for (const permission of permissions) {
    const p = await prisma.permission.create({
      data: permission,
    })

    console.log(`Permission created ${p.name} with id ${p.id}`)
  }

  await prisma.phoneCode.createMany({
    data: [
      {
        name: 'ina',
        code: '+62',
      },
    ],
  })

  await prisma.permissionsOnRoles.createMany({
    data: [
      {
        roleId: adminId,
        permissionId: 1,
      },
      {
        roleId: adminId,
        permissionId: 2,
      },
      {
        roleId: adminId,
        permissionId: 3,
      },
      {
        roleId: adminId,
        permissionId: 4,
      },
    ],
  })

  const user = await prisma.user.create({
    data: {
      name: 'ilfat izzat pratama',
      email: 'pratama.izzat231298@gmail.com',
      username: 'pratamaizzat',
      password: bcrypt.hashSync('Ncbiur2930!!928#22nj1Hjbbc', 12),
      roles: {
        create: [
          {
            role: {
              connect: {
                id: adminId,
              },
            },
          },
        ],
      },
      contacts: {
        create: [
          {
            name: 'John Doe',
            phoneNumber: '082245091111',
          },
        ],
      },
    },
  })

  console.log({
    message: 'User Admin Created',
    data: user,
  })
}

// Execute the function seed from command-line
if (process.argv[2] === 'run') {
  bootstrap()
    .then(() => console.log('Seeding Finish'))
    .catch((e) => {
      console.error(e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
}
