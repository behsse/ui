import { Button } from '@/ui/components/Button'

const page = () => {
    return (
        <div className="grid gap-7 w-2.5 p-8">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
            <Button asChild>
                <a href="https://google.com">a Link</a>
            </Button>
        </div>
    )
}

export default page