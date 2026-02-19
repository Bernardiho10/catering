import AddressBook from "@/components/profile/AddressBook"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Address Book | Cake Delivery",
    description: "Manage your delivery addresses.",
}

export default function AddressesPage() {
    return <AddressBook />
}
