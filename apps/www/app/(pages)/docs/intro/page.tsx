import Link from 'next/link'

const page = () => {
  const nextStepsTabs = [
    {
      id : 1,
      name : "Installation",
      description : "Learn how to configure the CLI and initialize your setup.",
      link: "docs/installation"
    },
    {
      id : 2,
      name : "Using Components",
      description : "Discover how to add individual components to your project via the CLI.",
      link: "docs/components"
    },
    {
      id : 3,
      name : "Icons",
      description : "Browse our icon library and learn how to integrate them without bloating your bundle.",
      link: "icons"
    },
    {
      id : 4,
      name : "Exploring Slices",
      description : "Learn how to integrate complex sections (Slices) to build entire pages in seconds.",
      link: "slices"
    },
    {
      id : 5,
      name : "Themes & Colors",
      description : "Understand how to configure and switch between different color themes to match your brand.",
      link: "theme"
    },
  ]
  return (
    <main className='grid gap-16 pb-20'>
      <div className="grid gap-4" id="installation">            
        <h1 className='text-4xl font-bold'>Introduction</h1>
        <p className="text-muted-foreground">Welcome to the behsseui documentation. This section will help you understand our philosophy, set up the CLI and start integrating modern components into your projects.</p>
        <h2 className='font-bold'>This is not a traditional component library.</h2>
        <p className="text-muted-foreground">behsseui is not an npm package that you install and keep as a "black box" dependency. It is a collection for beautiful designed components, icons ans UI sections (Slices) that you copy directly into your project.</p>
        <p className="text-muted-foreground">We believe in an approach where you own the code :</p>
        <div className='pl-6'>
          <ul className='list-disc grid gap-2'>
            <li><span className='font-bold'>No heavy installation :</span> Use our CLI to add only what you need.</li>
            <li><span className='font-bold'>Total control :</span> The source code is added to your project. You can read, modify and adapt it to your specific needs.</li>
            <li><span className='font-bold'>Modern Design :</span> Aesthetic defaults, designed for limitless customization.</li>
          </ul>
        </div>
      </div>
      <div className="grid gap-10" id="wyf">
        <div className="grid gap-4">
          <h3 className="text-2xl font-bold">Key features</h3>
          <p className="text-muted-foreground">Our ecosystem is built to accelerate tour development without sacrifing design quality.</p>
          <div className='pl-6'>
            <ul className='list-decimal grid gap-4'>
              <div className='grid gap-2'>
                <li className='font-bold'><p>Components & icons</p></li>
                <p className="text-muted-foreground">From buttons to input fields, including a complete collection of SVG icons. Every element is designed to be accessible, responsive and consistent.</p>
              </div>
              <div className='grid gap-2'>
                <li className='font-bold'><p>Slices (UI Blocks)</p></li>
                <p className="text-muted-foreground">Stop wasting time assembling atomic components one by one. Slices are pre-built blocks that group multiple components together to from complete sections :</p>
                <div className='pl-6'>
                  <ul className='list-disc grid gap-2'>
                    <li><p>Navbars and Menus</p></li>
                    <li><p>Dashboards</p></li>
                    <li><p>Hero Section and Footers</p></li>
                  </ul>
                </div>
              </div>
              <div className='grid gap-2'>
                <li className='font-bold'><p>Themes & customization</p></li>
                <p className="text-muted-foreground">Adapt the look of all your components with a single command. behsseui supports multiple color themes and integrates seamlessly with existing CSS varialbes.</p>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid gap-10" id="wyf">
        <div className="grid gap-4">
          <h3 className="text-2xl font-bold">Pre-requisite knowledge</h3>
          <p className="text-muted-foreground">Our documentation assumes some familiarity with modern web development. Before getting started, it will help if you are comfortable with :</p>
          <div className='pl-6'>
            <ul className='list-disc grid gap-2'>
                <li><p>HTML & CSS</p></li>
                <li><p>Javascript / Typescript</p></li>
                <li><p>Your favorite framework</p></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid gap-10" id="wyf">
        <div className="grid gap-4">
          <h3 className="text-2xl font-bold">Next steps</h3>
          <p className="text-muted-foreground">Ready to build ? Follow the guide to get started.</p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            {
              nextStepsTabs.map((nextSteps) => (
                <Link
                  key={nextSteps.id}
                  href={`/${nextSteps.link}`}
                  className="group relative flex flex-col rounded-lg border bg-background overflow-hidden hover:border-foreground/20 transition-all hover:shadow-md"
                >
                  <div className='p-6 grid gap-2'>
                    <p className='text-lg font-bold'>{nextSteps.name}</p>
                    <p className='text-muted-foreground'>{nextSteps.description}</p>
                  </div>
                  {/* Indicateur hover */}
                  <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 7h10v10" />
                      <path d="M7 17 17 7" />
                    </svg>
                  </div>
                </Link>
              ))
            }
          </div>
        </div>
      </div>
      <div className="grid gap-10" id="wyf">
        <div className="grid gap-4">
          <h3 className="text-2xl font-bold">Why the CLI approach ?</h3>
          <p className="text-muted-foreground">We embrace an "Open Code" approach. When you use a traditional library, you are often constrained by its API. If you want to change the internal behavior of a component, you often end up writing complex workarounds.</p>
          <p className="text-muted-foreground">The CLI drops the code directly into your ui folder.</p>
          <div className='pl-6'>
            <ul className='list-disc grid gap-2'>
                <li><p className="text-foreground">Need to change an animation ? <span className='font-bold text-foreground'>Modify the code.</span></p></li>
                <li><p className="text-foreground">Need to add a specific props ? <span className='font-bold'>Modify the code.</span></p></li>
                <li><p className="text-foreground">Need AI to understand your UI ? <span className='font-bold'>The code is clear and accessible.</span></p></li>
            </ul>
          </div>
          <p className='text-muted-foreground'>It is your code, we simply provide you with the perfect starting point.</p>
        </div>        
      </div>
    </main>
  )
}

export default page