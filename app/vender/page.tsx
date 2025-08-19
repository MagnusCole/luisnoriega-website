import { redirect } from "next/navigation";
export const metadata = { title: "Vender tu empresa" };
export default function Vender() {
  redirect("/portafolio");
}
