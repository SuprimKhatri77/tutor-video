import { About } from "./landing/About";
import { Hero } from "./landing/Hero";
import { SocialStats } from "./landing/SocialStats";
import { Testimonial } from "./landing/Testimonial";


export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <SocialStats />
      <Testimonial />
    </div>
  )
}
