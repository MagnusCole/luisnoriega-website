import { redirect } from "next/navigation";
export const metadata = { title: "Sobre mí" };
export default function About() {
  redirect("/");
}
