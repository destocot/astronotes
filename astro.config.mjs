import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "KHRM Notes",
      social: {
        github: "https://github.com/destocot",
      },
      sidebar: [
        // {
        //   label: "Guides",
        //   items: [
        //     // Each item here is one entry in the navigation menu.
        //     { label: "Installation", link: "/guides/installation/" },
        //     { label: "Example Guide", link: "/guides/example/" },
        //   ],
        // },
        // {
        //   label: "Components",
        //   autogenerate: { directory: "components" },
        // },
        {
          label: "Notes",
          items: [
            { label: "MySQL", autogenerate: { directory: "mysql" } },
            { label: "Linux", autogenerate: { directory: "linux" } },
          ],
        },
      ],
    }),
  ],
});
