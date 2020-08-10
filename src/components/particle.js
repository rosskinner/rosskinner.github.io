import * as THREE from 'three'
import { Vector3 } from 'three'

var DAMPING = 0.06
var DRAG = 1 - DAMPING

export default function Particle( x, y, z, mass, clothFunction ) {

    this.position = new Vector3()
    this.previous = new Vector3()
    this.original = new Vector3()
    this.a = new Vector3( 0, 0, 0 ) // acceleration
    this.mass = mass
    this.invMass = 1 / mass
    this.tmp = new Vector3()
    this.tmp2 = new Vector3()
  
    // init
  
    clothFunction( x, y, this.position ) // position
    clothFunction( x, y, this.previous ) // previous
    clothFunction( x, y, this.original )
  
  }
  
  // Force -> Acceleration
  
  Particle.prototype.addForce = function ( force ) {
    this.a.add(
      this.tmp2.copy( force ).multiplyScalar( this.invMass )
    );
  
  };
  
  
  // Performs Verlet integration
  
  Particle.prototype.integrate = function ( timesq ) {
  
    var newPos = this.tmp.subVectors( this.position, this.previous );
    newPos.multiplyScalar( DRAG ).add( this.position );
    newPos.add( this.a.multiplyScalar( timesq ) );
  
    this.tmp = this.previous;
    this.previous = this.position;
    this.position = newPos;
  
    this.a.set( 0, 0, 0 );
  
  };