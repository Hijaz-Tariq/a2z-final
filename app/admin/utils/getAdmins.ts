// app/admin/utils/getAdmins.ts
import { db } from '../../../lib/db'

export async function getAdmins() {
  return await db.user.findMany({
    where: { role: 'ADMIN' },
    select: { id: true, name: true, email: true }
  })
}
