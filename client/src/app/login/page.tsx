// app/login/page.tsx
import { LoginForm } from "@/components/AuthComponents/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 bg-gradient-to-b	from-blue-100	to-white	">
      <LoginForm className="w-full max-w-3xl" />
    </div>
  
);
}
