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
        {
          label: "MySQL",
          autogenerate: { directory: "mysql" },
          collapsed: true,
        },
        {
          label: "Linux",
          autogenerate: { directory: "linux" },
          collapsed: true,
        },
        {
          label: "Containers",
          autogenerate: {
            directory: "containers",
          },
        },
        {
          label: "Python",
          autogenerate: { directory: "python" },
        },
      ],
    }),
  ],
});
