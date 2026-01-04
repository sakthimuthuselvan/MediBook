"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { LogOut, Menu, X } from "lucide-react"
import {
    LayoutDashboard,
    Calendar,
    Users,
    Stethoscope,
} from "lucide-react";

type MenuItem = {
    name: string
    href: string
    icon: any
}

export default function Sidebar() {

    const menu: MenuItem[] = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Appointments", href: "/admin/appointments", icon: Calendar },
        { name: "Doctors", href: "/admin/doctors", icon: Stethoscope },
        { name: "Patients", href: "/admin/patients", icon: Users },
        { name: "Info", href: "/admin/info", icon: Users },
    ];
    const pathname = usePathname()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const router = useRouter()

    const handleLogout = () => {
        // Remove client-set auth cookie and navigate to login
        // document.cookie = "authToken=; path=/; max-age=0; SameSite=Lax"
        router.push("/login")
    }

    return (
        <>
            {/* Sidebar for desktop */}
            <aside className="hidden md:flex w-64 bg-gradient-to-b from-indigo-700 to-indigo-900 text-white flex-col p-4">
                <div className="text-2xl font-bold mb-6">Clinic Admin</div>
                <nav className="flex-1 space-y-2">
                    {menu.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-indigo-600 transition",
                                    isActive && "bg-indigo-800"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{item.name}</span>
                            </Link>
                        )
                    })}
                </nav>
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </aside>

            {/* Mobile top bar */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-indigo-700 text-white flex items-center justify-between px-4 py-3 shadow-lg z-50">
                <div className="text-lg font-bold">Clinic Admin</div>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile menu (slide-out) */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)}>
                    <div className="absolute top-0 left-0 w-64 h-full bg-indigo-800 text-white p-4 flex flex-col" onClick={(e) => e.stopPropagation()}>
                        <div className="text-xl font-bold mb-6">Menu</div>
                        <nav className="flex-1 space-y-2">
                            {menu.map((item) => {
                                const Icon = item.icon
                                const isActive = pathname === item.href
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={cn(
                                            "flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-indigo-600 transition",
                                            isActive && "bg-indigo-700"
                                        )}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span>{item.name}</span>
                                    </Link>
                                )
                            })}
                        </nav>
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
