/*
	Eduard Bolanos
	Lab 03 - Quaternions and Rotation
*/

// MATRIX CLASS DESCRIPTION:
/*
	The Matrix class will contain utilities for generating and manipulating
	any 4x4 matrices needed for our purposes in graphics.

	Resulting matrices will be represented in column-major form as 1D
	Float32Arrays with 16 elements.

	This means the first 4 elements are the 1st column, the next 4 are the
	second column, and so on...

	This class will have no fields; it will contain only static methods to
	to generate and manipulate matrices in this form.
*/

class Matrix
{
	// returns the identity matrix
	static identity()
	{
		return new Float32Array([1, 0, 0, 0,
				0, 1, 0, 0,
				0, 0, 1, 0,
				0, 0, 0, 1])
	}

	// given a 3d vector, returns the corresponding translation matrix
	static translation(vector)
	{
		return new Float32Array([
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			vector.x, vector.y, vector.z, 1
		])
	}

	// given a quaternion, returns the corresponding rotation matrix
	// REQUIRES QUATERNIONS
	static rotation(quat)
	{

		//Big brain math from this website
			//https://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToMatrix/index.htm
			
			quat.renormalize();
			var cell_0 = 1 - 2*Math.pow(quat.y, 2) - 2*Math.pow(quat.z, 2);
			var cell_1 = 2*q.x*q.y + 2*q.z*q.w;
			var cell_2 = 2*q.x*q.z - 2*q.y*q.w;

			var cell_3 = 2*q.x*q.y - 2*q.z*q.w;
			var cell_4 = 1 - 2*q.x*q.x - 2*q.z*q.z;
			var cell_5 = 2*q.y*q.z + 2*q.x*q.w;

			var cell_6 = 2*q.x*q.z + 2*q.y*q.w;
			var cell_7 = 2*q.y*q.z - 2*q.x*q.w;
			var cell_8 = 1 - 2*q.x*q.x - 2*q.y*q.y;

			var matrix = [cell_0, cell_1, cell_2, 0, cell_3, cell_4, cell_5, 0,
			cell_6, cell_7, cell_8, 0, 0, 0, 0, 1];

		return new Float32Array(matrix);
	}

	// given a 3d vector, returns the corresponding scale matrix
	static scale(vector)
	{
		return new Float32Array([
		vector.x, 0, 0, 0,
		0, vector.y, 0, 0,
		0, 0, vector.z, 0,
		0, 0, 0, 1])
	}

	// given two matrices (as Float32Arrays), multiplies them together and returns the result
	// don't forget, the inputs and result are in column-major form!
	static mul(mat1, mat2)
	{
		var result = [];
		for (var col = 0; col < 4; col++) {
			for (var row = 0; row < 4; row++) {
				var temp = 0;
				for (var i = 0; i < 4; i++) {
					temp += mat1[row+4*i] * mat2[4*col+i];
				}
				result.push(temp);
			}
		}

		return new Float32Array(result);
	}

	// given an array or list of matrices, multiplies them all (in order) and returns the result
	static prod(mats)
	{
		var result = mats[0];
		for (var i = 1; i < mats.length; i++) {
			result = Matrix.mul(result, mats[i]);
		}
		return result;
	}

	// given a position (vector), rotation (quaternion) and scale (vector)
	// returns the corresponding world matrix
	static world(position, rotation, scale)
	{
		//TODO idk when??
	}

	// THE MATRICES BELOW WILL BE DONE IN THE 2ND HALF OF THE SEMESTER
	// but feel free to do some research to do them early!

	// takes 3 vectors, eye target and up
	// returns the view matrix for an object at position "eye", looking at "target"
	// with local upward direction "up"
	static view(eye, target, up)
	{
		//TODO idk when??
	}

	// "viewRadians" = vertical field of view, in radians
	// "aspect" = aspect ratio (i.e. width/height of display)
	// "near" = the closest something can be and still be seen
	// "far" = the furthest something can be and still be seen
	// returns corresponding perspective projection matrix
	static perspective(viewRadians=Math.PI/4, aspect=1, near=0.1, far=1000.0)
	{
		//TODO idk when??
	}

	// given left, right, bottom, top bounds of view and near / far distances
	// returns corresponding orthographic projection matrix
	static orthographic(left=-2, right=2, bottom=-2, top=2, near=0.1, far=1000.0)
	{
		//TODO idk when??
	}
}