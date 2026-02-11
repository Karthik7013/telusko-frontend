export function DashboardFooter() {

    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
                    <p>Made with ❤️ in India</p>
                    <div className="flex gap-4">
                        <span className="hover:text-foreground cursor-pointer transition-colors">Privacy Policy</span>
                        <span className="hover:text-foreground cursor-pointer transition-colors">Cookie Settings</span>
                        <span className="hover:text-foreground cursor-pointer transition-colors">Status</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
