import GithubIcon from "../res/github.svg?raw";
import LinkedInIcon from "../res/linkedin.svg?raw";
import EmailIcon from "../res/email.svg?raw";
import CvIcon from "../res/cv.svg?raw";

type Social = {
  label: string;
  link: string;
  icon: string;
};

type Presentation = {
  title: string;
  description: string;
  socials: Social[];
  profile?: string;
};

const presentation: Presentation = {
  title: "Hi, I’m Kevin 👋",
  // profile: "/profile.webp",
  description:
  "I'm an experienced software developer with a strong focus on *Android development for over four years*. More recently, I've been diving into the world of frontend development, working with *Typescript, React, and TailwindCSS*. ",
  socials: [
    {
      label: "LinkedIn",
      link: "https://www.linkedin.com/in/kyaw-htet-zaw/",
      icon: LinkedInIcon
    },
    {
      label: "Github",
      link: "https://github.com/xinkev",
      icon: GithubIcon
    },
    {
      label: "Email",
      link: "mailto:kyawhtet.zaw@outlook.com",
      icon: EmailIcon
    },
    {
      label: "Resume",
      link: "https://www.icloud.com/iclouddrive/064nFYPsYOS4bc_5wPumH8htA#Kyaw_Htet_Zaw",
      icon: CvIcon
    }
  ],
};

export default presentation;
