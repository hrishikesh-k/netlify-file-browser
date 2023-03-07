<template>
  <div
    w-m = "x-auto y-6"
    w-w = "20">
    <svg
      viewBox = "0 0 128 128"
      w-h = "20"
      w-svg = "fill-current"
      w-w = "20">
      <mask
        id = "animation-mask">
        <path
          d = "M0,0v128h128V0H0z M81.2,82.3H46.8V45.7h34.4V82.3z"
          fill = "white"/>
      </mask>
      <g
        mask = "url(#animation-mask)">
        <path
          w-animate = "duration-1400 line1"
          w-transform = "origin-center-top"
          d = "M58.94,34.75V8.42l.73-.73h8.8l.73,.73v26.33l-.73,.73h-8.8l-.73-.73Z"/>
        <path
          w-animate = "duration-1400 line2"
          w-transform = "origin-left-center"
          d = "M127.27,69.13h-35.11l-.73-.73v-8.8l.73-.73h35.11l.73,.73v8.8l-.73,.73Z"/>
        <path
          w-animate = "duration-1400 line3"
          w-transform = "origin-center-bottom"
          d = "M58.94,119.58v-26.33l.73-.73h8.8l.73,.73v26.33l-.73,.73h-8.8l-.73-.73Z"/>
        <path
          w-animate = "duration-1400 line4"
          w-transform = "origin-bottom-left"
          d = "M34.59,101.73h-1.21l-6.03-6.03v-1.21l9.22-9.22h6.39l.85,.85v6.39l-9.22,9.22Z"/>
        <path
          w-animate = "duration-1400 line5"
          w-transform = "origin-left-center"
          d = "M35.84,69.13H.73l-.73-.73v-8.8l.73-.73H35.84l.73,.73v8.8l-.73,.73Z"/>
        <path
          w-animate = "duration-1400 line6"
          w-transform = "origin-top-left"
          d = "M27.35,33.5v-1.21l6.03-6.03h1.21l9.22,9.22v6.39l-.85,.85h-6.39l-9.22-9.22Z"/>
      </g>
      <path
        w-animate = "duration-1400 n"
        w-transform = "origin-center"
        d = "M80.45,82.29h-8.78l-.73-.73v-20.54c0-3.66-1.44-6.49-5.84-6.59-2.27-.06-4.86,0-7.64,.11l-.42,.43v26.59l-.73,.73h-8.78l-.73-.73V46.45l.73-.73h19.75c7.68,0,13.9,6.22,13.9,13.9v21.94l-.73,.73Z"/>
    </svg>
  </div>
</template>
<style>
@keyframes line1 {
  0% {
    opacity: 0;
    transform: translateY(-0.25rem);
  }
  60% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    transform: translateY(2.5rem);
  }
}
@keyframes line2 {
  0%, 70% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(6.25rem);
  }
}
@keyframes line3 {
  0%, 12% {
    opacity: 0;
    transform: translateY(0.25rem);
  }
  40%, 60% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    transform: translateY(-2.5rem);
  }
}
@keyframes line4 {
  0%, 9% {
    opacity: 0;
    transform: translate(-0.25rem, 0.25rem);
  }
  40%, 63% {
    opacity: 1;
    transform: translate(0);
  }
  100% {
    transform: translate(1.875rem, -1.875rem);
  }
}
@keyframes line5 {
  0%, 6% {
    opacity: 0;
    transform: translateX(-0.25rem);
  }
  40%, 63% {
    opacity: 1;
    transform: translate(0);
  }
  100% {
    transform: translateX(5.71875rem);
  }
}
@keyframes line6 {
  0%, 3% {
    opacity: 0;
    transform: translate(-0.25rem, -0.25rem);
  }
  40%, 63% {
    opacity: 1;
    transform: translate(0);
  }
  100% {
    transform: translate(1.875rem, 1.875rem);
  }
}
@keyframes n {
  0%, 65% {
    transform: scale(1);
  }
  80% {
    transform: scale(0.8);
  }
  85% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
[w-animate~="line1"] {
  animation: line1 cubic-bezier(0.68, -0.6, 0.32, 1.5) infinite;
}
[w-animate~="line2"] {
  animation: line2 cubic-bezier(0.68, -0.6, 0.32, 1.5) infinite;
}
[w-animate~="line3"] {
  animation: line3 cubic-bezier(0.68, -0.6, 0.32, 1.5) infinite;
}
[w-animate~="line4"] {
  animation: line4 cubic-bezier(0.68, -0.6, 0.32, 1.5) infinite;
}
[w-animate~="line5"] {
  animation: line5 cubic-bezier(0.68, -0.6, 0.32, 1.5) infinite;
}
[w-animate~="line6"] {
  animation: line6 cubic-bezier(0.68, -0.6, 0.32, 1.5) infinite;
}
[w-animate~="n"] {
  animation: n cubic-bezier(0.68, -0.6, 0.32, 1.5) infinite;
}
</style>
<!--
  <safe
    w-animate = "fill stroke"/>
-->