precision mediump float;
uniform vec2 u_resolution;
uniform vec3 u_lightColor;
uniform vec3 u_lightPosition;

varying vec3 vColor;
vec3 lightColor = vec3(1.0, 1.0, 1.0);

varying vec3 vNormal;

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  vec3 color = vec3(0.0, 0.0, 0.0);

  vec3 normal = normalize(vNormal);
  float nDotL = clamp(dot(normal, u_lightPosition), 0.0, 1.0);
  vec3 diffuse = u_lightColor * lightColor * nDotL;
  gl_FragColor = vec4(mix(color, diffuse, 0.5), 1.0);
}