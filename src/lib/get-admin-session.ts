import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export async function getAdminSession() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        notFound();
    }

    const user = session.user as { role?: string };
    const role = user.role || "user";
    if (role !== "admin") {
        notFound();
    }

    return session;
}

