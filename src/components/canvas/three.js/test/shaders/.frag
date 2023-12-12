precision mediump float;

uniform vec2 uResolution;
uniform float uTime;

vec3 palette (in float t) {
  vec3 a = vec3(0.5, 0.5, 0.5);
  vec3 b = vec3(0.5, 0.5, 0.5);
  vec3 c = vec3(1.0, 1.0, 1.0);
  vec3 d = vec3(0.263, 0416, 0.557);

  return a + b*cos( 6.28318*(c*t+d) );
}

void main() {  
  // makes a circle
  float alpha = 1.0 - smoothstep(0.5, 0.5, length(gl_PointCoord - vec2(0.5)));
  alpha = pow(alpha, 0.5);
  //
  
  // gl_FragColor = vec4(0.24, 0.78, 0.84, 1.0);
  gl_FragColor = vec4(0.9, 0.9, 0.9, alpha);
}

