import { getAdminSession } from "@/lib/get-admin-session";
import { ReactNode } from "react";

export default async function AdminLayout({ children }: { children: ReactNode }) 
{
    await getAdminSession();
    return <>{children}</>;
}
