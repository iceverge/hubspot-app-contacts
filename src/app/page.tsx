"use client";
import BtnConnect from "@/components/BtnConnect";
import { usePathname, redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Home() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const auth = searchParams.get("auth");
  const [isLoading, setIsLoading] = useState(true);

  console.log("Current Path:", pathname);
  console.log("Current auth:", auth);
  if (auth) {
    redirect("/contacts");
  }

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/valid-token`)
      .then((res) => res.json())
      .then((data) => {
        if (data.isValid) {
          redirect("/contacts");
        } else {
          setIsLoading(false);
        }
      });
  }, []);

  return (
    <div className="page-container">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {isLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin" size={40} />
          ) : (
            <BtnConnect />
          )}
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>Test Coding</p>
      </footer>
    </div>
  );
}
