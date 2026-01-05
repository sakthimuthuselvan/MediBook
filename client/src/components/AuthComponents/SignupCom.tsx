"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export function SignupCom({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-2 ", className)} {...props}>
            <Card className="overflow-hidden p-0 ">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <div className="bg-muted relative hidden md:block">

                        <Image
                            src={"/login_vector.jpg"}
                            alt="Image"
                            fill
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                            loading="lazy"
                            priority={false}
                        />
                    </div>
                    <form className="p-6 md:p-8">
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Create Account</h1>
                                {/* <p className="text-muted-foreground text-balance">
                                    Login to your Acme Inc account
                                </p> */}
                            </div>
                            <div className="grid gap-1">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                />
                            </div>

                            <div className="grid gap-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-1">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" required />
                            </div>

                            <Button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-700">
                                Login
                            </Button>
                            <div>Already have an account? <a href={"/login"}><span className="cursor-pointer text-blue-600">Login</span></a></div>
                            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                <span className="bg-card text-muted-foreground relative z-10 px-2">
                                    Or continue with
                                </span>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <Button variant="outline" type="button" className="w-full">
                                    <Image
                                        src={"/google_icon.png"}
                                        alt="Google Icon"
                                        fill
                                        className="h-5"
                                        loading="lazy"
                                        priority={false}
                                    />
                                    <span className="">Login with Google</span>
                                </Button>
                            </div>

                        </div>
                    </form>

                </CardContent>
            </Card>
        </div>
    )
}
