// app/api/users/route.ts
import { NextResponse } from "next/server";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

// داده‌ها به صورت موقت (in-memory)
let users: User[] = [
  { id: 7, email: "michael.lawson@reqres.in", first_name: "Michael", last_name: "Lawson" },
  { id: 8, email: "lindsay.ferguson@reqres.in", first_name: "Lindsay", last_name: "Ferguson" },
  { id: 9, email: "tobias.funke@reqres.in", first_name: "Tobias", last_name: "Funke" },
  { id: 10, email: "byron.fields@reqres.in", first_name: "Byron", last_name: "Fields" },
  { id: 11, email: "george.edwards@reqres.in", first_name: "George", last_name: "Edwards" },
  { id: 12, email: "rachel.howell@reqres.in", first_name: "Rachel", last_name: "Howell" },
];

// GET: دریافت لیست کاربران
export async function GET() {
  try {
    return NextResponse.json(users);
  } catch (error) {
    console.error("[API USERS GET ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST: ایجاد کاربر جدید
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, first_name, last_name, avatar } = body;

    if (!email || !first_name || !last_name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // تولید id جدید ساده
    const newId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;

    const newUser: User = {
      id: newId,
      email,
      first_name,
      last_name,
      avatar,
    };

    users.push(newUser);

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("[API USERS POST ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PUT: به‌روزرسانی کاربر
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, email, first_name, last_name, avatar } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // فقط فیلدهای موجود رو آپدیت کن
    users[userIndex] = {
      ...users[userIndex],
      email: email ?? users[userIndex].email,
      first_name: first_name ?? users[userIndex].first_name,
      last_name: last_name ?? users[userIndex].last_name,
      avatar: avatar ?? users[userIndex].avatar,
    };

    return NextResponse.json(users[userIndex]);
  } catch (error) {
    console.error("[API USERS PUT ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE: حذف کاربر
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get("id");

    if (!idParam) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    const id = Number(idParam);
    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    users.splice(userIndex, 1);

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("[API USERS DELETE ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
