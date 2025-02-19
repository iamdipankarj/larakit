import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { InputError } from '@/components/InputError'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import type { PageProps } from '@/types'
import { Head, useForm } from '@inertiajs/react'
import { Loader2 } from 'lucide-react'
import { type FormEventHandler, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export default function Create({
    flash,
    status,
    org_list = {}
}: PageProps<{
    flash?: any
    status: string
    org_list: Record<string, string>
}>) {
    const { data, setData, post, processing, errors, reset } = useForm({
        code: ''
    })

    useEffect(() => {
        if (flash) {
            if (flash.error) {
                toast.error(flash.error)
            }
        }
    }, [flash])

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route('organizations.store'), {
            onFinish: () => reset('code')
        })
    }

    return (
        <AuthenticatedLayout>
            <Head title="Create Organization" />

            <div className="flex gap-2">
                <div className="flex-1 pr-4">
                    {flash?.status && (
                        <div style={{ color: 'green', marginBottom: '10px' }}>
                            {flash.status}
                        </div>
                    )}

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    <div className="space-y-0.5">
                        <h2 className="text-2xl font-bold tracking-tight">
                            Create new Organization
                        </h2>
                        <p className="text-muted-foreground">Enter details.</p>
                    </div>

                    <div className="space-y-4 mt-4">
                        <form
                            className="space-y-4"
                            onSubmit={submit}
                            method="POST"
                        >
                            <div className="space-y-2">
                                <Label htmlFor="code">Name:</Label>
                                <Select
                                    value={data.code}
                                    name="code"
                                    onValueChange={(value: string) => {
                                        setData('code', value)
                                    }}
                                >
                                    <SelectTrigger className="w-[300px]">
                                        <SelectValue placeholder="Select an Organization" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>
                                                Organizations
                                            </SelectLabel>
                                            {Object.keys(org_list).map(
                                                (item: any) => {
                                                    return (
                                                        <SelectItem
                                                            key={item}
                                                            value={item}
                                                        >
                                                            {org_list[item]}
                                                        </SelectItem>
                                                    )
                                                }
                                            )}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <InputError
                                    message={errors.code}
                                    className="mt-2"
                                />
                                <p className="text-sm text-muted-foreground">
                                    Choose from a list of approved organizations.
                                </p>
                            </div>

                            <Button disabled={processing} type="submit">
                                {processing ? (
                                    <Loader2 className="animate-spin" />
                                ) : null}
                                Add Organization
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
