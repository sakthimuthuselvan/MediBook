
import { redirect } from "next/navigation";
import Sidebar from "@/components/AdminSidebar/Sidebar"
import { cookies } from "next/headers";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const cookieStore: any = cookies();
    const token = cookieStore?.get?.("authToken")?.value;  if (!token) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 to-white">
      {/* Sidebar + mobile menu component */}
      <Sidebar  />

      {/* Main content */}
      <main className="flex-1 p-6 pt-16 md:pt-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
