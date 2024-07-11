import Footer from "@/components/Footer";
import Header from "@/components/Header";


export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (

      <div className="h-screen w-full p-2" >
        <Header/>
        <main >{children}</main>
        <Footer/>
      </div>

    );
  }