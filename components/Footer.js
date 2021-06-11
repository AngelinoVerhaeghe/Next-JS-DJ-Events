import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-100 py-10">
      <div className="text-center container mx-auto">
        <p>Copyright &copy; DJ Events 2021</p>
        <p className="pt-3 text-red-500 hover:text-red-700">
          <Link href="/about">About this project</Link>
        </p>
      </div>
    </footer>
  );
}
export default Footer;
