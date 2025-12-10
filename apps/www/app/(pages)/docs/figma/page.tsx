import Link from 'next/link'

const FigmaPage = () => {
  return (
    <main className='grid gap-16 pb-20'>
      <div className="grid gap-4" id="design-in-figma">
        <h1 className='text-4xl font-bold'>Design in Figma</h1>
        <p className="text-muted-foreground">Code is only half the story. behsseui provides a complete and meticulously organized Figma file to streamline your design process. Every component, icon, and slice available in our CLI has its digital twin in our Figma Kit.</p>
      </div>

      <div className="grid gap-10" id="why-figma">
        <div className="grid gap-4">
          <h3 className="text-2xl font-bold">Why use our Figma Kit?</h3>
          <p className="text-muted-foreground">Our Figma kit is built to bridge the gap between designers and developers.</p>
          <div className='pl-6'>
            <ul className='list-disc grid gap-4'>
              <div className='grid gap-2'>
                <li className='font-bold'><p>Parity</p></li>
                <p className="text-muted-foreground">Every component in Figma corresponds exactly to the component in the code. Same naming, same variants, same props.</p>
              </div>
              <div className='grid gap-2'>
                <li className='font-bold'><p>Ready-to-use Slices</p></li>
                <p className="text-muted-foreground">Don't start from scratch. Drag and drop our Slices (Navbars, Heros, Dashboards) to prototype entire pages in minutes.</p>
              </div>
              <div className='grid gap-2'>
                <li className='font-bold'><p>Auto-Layout & Variables</p></li>
                <p className="text-muted-foreground">All components utilize the latest Figma features (Auto-layout, Variables for colors and spacing) ensuring your design is responsive and maintainable.</p>
              </div>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid gap-10" id="whats-included">
        <div className="grid gap-4">
          <h3 className="text-2xl font-bold">What's included?</h3>
          <p className="text-muted-foreground">The file is organized for easy discovery:</p>
          <div className='pl-6'>
            <ul className='list-disc grid gap-4'>
              <div className='grid gap-2'>
                <li className='font-bold'><p>Foundations</p></li>
                <p className="text-muted-foreground">Typography, color palettes, and spacing systems (matching our CSS variables).</p>
              </div>
              <div className='grid gap-2'>
                <li className='font-bold'><p>Atomic Components</p></li>
                <p className="text-muted-foreground">Buttons, Inputs, Badges, Cards, etc., with all their states (hover, focus, disabled).</p>
              </div>
              <div className='grid gap-2'>
                <li className='font-bold'><p>Icon Library</p></li>
                <p className="text-muted-foreground">Our complete set of vector icons, ready to use.</p>
              </div>
              <div className='grid gap-2'>
                <li className='font-bold'><p>Slices</p></li>
                <p className="text-muted-foreground">The power user section. Assemblies of components to create complex interfaces (Dashboards, Landing pages) instantly.</p>
              </div>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid gap-10" id="get-started">
        <div className="grid gap-4">
          <h3 className="text-2xl font-bold">How to get started</h3>
          <div className='pl-6'>
            <ul className='list-disc grid gap-4'>
              <div className='grid gap-2'>
                <li className='font-bold'><p>Grab the file</p></li>
                <p className="text-muted-foreground">Head over to the Figma Community to duplicate our official file.</p>
                <a href="https://figma.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline w-fit">
                  👉 Get the Figma file
                </a>
              </div>
              <div className='grid gap-2'>
                <li className='font-bold'><p>Publish as a Library (Optional)</p></li>
                <p className="text-muted-foreground">If you are working in a team, we recommend publishing the file as a "Team Library" to access it across all your design projects.</p>
              </div>
              <div className='grid gap-2'>
                <li className='font-bold'><p>Start Designing</p></li>
                <p className="text-muted-foreground">Switch to the "Assets" tab in Figma and start dragging components or Slices onto your canvas.</p>
              </div>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid gap-10" id="for-developers">
        <div className="grid gap-4">
          <h3 className="text-2xl font-bold">For Developers</h3>
          <p className="text-muted-foreground">During the Handoff process (design to code), work is simplified:</p>
          <p className="text-muted-foreground">If a designer uses a Card component with the <span className='font-bold'>outline</span> variant in Figma, the developer knows exactly what to pull from the CLI:</p>
          <div className="rounded-lg border bg-muted/30 p-4 font-mono text-sm">
            &lt;Card variant="outline" /&gt;
          </div>
          <p className='text-muted-foreground'>This removes the guesswork and ensures the final product looks exactly like the mockup.</p>
        </div>
      </div>
    </main>
  )
}

export default FigmaPage
