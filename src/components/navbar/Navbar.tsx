"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import logos from "@/public/images/group";
import icons from "@/public/svgs/navbar";
import "@/src/styles/variable.css";
import { useUser } from "@/src/contexts/UserContext";

const Navbar = () => {
  const router = usePathname();
  const { user, setUser } = useUser();
  const nickname = user && user.email ? user.email.split("@")[0] : "Admin";

  if (router === "/intro") {
    return null;
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("ログアウト");
      setUser(null);
    } catch (error) {
      console.error("ログアウト失敗:", error);
    }
  };

  return (
    <div className="absolute left-0 w-72 h-full bg-gray-50">
      <div className="relative w-full px-6 pt-5 navbar flex flex-col">
        {/* Profile */}
        <div className="w-full h-12 flex items-start justify-between box-content ">
          <div className="flex items-center">
            <Image
              src={logos.freee}
              width={10}
              height={10}
              alt="userImage"
              className="w-8 h-8 rounded-lg"
            />
            <div className="mx-2">{nickname}</div>
          </div>
        </div>
        <div className="h-px bg-zinc-300"></div>
        <div className="h-8"></div>

        {/* Pages */}
        <div className="w-full">
          <div className="text-zinc-400 mb-4">Pages</div>
          <ul className="w-full">
            <li className="w-full flex mb-3 py-1">
              <Image
                src={icons.group}
                alt="icon"
                width={30}
                height={30}
                className="w-6 h-6 mr-3"
              ></Image>
              <Link href="/" className="">
                Group
              </Link>
            </li>
          </ul>
        </div>
        <div className="h-8"></div>

        {/* Logout */}
        <div className="flex py-2 mt-auto" onClick={handleLogout}>
          <Image
            src={icons.door}
            alt="icon"
            width={30}
            height={30}
            className="w-6 h-6 mr-2"
          ></Image>
          <Link href="/intro" className="">
            ログアウト
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
