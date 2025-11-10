// app/api/admin/customers/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getAllCustomers } from '@/lib/queries/getAllCustomers';

export async function GET() {
  // 1. Authenticate and authorize
  const session = await auth();
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Fetch customers
  try {
    const customers = await getAllCustomers();
    return NextResponse.json(customers);
  } catch (error) {
    console.error('Failed to fetch customers:', error);
    return NextResponse.json(
      { error: 'Failed to load customers' },
      { status: 500 }
    );
  }
}