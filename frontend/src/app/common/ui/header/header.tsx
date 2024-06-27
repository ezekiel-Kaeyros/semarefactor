import NavBar from './navbar/NavBar';

export default async function Header({ lang }: { lang: string }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  return (
    <header className="py-6 bg-black fixed top-0 w-full z-10 right-0">
      {/* lg:right-12 */}
      <NavBar lang={lang} />
    </header>
  );
}
