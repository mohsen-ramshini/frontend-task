import { NextRequest, NextResponse } from 'next/server';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

// این باید در یک فایل جدا باشه یا به صورت global نگه داشته بشه (در dev mode این کار می‌کنه چون حافظه نگه‌داری میشه)
let users: User[] = [
  { id: 7, email: "michael.lawson@reqres.in", first_name: "Michael", last_name: "Lawson" },
  { id: 8, email: "lindsay.ferguson@reqres.in", first_name: "Lindsay", last_name: "Ferguson" },
  { id: 9, email: "tobias.funke@reqres.in", first_name: "Tobias", last_name: "Funke" },
  { id: 10, email: "byron.fields@reqres.in", first_name: "Byron", last_name: "Fields" },
  { id: 11, email: "george.edwards@reqres.in", first_name: "George", last_name: "Edwards" },
  { id: 12, email: "rachel.howell@reqres.in", first_name: "Rachel", last_name: "Howell" },
];

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = Number(params.id);
    const user = users.find((u) => u.id === userId);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('[API USERS ID GET ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
