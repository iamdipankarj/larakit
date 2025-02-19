import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Head } from '@inertiajs/react'

export default function Expired() {
    return (
        <main className="bg-slate-200 flex-grow flex flex-col items-center justify-center px-4 min-h-screen">
            <Head title="Invitation Expired" />
            <Card className="max-w-md motion-preset-shake motion-duration-300">
                <CardHeader className="space-y-4">
                    <CardTitle className="text-center text-destructive">
                        Invitation Expired
                    </CardTitle>
                    <CardDescription className="space-y-2">
                        The invitation link you tried to use has expired. Please
                        request a new one or contact support for assistance.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <Button variant="outline" asChild>
                        <a href="/">Go to Homepage</a>
                    </Button>
                </CardContent>
            </Card>
        </main>
    )
}
