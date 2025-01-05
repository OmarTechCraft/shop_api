const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between">
        <a href="/" className="text-xl font-bold hover:underline">
          Shop List
        </a>
        <a href="/add-shop" className="ml-4 text-xl font-bold hover:underline">
          Add Shop
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
