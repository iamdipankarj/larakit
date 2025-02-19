import GuestLayout from '@/Layouts/GuestLayout'
import { InputError } from '@/components/InputError'
import { Icons } from '@/components/icons'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Head, Link, useForm } from '@inertiajs/react'
import { AlertCircle } from 'lucide-react'
import type { FormEventHandler } from 'react'

export default function Login({
    status,
    flash,
    canResetPassword
}: {
    status?: string
    canResetPassword: boolean
    flash?: any
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route('login'), {
            onFinish: () => reset('password')
        })
    }

    return (
        <GuestLayout>
            <Head title="Log In" />

            {status && (
                <div className="mb-4 text-sm font-semibold text-green-600 text-center">
                    {status}
                </div>
            )}

            {flash?.error ? (
                <Alert
                    variant="destructive"
                    className="motion-preset-compress motion-duration-300"
                >
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{flash.error}</AlertDescription>
                </Alert>
            ) : null}

            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Sign in with an account
                </h1>
                <p className="text-sm text-muted-foreground">
                    Use your email &amp; password to login.
                </p>
            </div>
            <div className="space-y-4">
                <form onSubmit={submit} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            {/*{canResetPassword ? (*/}
                            {/*    <Link href={route('password.request')}*/}
                            {/*          className="ml-auto inline-block text-sm underline">*/}
                            {/*        Forgot your password?*/}
                            {/*    </Link>*/}
                            {/*) : null}*/}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                        />
                        <InputError message={errors.password} />
                        <div className="mt-2 flex items-center space-x-2">
                            <Checkbox
                                id="remember_me"
                                name="remember"
                                checked={data.remember}
                                onCheckedChange={(value: boolean) =>
                                    setData('remember', value)
                                }
                            />
                            <label
                                htmlFor="remember_me"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Remember me
                            </label>
                        </div>
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={processing}
                    >
                        Login
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                        <a href={route('auth.google')} className="w-full">
                            <Icons.google className="w-4 h-4" />
                            Login with Google
                        </a>
                    </Button>
                </form>
            </div>
            <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking logging in, you agree to our{' '}
                <a
                    href="https://larakit.dipankarjana.com/tos"
                    className="underline underline-offset-4 hover:text-primary"
                    rel="noreferrer nofollow"
                    target="_blank"
                >
                    Terms of Service
                </a>{' '}
                and{' '}
                <a
                    href="https://larakit.dipankarjana.com/privacy"
                    className="underline underline-offset-4 hover:text-primary"
                    rel="noreferrer nofollow"
                    target="_blank"
                >
                    Privacy Policy
                </a>
                .
            </p>
        </GuestLayout>
    )
}
