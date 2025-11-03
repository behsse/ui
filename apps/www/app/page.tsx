import { Button } from "./components/Button";

export default function Home() {
  return (
    <>
      <Button asChild>
        <a href="/components-list">Components list</a>
      </Button>
    </>
  );
}
