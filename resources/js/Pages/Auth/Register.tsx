import GuestLayout from '@/Layouts/GuestLayout'
import { InputError } from '@/components/InputError'
import { PasswordValidator } from '@/components/core/PasswordValidator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { PageProps } from '@/types'
import { Head, Link, useForm } from '@inertiajs/react'
import { type FormEventHandler, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export default function Register({
    invitationEmail = null,
    invitationToken = null,
    organizationName = null,
    flash
}: PageProps<{
    invitationEmail: string | null
    invitationToken: string | null
    organizationName: string | null
    flash?: any
}>) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: invitationEmail || '',
        password: '',
        password_confirmation: '',
        invitation_token: invitationToken || ''
    })

    const [canSubmit, setCanSubmit] = useState(false)

    useEffect(() => {
        if (flash) {
            if (flash.error) {
                toast.error(flash.error)
            }
        }
    }, [flash])

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        if (!canSubmit) {
            toast.error('Please check the errors')
            return
        }

        if (invitationEmail) {
            post(route('invitations.postAccept'), {
                onFinish: () => reset('password', 'password_confirmation')
            })
        } else {
            post(route('register'), {
                onFinish: () => reset('password', 'password_confirmation')
            })
        }
    }

    return (
        <GuestLayout>
            <Head title="Register" />

            {invitationEmail ? (
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        You are invited to join <br />{' '}
                        <strong className="text-blue-500 dark:text-blue-400">
                            {organizationName}
                        </strong>{' '}
                        organization.
                    </h1>
                    <p className="text-sidebar-foreground text-sm">
                        Complete the registration below.
                        <br /> You are registering as{' '}
                        <span className="font-medium text-gray-800">
                            {invitationEmail}
                        </span>
                    </p>
                </div>
            ) : (
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        You are joining as <br />{' '}
                        <span className="text-blue-600">Acme</span> user.
                    </h1>
                    <p className="text-sidebar-foreground text-sm">
                        You must have an Acme issued email Id <br />(
                        <strong>e.g john@acme.com</strong>) to register.
                    </p>
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <Label htmlFor="name">Name</Label>

                    <Input
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                {!invitationEmail ? (
                    <div>
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>
                ) : null}

                <div>
                    <Label htmlFor="password">Password</Label>

                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />

                    {data.password.length > 0 ? (
                        <PasswordValidator
                            className="mt-4 motion-preset-pop motion-duration-200"
                            rules={[
                                'minLength',
                                'specialChar',
                                'number',
                                'capital'
                            ]}
                            minLength={8}
                            value={data.password}
                            onChange={(isValid) => {
                                setCanSubmit(isValid)
                            }}
                        />
                    ) : null}
                </div>

                <div>
                    <Label htmlFor="password_confirmation">
                        Confirm Password
                    </Label>

                    <Input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <Button className="ms-4" disabled={processing}>
                        Register
                    </Button>
                </div>
            </form>
        </GuestLayout>
    )
}
