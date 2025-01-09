import { Fot1, Fot2 } from "../Components/index";

export default () => {
  const footerNav = [
    {
      href : "javascript:void(0)",
      name : "Terms"
    },

    {
      href: "javascript:void(0)",
      name: "License"
    },

     {
      href: "javascript:void(0)",
      name: "Privacy"
    },

     {
      href: "javascript:void(0)",
      name: "About us"
    },
  ]

 return (
  <footer className="pt-10">
    <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
      <div className="sm:flex justify-between">
        {/* Left Section */}
        <div className="space-y-6">
          <img src="https://www.floatui.com/logo.svg"  className="w-32" />
          <p className="max-w-md">
            Nulla auctor metus vitae lectus iaculis, vel euismod massa efficitur.
          </p>
          <ul className="flex flex-wrap items-center gap-x-4 text-sm sm:text-base">
            {footerNav.map((item, idx) => (
              <li  className="text-gray-800 hover:text-gray-500 duration-150">
                <a key={idx} href={item.href}>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div className="mt-6">
          <p className="text-gray-700 font-semibold">Get the app</p>
          <div className="flex items-center gap-3 mt-3 sm:block">
            <a href="javascript:void(0)">
              <Fot1 />
            </a>
            <a href="javascript:void(0)" className="mt-0 block sm:mt-3">
              <Fot2 />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 py-10 border-t text-center">
        <p>© 2025 Vinay Kumar. All rights reserved.</p>
      </div>
    </div>
  </footer>
);
}