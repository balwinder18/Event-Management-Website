import Image from "next/image";
import Header from "../../components/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <div className="">
      <Header />
      <>
        <section style={{ backgroundImage: 'radial-gradient(black 1px, transparent 0)', backgroundSize: '40px 40px' }} className="bg-primary-50 bg-dotted-pattern bg-contains-pattern py-5 md:py-10 ">
          <div className=" grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
            <div className="flex flex-col justify-center gap-8">
              <h1 style={{ fontWeight: 'bold' }}> Buy Tickets , Host your events on our platform!</h1>
              <p className="">
                Enjoy your local events and buy their Tickets at lowest price
              </p>
              <Button size="lg" asChild className=" w-full sm:w-fit">
                <Link href="#events">
                  Find Events Here!
                </Link>

              </Button>
            </div>
            <Image src="/assets/images/hero.png" alt="hero" width={1000} height={1000} className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]" />

          </div>
        </section>
        <section id="events" className=" my-8 flex flex-col gap-8 md:gap-12">
          <h2 className="">Trusted by Thousands</h2>
          <div className="flex flex-col w-full gap-5 md:flex-row">
            Search category filter
          </div>
        </section>

      </>
      <Footer/>
    </div>

  );
}
