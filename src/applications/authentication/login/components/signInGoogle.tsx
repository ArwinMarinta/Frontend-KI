import { auth, provider } from "../../../../firebase/apiKey";
import { signInWithPopup } from "firebase/auth";

export default function LoginButton() {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Login sukses:", user);

      // 👉 Optional: batasi email hanya itk.ac.id
      const email = user.email || "";
      if (!email.endsWith("@student.itk.ac.id") && !email.endsWith("@lecture.itk.ac.id")) {
        alert("Hanya akun ITK yang diperbolehkan!");
        // Logout langsung kalau bukan dari domain ITK
        await auth.signOut();
        return;
      }

      // Lanjutkan ke halaman dashboard, simpan user, dsb.
    } catch (error) {
      console.error("Login gagal:", error);
    }
  };

  return <button onClick={handleLogin}>Login dengan Google</button>;
}
