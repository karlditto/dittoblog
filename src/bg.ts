import { TWallpaper } from "twallpaper";
import type { TWallpaperOptions } from "twallpaper";
import "twallpaper/css";

const app = document.querySelector<HTMLElement>("#app")!;
const options: TWallpaperOptions = {
  tails: 90,
  colors: ["#bb9af7", "#f7768e", "#7dcfff", "#9ece6a"],
  pattern: {
    image: "/public/games.svg",
  }
};

const wallpaper = new TWallpaper(app, options);

wallpaper.init();
wallpaper.updateFrametime(60);
wallpaper.updatePattern({
  ...options.pattern,
  opacity: 1
});

