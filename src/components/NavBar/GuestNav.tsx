import { styles } from "@/Styles/Styles";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import { Button } from "../ui/button";
export default function GuestNav() {
    return (
        <nav className="fixed  top-0 left-0 right-0 z-50 bg-white/10 border-b border-border/50 px-4">
            <div className={styles.container}>
                <div className="flex h-16 items-center justify-between">
                    <Link to={"/"} className="flex items-center space-x-2">
                        <Logo />
                    </Link>

                    <div>
                        <Button asChild className="rounded-full bg-[#F28BA8] hover:bg-[#F28BA8]/90 shadow-md px-6">
                            <Link to={"/register"}>Kirish</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
