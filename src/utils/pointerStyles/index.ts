
export const enter = ({pointer, pointerFollow, size}: { pointer: HTMLElement, pointerFollow: HTMLElement, size?:string }) => {
  if (size === "big") { 
    pointerFollow.style.height = `60px`;
    pointerFollow.style.width = `60px`;
    pointerFollow.style.margin = '-27px 0 0 -27px'
  } else if (size === "small") { 
    pointerFollow.style.height = `30px`;
    pointerFollow.style.width = `30px`;
    pointerFollow.style.margin = '-15px 0 0 -15px'
  } else {
    pointerFollow.style.height = `40px`;
    pointerFollow.style.width = `40px`;
    pointerFollow.style.margin = '-18px 0 0 -18px'
  }
  pointerFollow.style.transition = `0.1s cubic-bezier(1,1.13,.01,1.24)`;

  pointer.style.opacity = `0`;
  pointer.style.transition = `0.1s cubic-bezier(1,1.13,.01,1.24)`;
  
}

export const leave = ({pointer, pointerFollow}: { pointer: HTMLElement, pointerFollow: HTMLElement}) => {
  pointerFollow.style.height = `17px`;
  pointerFollow.style.width = `17px`;
  pointerFollow.style.margin = '-6px 0 0 -6px'

  pointerFollow.style.transition = `0.1s cubic-bezier(1,1.13,.01,1.24)`;

  pointer.style.opacity = `1`;
  pointer.style.transition = `0.0s`;
}
