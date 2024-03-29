/*
	Eduard Bolanos
	Homework #1 - Transform
	Comp-464: Computer Graphics
*/

// TRANSFORM CLASS DESCRIPTION:
/*
	The Transform class will embody and manipulate position, rotation and scale
	(and the corresponding transformation matrices).
*/

// TRANSFORM CLASS FIELDS:
// 		position (Vector) : the position of the transform in a 3D space
// 		rotation (Quaternion) : the rotation of the transform
// 		scale (Vector) : the scale of the transform
// 		mTranslate (Float32Array(16)) : the translation matrix corresponding to the position vector
// 		mRotate (Float32Array(16)) : the rotation matrix corresponding to the rotation quaternion
// 		mScale (Float32Array(16)) : the scale matrix corresponding to the scale vector
// 		mWorld (Float32Array(16)) : the world transform, i.e. mTranslate * mRotate * mScale
// 		hasMoved (boolean) : has the position changed since the translation matrix was last updated?
// 		hasRotated (boolean) : ...
// 		hasScaled (boolean) : ...
// 		needsUpdate (boolean) : have the position, rotation or scale changed since the world matrix was last updated?

class Transform
{
	// set up a transform with the desired position, rotation and scale.
	// calculate and store the corresponding matrices (mTranslate, mRotate, and mScale).
	// calculate and store the world matrix (mWorld).
	// initiate the booleans (hasMoved, hasRotated, hasScaled, needsUpate) to false.
	constructor (position=new Vector(), rotation=new Quaternion(), scale=new Vector(1, 1, 1))
	{
		this.setPosition(position);
		this.setRotation(rotation);
		this.setScale(scale);

		this.mTranslate = Matrix.translation(position);
		this.mRotate =  Matrix.rotation(rotation);
		this.mScale = Matrix.scale(scale);

		this.mWorld = Matrix.world(position,rotation,scale);

		this.hasMoved = false;
		this.hasRotated = false;
		this.hasScaled = false;
		this.needsUpdate = false;
	}

	// set this transform's position to the input vector.
	// set the necessary booleans (hasMoved and needsUpdate) to true.
	setPosition(vector)
	{
		this.position = vector;
		this.hasMoved = true;
		this.needsUpdate = true;
	}
	// set this transform's rotation to the input quaternion.
	// set the necessary booleans (hasRotated and needsUpdate) to true.
	setRotation(quat)
	{
		this.rotation = quat;
		this.hasRotated = true;
		this.needsUpdate = true;
	}

	// set this transform's scale to the input vector.
	// set the necessary booleans (hasScaled and needsUpdate) to true.
	setScale(scale)
	{
		this.scale = scale;
		this.hasScaled = true;
		this.needsUpdate = true;
	}
	// translate by the input vector (i.e. add the input vector to the position)
	// update necessary booleans...
	translate(vector)
	{
		this.position.add(vector, true);
		this.hasMoved = true;
		this.needsUpdate = true;
	}

	// rotate by the input quaternion (i.e. compose the input quaternion with the rotation)
	// update necessary booleans...
	rotate(quat)
	{
		console.log("yeee");
		this.rotation = this.rotation.applyRotation(quat);
		this.hasRotated = true;
		this.needsUpdate = true;
	}

	// rotate by the input quaternion in local space
	// update necessary booleans...
	localRotate(quat)
	{
		this.rotation.localCompose(quat, true);
		this.hasRotated = true;
		this.needsUpdate = true;
	}

	// rotate the position vector about the vector "point" by the input quaternion "quat"
	// also compose "quat" with the rotation
	// update necessary booleans...
	rotateAround(point, quat)
	{
		this.rotation.compose(quat, true);
		this.position.subtract(point, true);
		this.position.rotate(quat, true);
		this.position.add(point, true);
		this.hasRotated = true;
		this.hasMoved = true;
		this.needsUpdate = true;
	}

	// scale the x, y and z components of this transform's scale by those of the input vector
	// update necessary booleans...
	scaleBy(vector)
	{
		this.scale.scale(vector, true);
	}

	// update mTranslate so it reflects this transform's position
	// set hasMoved to false, as any movements have now been incorporated
	updateTranslationMatrix()
	{
		this.mTranslate = Matrix.translation(this.position);
		this.hasMoved = false;
	}

	// update mRotate so it reflects the transform's rotation
	// update necessary boolean(s)
	updateRotationMatrix()
	{
		this.mRotate = Matrix.rotation(this.rotation);
		this.hasRotated = false;
	}

	// update mScale so it reflects the transform's scale
	// update necessary booleans...
	updateScaleMatrix()
	{
		this.mScale = Matrix.scale(this.scale)
		this.hasScaled = false;
	}

	// update the world matrix to the product mTranslate * mRotate * mScale
	// set needsUpdate to false, as all transformation changes are now incorporated
	updateWorldMatrix()
	{
		this.mWorld = Matrix.mul(this.mTranslate, this.mRotate);
		this.mWorld = Matrix.mul(this.mWorld, this.mScale);
		this.needsUpdate = false;
	}

	// if needsUpdate is false, don't do anything; no update is needed
	// if needsUpdate is true, then:
	// 		if necessary, update mTranslate
	//		if necessary, update mRotate
	//		if necessary, update mScale
	//		update the mWorld
	// HINTS: how do we know if each update is necessary?
	//		  what methods do we need to call to update them?
	//		  do we need to update any booleans explicitly here?
	update()
	{
		if(this.needsUpdate == true)
		{
			if(this.hasMoved == true)
			{
				this.updateTranslationMatrix();
			}
			if(this.hasRotated == true)
			{
				this.updateRotationMatrix();
			}
			if(this.hasScaled == true)
			{
				this.updateScaleMatrix();
			}

			this.updateWorldMatrix();
		}
	}
}