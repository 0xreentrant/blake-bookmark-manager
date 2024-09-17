export default function Page() {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center w-full pb-28 xl:gap-38 gap-32 bg-lightgray">
        <div className="flex flex-col max-w-screen-xl">
          <div className="p-6 bg-white">
            <h1 className="text-3xl font-bold mb-4">
              Updates and Known Issues
            </h1>

            <h1 className="text-2xl font-bold mb-2">September 2, 2024</h1>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">1. Bug Fixes</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Prevent Page Overflowing: Fixed issues where the page layout
                  was overflowing, leading to unintended scrolling or layout
                  breaking.
                </li>
                <li>
                  Typing and Build Fixes: Corrected type definitions for
                  database user access, and resolved type errors that were
                  blocking the build.
                </li>
                <li>
                  Button and Link Fixes: Fixed several UI-related bugs including
                  letter spacing, button colors (click/hover), and correct URL
                  for LinkedIn link.
                </li>
                <li>
                  Miscellaneous Bug Fixes: Removed unnecessary `console.log`s
                  and cleaned up single quotes in code.
                </li>
                <li>
                  Missing Click Colors and Interactions: Fixed missing click
                  colors on key buttons, such as the &quot;Try Blake Now&quot; button.
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                2. Refactoring and Code Cleanup
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Naming and Typing Refactors: Replaced ambiguous and cluttered
                  types, including cleaning out temporary variable names and
                  renaming types like `BlakeUser` to `ClientUser` to
                  disambiguate database schemas and client schemas.
                </li>
                <li>
                  TailwindCSS Cleanup: Simplified TailwindCSS class usage by
                  naming color classes and removing unnecessary styling.
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                3. Feature Enhancements
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Animations and UI Improvements: Added reveal animations,
                  improved button interactions with animations, and updated the
                  layout for better user experience (mouse-based hero animation
                  on marketing page).
                </li>
                <li>
                  Mobile-First and Responsive Layouts: Made responsive changes
                  to ensure the design works well on mobile, focusing on a
                  mobile-first approach for the layout and slideshow hero
                  section.
                </li>
                <li>
                  Improved Footer: Added logo to the footer and improved its
                  visual design by fixing padding and hover states.
                </li>
                <li>
                  Sign-Up Improvements: Added features to inform users about the
                  sign-up options and made user-facing buttons more intuitive.
                </li>
                <li>
                  Box Shadows and Microinteractions: Enhanced the visual design
                  of buttons and the hero section with box shadows and
                  microinteractions for a more polished look.
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                4. Debugging and Logging
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Auth URL Debugging: Added debug logs for Google login
                  authentication to troubleshoot related issues.
                </li>
                <li>
                  Remote Build Fixes: Fixed issues with package updates that
                  caused remote build failures.
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                5. Content and Documentation
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  README Updates: Updated project documentation (README) to
                  reflect the latest changes and improvements.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">
                6. Landing Page Development
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Initial Landing Page Setup: Laid out the foundation for a
                  working landing page with animations, microinteractions, and
                  hero tweaks.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
