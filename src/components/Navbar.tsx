"use client"

import Button from "./UI/Button"

export default function Navbar() {
  return (
    <div className="w-full flex items-center justify-between py-4 md:py-6 px-4 sm:px-9">
      <div>
        {/*TODO: logo*/}
      </div>
      <Button onClick={() => { }} size="md" color="accent">
        Connnect Wallet
      </Button>
    </div>
  )
}

