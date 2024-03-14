import React, { useState, FC } from "react";
import Image from "next/image";
import svgs from "@/public/svgs/login";
import logos from "@/public/images/group";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase";
import { useRouter } from "next/navigation";
import { useUser } from "@/src/contexts/UserContext";
import { getDatabase, ref, set } from "firebase/database";

const Login: FC = () => {
  const router = useRouter();
  const { setUser } = useUser();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("ログイン成功");
      setUser(userCredential.user);

      const nickname = email.split("@")[0];
      const db = getDatabase();
      const userRef = ref(db, `users/${userCredential.user.uid}/nickname`);
      set(userRef, {
        nickname: nickname,
        email: email,
      });

      router.replace("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        console.error("失敗:", error.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className=" bg-white rounded-lg w-1/2 h-4/6 py-10 box-border"
        id="modal-container"
      >
        <div className="w-full h-full flex items-center box-border py-8">
          {/* LEFT */}
          <div className="w-3/5 h-full text-center flex flex-col justify-between ">
            <div>
              <div className="text-4xl font-semibold pt-4">
                Welcome to freee-attendance-keeper <br /> by yuminn-k
              </div>
            </div>
            <Image
              src={svgs.login}
              alt="logo"
              width={450}
              height={450}
              className="w-full"
            />
          </div>
          {/* RIGHT */}
          <div className="w-2/5 h-full flex justify-center">
            <div className="w-4/5 text-sm h-full flex flex-col justify-between">
              <div className="flex justify-center">
                <Image
                  src={logos.freee}
                  alt="logo"
                  width={250}
                  height={250}
                  className="w-full "
                />
              </div>
              <div className="my-5">
                <form onSubmit={handleLogin}>
                  <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded mt-2"
                  />
                  {error && <div className="text-red-500 text-xs">{error}</div>}

                  <button
                    type="submit"
                    className="w-full p-2 border rounded mt-4 bg-blue-500 text-white"
                  >
                    ログイン
                  </button>
                </form>
              </div>
              <div className="w-1/5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
