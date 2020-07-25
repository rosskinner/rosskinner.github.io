precision mediump float;

uniform vec2 mouse;
uniform vec2 resolution;
uniform float time;
uniform sampler2D uSampler;
varying vec2 vTextureCoord;

// float min_color = 0.6; // normal
float min_color = 0.6; // pastel
float max_dif = 0.26;

void main() {
  vec2 pos = vec2(vTextureCoord.x, vTextureCoord.y);
  vec4 c = texture2D(uSampler, pos);
  if (c.a < 0.1) discard;
  float n = (pos.x + pos.y) * 0.5;

  if (n > time) {
    // black octopus
    // c.r = 0.0;
    // c.g = 0.0;
    // c.b = 0.0;

    // psychodelic octopus
    // c.r = cos(time + pos.x);
    // c.g = sin(time * pos.x * 10.0 + pos.y);
    // c.b = sin(time * 10.0 + n);

    // no octopus
    discard;
  } else {
    float capped_time = min(time, 1.0);
    float dif = abs(time - n);

    // tv colors : yellow, cyan, green, purple, red
    if (dif < 0.05) {
      // red
      // c.r *= 4.0;
      c.r = 1.0;
      c.g = min_color;
      c.b = min_color;
    } else if (dif < 0.06) {
      discard; // make a gap
    } else if (dif < 0.1) {
      // purple
      // c.r *= 4.0;
      // c.b *= 2.5;
      c.g = min_color;
      c.r = 1.0;
      c.b = 0.65;
    } else if (dif < 0.11) {
      discard; // make a gap
    } else if (dif < 0.15) {
      // green
      c.r = min_color;
      // c.g *= 4.0;
      c.g = 1.0;
      c.b = min_color;
    } else if (dif < 0.16) {
      discard; // make a gap
    } else if (dif < 0.2) {
      // cyan
      c.r = min_color;
      // c.g *= 4.0;
      // c.b *= 4.0;
      c.g = 1.0;
      c.b = 1.0;
    } else if (dif < 0.21) {
      discard; // make a gap
    } else if (dif < 0.25) {
      // yellow
      // c.r *= 4.0;
      // c.g *= 3.0;
      c.r = 1.0;
      c.g = 0.75;
      c.b = min_color;
    } else if (dif < 0.26) {
      discard; // make a gap
    } else {
      c.r *= capped_time;
      c.g *= capped_time;
      c.b *= capped_time;
    }
  }

  gl_FragColor = c;
}