precision mediump float;

uniform vec2 mouse;
uniform vec2 resolution;
uniform float time;
uniform float radius;
uniform sampler2D uSampler;
uniform vec2 focusPosition;
varying vec2 vTextureCoord;

void main() {
  vec2 pixelPos = vec2(gl_FragCoord.x, resolution.y - gl_FragCoord.y);
  vec2 inv = vec2(focusPosition.x, resolution.y - focusPosition.y);
  float d = distance(pixelPos, inv);

  vec4 c = texture2D(uSampler, vTextureCoord);
  float m = max( 0.0, time - 0.3);

  c.r = max(c.r, m);
  c.g = max(c.g, m);
  c.b = max(c.b, m);

  if (length(focusPosition - pixelPos) < (2000.0 * (1.0 - time) + radius)) {
    // if (length(focusPosition - pixelPos) < 50.0) {
  // if (d < (1000.0 * (1.0 - time) + 100.0)) {
    discard;
  }

  gl_FragColor = c;
}