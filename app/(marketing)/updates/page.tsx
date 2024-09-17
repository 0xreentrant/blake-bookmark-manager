export default function Page() {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center w-full pb-28 xl:gap-38 gap-32 bg-lightgray">
        <div className="flex flex-col max-w-screen-xl">
<div className="p-6 bg-white">
  <h1 className="text-3xl font-bold mb-6">Updates and Known Issues</h1>

  <section className="mb-8">
    <h2 className="text-2xl font-semibold mb-4">Known Issues</h2>
    <ul className="list-disc pl-5 space-y-4">
      <li>
        <strong>Multiple dropdowns can be opened simultaneously</strong>: Users are able to open more than one dropdown at a time, which can cause confusion and clutter the interface. A change is planned to allow only one dropdown to be open at a time.
      </li>
      <li>
        <strong>Non-Chrome bookmark exports fail to upload</strong>: Attempting to upload bookmarks from formats other than a Chrome bookmark export results in failure. Support for other formats is planned for future updates.
      </li>
      <li>
        <strong>Mobile drawers exceed screen height</strong>: Mobile drawers can extend beyond the top of the screen, causing layout issues and making it difficult for users to interact with the content. Adjustments are planned to limit the drawer height within the visible screen area.
      </li>
      <li>
        <strong>Duplicate bookmarks can be added</strong>: Users are able to manually add duplicate bookmarks or import the same bookmarks multiple times. Improvements are planned to prevent duplicates from being added in the future.
      </li>
    </ul>
  </section>

  <section>
    <h2 className="text-2xl font-bold mb-6">Latest Updates: September 17, 2024</h2>

    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">1. Bug Fixes</h3>
      <ul className="list-disc pl-5 space-y-4">
        <li>
          <strong>Padding and Layout Fixes</strong>: Adjusted padding for the info banner and ensured the avatar and upload components appear on all pages. Updated the layout and styles to accommodate these changes.
        </li>
        <li>
          <strong>List Reordering and Navigation</strong>: Fixed issues with lists not reordering when renamed, and ensured that navigating to a non-existent list shows a proper &quot;list doesn&apos;t exist&quot; page. Deleting a list now properly redirects back to the &quot;All Bookmarks&quot; page.
        </li>
        <li>
          <strong>Pointer Events Fix</strong>: Corrected pointer events so that both the element and its parent elements can be clicked properly.
        </li>
      </ul>
    </div>

    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">2. Feature Enhancements</h3>
      <ul className="list-disc pl-5 space-y-4">
        <li>
          <strong>News and Updates Pages</strong>: Added links to the news and updates pages, along with links for the logo and footer.
        </li>
        <li>
          <strong>Updates Page</strong>: Created and linked an updates page to provide users with relevant news and platform changes.
        </li>
        <li>
          <strong>Banner Component</strong>: Implemented a reusable banner component, extracted it from existing code for cleaner reuse across pages.
        </li>
      </ul>
    </div>
  </section>

  <section className="mt-12">
    <h2 className="text-2xl font-bold mb-6">Latest Updates: September 2, 2024</h2>

    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">1. Bug Fixes</h3>
      <ul className="list-disc pl-5 space-y-4">
        <li>
          <strong>Prevent Page Overflowing</strong>: Fixed issues where the page layout was overflowing, leading to unintended scrolling or layout breaking.
        </li>
        <li>
          <strong>Typing and Build Fixes</strong>: Corrected type definitions for database user access, and resolved type errors that were blocking the build.
        </li>
        <li>
          <strong>Button and Link Fixes</strong>: Fixed several UI-related bugs including letter spacing, button colors (click/hover), and correct URL for LinkedIn link.
        </li>
        <li>
          <strong>Miscellaneous Bug Fixes</strong>: Removed unnecessary &grave;console.log&grave;s and cleaned up single quotes in code.
        </li>
        <li>
          <strong>Missing Click Colors and Interactions</strong>: Fixed missing click colors on key buttons, such as the &quot;Try Blake Now&quot; button.
        </li>
      </ul>
    </div>

    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">2. Refactoring and Code Cleanup</h3>
      <ul className="list-disc pl-5 space-y-4">
        <li>
          <strong>Naming and Typing Refactors</strong>: Replaced ambiguous and cluttered types, including cleaning out temporary variable names and renaming types like &grave;BlakeUser&grave; to &grave;ClientUser&grave; to disambiguate database schemas and client schemas.
        </li>
        <li>
          <strong>TailwindCSS Cleanup</strong>: Simplified TailwindCSS class usage by naming color classes and removing unnecessary styling.
        </li>
      </ul>
    </div>

    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">3. Feature Enhancements</h3>
      <ul className="list-disc pl-5 space-y-4">
        <li>
          <strong>Animations and UI Improvements</strong>: Added reveal animations, improved button interactions with animations, and updated the layout for better user experience (mouse-based hero animation on marketing page).
        </li>
        <li>
          <strong>Mobile-First and Responsive Layouts</strong>: Made responsive changes to ensure the design works well on mobile, focusing on a mobile-first approach for the layout and slideshow hero section.
        </li>
        <li>
          <strong>Improved Footer</strong>: Added logo to the footer and improved its visual design by fixing padding and hover states.
        </li>
        <li>
          <strong>Sign-Up Improvements</strong>: Added features to inform users about the sign-up options and made user-facing buttons more intuitive.
        </li>
        <li>
          <strong>Box Shadows and Microinteractions</strong>: Enhanced the visual design of buttons and the hero section with box shadows and microinteractions for a more polished look.
        </li>
      </ul>
    </div>

    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">4. Debugging and Logging</h3>
      <ul className="list-disc pl-5 space-y-4">
        <li>
          <strong>Auth URL Debugging</strong>: Added debug logs for Google login authentication to troubleshoot related issues.
        </li>
        <li>
          <strong>Remote Build Fixes</strong>: Fixed issues with package updates that caused remote build failures.
        </li>
      </ul>
    </div>

    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">5. Content and Documentation</h3>
      <ul className="list-disc pl-5 space-y-4">
        <li>
          <strong>README Updates</strong>: Updated project documentation (README) to reflect the latest changes and improvements.
        </li>
      </ul>
    </div>

    <div>
      <h3 className="text-xl font-semibold mb-3">6. Landing Page Development</h3>
      <ul className="list-disc pl-5 space-y-4">
        <li>
          <strong>Initial Landing Page Setup</strong>: Laid out the foundation for a working landing page with animations, microinteractions, and hero tweaks.
        </li>
      </ul>
    </div>
  </section>
</div>
        </div>
      </div>
    </div>
  );
}
