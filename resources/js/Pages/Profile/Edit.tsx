import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Separator } from '@/components/ui/separator'
import type { PageProps } from '@/types'
import { Head } from '@inertiajs/react'
// import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm'
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm'

export default function Edit({
    mustVerifyEmail,
    status
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AuthenticatedLayout>
            <Head title="Profile" />

            <div className="space-y-8">
                <UpdateProfileInformationForm
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                    className="max-w-xl"
                />
                <Separator />
                <UpdatePasswordForm className="max-w-xl" />
                {/*<DeleteUserForm className="max-w-xl" />*/}
            </div>
        </AuthenticatedLayout>
    )
}
