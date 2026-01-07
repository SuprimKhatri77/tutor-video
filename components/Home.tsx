import { About } from "./landing/About";
import { Hero } from "./landing/Hero";
import { Stats } from "./landing/Stats";
import { Testimonial } from "./landing/Testimonial";


export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Stats />
      <Testimonial />
    </div>
  )
}
