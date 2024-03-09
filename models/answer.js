module.exports = (sequelize, DataTypes) => {
   const Answer = sequelize.define('answer', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
     },
      track_id: {
      type: DataTypes.STRING(255),
      allowNull: true
      },
    track_student_id: {
      type: DataTypes.STRING(255),
      allowNull: true
      },
      track_question_id: {
      type: DataTypes.STRING(255),
      allowNull: true
      },
     given_options: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
     
    question_status: {
      type: DataTypes.ENUM("saved", "notsaved"),
			 defaultValue: "notsaved"
      },
     Status: {
      type: DataTypes.ENUM("active", "inactive"),
			 defaultValue: "active"
    },
    created_by: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('current_timestamp')

    },
    updated_by: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'answer',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
   });
  return Answer;
};
