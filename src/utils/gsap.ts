import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Flip from "gsap/Flip";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);
