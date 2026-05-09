import Logo from "@/assets/logo.svg"

export default function PageLoader() {
    return (
        <div className="flex h-screen w-full relative items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent">

            </div>
            <img className="absolute w-7 h-7 rounded-full" src={Logo} alt="" />
        </div>
    )
}