import { Middleware } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProfileForm } from "./ui/ProfileForm";

export default async function ProfilePage() {
  const session = await Middleware();

  if (!session?.user) {
    // redirect('/auth/login?returnTo=/perfil')
    redirect("/");
  }

  console.log({ user: session.user });

  return (
    <div>
      <Title title="Perfil" />
      <ProfileForm user={session.user} />
    </div>
  );
}
