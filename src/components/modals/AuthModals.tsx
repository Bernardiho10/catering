"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Lock, User, Eye, EyeOff, Gift, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"

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
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || !password) return

        setIsLoading(true)
        const supabase = createClient()
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            toast.error(error.message)
            setIsLoading(false)
            return
        }

        toast.success("Welcome back!")
        setIsLoading(false)
        onOpenChange(false)
        if (onLoginSuccess) onLoginSuccess()
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[480px] bg-white border-blue-50 rounded-sm p-0 overflow-hidden shadow-2xl">
                <div className="p-10 md:p-12">
                    <DialogHeader className="space-y-4 mb-8 text-center">
                        <div className="mx-auto w-20 h-20 rounded-sm bg-blue-50 flex items-center justify-center mb-2 border border-blue-100">
                            <User className="h-10 w-10 text-primary" />
                        </div>
                        <DialogTitle className="text-3xl font-black text-primary uppercase tracking-tighter">
                            Sign In
                        </DialogTitle>
                        <DialogDescription className="text-primary/60 font-medium">
                            Access your Abraham&apos;s Rewards and order history.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="login-email" className="text-[10px] font-black uppercase tracking-widest text-primary/40">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/30" />
                                <Input
                                    id="login-email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-12 h-14 rounded-sm border-blue-100 focus-visible:ring-primary font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="login-password" className="text-[10px] font-black uppercase tracking-widest text-primary/40">Password</Label>
                                <button
                                    type="button"
                                    className="text-[10px] font-black uppercase tracking-widest text-accent hover:underline"
                                    onClick={() => toast.info("Password reset feature coming soon!")}
                                >
                                    Forgot?
                                </button>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/30" />
                                <Input
                                    id="login-password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-12 pr-12 h-14 rounded-sm border-blue-100 focus-visible:ring-primary font-medium"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/30 hover:text-primary"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-14 rounded-sm text-sm font-black uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-xl"
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>

                    <div className="mt-10 text-center border-t border-blue-50 pt-8">
                        <p className="text-sm font-medium text-primary/60">
                            New to the family?{" "}
                            <button
                                type="button"
                                onClick={onSwitchToRegister}
                                className="text-primary hover:text-accent font-black uppercase tracking-widest text-xs"
                            >
                                Create Account
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
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!firstName || !lastName || !email || !password) return

        setIsLoading(true)
        const supabase = createClient()
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: `${firstName} ${lastName}`,
                    join_rewards: true
                }
            }
        })

        if (error) {
            toast.error(error.message)
            setIsLoading(false)
            return
        }

        toast.success("Welcome to the family! Check your email.")
        setIsLoading(false)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[540px] bg-white border-blue-50 rounded-sm p-0 overflow-hidden shadow-2xl max-h-[95vh] overflow-y-auto">
                <div className="p-10 md:p-12">
                    <DialogHeader className="space-y-4 mb-8 text-center">
                        <div className="mx-auto w-20 h-20 rounded-sm bg-accent/10 flex items-center justify-center mb-2 border border-accent/20">
                            <Sparkles className="h-10 w-10 text-accent" />
                        </div>
                        <DialogTitle className="text-3xl font-black text-primary uppercase tracking-tighter">
                            Join Rewards
                        </DialogTitle>
                        <DialogDescription className="text-primary/60 font-medium">
                            Earn free treats and experience a blessing in every slice.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first-name" className="text-[10px] font-black uppercase tracking-widest text-primary/40">First Name</Label>
                                <Input
                                    id="first-name"
                                    placeholder="John"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="h-14 rounded-sm border-blue-100 focus-visible:ring-primary font-medium"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name" className="text-[10px] font-black uppercase tracking-widest text-primary/40">Last Name</Label>
                                <Input
                                    id="last-name"
                                    placeholder="Doe"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="h-14 rounded-sm border-blue-100 focus-visible:ring-primary font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="register-email" className="text-[10px] font-black uppercase tracking-widest text-primary/40">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/30" />
                                <Input
                                    id="register-email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-12 h-14 rounded-sm border-blue-100 focus-visible:ring-primary font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="register-password" className="text-[10px] font-black uppercase tracking-widest text-primary/40">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/30" />
                                <Input
                                    id="register-password"
                                    type="password"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-12 h-14 rounded-sm border-blue-100 focus-visible:ring-primary font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <div className="bg-blue-50/50 p-6 rounded-sm space-y-3">
                            <div className="flex items-center gap-3">
                                <Checkbox id="join-rewards" checked disabled />
                                <Label htmlFor="join-rewards" className="text-xs font-bold text-primary uppercase tracking-widest cursor-pointer">
                                    Sign me up for Abraham&apos;s Rewards®
                                </Label>
                            </div>
                            <p className="text-[10px] text-primary/40 font-medium leading-relaxed">
                                By creating an account, you agree to our Terms of Use and Privacy Policy. You will receive transactional emails and marketing updates.
                            </p>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-16 rounded-sm text-base font-black uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-2xl"
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating Account..." : "Create Account"}
                        </Button>
                    </form>

                    <div className="mt-10 text-center border-t border-blue-50 pt-8">
                        <p className="text-sm font-medium text-primary/60">
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={onSwitchToLogin}
                                className="text-primary hover:text-accent font-black uppercase tracking-widest text-xs"
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
