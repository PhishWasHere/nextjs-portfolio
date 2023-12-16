// precision mediump float;

// uniform vec2 uResolution;
// uniform float uTime;


void main() {  
  // makes a circle
  float alpha = 1.0 - smoothstep(0.5, 0.5, length(gl_PointCoord - vec2(0.5)));
  alpha = pow(alpha, 0.5);
  //
  
  // gl_FragColor = vec4(0.5, 0.058, 0.8, alpha);
  // gl_FragColor = vec4(0.24, 0.78, 0.74, alpha);
  gl_FragColor = vec4(0.9, 0.9, 0.9, alpha);

}

