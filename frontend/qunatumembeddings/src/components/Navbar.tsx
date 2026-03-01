export default function Navbar() {
    return (
      <nav className="fixed top-0 w-full bg-black/60 backdrop-blur-md border-b border-zinc-800 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          
          <h1 className="text-xl font-bold text-orange-500">
            Quantum AI
          </h1>
  
          <button className="bg-orange-500 hover:bg-orange-600 transition px-5 py-2 rounded-lg text-black font-semibold">
            Launch
          </button>
  
        </div>
      </nav>
    );
  }