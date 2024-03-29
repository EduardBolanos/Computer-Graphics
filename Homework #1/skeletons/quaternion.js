/*
	Eduard Bolanos
	Homework #1 - Transform
	Comp-464: Computer Graphics
*/

// QUATERNION CLASS DESCRIPTION
/*
	The Quaternion class will 4-component structure to represent and apply rotations.
*/

// QUATERNION CLASS FIELDS:
//		w (numerical) : real component
//		x (numerical) : x-axis component
//		y (numerical) : y-axis component
//		z (numerical) : z-axis component

class Quaternion
{
	// "theta" is how far to turn, in radians
	// "x y z" are the axis of rotation
	// "normalized" denotes whether the input axis "x y z" has been normalized already
	// if "normalized" is false, then the constructor will need to normalize the axis
	// should set components "this.w, this.x, this.y, this.z" as detailed in slides
	constructor(theta=0, x=1, y=0, z=0, normalized=false)
	{
		var magnitude = 0;
		if(!normalized)
		{
			//BDE, FPS & DE
			magnitude = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
			this.w = Math.cos(theta / 2);
			this.x = (x * Math.sin(theta / 2)) / magnitude;
			this.y = (y * Math.sin(theta / 2)) / magnitude;
			this.z = (z * Math.sin(theta / 2)) / magnitude;
		}else
		{
			this.w = Math.cos(theta/2);
			this.x = x * Math.sin(theta / 2);
			this.y = y * Math.sin(theta / 2);
			this.z = z * Math.sin(theta / 2); 
		}
	}

	// sets this quaternion's components to the inputs
	set(w, x, y, z)
	{
		this.w = w;
		this.x = x;
		this.y = y;
		this.z = z;	
	}

	// returns the inverse quaternion as detailed in slides
	// NOTE: may assume that this quaternion is already normalized
	// because while we may use non-normalized quaternions, we will not need to invert them!
	inverse()
	{
		var q = new Quaternion();

		q.set(this.w,-this.x,-this.y,-this.z);

		return q;
	}

	// keep the w component the same
	// scale x y and z components to normalize
	// (i.e. to make sum of squared components, including w, equal 1)
	// this is to ensure that floating point rounding errors don't slowly add up
	// HINT: use the pythagorean trig identity!
	renormalize()
	{
		var magnitude = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));

		this.x = ((this.x / magnitude) * Math.sqrt(1 - Math.pow(this.w, 2)));
		this.y = ((this.y / magnitude) * Math.sqrt(1 - Math.pow(this.w, 2)));
		this.z = ((this.z / magnitude) * Math.sqrt(1 - Math.pow(this.w, 2)));
	}

	 // multiply the input quaternion "q" on the left (i.e. get q * this)
	 // as usual, if "inplace" is true then modify this quaternion, otherwise return a new one
	 // if "renormalize" is true, then renormalize the result
	 // NOTE: if "inplace" is false, renormalize the NEW quaternion and NOT this one
	compose(q, inplace=true, renormalize=true)
	{
		var w = this.w;
		var x = this.x;
		var y = this.y;
		var z = this.z;

		if(inplace)
		{
			this.w = (q.w * w) - (q.x * x) - (q.y * y) - (q.z * z);
			this.x = (q.w * x) + (q.x * w) + (q.y * z) - (q.z * y);
			this.y = (q.w * y) + (q.y * w) + (q.z * x) - (q.x * z);
			this.z = (q.w * z) + (q.z * w) + (q.x * y) - (q.y * x);

			if(renormalize)
			{
				this.renormalize();
			}
		}
		else
		{
			var newQuaternion = new Quaternion();

			newQuaternion.w = (q.w * w) - (q.x * x) - (q.y * y) - (q.z * z);
			newQuaternion.x = (q.w * x) + (q.x * w) + (q.y * z) - (q.z * y);
			newQuaternion.y = (q.w * y) + (q.y * w) + (q.z * x) - (q.x * z);
			newQuaternion.z = (q.w * z) + (q.z * w) + (q.x * y) - (q.y * x);

			if(renormalize)
			{
				newQuaternion.renormalize();
			}

			return newQuaternion;
		}
	}

	// apply the rotation represented by this quaternion to the input quaternion "q"
	// i.e. this * q * this.inverse()
	// return the result
	// use Quaternion.composition (static function defined below, complete it first)
	// HINT: compose multiplies from the left, so the inputs will need to be in reverse order!
	applyRotation(q) // this * q * this.inverse(), i.e. apply this quaternion to another
	{
		return Quaternion.composition([this.inverse(), q, this]);
	}

	// rotate by quaternion "q", but in local space
	// i.e. treat q's axis as if it is in local space
	// rotate q's axis by this quaternion to find it in world space
	// then compose the rotated q with this quaternion
	// don't forget to account for "inplace"!
	localCompose(q, inplace=true)
	{
		var qnew = this.applyRotation(q);
		return this.compose(qnew, inplace);
	}

	// return a string representation of this quaternion
	// something like "Quaternion (w, x, y, z)" but with the numerical values...
	toString()
	{
		return `Quaternion (${this.w}, ${this.x}, ${this.y}, ${this.z})`
	}

	// input vector "v"
	// returns a pure quaternion (i.e. one with w-value 0) and with x y z values equal to v's
	// HINT: don't use "new Quaternion(0, v.x, v.y, v.z)", w does not equal the input angle
	// instead make a new quaternion and then use its "set" function before returning it
	static fromVector(v)
	{
		var newQuaternion = new Quaternion();
		newQuaternion.set(0, v.x, v.y, v.z);

		return newQuaternion;
	}

	// given a list of quaternions, compose them chronologically
	// i.e. given [q1, q2, q3] return q3 * q2 * q1
	// HINT1: the "compose" function multiplies a new quaternion in from the left
	// HINT2: make sure the "renormalize" input for any "compose" calls is false
	// because we might be rotating a non-normalized pure quaternion if we're rotating a vector!
	static composition(quats) // given q1, q2, q3 returns q3 * q2 * q1
	{
		//TODO: Later on, idk what lab, oof

		var result = quats[quats.length-1];

		for (var index = quats.length-2; index >= 0; index--) {
			result = quats[index].compose(result, false, false);
		}

		return result;
	}
}