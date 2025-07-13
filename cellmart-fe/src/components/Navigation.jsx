import { Button } from "@/components/ui/button";

function Navigation(p) {

  return (
    <nav className="z-10 bg-black flex items-center justify-between px-8 text-white py-4">
      <div className="flex items-center space-x-8">
        <a href="/" className="text-2xl font-bold ">
          CELLMART
        </a>
        <div className="hidden md:flex space-x-6">
          <a href={`/`} className="transition-colors">
            Home
          </a>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" className=""> 
          EN
        </Button>
        <Button variant="ghost" asChild>
          <a href="/sign-in">Log In</a>
        </Button>
        <Button asChild>
          <a href="/sign-up">Sign Up</a>
        </Button>
      </div>
    </nav>
  );
}

export default Navigation;