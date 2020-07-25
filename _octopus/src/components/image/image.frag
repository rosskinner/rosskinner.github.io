precision mediump float;
uniform vec2 resolution;
uniform float time;
uniform sampler2D uSampler;
varying vec2 vTextureCoord;

float min_color = 0.6; // pastel

void main() {
  vec2 pos = vec2(vTextureCoord.x, vTextureCoord.y);
  vec4 c = texture2D(uSampler, pos);
  if (c.a < 0.1) discard;
  float n = (pos.x + pos.y) * 0.5;

  if (n > time) {
    // no colors for you before your time =P
    discard;
  } else {
    float dif = abs(time - n);
    c.r *= time;
    c.g *= time;
    c.b *= time;
  }

  gl_FragColor = c;
}