import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { InputError } from '@/components/InputError'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { usePermission } from '@/hooks/use-permission'
import AxiosService from '@/lib/AxiosService'
import type { PageProps } from '@/types'
import type { Role } from '@/types/roles'
import { Head, usePage } from '@inertiajs/react'
import { Loader2 } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { toast } from 'react-hot-toast'

export default function Create({
    status,
    errors
}: PageProps<{ status?: string; errors?: any }>) {
    const pageProps = usePage().props as any

    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState({
        email: ''
    })

    const [selectedRoles, setSelectedRoles] = useState<Role[]>(['MEMBER'])

    const [link, setLink] = useState<string | null>(null)

    const [orgCode, setOrgCode] = useState<string>('')

    const handleRoleChange = (role: Role) => {
        setSelectedRoles([role])
    }

    const { isAcmeAdmin } = usePermission()

    const orgList = pageProps.org_list

    const handleChange = (e: any) => {
        setValues((values) => ({
            ...values,
            [e.target.name]: e.target.value
        }))
    }

    const getOrgIdByCode = () => {
        const org = orgList.find((item: any) => item.code === orgCode)
        if (org) {
            return org.id
        }
        return null
    }

    const currentOrgName = pageProps.current_org?.name || null

    const getLocalOrgName = () => {
        const org = orgList.find((item: any) => item.code === orgCode)
        if (org) {
            return org.name
        }
        return null
    }

    const uiOrgName = getLocalOrgName() || currentOrgName

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (selectedRoles.length === 0) {
            toast.error('Please select at least one role.')
            return
        }
        setLoading(true)
        AxiosService.post(route('organizations.users.store'), {
            email: values.email,
            organizationId: getOrgIdByCode(),
            roles: selectedRoles
        })
            .then((response: any) => {
                if (response.invitation_link) {
                    setLink(response.invitation_link)
                    setValues({
                        email: ''
                    })
                    toast.success(
                        response.status || 'Invitation Created successfully'
                    )
                }
                setLoading(false)
            })
            .catch((_: any) => {
                setLoading(false)
                toast.error('An error occurred while creating the invite.')
            })
    }

    const handleCopy = () => {
        if (link) {
            navigator.clipboard
                .writeText(String(link))
                .then(() => {
                    toast.success('Link copied!')
                })
                .catch((e: any) => {
                    toast.error(
                        'Failed to copy, please manually copy the link.'
                    )
                })
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title="Invite User" />

            <div className="flex gap-2 h-full">
                <div className="flex-1 pr-4">
                    {pageProps.flash?.status && (
                        <div style={{ color: 'green', marginBottom: '10px' }}>
                            {pageProps.flash.status}
                        </div>
                    )}

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    <div className="space-y-0.5">
                        <h2 className="text-2xl font-bold tracking-tight">
                            Invite User
                        </h2>
                        <p className="text-muted-foreground">
                            Invite a user to{' '}
                            <strong
                                key={uiOrgName}
                                className="motion-preset-fade motion-duration-300"
                            >
                                <strong className="text-blue-500 dark:text-blue-400">
                                    {uiOrgName}
                                </strong>
                                .
                            </strong>
                        </p>
                    </div>

                    <div className="space-y-4 mt-4">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {isAcmeAdmin ? (
                                <div className="space-y-2">
                                    <Label htmlFor="code">Organization:</Label>
                                    <Select
                                        name="code"
                                        value={orgCode}
                                        onValueChange={(value: string) => {
                                            setOrgCode(value)
                                        }}
                                        required
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select an Organization" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>
                                                    Organizations
                                                </SelectLabel>
                                                {orgList.map((item: any) => {
                                                    return (
                                                        <SelectItem
                                                            key={item.id}
                                                            value={item.code}
                                                        >
                                                            {item.name}
                                                        </SelectItem>
                                                    )
                                                })}
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
                            ) : null}

                            <div className="space-y-2">
                                <Label htmlFor="email">Email:</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    required
                                />
                                <p className="text-sm text-muted-foreground">
                                    Email will be the identifier of the user
                                    within your organization.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <Label>Select Role:</Label>
                                <RadioGroup
                                    onValueChange={(value) => {
                                        handleRoleChange(value as Role)
                                    }}
                                    className="space-y-2"
                                >
                                    <div className="flex items-start space-x-2">
                                        <RadioGroupItem
                                            checked={selectedRoles.includes(
                                                'ADMIN'
                                            )}
                                            value="ADMIN"
                                            id="check_admin"
                                        />
                                        <Label
                                            htmlFor="check_admin"
                                            className="space-y-2"
                                        >
                                            <div>Administrator</div>
                                            <p className="text-sm text-muted-foreground">
                                                Can view all dashboards, can
                                                add/remove users.
                                            </p>
                                        </Label>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <RadioGroupItem
                                            checked={selectedRoles.includes(
                                                'MEMBER'
                                            )}
                                            value="MEMBER"
                                            id="check_member"
                                        />
                                        <Label
                                            htmlFor="check_member"
                                            className="space-y-2"
                                        >
                                            <div>Member</div>
                                            <p className="text-sm text-muted-foreground">
                                                Can view all dashboards, but
                                                cannot add/remove users.
                                            </p>
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <Button disabled={loading} type="submit">
                                {loading ? (
                                    <Loader2 className="animate-spin" />
                                ) : null}
                                Create Invitation
                            </Button>
                        </form>
                    </div>
                </div>
                <div className="flex-1 border-l pl-4">
                    {link ? (
                        <Card
                            className="motion-preset-slide-left motion-duration-300"
                            key={link}
                        >
                            <CardHeader className="space-y-4">
                                <CardTitle>Share this link</CardTitle>
                                <CardDescription className="sp``ace-y-2">
                                    <p>
                                        The user's email is embedded within the
                                        link. All they need to is open the link
                                        and sign up using a password. Note that,
                                        this invitation link will be active for{' '}
                                        <strong>72 hours</strong>.
                                    </p>
                                    <p>
                                        If the link has expired, please create a
                                        new link. An expiry date is added for
                                        security.
                                    </p>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex space-x-2">
                                    <Input value={link} readOnly />
                                    <Button
                                        className="shrink-0"
                                        onClick={handleCopy}
                                    >
                                        Copy Link
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ) : null}
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
