"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Lock, User, Eye, EyeOff, Gift } from "lucide-react"
import { toast } from "sonner"

interface LoginModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSwitchToRegister: () => void
    onLoginSuccess?: () => void
}

interface RegisterModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSwitchToLogin: () => void
}

export function LoginModal({ open, onOpenChange, onSwitchToRegister, onLoginSuccess }: LoginModalProps) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || !password) return

        setIsLoading(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Mock Login Success
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("user", JSON.stringify({ name: email.split('@')[0], email: email })) // Mock basic user profile

        toast.success("Welcome back!")
        setIsLoading(false)
        onOpenChange(false)
        if (onLoginSuccess) onLoginSuccess()
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-white dark:bg-zinc-900 border-border rounded-2xl p-0 overflow-hidden">
                <div className="p-6">
                    <DialogHeader className="space-y-3 mb-6 text-center">
                        <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
                            <User className="h-8 w-8 text-primary" />
                        </div>
                        <DialogTitle className="text-2xl font-heading font-semibold text-foreground">
                            Welcome Back
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Sign in to your account to continue
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="login-email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="login-email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 h-12 rounded-xl"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="login-password">Password</Label>
                                <button
                                    type="button"
                                    className="text-sm text-primary hover:underline"
                                    onClick={() => toast.info("Password reset link would be sent to your email")}
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="login-password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 pr-10 h-12 rounded-xl"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="remember"
                                checked={rememberMe}
                                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                            />
                            <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                                Remember me
                            </Label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 rounded-full text-base font-semibold"
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <button
                                type="button"
                                onClick={onSwitchToRegister}
                                className="text-primary hover:underline font-medium"
                            >
                                Create one
                            </button>
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export function RegisterModal({ open, onOpenChange, onSwitchToLogin }: RegisterModalProps) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [acceptTerms, setAcceptTerms] = useState(false)
    const [joinRewards, setJoinRewards] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!firstName || !lastName || !email || !password || !confirmPassword) return

        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }

        if (!acceptTerms) {
            toast.error("Please accept the terms and conditions")
            return
        }

        setIsLoading(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Mock Registration Success
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("user", JSON.stringify({ name: firstName, email: email }))

        toast.success("Account created successfully! Welcome aboard!")
        setIsLoading(false)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-white dark:bg-zinc-900 border-border rounded-2xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <DialogHeader className="space-y-3 mb-6 text-center">
                        <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
                            <Gift className="h-8 w-8 text-primary" />
                        </div>
                        <DialogTitle className="text-2xl font-heading font-semibold text-foreground">
                            Create Your Account
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Join us and start ordering delicious treats
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <Label htmlFor="first-name">First Name</Label>
                                <Input
                                    id="first-name"
                                    placeholder="John"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="h-12 rounded-xl"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name">Last Name</Label>
                                <Input
                                    id="last-name"
                                    placeholder="Doe"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="h-12 rounded-xl"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="register-email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="register-email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 h-12 rounded-xl"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="register-password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="register-password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 pr-10 h-12 rounded-xl"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="confirm-password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="pl-10 h-12 rounded-xl"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-3 pt-2">
                            <div className="flex items-start gap-2">
                                <Checkbox
                                    id="join-rewards"
                                    checked={joinRewards}
                                    onCheckedChange={(checked) => setJoinRewards(checked as boolean)}
                                    className="mt-1"
                                />
                                <Label htmlFor="join-rewards" className="text-sm font-normal cursor-pointer">
                                    <span className="font-medium text-primary">Join Rewards®</span> - Earn points on every order!
                                </Label>
                            </div>

                            <div className="flex items-start gap-2">
                                <Checkbox
                                    id="terms"
                                    checked={acceptTerms}
                                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                                    className="mt-1"
                                    required
                                />
                                <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
                                    I agree to the{" "}
                                    <a href="/policies/terms" className="text-primary hover:underline">Terms of Use</a>{" "}
                                    and{" "}
                                    <a href="/policies/privacy" className="text-primary hover:underline">Privacy Policy</a>
                                </Label>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 rounded-full text-base font-semibold"
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating Account..." : "Create Account"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={onSwitchToLogin}
                                className="text-primary hover:underline font-medium"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
