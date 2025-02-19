import GuestLayout from '@/Layouts/GuestLayout'
import { InputError } from '@/components/InputError'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Head, useForm } from '@inertiajs/react'
import type { FormEventHandler } from 'react'

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: ''
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route('password.confirm'), {
            onFinish: () => reset('password')
        })
    }

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <div className="mb-4 text-sm text-gray-600">
                This is a secure area of the application. Please confirm your
                password before continuing.
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <Label htmlFor="password">Password</Label>

                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoFocus
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-end">
                    <Button className="ms-4" disabled={processing}>
                        Confirm
                    </Button>
                </div>
            </form>
        </GuestLayout>
    )
}
