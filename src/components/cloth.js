import * as THREE from 'three'
import { Vector3 } from 'three'
import Particle from './particle'

var restDistance = 12

function ClothFunction( width, height ) {

  return function ( u, v, target ) {

    var x = ( u - 0.5 ) * (width* restDistance)
    var y = 0
    var z = ( v + 0.5 ) * (height* restDistance)

    target.set( x, y, z )

  }

}

function Cloth( w, h, MASS, clothFunction ) {

  w = w || 10
  h = h || 10
  this.w = w
  this.h = h
  this.center = new Vector3()

  var particles = []
  var constraints = []

  var u, v

  // Create particles
  for ( v = 0; v <= h; v ++ ) {

    for ( u = 0; u <= w; u ++ ) {
      const p = new Particle( u / w,  v / h , -250, MASS, clothFunction )
      particles.push(p)
      // console.log(p.position)
      this.center.x += p.position.x
      this.center.y += p.position.y
      this.center.z += p.position.z
      
    }

  }
  this.center.x = this.center.x/particles.length
  this.center.y = this.center.y/particles.length
  this.center.z = this.center.z/particles.length

  // Structural

  for ( v = 0; v < h; v ++ ) {

    for ( u = 0; u < w; u ++ ) {

      constraints.push( [
        particles[ index( u, v ) ],
        particles[ index( u, v + 1 ) ],
        restDistance
      ] );

      constraints.push( [
        particles[ index( u, v ) ],
        particles[ index( u + 1, v ) ],
        restDistance
      ] );

    }

  }

  for ( u = w, v = 0; v < h; v ++ ) {

    constraints.push( [
      particles[ index( u, v ) ],
      particles[ index( u, v + 1 ) ],
      restDistance

    ] );

  }

  for ( v = h, u = 0; u < w; u ++ ) {

    constraints.push( [
      particles[ index( u, v ) ],
      particles[ index( u + 1, v ) ],
      restDistance
    ] );

  }


  // While many systems use shear and bend springs,
  // the relaxed constraints model seems to be just fine
  // using structural springs.
  // Shear
  var diagonalDist = Math.sqrt(restDistance * restDistance * 2);


  for (v=0;v<h;v++) {
  	for (u=0;u<w;u++) {

  		constraints.push([
  			particles[index(u, v)],
  			particles[index(u+1, v+1)],
  			diagonalDist
  		]);

  		constraints.push([
  			particles[index(u+1, v)],
  			particles[index(u, v+1)],
  			diagonalDist
  		]);

  	}
  }


  this.particles = particles;
  this.constraints = constraints;

  function index( u, v ) {

    return u + v * ( w + 1 );

  }

  this.index = index;

}

export {
  Cloth,
  ClothFunction
}