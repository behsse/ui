import {Button} from "../../../packages/components/Button"

export default function Home() {
  return (
    <>
      <Button>Button</Button>
      <Button asChild>
        <a href="https://google.com">aaaa</a>
      </Button>
    </>
  );
}
