const root = document.documentElement;

const setFromEvent = ({ clientX, clientY, target }) => {
  root.style.setProperty(
    "--cursor-scale",
    target instanceof HTMLAnchorElement ||
      target instanceof HTMLImageElement ||
      (target.dataset && target.dataset.cursorExpand)
      ? 3
      : 1
  );
//   clientX
  root.style.setProperty("--mouse-x", `${clientX - 30}px`)
  root.style.setProperty("--mouse-y", `${clientY - 30}px`)
};
document.addEventListener('mousemove', setFromEvent, false)