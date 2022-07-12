<template>
  <div
    w-m = "x-auto y-6"
    w-w = "20">
    <svg
      viewBox = "0 0 33 33"
      w-bg = "white dark:black"
      w-animate = "logo"
      w-transform = "~ -rotate-45"
      w-w = "20">
      <defs>
        <radialGradient
          cx = "2.31"
          cy = "2.59"
          fx = "2.31"
          fy = "2.59"
          id = "gradient"
          r = "39.53"
          gradientTransform = "matrix(1, 0, 0, 1, 0, 0)"
          gradientUnits = "userSpaceOnUse">
          <stop
            offset = "0"
            stop-color = "#20c6b7"/>
          <stop
            offset = "1"
            stop-color = "#4d9abf"/>
        </radialGradient>
      </defs>
      <g
        w-animate = "bg"
        w-opacity = "1">
        <rect
          fill = "url(#gradient)"
          height = "30"
          rx = "2.12"
          ry = "2.12"
          transform = "translate(33) rotate(90)"
          width = "30"
          x = "1.5"
          y = "1.5"/>
      </g>
      <line
        stroke-miterlimit = "10"
        x1 = "10.7"
        x2 = "4.97"
        y1 = ".88"
        y2 = "32.11"
        w-animate = "line1"
        w-svg = "fill-none stroke-1 stroke-dash-100 stroke-offset-140 stroke-white"/>
      <line
        stroke-miterlimit = "10"
        x1 = ".88"
        x2 = "32.11"
        y1 = "14.08"
        y2 = "7.32"
        w-animate = "line2"
        w-svg = "fill-none stroke-1 stroke-dash-100 stroke-offset-140 stroke-white"/>
      <line
        stroke-miterlimit = "10"
        x1 = "1.39"
        x2 = "21.17"
        y1 = "2"
        y2 = "32.11"
        w-animate = "line3"
        w-svg = "fill-none stroke-1 stroke-dash-100 stroke-offset-140 stroke-white"/>
      <line
        stroke-miterlimit = "10"
        x1 = "18.43"
        x2 = "30.85"
        y1 = ".88"
        y2 = "31.5"
        w-animate = "line4"
        w-svg = "fill-none stroke-1 stroke-dash-100 stroke-offset-140 stroke-white"/>
      <line
        stroke-miterlimit = "10"
        x1 = ".9"
        x2 = "32.11"
        y1 = "9.27"
        y2 = "21.79"
        w-animate = "line5"
        w-svg = "fill-none stroke-1 stroke-dash-100 stroke-offset-140 stroke-white"/>
      <line
        stroke-miterlimit = "10"
        x1 = "7.27"
        x2 = "32.7"
        y1 = "32.11"
        y2 = "13.77"
        w-animate = "line6"
        w-svg = "fill-none stroke-1 stroke-dash-100 stroke-offset-140 stroke-white"/>
      <circle
        cx = "8.31"
        cy = "12.52"
        r = "2.47"
        w-animate = "node1"
        w-svg = "fill-white dark:fill-black"
        w-transform = "~ origin-node1 scale-0"/>
      <circle
        cx = "21.57"
        cy = "9.42"
        r = "2.18"
        w-animate = "node2"
        w-svg = "fill-white dark:fill-black"
        w-transform = "~ origin-node2 scale-0"/>
      <circle
        cx = "16.65"
        cy = "25.03"
        r = "1.86"
        w-animate = "node3"
        w-svg = "fill-white dark:fill-black"
        w-transform = "~ origin-node3 scale-0"/>
      <rect
        height = "30"
        rx = "2.12"
        ry = "2.12"
        w-svg = "fill-none"
        width = "30"
        x = "1.5"
        y = "1.5"/>
      <circle
        cx = "25.53"
        cy = "19.1"
        r = "1.89"
        w-animate = "node4"
        w-svg = "fill-white dark:fill-black"
        w-transform = "~ origin-node4 scale-0"/>
      <path
        d = "M-.74-.43V33.43H33.74V-.43H-.74ZM32.06,29.68c0,1.31-1.06,2.37-2.37,2.37H3.32c-1.31,0-2.37-1.06-2.37-2.37V3.32C.94,2.01,2.01,.94,3.32,.94H29.68c1.31,0,2.37,1.06,2.37,2.37V29.68Z"
        w-svg = "fill-white dark:fill-black"/>
      <rect
        height = "30.62"
        rx = "2.12"
        ry = "2.12"
        stroke-miterlimit = "10"
        w-animate = "border"
        w-svg = "fill-none stroke-1 stroke-dash-200 stroke-offset-240 stroke-teal300"
        width = "30.62"
        x = "1.19"
        y = "1.19"/>
    </svg>
  </div>
</template>
<!--
  <safe
    w-animate = "fill stroke"/>
-->