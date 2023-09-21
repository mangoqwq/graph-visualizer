export default class Vector {
	x : number;
	y : number;
	constructor(x : number, y : number) {
		this.x = x;
		this.y = y;
	}
	add(b : Vector) : Vector {
		return Vector.add(this, b);
	}
	sub(b : Vector) : Vector {
		return Vector.sub(this, b);
	}
	norm() : number {
		return Vector.norm(this);
	}
	scale(s : number) : Vector {
		return Vector.scale(this, s);
	}
	normalize() : Vector {
		return Vector.normalize(this);
	}
	scaleToLength(l : number) : Vector {
		return Vector.scaleToLength(this, l);
	}
	static add(a : Vector, b : Vector) : Vector {
		return new Vector(a.x + b.x, a.y + b.y);
	}
	static sub(a : Vector, b : Vector) : Vector {
		return new Vector(a.x - b.x, a.y - b.y);
	}
	static norm(a : Vector) : number {
		return Math.sqrt(a.x * a.x + a.y * a.y);
	}
	static scale(a : Vector, s : number) : Vector {
		return new Vector(a.x * s, a.y * s);
	}
	static normalize(a : Vector) : Vector {
		if (a.norm() <= 1e-9) return new Vector(0, 0);
		return Vector.scale(a, 1 / Vector.norm(a));
	}
	static scaleToLength(a : Vector, l : number) : Vector {
		return Vector.scale(Vector.normalize(a), l);
	}
}
