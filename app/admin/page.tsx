"use client";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { SimpleEditor } from "@/components/editor/simple/simple-editor";

export default function Admin() {
  const router = useRouter();
  const { data, error, isPending } = authClient.useSession();

  async function handleSignout() {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
          },
        },
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    if (isPending) return;

    if (!data?.session) {
      router.push("/sign-in");
    }

    if (error) {
      router.push("/");
    }
  }, [data, error, isPending, router]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!data?.session) {
    return null;
  }

  return (
    <div className="flex justify-center align-middle">
      <div className="flex gap-4 mt-4">
        <SimpleEditor />
        {/* <Button onClick={handleSignout}>Sign Out</Button> */}
      </div>
    </div>
  );
}
