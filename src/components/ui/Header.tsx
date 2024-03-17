import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useLocation } from "wouter";

import { Button } from "./button";
import { ConnectButton } from "../../ConnectButton";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [_l, setLocation] = useLocation();

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <span className="scroll-m-20 text-xl font-semibold tracking-tight">
              🎁 $GIFT.
            </span>
          </a>
        </div>
        <div className="flex-1 items-center justify-end gap-x-2 hidden lg:flex">
          <Button onClick={() => setLocation("/create-choose-asset")}>
            Create Gift
          </Button>
          <ConnectButton />
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 flex flex-col right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <Button onClick={() => setLocation("/create-choose-asset")} className="mb-5 w-full">
            Create Gift
          </Button>
          <ConnectButton />
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
