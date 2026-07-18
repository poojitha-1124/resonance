import Link from "next/link"
import { AudioLines } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-zinc-50 border-t border-zinc-200/80 dark:bg-zinc-950 dark:border-zinc-900 transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Logo & Brand Pitch */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white dark:bg-white dark:text-black">
                <AudioLines className="h-5 w-5 text-indigo-500 dark:text-violet-500" />
              </div>
              <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Resonance
              </span>
            </Link>
            <p className="text-sm text-zinc-650 dark:text-zinc-400 max-w-xs">
              Synthesize high-fidelity voice output, build custom voice clones, and manage speech clips in one unified platform.
            </p>
            <div className="flex space-x-5 text-zinc-400">
              <Link href="#" className="hover:text-zinc-500 dark:hover:text-zinc-350">
                <span className="sr-only">Twitter (X)</span>
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
              <Link href="#" className="hover:text-zinc-550 dark:hover:text-zinc-300">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="hover:text-zinc-550 dark:hover:text-zinc-300">
                <span className="sr-only">YouTube</span>
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C22 8.68 22 12 22 12s0 3.32-.42 4.814a2.44 2.44 0 0 1-1.768 1.768c-1.494.42-6.812.42-6.812.42s-5.318 0-6.814-.42a2.44 2.44 0 0 1-1.768-1.768C1 15.32 1 12 1 12s0-3.32.42-4.814a2.44 2.44 0 0 1 1.768-1.768C4.682 5 10 5 10 5s5.318 0 6.812.418Z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="hover:text-zinc-550 dark:hover:text-zinc-300">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Links Grid */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-zinc-900 dark:text-zinc-300 uppercase">
                Product
              </h3>
              <ul role="list" className="mt-4 space-y-3">
                <li>
                  <Link href="#features" className="text-sm text-zinc-650 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-violet-405 transition-colors">
                    Voice Synthesis
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="text-sm text-zinc-650 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-violet-405 transition-colors">
                    Voice Cloning
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-zinc-650 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-violet-405 transition-colors">
                    API Access
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-zinc-650 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-violet-405 transition-colors">
                    Pricing Plans
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-zinc-900 dark:text-zinc-300 uppercase">
                Support
              </h3>
              <ul role="list" className="mt-4 space-y-3">
                <li>
                  <Link href="#" className="text-sm text-zinc-650 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-violet-405 transition-colors">
                    Guides & Docs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-zinc-650 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-violet-405 transition-colors">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-zinc-650 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-violet-405 transition-colors">
                    Help Desk
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-zinc-650 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-violet-405 transition-colors">
                    System Status
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-sm font-semibold tracking-wider text-zinc-900 dark:text-zinc-300 uppercase">
                Stay Updated
              </h3>
              <p className="mt-4 text-xs text-zinc-600 dark:text-zinc-400">
                Subscribe for the latest features, releases, and guides.
              </p>
              <form className="mt-3 flex gap-2 max-w-sm sm:max-w-none">
                <input
                  type="email"
                  required
                  placeholder="Enter email"
                  className="w-full text-xs rounded-lg border border-zinc-200 bg-white px-3 py-2 text-zinc-900 shadow-sm focus:border-indigo-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-zinc-900 px-3 py-2 text-xs font-semibold text-white shadow hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-250 transition-colors"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-200 dark:border-zinc-900 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs text-zinc-550 dark:text-zinc-500 md:order-1">
            &copy; {new Date().getFullYear()} Resonance Inc. All rights reserved.
          </p>
          <div className="flex space-x-6 md:order-2">
            <Link href="#" className="text-xs text-zinc-550 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-zinc-550 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs text-zinc-550 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300">
              Security Trust
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
