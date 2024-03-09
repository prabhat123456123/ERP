module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('question', {
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
    track_exam_id: {
      type: DataTypes.STRING(255),
      allowNull: true
      },
     question_title: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
      option_one: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
       option_two: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
      option_three: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
       option_four: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
      option_image_one: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
       option_image_two: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
      option_image_three: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
       option_image_four: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
      right_option: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
       right_marks: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
        wrong_marks: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
        question_level: {
     type: DataTypes.ENUM("easy", "medium","hard"),
      allowNull: true
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
    tableName: 'question',
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
  return Question;
};
