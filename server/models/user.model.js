const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "username is required"],
		//unique
	},
	password: {
		type: String,
		required: [true, "password is required"],
		//minlength: [8, "Password must be 8 characters or longer"]
	},
	nombre: {
		type: String,
		required: [true, "First name is required"]
	},
	apellido: {
		type: String,
		required: [true, "Last name is required"]
	},
	/*
	CI: {
		type: Number,
		required: [true, "CI is required"],
		unique: true
	},
	*/
	rol: {
		type: String,
		enum: ["Admin","RRPP","Bouncer"],
		required: true
	},
	isActive: {
		type: Boolean,
		required: true,
		default: true
	}
}, { timestamps: true });

UserSchema.virtual('confirmPassword')
  .get( () => this._confirmPassword )
  .set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password y confirmacion no coinciden');
  }
  next();
});


// before creating user, encrypt password
UserSchema.pre('save', async function (next) {
	try {
		const hashedPassword = await bcrypt.hash(this.password, 10);
		this.password = hashedPassword;

		next();
	} catch (error) {
		console.log("error saving user", error);
	}
});

module.exports = mongoose.model("User", UserSchema);

