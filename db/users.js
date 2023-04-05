const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        get() {
          return () => this.getDataValue("password");
        },
      },
    },
    {
      hooks: {
        beforeCreate: async function (user) {
          const salt = await bcrypt.genSalt(12);
          user.password = await bcrypt.hash(user.password, salt);
        },
        beforeBulkUpdate: async function (user) {
          if (user.attributes.password) {
            const sold = await bcrypt.genSalt(12);
            user.attributes.password = await bcrypt.hash(
              user.attributes.password,
              salt
            );
          }
        },
      },
    }
  );
  //   User.associate = (models) => {
  //     User.hasMany(models.Post);
  //     User.hasMany(models.Comment);
  //     User.hasMany(models.Like);
  //   };
  return User;
};
