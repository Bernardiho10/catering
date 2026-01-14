import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

type BootstrapRequestBody = {
  email: string;
  fullName?: string;
  password?: string;
  secret: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as BootstrapRequestBody;

  const expectedSecret = process.env.ADMIN_BOOTSTRAP_SECRET;
  if (!expectedSecret) {
    return NextResponse.json(
      { error: "ADMIN_BOOTSTRAP_SECRET is not set" },
      { status: 500 }
    );
  }

  if (!body.secret || body.secret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseAdmin = createAdminClient();

  const email = body.email.trim().toLowerCase();
  const fullName = body.fullName?.trim() || "Admin";

  // 1) Find existing auth user by email
  const { data: listData, error: listError } = await supabaseAdmin.auth.admin.listUsers({
    page: 1,
    perPage: 200,
  });

  if (listError) {
    return NextResponse.json({ error: listError.message }, { status: 500 });
  }

  const existing = listData.users.find((u) => u.email?.toLowerCase() === email);

  // 2) Create auth user if missing (optional password)
  let userId = existing?.id;

  if (!userId) {
    if (!body.password) {
      return NextResponse.json(
        { error: "User does not exist; password is required to create the admin user" },
        { status: 400 }
      );
    }

    const { data: created, error: createError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password: body.password,
        email_confirm: true,
        user_metadata: { full_name: fullName },
      });

    if (createError || !created.user) {
      return NextResponse.json(
        { error: createError?.message || "Failed to create user" },
        { status: 500 }
      );
    }

    userId = created.user.id;
  }

  // 3) Upsert public.users row with admin role
  const { error: upsertError } = await supabaseAdmin
    .from("users")
    .upsert({
      id: userId,
      full_name: fullName,
      avatar_url: "",
      role: "admin",
    });

  if (upsertError) {
    return NextResponse.json({ error: upsertError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, userId }, { status: 200 });
}
