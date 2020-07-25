precision mediump float;

uniform vec2 mouse;
uniform vec2 resolution;
uniform float time;
uniform sampler2D uSampler;
varying vec2 vTextureCoord;

void main() {
  // float dif = sin(time) * 0.001 + cos(mouse.x - gl_FragCoord.x) * 0.002;
  float dif = cos(mouse.x - gl_FragCoord.x) * 0.0025 * time * mouse.y * 0.01;
  vec2 pos = vec2(vTextureCoord.x + dif, vTextureCoord.y + dif);
  vec4 c = texture2D(uSampler, pos);
  if (c.a < 0.1) discard;

  vec2 pixelPos = vec2(gl_FragCoord.x, resolution.y - gl_FragCoord.y);
  float d = distance(pixelPos, mouse) * 0.0005;

  c.r += d;
  c.g += d * 0.9;
  c.b += d;

  gl_FragColor = c;
}