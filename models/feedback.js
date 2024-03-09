module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define('feedback', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    track_id: {
      type: DataTypes.STRING(3000),
      allowNull: true
      },
     track_student_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
      track_faculty_id: {
      type: DataTypes.STRING(255),
      allowNull: true
      },
     title: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
     rate: {
      type: DataTypes.STRING(100),
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
    tableName: 'feedback',
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
  return Feedback;
};
