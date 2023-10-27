import { ConnectKitButton } from "connectkit";
import { Logo } from "./logo";

export const Navbar = () => {
  return (
    <nav className="full flex items-center justify-end px-[120px] h-[82px]">
      <Logo />
      <ConnectKitButton />
    </nav>
  );
};
