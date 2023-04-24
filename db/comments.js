const db = require("./users");

module.exports = (sequelize, DataTypes) => {
  const User = db(sequelize, DataTypes);

  const Comment = sequelize.define(
    "comment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      hooks: {
        beforeCreate: async function (comment) {
          try {
            const userWhoCommented = await User.findByPk(comment.userId);
            if (userWhoCommented.role === "Premium") {
              await User.update(
                {
                  xp: userWhoCommented.xp + 5,
                  level: Math.trunc(userWhoCommented.xp / 100),
                  coins: Math.trunc(userWhoCommented.level * 15),
                },
                { where: { id: comment.userId } }
              );
            } else {
              await User.update(
                {
                  xp: userWhoCommented.xp + 1,
                  level: Math.trunc(userWhoCommented.xp / 100),
                  coins: Math.trunc(userWhoCommented.level * 5),
                },
                { where: { id: comment.userId } }
              );
            }
          } catch (error) {
            console.log(error);
          }
        },
      },
    }
  );

  Comment.associate = (models) => {
    Comment.belongsTo(models.User);
    Comment.belongsTo(models.Post);
    Comment.hasMany(models.Like);
  };

  return Comment;
};
