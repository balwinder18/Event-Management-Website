import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import { Separator } from "../components/ui/separator";
import Navitems from "./Navitems"

const Mobilenav = () => {
return (
  <nav className="md:hidden">
      <Sheet>
<SheetTrigger className="align-center">
  <Image src='/assets/icons/menu.svg' alt="menu" width={24} height={24} className="cursor-pointer"/>
</SheetTrigger>
<SheetContent className="md:hidden bg-white gap-6 flex flex-col">
  <Image src="/assets/images/logo.svg" alt="logo" width={128} height={34}/>
  <Separator className="border border-gray-50"/>
  <Navitems/>
</SheetContent>
</Sheet>

  </nav>
)
}

export default Mobilenav